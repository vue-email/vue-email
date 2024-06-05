export type DeepRequired<T> = Required<{ [P in keyof T]: DeepRequired<T[P]> }>
