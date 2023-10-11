import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";

function App() {
  return <>
  <Routes>
    <Route path="/" element={<Landing/>}/>
    <Route path="/tbd" element={<Home/>}/>
  </Routes>
  </>;
}

export default App;
