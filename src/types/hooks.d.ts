import { Ref } from "vue";

/**
 * Any function
 */
export type Fn = () => void;

export type MaybeRef<T> = T | Ref<T>;

/**
 * Maybe it's a ref, or a plain value, or a getter function
 *
 * ```ts
 * type MaybeComputedRef<T> = T | Ref<T> | (() => T)
 * ```
 */
export type MaybeComputedRef<T> = T extends () => void
  ? never
  : (() => T) | MaybeRef<T>;

export interface Pausable {
  /**
   * A ref indicate whether a pusable instance is active
   */
  isActive: Ref<boolean>;

  /**
   * Temporary pause the effect from executing
   */
  pause: Fn;

  /**
   * Resume the effects
   */
  resume: Fn;
}
