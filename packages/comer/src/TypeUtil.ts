export type RequiredKeyOf<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

export type OptionalKeyOf<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

export type AnyFunction = (...args: any) => any;

export type ValueOf<T, K extends keyof T = keyof T> = T[K];

export type Override<T, R> = Omit<T, keyof R> & R;

export type StringKeyOf<T> = Exclude<keyof T, number | symbol>;

export type IsNullable<T, K, L = never> = undefined extends T ? K : L;

export type NullableKeyOf<T> = {
  [K in keyof T]-?: IsNullable<T[K], K>;
}[keyof T];

export type OptionalKeyToNullable<T> = {
  [K in OptionalKeyOf<T>]: T[K] | undefined;
} & { [K in RequiredKeyOf<T>]: T[K] };

export type NullableKeyToOptional<T> = Override<
  T,
  Partial<{ [K in NullableKeyOf<T>]-?: T[K] | undefined }>
>;

export type IfEquals<X, Y, A, B> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? A : B;

export type UnionToIntersection<U> = (
  U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

export type UnionTypeOfValues<T> = T[keyof T];

export type WritableKeyOf<T> = {
  [P in keyof T]: IfEquals<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    P,
    never
  >;
}[keyof T];

export type PickWritable<T> = Pick<T, WritableKeyOf<T>>;

export type KeyofByValue<T extends object, V> = {
  [K in keyof T]-?: ValueOf<T, K> extends V ? K : never;
}[keyof T];

export type PickFunction<T extends object> = PickWritable<
  Pick<T, KeyofByValue<T, Function>>
>;

// --------------------------------------------------------------------------

export type PickAsProps<T extends object, V = string | number> = PickWritable<
  Pick<T, KeyofByValue<T, V>>
>;

export type ConvertToEvents<
  M extends object,
  E extends object = object,
  K extends StringKeyOf<M> = StringKeyOf<M>,
> = UnionToIntersection<
  UnionTypeOfValues<{
    [KK in K]: {
      [KKK in `on${Capitalize<KK>}`]: (event: Override<M[KK], E>) => void;
    };
  }>
>;
