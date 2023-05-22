import { promises as fs } from 'fs';
import path from 'path';

export const EMAIL_DIR = 'emails';

export const getEmails = async () => {
  const emailsDir = path.resolve(process.cwd(), EMAIL_DIR);
  const filenames = await fs.readdir(emailsDir);
  const emails = filenames
    .map((file) => file.replace(/\.(ts|vue)$/g, ''))
    .filter((file) => file !== 'components');

  return { emails, filenames };
};
