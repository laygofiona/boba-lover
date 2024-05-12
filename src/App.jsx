import { useState } from 'react'
import './styles/App.css'
import BobaCards from './BobaCards'

function App() {


  return (
    <div className="App">
      {/* Components can be added here, we can use css grid to design the layout of the components */}
      {/* will need design/figma pages for reference */}
      {/* added hello world to make sure the app works, feel free to remove all this code */}
      {/* To run the app on a web browser, in the terminal, type in: npn run dev*/}
      {/* To quit or stop the app from running, in the terminal, type in: q*/}
      <p>Hello World</p>

      <BobaCards />
    </div>
  )
}

export default App
