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

const App: Component = () => {
  return (
    <section>
      <button onclick={() => shuffle()}>shuffle</button>
      <button onclick={() => defaultSort()}>default sort</button>
      <ul>
        <For each={items()}>{(item) => <li>{item}</li>}</For>
      </ul>
    </section>
  )
}

export default App
