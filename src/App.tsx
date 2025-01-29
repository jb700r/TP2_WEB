import Accueil from "./pages/PageAccueil";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router";
import { BarreNavigation } from "./BarreNavigation";
import { Page404 } from "./pages/Page404";
import { RoutePrivee } from "./RoutePrivee";
import { Blackjack } from "./blackjack/Blackjack";
import { VideoPoker} from "./poker/VideoPoker";

function App() {
  return (
    <BrowserRouter>
      <Container>
        <BarreNavigation />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route element={<RoutePrivee />}>
            <Route path="/blackjack" element={<Blackjack />} />
          </Route>
          <Route element={<RoutePrivee />}>
            <Route path="/poker" element={<VideoPoker />} />
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
