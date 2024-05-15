import { useState } from 'react'
import Header from "./Header";
import './styles/App.css'
import BobaCards from './BobaCards'
// import ChatPage from './pages/ChatPage';
import { Navigate, BrowserRouter, RouterProvider, Route, Routes } from 'react-router-dom';

function App() {
  
  return (
    <div className="App">  
    <Header />
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<BobaCards />} />
        {/* <Route path="/chat" element={<ChatPage />} /> */}
      </Routes>
    </BrowserRouter>

      {/* Components can be added here, we can use css grid to design the layout of the components */}
      {/* will need design/figma pages for reference */}
      {/* added hello world to make sure the app works, feel free to remove all this code */}
      {/* To run the app on a web browser, in the terminal, type in: npn run dev*/}
      {/* To quit or stop the app from running, in the terminal, type in: q*/}

    </div>
  )
}

export default App
