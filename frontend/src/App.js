import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from '../src/components/Navbar/Navbar'
import Home from '../src/pages/Home/Home'
import QuejasSector from '../src/pages/QuejasSector/QuejasSector'
import QuejasCompany from '../src/pages/QuejasCompany/QuejasCompany'
import QuejasGiro from './pages/QuejasGiro/QuejasGiro'
import NewQueja from '../src/pages/NewQueja/NewQueja'
import Footer from '../src/components/Footer/Footer'
import QuejasSectoresComplete from './pages/QuejasSector/QuejasSectoresComplete'
import QuejasCompaniesComplete from './pages/QuejasCompany/QuejasCompaniesComplete'
import QuejasGiroComplete from './pages/QuejasGiro/QuejasGiroComplete'
import SumQuejasSector from './components/QuejasFormats/SumQuejasSector'
import SumQuejasCompany from './components/QuejasFormats/SumQuejasCompany'
import ScrollToTop from './components/Scroll'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/sectores" element={<QuejasSectoresComplete/>}/>
          <Route path="/empresas" element={<QuejasCompaniesComplete/>}/>
          <Route path="/giro" element={<QuejasGiroComplete/>}/>
          <Route path="/giro/:giroParamUrl" element={<QuejasGiro/>}/>
          <Route path="/sector/:sectorParamUrl" element={<QuejasSector/>}/>
          <Route path="/empresa/:nombreComercialParamUrl" element={<QuejasCompany/>}/>
          <Route path="/poner-queja" element={<NewQueja/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
