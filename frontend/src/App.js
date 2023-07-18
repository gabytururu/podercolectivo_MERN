import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from '../src/components/Navbar'
import Home from '../src/pages/Home'
import QuejasSector from '../src/pages/QuejasSector'
import QuejasCompany from '../src/pages/QuejasCompany'
import NewQueja from '../src/pages/NewQueja'
import Footer from '../src/components/Footer'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/sector/:sector" element={<QuejasSector/>}/>
          <Route path="/:sector/:nombreComercial" element={<QuejasCompany/>}/>
          <Route path="/poner-queja" element={<NewQueja/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>

    </div>
  );
}

export default App;
