import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';
import AuthorizedRoutes from './utils/AuthorizedRoutes.js';
import UnAuthorizedRoutes from './utils/UnAuthorizedRoutes.js';
import Containter from './components/layout/Container.jsx';
import Items from './pages/Items';
import Item from './pages/Item';
import AddItem from './pages/AddItem';
import LatestOutfits from './pages/LatestOutfits';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <UnAuthorizedRoutes>
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
          <Route path="/explore" element={<LatestOutfits />} />
          <Route path="/{username}/settings" element={<div>ustawienia konta</div>} />
          <Route path="/myItems" element={<Items />} />
          <Route path="/myItems/:itemId" element={<Item />} />
          <Route path="/myItems/addNewItem" element={<AddItem />} />
          <Route path="/{username}/myItems/{iditemu}" element={<div>wchodzimy na nasz item do edycji</div>} />
          <Route path="/{username}/items" element={<div>wchodzimy na itemy innego uzytkownika</div>} />
          <Route path="/{username}/items/{iditemu}" element={<div>wchodzimy na item innego uzytkownika</div>} />
          <Route path="/{username}/myOutfits" element={<div>wchodzimy na nasze outfity do edycji</div>} />
          <Route path="/{username}/myOutfits/{idoutfitu}" element={<div>wchodzimy na nasz utfit do edycji</div>} />
          <Route path="/:accountId/outfits" element={<div>wchodzimy na outfity innego uzytkownika</div>} />
          <Route path="/outfits/:outfitId" element={<div>wchodzimy na outfit innego uzytkownika</div>} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
