import { promises as fs } from 'fs';
import path from 'path';

export const EMAIL_DIR = 'emails';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const emailsDir = path.resolve(process.cwd(), EMAIL_DIR);
  const template = path.resolve(emailsDir, body.name);
  const vueMarkup = await fs.readFile(template, {
    encoding: 'utf-8',
  });

  return vueMarkup;
});
