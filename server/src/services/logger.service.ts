import colors from 'colors';

export enum Logger {
  Silly = 'silly',
  Input = 'input',
  Verbose = 'verbose',
  Prompt = 'prompt',
  Info = 'info',
  Data = 'data',
  Help = 'help',
  Warn = 'warn',
  Debug = 'debug',
  Error = 'error',
  Success = 'success',
}

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'blue',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red',
  success: 'green',
});

type ColorTypes = {
  silly: (text: string) => string;
  input: (text: string) => string;
  verbose: (text: string) => string;
  prompt: (text: string) => string;
  info: (text: string) => string;
  data: (text: string) => string;
  help: (text: string) => string;
  warn: (text: string) => string;
  debug: (text: string) => string;
  error: (text: string) => string;
  success: (text: string) => string;
};

type ColorType = keyof ColorTypes;

export default function logger(message: string, color: ColorType) {
  const colorFn = colors[color as keyof typeof colors] as (
    text: string
  ) => string;
  console.log(colorFn(message));
}
