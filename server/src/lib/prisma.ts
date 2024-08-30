import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: ['query'],
});

async function main() {
  await createDefaultCategories();
}

async function createDefaultCategories() {
  const defaultCategories = [
    { name: 'Alimentação', description: 'Despesas com alimentos e refeições' },
    {
      name: 'Transporte',
      description: 'Despesas com transporte, combustível e passagens',
    },
    { name: 'Saúde', description: 'Despesas com saúde e medicamentos' },
    {
      name: 'Entretenimento',
      description: 'Despesas com lazer e entretenimento',
    },
    { name: 'Educação', description: 'Despesas com educação e cursos' },
    {
      name: 'Moradia',
      description: 'Despesas com aluguel, condomínio e contas de casa',
    },
  ];

  for (const category of defaultCategories) {
    await prisma.$executeRaw`
    INSERT INTO "categories" ("id", "name", "description", "created_at", "updated_at")
    VALUES (gen_random_uuid(), ${category.name}, ${category.description}, now(), now())
    ON CONFLICT ("name") DO NOTHING;
  `;
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
