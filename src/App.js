import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
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
          <Route path="/explore" element={<div>latest outfits</div>} />
          <Route path="/{username}/settings" element={<div>ustawienia naszego konta</div>} />
          <Route path="/{username}/myitems" element={<div>wchodzimy na nasze itemy do edycji</div>} />
          <Route path="/{username}/myitems/{iditemu}" element={<div>wchodzimy na nasz item do edycji</div>} />
          <Route path="/{username}/items" element={<div>wchodzimy na itemy innego uzytkownika</div>} />
          <Route path="/{username}/items/{iditemu}" element={<div>wchodzimy na item innego uzytkownika</div>} />
          <Route path="/{username}/myoutfits" element={<div>wchodzimy na nasze outfity do edycji</div>} />
          <Route path="/{username}/myoutfits/{idoutfitu}" element={<div>wchodzimy na nasz utfit do edycji</div>} />
          <Route path="/{username}/outfits" element={<div>wchodzimy na outfity innego uzytkownika</div>} />
          <Route path="/{username}/outfits/{idoutfitu}" element={<div>wchodzimy na outfit innego uzytkownika</div>} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
