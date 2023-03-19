import { Component, createSignal, For } from 'solid-js'

const [items, setItems] = createSignal(
  Array.from({ length: 10 }, (_, k) => k + 1)
)

const shuffle = () => {
  const copy = structuredClone(items())
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

  setItems(copy)
}

const defaultSort = () => {
  const copy: Array<number> = structuredClone(items())
  const result = copy.sort((a, b) => a - b)

  setItems(result)
}

const selectionSort = async () => {
  const copy: Array<number> = structuredClone(items())
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
  }

  setItems(copy)
}

const App: Component = () => {
  return (
    <section>
      <button onclick={() => shuffle()}>shuffle</button>
      <button onclick={() => defaultSort()}>default sort</button>
      <button onclick={async () => await selectionSort()}>
        selection sort
      </button>

      <ul>
        <For each={items()}>{(item) => <li>{item}</li>}</For>
      </ul>
    </section>
  )
}

export default App
