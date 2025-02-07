import Accueil from "./pages/PageAccueil";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router";
import { BarreNavigation } from "./BarreNavigation";
import { Page404 } from "./pages/Page404";
import { RoutePrivee } from "./RoutePrivee";
import { Blackjack } from "./blackjack/Blackjack";
import { VideoPoker} from "./poker/VideoPoker";
import { useState } from "react";
import { Keno } from "./keno/Keno";

function App() {
  const [accountAmount, setAccountAmount] = useState<number>(() => {
    const savedAmount = localStorage.getItem("accountAmount");
    return savedAmount ? JSON.parse(savedAmount) : 100;}
  );
  localStorage.setItem("accountAmount", JSON.stringify(accountAmount));

  return (
    <BrowserRouter>
      <Container>
        <BarreNavigation accountAmount={accountAmount} setAccountAmount={setAccountAmount} />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route element={<RoutePrivee />}>
            <Route path="/blackjack" element={<Blackjack balance={accountAmount} setBalance={setAccountAmount} />} />
          </Route>
          <Route element={<RoutePrivee />}>
            <Route path="/poker" element={<VideoPoker balance={accountAmount} setBalance={setAccountAmount} />} />
          </Route>
          <Route element={<RoutePrivee />}>
            <Route path="/keno" element={<Keno balance={accountAmount} setBalance={setAccountAmount}/>} />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
