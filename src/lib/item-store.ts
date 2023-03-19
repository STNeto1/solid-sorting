import create from 'solid-zustand'

interface ItemStore {
  items: Array<number>

  shuffle: () => void
  defaultSort: () => void
  selectionSort: () => void
}

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

      await new Promise((f) => setTimeout(f, 50))

      set((state) => ({ ...state, items: copy }))
    }
  }
}))
