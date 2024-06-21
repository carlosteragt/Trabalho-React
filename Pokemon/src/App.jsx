import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Comparar from './pages/Comparar';


const App = () => {
  return (
    <Router>
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/comparar" element={<Comparar />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
