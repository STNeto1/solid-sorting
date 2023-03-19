import { Component, For } from 'solid-js'
import { useItemStore } from './lib/item-store'

const App: Component = () => {
  const items = useItemStore((state) => state.items)
  const shuffle = useItemStore((state) => state.shuffle)
  const defaultSort = useItemStore((state) => state.defaultSort)
  const selectionSort = useItemStore((state) => state.selectionSort)
  const bubbleSort = useItemStore((state) => state.bubbleSort)
  const insertionSort = useItemStore((state) => state.insertionSort)
  const mergeSort = useItemStore((state) => state.mergeSort)
  const quickSort = useItemStore((state) => state.quickSort)
  const heapSort = useItemStore((state) => state.heapSort)
  const countingSort = useItemStore((state) => state.countingSort)
  const bucketSort = useItemStore((state) => state.bucketSort)

  return (
    <section>
      <button onclick={() => shuffle()}>shuffle</button>
      <button onclick={() => defaultSort()}>default sort</button>
      <button onclick={() => selectionSort()}>selection sort</button>
      <button onclick={() => bubbleSort()}>bubble sort</button>
      <button onclick={() => insertionSort()}>insertion sort</button>
      <button onclick={() => mergeSort()}>merge sort</button>
      <button onclick={() => quickSort()}>quick sort</button>
      <button onclick={() => heapSort()}>heap sort</button>
      <button onclick={() => countingSort()}>counting sort</button>
      <button onclick={() => bucketSort()}>bucket sort</button>

      <ul>
        <For each={items}>{(item) => <li>{item}</li>}</For>
      </ul>
    </section>
  )
}

export default App
