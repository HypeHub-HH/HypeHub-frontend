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
import Wardrobe from './pages/Wardrobe';
import Outfits from './pages/Outfits';
import Outfit from './pages/Outfit';
import Settings from './pages/Settings';
import AddOutfit from './pages/AddOutfit';

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
          <Route path="/account/:accountId/settings" element={<Settings />} />
          <Route path="/account/:accountId/items" element={<Items />} />
          <Route path="/account/:accountId/items/:itemId" element={<Item />} />
          <Route path="/account/:accountId/items/addNewItem" element={<AddItem />} />
          <Route path="/account/:accountId/outfits" element={<Outfits />} />
          <Route path="/account/:accountId/outfits/:outfitId" element={<Outfit />} />
          <Route path="/account/:accountId/outfits/addNewOutfit" element={<AddOutfit />} />
          <Route path="/account/:accountId" element={<Wardrobe />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
