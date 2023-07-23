import { Octokit } from '@octokit/rest';
import fse from 'fs-extra';
import fs from 'fs';
import shell from 'shelljs';
import path from 'path';

export const downloadClient = async () => {
  const octokit = new Octokit();
  const downloadRes = await octokit.repos.downloadTarballArchive({
    owner: 'Dave136',
    repo: 'vue-email',
    ref: 'v0.0.14',
  });
  fs.mkdirSync('.vue-email-temp');
  const TAR_PATH = path.join('.vue-email-temp', 'vue-email.tar.gz');
  fs.writeFileSync(TAR_PATH, Buffer.from(downloadRes.data as any));
  shell.exec(
    `tar -xzvf .vue-email-temp/vue-email.tar.gz -C .vue-email-temp --strip-components 1`,
    { silent: true },
  );

  fse.moveSync(
    path.join('.vue-email-temp', 'client'),
    path.join('.vue-email'),
  );

  fse.removeSync('.vue-email-temp');
};
