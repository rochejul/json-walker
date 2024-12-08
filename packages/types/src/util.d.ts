declare module '@json-walker/util' {
  class Option<T> {
    private constructor();

    isNone(): boolean;
    isSome(): boolean;
    readonly value: T | undefined | null;

    static from<F>(value: F): Option<F>;
  }

  export { Option };
}
