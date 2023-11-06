import { Route, Routes } from 'react-router-dom';
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
import OtherAccount from './pages/OtherAccount';

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
          <Route path="/account/:accountId/settings" element={<div>ustawienia konta</div>} />
          <Route path="/account/:accountId/items" element={<Items />} />
          <Route path="/account/:accountId/items/:itemId" element={<Item />} />
          <Route path="/account/:accountId/items/addNewItem" element={<AddItem />} />
          <Route path="/account/:accountId/outfits" element={<div>wchodzimy na nasze outfity do edycji</div>} />
          <Route path="/account/:accountId/outfits/:outfitId" element={<div>wchodzimy na nasz utfit do edycji</div>} />
          <Route path="/account/:accountId" element={<OtherAccount />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
