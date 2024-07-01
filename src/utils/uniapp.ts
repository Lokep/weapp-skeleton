export const getCache = (key: string): any => uni.getStorageSync(key)

export const setCache = (key: string, value: any): void => uni.setStorageSync(key, value)

export const removeCache = (key: string): void => uni.removeStorageSync(key)


type ToastIconType = 'success' | 'loading' | 'error' | 'none' | 'fail' | 'exception'

export const showToast = (title: string, icon: ToastIconType = 'none', duration: number = 1500): Promise<void> => new Promise((resolve, reject) => {
  uni.showToast({
    title,
    icon,
    duration,
    success: resolve,
    fail: reject
  })
})



