import logo from './logo.svg';
import './App.css';
import Frontpage from './components/Frontpage';
import WeatherPage from './components/WeatherPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Frontpage/>}/>
      <Route path='/weather/:id' element={<WeatherPage/>}/>
    </Routes>
    </BrowserRouter>



  );
}

export default App;
