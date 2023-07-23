import shell from 'shelljs';
import path from 'path';
import { VUE_EMAIL_ROOT } from './constants';
import ora from 'ora';
import logSymbols from 'log-symbols';
import { closeOraOnSIGNIT } from './close-ora-on-sigint';

export type PackageManager = 'yarn' | 'npm' | 'pnpm';

export const installDependencies = async (packageManager: PackageManager) => {
  const spinner = ora('Installing dependencies...\n').start();
  closeOraOnSIGNIT(spinner);

  shell.cd(path.join(VUE_EMAIL_ROOT));
  shell.exec(`${packageManager} install`);
  spinner.stopAndPersist({
    symbol: logSymbols.success,
    text: 'Dependencies installed',
  });
};
