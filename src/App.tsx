import { Component, createSignal, For } from 'solid-js'
import { Button } from './components/Button'
import { useItemStore } from './lib/item-store'

export const [sorting, setSorting] = createSignal(false)

const App: Component = () => {
  const sortingWrapper = async (fn: () => Promise<void>) => {
    if (sorting()) {
      return
    }

    setSorting(true)
    await fn()
    setSorting(false)
  }

  const items = useItemStore((state) => state.items)
  const shuffle = useItemStore((state) => state.shuffle)
  const defaultSort = useItemStore((state) => state.defaultSort)
  const sSort = useItemStore((state) => state.selectionSort)
  const bSort = useItemStore((state) => state.bubbleSort)
  const iSort = useItemStore((state) => state.insertionSort)
  const mSort = useItemStore((state) => state.mergeSort)
  const qSort = useItemStore((state) => state.quickSort)
  const hSort = useItemStore((state) => state.heapSort)
  const cSort = useItemStore((state) => state.countingSort)
  const bkSort = useItemStore((state) => state.bucketSort)
  const rSort = useItemStore((state) => state.radixSort)

  return (
    <main class="w-screen h-screen bg-gray-100 flex flex-col items-center justify-center">
      <section class="container mx-auto max-w-6xl  ">
        <section class="w-full flex items-center justify-between">
          <Button disabled={sorting()} onclick={() => shuffle()}>
            shuffle
          </Button>
          <Button disabled={sorting()} onclick={() => defaultSort()}>
            default sort
          </Button>
          <Button disabled={sorting()} onclick={() => sortingWrapper(sSort)}>
            selection sort
          </Button>
          <Button disabled={sorting()} onclick={() => sortingWrapper(bSort)}>
            bubble sort
          </Button>
          <Button disabled={sorting()} onclick={() => sortingWrapper(iSort)}>
            insertion sort
          </Button>
          <Button disabled={sorting()} onclick={() => sortingWrapper(mSort)}>
            merge sort
          </Button>
          <Button disabled={sorting()} onclick={() => sortingWrapper(qSort)}>
            quick sort
          </Button>
          <Button disabled={sorting()} onclick={() => sortingWrapper(hSort)}>
            heap sort
          </Button>
          <Button disabled={sorting()} onclick={() => sortingWrapper(cSort)}>
            counting sort
          </Button>
          <Button disabled={sorting()} onclick={() => sortingWrapper(bkSort)}>
            bucket sort
          </Button>
          <Button disabled={sorting()} onclick={() => sortingWrapper(rSort)}>
            radix sort
          </Button>
        </section>

        <div class="w-full flex items-center justify-between py-10">
          <For each={items}>
            {(item) => (
              <div class="bg-white h-10 w-10 shadow-lg flex items-center justify-center">
                {item}
              </div>
            )}
          </For>
        </div>
      </section>
    </main>
  )
}

export default App
