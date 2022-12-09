import './style.css'
import solutions from './03'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h1>Solutions</h1>
  <p>${await solutions.solve02()}</p>
`
