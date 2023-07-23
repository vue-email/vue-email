import path from 'path';

// Package variables
export const DEFAULT_EMAILS_DIRECTORY = 'emails';
export const PACKAGE_NAME = 'vue-email';

// Default paths
export const CURRENT_PATH = process.cwd();

// User paths
export const USER_PACKAGE_JSON = path.join(CURRENT_PATH, 'package.json');
export const USER_STATIC_FILES = path.join(CURRENT_PATH, 'emails', 'static');

// Vue Email paths
export const VUE_EMAIL_ROOT = path.join(CURRENT_PATH, '.vue-email');

// Events
export const EVENT_FILE_DELETED = 'unlink';

export const PACKAGE_EMAILS_PATH = path.join(
  VUE_EMAIL_ROOT,
  DEFAULT_EMAILS_DIRECTORY,
);

export const PACKAGE_PUBLIC_PATH = path.join(VUE_EMAIL_ROOT, 'public');
