import create from 'solid-zustand'

type TItems = Array<number>

interface ItemStore {
  items: TItems

  sleepUpdate: (items: TItems, sleepDuration: number) => Promise<void>

  shuffle: () => void
  defaultSort: () => void
  selectionSort: () => void
  bubbleSort: () => void
  insertionSort: () => void
  mergeSort: () => void
  quickSort: () => void
}

const sleep = async (time: number) =>
  await new Promise((f) => setTimeout(f, time))

export const useItemStore = create<ItemStore>((set, get) => ({
  items: Array.from({ length: 10 }, (_, k) => k + 1),

  sleepUpdate: async (_items, _sleep) => {
    await sleep(_sleep)
    set((state) => ({ ...state, items: _items }))
  },

  shuffle: async () => {
    const copy: TItems = structuredClone(get().items)
    let counter = copy.length

    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter)

      // Decrease counter by 1
      counter--

      // And swap the last element with it
      let temp = copy[counter]
      copy[counter] = copy[index]
      copy[index] = temp
    }

    await get().sleepUpdate(copy, 0)
  },
  defaultSort: async () => {
    const copy: TItems = structuredClone(get().items)
    copy.sort((a, b) => a - b)

    await get().sleepUpdate(copy, 0)
  },
  selectionSort: async () => {
    const copy: TItems = structuredClone(get().items)
    const n = copy.length

    for (let i = 0; i < n - 1; i++) {
      let min_idx = i

      for (let j = i + 1; j < n; j++) {
        if (copy[j] < copy[min_idx]) {
          min_idx = j
        }
      }

      let temp = copy[min_idx]
      copy[min_idx] = copy[i]
      copy[i] = temp

      await get().sleepUpdate(copy, 50)
    }
  },
  bubbleSort: async () => {
    const copy: TItems = structuredClone(get().items)
    const n = copy.length

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (copy[j] > copy[j + 1]) {
          let temp = copy[j]
          copy[j] = copy[j + 1]
          copy[j + 1] = temp

          await get().sleepUpdate(copy, 50)
        }
      }
    }
  },
  insertionSort: async () => {
    const copy: TItems = structuredClone(get().items)
    const n = copy.length

    for (let i = 0; i < n; i++) {
      let key = copy[i]
      let j = i - 1

      while (j >= 0 && copy[j] > key) {
        copy[j + 1] = copy[j]
        j -= 1
      }
      copy[j + 1] = key

      await get().sleepUpdate(copy, 50)
    }
  },
  mergeSort: async () => {
    const copy: TItems = structuredClone(get().items)

    const merge = async (arr: TItems, l: number, m: number, r: number) => {
      const n1 = m - l + 1
      const n2 = r - m

      const l_a = new Array(n1)
      const r_a = new Array(n2)

      for (let _i = 0; _i < n1; _i++) {
        l_a[_i] = arr[l + _i]
      }
      for (let _j = 0; _j < n1; _j++) {
        r_a[_j] = arr[m + 1 + _j]
      }

      let i = 0
      let j = 0
      let k = l

      while (i < n1 && j < n2) {
        if (l_a[i] <= r_a[j]) {
          arr[k] = l_a[i]
          i++

          await get().sleepUpdate(arr, 50)
        } else {
          arr[k] = r_a[j]
          j++

          await get().sleepUpdate(arr, 50)
        }

        k++
      }

      while (i < n1) {
        arr[k] = l_a[i]
        i++
        k++

        await get().sleepUpdate(arr, 50)
      }

      while (j < n2) {
        arr[k] = r_a[j]
        j++
        k++

        await get().sleepUpdate(arr, 50)
      }
    }

    const sort = async (arr: TItems, l: number, r: number) => {
      if (l >= r) {
        return
      }

      const m = l + ~~((r - l) / 2)

      await sort(arr, l, m)
      await sort(arr, m + 1, r)

      await merge(arr, l, m, r)
    }

    sort(copy, 0, copy.length - 1)
  },
  quickSort: async () => {
    const copy: TItems = structuredClone(get().items)

    const partition = async (arr: TItems, low: number, high: number) => {
      const pivot = arr[high]
      let i = low - 1

      for (let j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
          i++

          let temp = arr[j]
          arr[j] = arr[i]
          arr[i] = temp

          await get().sleepUpdate(arr, 50)
        }
      }

      let temp = arr[high]
      arr[high] = arr[i + 1]
      arr[i + 1] = temp

      await get().sleepUpdate(arr, 50)

      return i + 1
    }

    const _quickSort = async (arr: TItems, low: number, high: number) => {
      if (low < high) {
        const pi = await partition(arr, low, high)

        await _quickSort(arr, low, pi - 1)
        await _quickSort(arr, pi + 1, high)

        set((state) => ({ ...state, items: arr }))
      }
    }

    await _quickSort(copy, 0, copy.length - 1)
  }
}))
