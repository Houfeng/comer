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

export type IfEquals<X, Y, A, B> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? A : B;

export type WritableKeysOf<T> = {
  [P in keyof T]: IfEquals<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    P,
    never
  >;
}[keyof T];

export type WritablePart<T> = Pick<T, WritableKeysOf<T>>;
