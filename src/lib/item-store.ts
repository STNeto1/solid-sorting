import create from 'solid-zustand'

interface ItemStore {
  items: Array<number>

  shuffle: () => void
  defaultSort: () => void
  selectionSort: () => void
  bubbleSort: () => void
  insertionSort: () => void
  mergeSort: () => void
}

const sleep = async (time: number) =>
  await new Promise((f) => setTimeout(f, time))

export const useItemStore = create<ItemStore>((set, get) => ({
  items: Array.from({ length: 10 }, (_, k) => k + 1),
  shuffle: () => {
    const copy: Array<number> = structuredClone(get().items)
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

    set((state) => ({ ...state, items: copy }))
  },
  defaultSort: () => {
    const copy: Array<number> = structuredClone(get().items)
    copy.sort((a, b) => a - b)

    set((state) => ({ ...state, items: copy }))
  },
  selectionSort: async () => {
    const copy: Array<number> = structuredClone(get().items)
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

      await sleep(50)

      set((state) => ({ ...state, items: copy }))
    }
  },
  bubbleSort: async () => {
    const copy: Array<number> = structuredClone(get().items)
    const n = copy.length

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (copy[j] > copy[j + 1]) {
          let temp = copy[j]
          copy[j] = copy[j + 1]
          copy[j + 1] = temp
          await sleep(50)

          set((state) => ({ ...state, items: copy }))
        }
      }
    }
  },
  insertionSort: async () => {
    const copy: Array<number> = structuredClone(get().items)
    const n = copy.length

    for (let i = 0; i < n; i++) {
      let key = copy[i]
      let j = i - 1

      while (j >= 0 && copy[j] > key) {
        copy[j + 1] = copy[j]
        j -= 1
      }
      copy[j + 1] = key
      await sleep(50)
      set((state) => ({ ...state, items: copy }))
    }
  },
  mergeSort: async () => {
    const copy: Array<number> = structuredClone(get().items)

    const merge = async (
      arr: Array<number>,
      l: number,
      m: number,
      r: number
    ) => {
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

          await sleep(50)
          set((state) => ({ ...state, items: arr }))
        } else {
          arr[k] = r_a[j]
          j++

          await sleep(50)
          set((state) => ({ ...state, items: arr }))
        }

        k++
      }

      while (i < n1) {
        arr[k] = l_a[i]
        i++
        k++

        await sleep(50)
        set((state) => ({ ...state, items: arr }))
      }

      while (j < n2) {
        arr[k] = r_a[j]
        j++
        k++

        await sleep(50)
        set((state) => ({ ...state, items: arr }))
      }
    }

    const sort = async (arr: Array<number>, l: number, r: number) => {
      if (l >= r) {
        return
      }

      const m = l + ~~((r - l) / 2)

      await sort(arr, l, m)
      await sort(arr, m + 1, r)

      await merge(arr, l, m, r)
    }

    sort(copy, 0, copy.length - 1)
  }
}))
