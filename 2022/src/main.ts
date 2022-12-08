import './style.css'
import solutions from './02'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h1>Solutions</h1>
  <p>01-1: ${await solutions.solve01()}</p>
  <p>01-2: ${await solutions.solve02()}</p>
`
