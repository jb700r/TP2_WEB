import { useAuth0 } from "@auth0/auth0-react";
import { Navbar, Nav, Button } from "react-bootstrap";

export const BarreNavigation = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <Navbar bg="light" expand="sm">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Navbar.Brand href="/">Accueil</Navbar.Brand>

          {isAuthenticated ? (
            <>
              <Navbar.Brand href="/blackjack">blackjack</Navbar.Brand>
              <Navbar.Brand href="/poker">poker</Navbar.Brand>
              <Navbar.Brand href="/keno">keno</Navbar.Brand>
              <Navbar.Brand>
                <Button onClick={() => logout()}>Deconnexion</Button>
              </Navbar.Brand>
            </>
          ) : (
            <Navbar.Brand>
              <Button onClick={() => loginWithRedirect()}>Connexion</Button>
            </Navbar.Brand>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
