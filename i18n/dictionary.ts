import type es from './dictionaries/es'

/**
 * Widens the literal types produced by `as const` so translations only have to
 * match the *shape* of the Spanish source, not its exact strings.
 */
type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? readonly Widen<U>[]
        : T extends object
          ? { readonly [K in keyof T]: Widen<T[K]> }
          : T

/**
 * `es.ts` is the source of truth. Every other dictionary is declared
 * `satisfies Dictionary`, so a missing or misspelled key fails `tsc`.
 */
export type Dictionary = Widen<typeof es>
