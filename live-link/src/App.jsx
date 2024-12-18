
import './App.css'
import Navbar from './components/Navbar'
import MainMenu from './components/MainMenu'
import Chat from './components/Chat'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { socket } from './socket'

function App() {
  return (
    <>
      {/* <Navbar /> */}

      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={
            <MainMenu />
          } />

          <Route exact path='/chat' element={
            <Chat />
          } />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
