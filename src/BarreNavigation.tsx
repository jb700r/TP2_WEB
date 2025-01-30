import { useAuth0 } from "@auth0/auth0-react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Plus } from "lucide-react";

interface INavigationProps {
  accountAmount: number;
  setAccountAmount: (value: number) => void;
}

export function BarreNavigation(props: INavigationProps) {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  
  const handleClick = () => {
    props.setAccountAmount(props.accountAmount + 100);
  };


  return (
    <Navbar bg="light" expand="sm">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Navbar.Brand href="/">Accueil</Navbar.Brand>

          {isAuthenticated && (
            <>
              <Navbar.Brand href="/blackjack">blackjack</Navbar.Brand>
              <Navbar.Brand href="/poker">poker</Navbar.Brand>
              <Navbar.Brand href="/keno">keno</Navbar.Brand>
            </>
          )}
        </Nav>
        <Nav className="ms-auto">
          {isAuthenticated ? (
            <Navbar.Brand>
              <Button
                variant="success mr-2"
                onClick={handleClick}
              >
                <span className="font-semibold">Amount: ${props.accountAmount}</span>
                <Plus className="ml-2" />
              </Button>
              <Button variant="primary" onClick={() => logout()}>
                Deconnexion
              </Button>
            </Navbar.Brand>
          ) : (
            <Navbar.Brand>
              <Button variant="primary" onClick={() => loginWithRedirect()}>
                Connexion
              </Button>
            </Navbar.Brand>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
