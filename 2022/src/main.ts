import './style.css'
import answer01 from './01'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h1>Answers</h1>
  <p>01-1: ${await answer01.solve01()}</p>
  <p>01-2: ${await answer01.solve02()}</p>
`
