import { isRef, ref, unref, watch, getCurrentScope, onScopeDispose  } from 'vue'
import type { Fn, MaybeComputedRef, Pausable } from '@/types/hooks.d'

export interface UseIntervalFnOptions {
  /**
   * Start the timer immediately
   *
   * @default true
   */
  immediate?: boolean

  /**
   * Execute the callback immediate after calling this function
   *
   * @default false
   */
  immediateCallback?: boolean
}


/**
 * Call onScopeDispose() if it's inside a effect scope lifecycle, if not, do nothing
 *
 * @param fn
 */
export function tryOnScopeDispose(fn: Fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn)
    return true
  }
  return false
}


/**
 * Normalize value/ref/getter to `ref` or `computed`.
 */
export function resolveUnref<T>(r: MaybeComputedRef<T>): T {
  return typeof r === 'function'
    ? (r as any)()
    : unref(r)
}

/**
 * Wrapper for `setInterval` with controls
 *
 * @param cb
 * @param interval
 * @param options
 */
export function useIntervalFn(cb: Fn, interval: MaybeComputedRef<number> = 1000, options: UseIntervalFnOptions = {}): Pausable {
  const {
    immediate = true,
    immediateCallback = false,
  } = options

  let timer: any = null
  const isActive = ref(false)

  function clean() {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  function pause() {
    isActive.value = false
    clean()
  }

  function resume() {
    if (unref(interval) <= 0)
      return
    isActive.value = true
    if (immediateCallback)
      cb()
    clean()
    timer = setInterval(cb, resolveUnref(interval))
  }

  if (immediate)
    resume()

  if (isRef(interval)) {
    const stopWatch = watch(interval, () => {
      if (isActive.value)
        resume()
    })
    tryOnScopeDispose(stopWatch)
  }

  tryOnScopeDispose(pause)

  return {
    isActive,
    pause,
    resume,
  }
}