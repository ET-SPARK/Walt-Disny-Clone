import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Login from './components/Login';
import Header from './components/Header';
import Home from './components/Home';
import Detail from './components/Detail';
import Trailer from './components/Trailer';
import Play from './components/Play';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/play" element={<Play />} />
        </Routes>
        <Routes>
          <Route path="/detail/:id" element={<Trailer />} />
        </Routes>
        <Routes>
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
