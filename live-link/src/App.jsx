
import './App.css'
import MainMenu from './components/MainMenu'
import Chat from './components/Chat'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>

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
