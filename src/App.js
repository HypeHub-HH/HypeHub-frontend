import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Navbar from './components/layout/navbar/Navbar';
import { AuthProvider } from './context/AuthContext';
import UserRoutes from './utils/UserRoutes';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<UserRoutes />}>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
