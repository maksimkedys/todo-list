interface UseLocalStorageOptions<T> {
  key: string
  defaultValue?: T
}

const useLocalStorage = <T>({ key, defaultValue }: UseLocalStorageOptions<T>) => {
  const saveValue = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  const getValue = () => {
    const item = localStorage.getItem(key)

    return item ? JSON.parse(item) : (defaultValue ?? null)
  }

  return { getValue, saveValue }
}

export default useLocalStorage
