import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import NavbarUnAuthorized from './components/layout/navbar/NavbarUnAuthorized';
import { AuthProvider } from './context/AuthContext';
import AuthorizedRoutes from './utils/AuthorizedRoutes.js';
import UnAuthorizedRoutes from './utils/UnAuthorizedRoutes.js';
import Containter from './components/layout/Container.jsx';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <UnAuthorizedRoutes>
              <NavbarUnAuthorized />
              <Landing />
            </UnAuthorizedRoutes>
          }
        ></Route>

        <Route
          element={
            <AuthorizedRoutes>
              <Containter />
            </AuthorizedRoutes>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/test" element={<div>test</div>} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
