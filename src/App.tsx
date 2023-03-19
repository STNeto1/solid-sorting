import { Component, For } from 'solid-js'
import { useItemStore } from './lib/item-store'

const App: Component = () => {
  const items = useItemStore((state) => state.items)
  const shuffle = useItemStore((state) => state.shuffle)
  const defaultSort = useItemStore((state) => state.defaultSort)
  const selectionSort = useItemStore((state) => state.selectionSort)
  const bubbleSort = useItemStore((state) => state.bubbleSort)

  return (
    <section>
      <button onclick={() => shuffle()}>shuffle</button>
      <button onclick={() => defaultSort()}>default sort</button>
      <button onclick={() => selectionSort()}>selection sort</button>
      <button onclick={() => bubbleSort()}>bubble sort</button>

      <ul>
        <For each={items}>{(item) => <li>{item}</li>}</For>
      </ul>
    </section>
  )
}

export default App
