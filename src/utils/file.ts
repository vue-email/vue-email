import fs from 'node:fs'
import Path from 'node:path'

/**
 * Returns true if the path is pointing to a folder.
 *
 * @param path
 */
export function isDirectory(path: string): boolean {
  return fs.statSync(path).isDirectory()
}

/**
 * Returns true if the path is not pointing to a folder.
 *
 * @param path
 */
export function isFile(path: string): boolean {
  return fs.statSync(path).isFile()
}

/**
 * Returns absolute paths of all directories at path.
 *
 * @param path
 */
export function getDirectories(path: string): string[] {
  return fs
    .readdirSync(path)
    .map((name) => Path.join(path, name))
    .filter(isDirectory)
}

/**
 * Returns absolute paths of all files at path.
 *
 * @param path
 */
export function getFiles(path: string): string[] {
  return fs
    .readdirSync(path)
    .map((name) => Path.join(path, name))
    .filter(isFile)
}

/**
 * Returns absolute paths of all files at path, and in subdirectories.
 *
 * @param path
 */
export function getFilesRecursively(path: string): string[] {
  const dirs = getDirectories(path)
  const files = dirs
    .map((dir) => getFilesRecursively(dir)) // go through each directory
    .reduce((a, b) => a.concat(b), []) // map returns a 2d array (array of file arrays) so flatten
  return files.concat(getFiles(path))
}

/**
 * Returns the content of a file at path.
 *
 * @param path
 */
export function readFile(path: string): string {
  return fs.readFileSync(path, 'utf-8').toString()
}

/**
 * Writes a file at path with provided data.
 *
 * @param path
 * @param data
 */
export function writeFile(path: string, data: string | NodeJS.ArrayBufferView): void {
  fs.mkdirSync(path.substring(0, path.lastIndexOf(Path.sep)), {
    recursive: true,
  }) // Make sure the directory we are writing to exists.
  return fs.writeFileSync(path, data)
}
