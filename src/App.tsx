import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import NewProject from './pages/NewProject'
import ConfigureFlightcase from './pages/ConfigureFlightcase'
import RackBuilder from './pages/RackBuilder'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/nuevo-proyecto' element={<NewProject />} />
      <Route path='/nuevo-proyecto/flightcase' element={<ConfigureFlightcase />} />
      <Route path='/rack-builder' element={<RackBuilder />} />
    </Routes>
  )
}

export default App