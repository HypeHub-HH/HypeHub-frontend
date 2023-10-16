import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import PrivateRoutes from './utils/PrivateRoutes';
import Navbar from './components/layout/navbar/Navbar';

function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/tbd" element={<Home />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/tbd2" />
          <Route path="/tbd3" />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
