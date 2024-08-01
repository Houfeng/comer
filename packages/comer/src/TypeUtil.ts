export type RequiredKeyOf<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

export type OptionalKeyOf<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

export type AnyFunction = (...args: any) => any;

export type ValueOf<T, K extends keyof T = keyof T> = T[K];

export type Modify<T, R> = Omit<T, keyof R> & R;

export type StringKeyOf<T> = Extract<keyof T, string>;

export type IsNullable<T, K, L = never> = undefined extends T ? K : L;
export type NullableKeyOf<T> = {
  [K in keyof T]-?: IsNullable<T[K], K>;
}[keyof T];

export type OptionalKeyToNullable<T> = {
  [K in OptionalKeyOf<T>]: T[K] | undefined;
} & { [K in RequiredKeyOf<T>]: T[K] };

export type NullableKeyToOptional<T> = Modify<
  T,
  Partial<{ [K in NullableKeyOf<T>]-?: T[K] | undefined }>
>;
