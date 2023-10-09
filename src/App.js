import { Container, Typography } from "@mui/material";
import Navbar from "./components/Navbar";
import JoinBanner from "./components/JoinBanner";
import MainBanner from "./components/MainBanner";

function App() {
  return (
    <>
      <Navbar />
      <Container>
        <JoinBanner/>
        <MainBanner/>
      </Container>
    </>
  );
}

export default App;
