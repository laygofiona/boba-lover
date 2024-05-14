import { useState } from 'react'
import Header from "./Header";
import './styles/App.css'
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import { Route, Routes } from "react-router-dom"
import ChatsList from './pages/ChatsList'

function App() {


  return (
    <div className="App">
      {/* shall we use the BEM naming convention for this project? Yes*/}
      <Header />
      <div className="routes">
        <Routes>
          <Route path="/profile" element={<ProfilePage />}/>
          <Route path="/" element={<HomePage />}/>
          <Route path="/chats" element={<ChatsList />} />
        </Routes>
      </div>
      {/* Components can be added here, we can use css grid to design the layout of the components */}
      {/* will need design/figma pages for reference */}
      {/* added hello world to make sure the app works, feel free to remove all this code */}
      {/* To run the app on a web browser, in the terminal, type in: npn run dev*/}
      {/* To quit or stop the app from running, in the terminal, type in: q*/}

    </div>
  )
}

export default App
