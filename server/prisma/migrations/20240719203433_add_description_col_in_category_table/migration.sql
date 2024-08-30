/*
  Warnings:

  - A unique constraint covering the columns `[description]` on the table `category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "category" ADD COLUMN     "description" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "category_description_key" ON "category"("description");
