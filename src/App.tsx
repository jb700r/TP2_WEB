import Acceuil from "./pages/PageAcceuil";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router";
import { BarreNavigation } from "./BarreNavigation";
import { Page404 } from "./pages/Page404";
import { RoutePrivee } from "./RoutePrivee";
import { Blackjack } from "./blackjack/Blackjack";
import { VideoPokerJeu } from "./poker/VideoPokerJeu";

function App() {
  return (
    <BrowserRouter>
      <Container>
        <BarreNavigation />
        <Routes>
          <Route path="/" element={<Acceuil />} />
          <Route element={<RoutePrivee />}>
            <Route path="/blackjack" element={<Blackjack />} />
          </Route>
          <Route element={<RoutePrivee />}>
            <Route path="/poker" element={<VideoPokerJeu />} />
          </Route>
          <Route element={<RoutePrivee />}>
            <Route path="/keno" element={<h1>Page Keno</h1>} />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
