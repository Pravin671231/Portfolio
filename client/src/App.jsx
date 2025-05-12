
import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Projects from './pages/Projects'
import About from './pages/About'

function App() {

  return (
   <>
   <nav>
    <Link to="/" >Home</Link>
    <Link to="/about" >About</Link>
    <Link to="/projects" >Projects</Link>
    <Link to="/contact" >Contact</Link>
   </nav>

   <hr />

   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/projects' element={<Projects/>}/>
    <Route path='/contact' element={<Contact/>}/>
   </Routes>
   
   </>
  )
}

export default App
