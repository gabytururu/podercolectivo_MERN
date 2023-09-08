import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from '../src/components/Navbar/Navbar'
import Home from '../src/pages/Home/Home'
import QuejasSector from '../src/pages/QuejasSector/QuejasSector'
import QuejasCompany from '../src/pages/QuejasCompany/QuejasCompany'
import NewQueja from '../src/pages/NewQueja/NewQueja'
import Footer from '../src/components/Footer/Footer'
import QuejasSectoresComplete from './pages/QuejasSector/QuejasSectoresComplete'
import QuejasCompaniesComplete from './pages/QuejasCompany/QuejasCompaniesComplete'
import SumQuejasSector from './components/QuejasFormats/SumQuejasSector'
import SumQuejasCompany from './components/QuejasFormats/SumQuejasCompany'
import ScrollToTop from './Scroll'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ScrollToTop/>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/sectores" element={<QuejasSectoresComplete/>}/>
          <Route path="/empresas" element={<QuejasCompaniesComplete/>}/>
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
