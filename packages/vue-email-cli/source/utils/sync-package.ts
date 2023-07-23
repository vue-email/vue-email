import readPackage from 'read-pkg';
import { VUE_EMAIL_ROOT } from './constants';
import fs from 'fs';
import path from 'path';

export const syncPkg = async () => {
  const clientPkg = await readPackage({ cwd: VUE_EMAIL_ROOT });
  const userPkg = await readPackage();
  const pkg = {
    ...clientPkg,
    dependencies: {
      ...clientPkg.dependencies,
      ...userPkg.dependencies,
    },
  };
  await fs.promises.writeFile(
    path.join(VUE_EMAIL_ROOT, 'package.json'),
    JSON.stringify(pkg),
  );
};
