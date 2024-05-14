import { useState } from 'react'
import Header from "./Header";
import './styles/App.css'
import BobaCards from './BobaCards'
import { Route, Routes } from "react-router-dom"
import ChatPage from './pages/ChatPage';

function App() {


  return (
    <div className="App">
      {/* shall we use the BEM naming convention for this project? Yes*/}
      <Header />
      <div className="routes">
        <Routes>
          {/*<Route path="/profile" element={<></>}/>*/}
          {/* <Route path="/" element={<></>}/>*/}
          <Route path="/chats" element={<ChatPage />} />
        </Routes>
      </div>
      {/* Components can be added here, we can use css grid to design the layout of the components */}
      {/* will need design/figma pages for reference */}
      {/* added hello world to make sure the app works, feel free to remove all this code */}
      {/* To run the app on a web browser, in the terminal, type in: npn run dev*/}
      {/* To quit or stop the app from running, in the terminal, type in: q*/}

      <BobaCards />
    </div>
  )
}

export default App
