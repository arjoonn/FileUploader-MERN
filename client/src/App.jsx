import './App.css'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Homepage from './Homepage'
import Viewfile from './Viewfile'

function App() {
  
  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Homepage/>}></Route>
              <Route path='/viewfile' element={<Viewfile/>}></Route>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
