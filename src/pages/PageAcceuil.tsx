import { useAuth0 } from "@auth0/auth0-react";
import { Container } from "react-bootstrap";

function Acceuil() {
  const { isAuthenticated, user } = useAuth0();
  if (isAuthenticated) {
    return (
      <Container>
        <h1>Page Acceuil</h1>
        <p>
          Bonjour <strong>{user?.name}</strong>, vous êtes connecté.
        </p>
      </Container>
    );
  } else {
    return (
      <Container>
        <h1>Page Acceuil</h1>
        <p>Veuillez vous connecter pour accéder à tout le site</p>
      </Container>
    );
  }
}

export default Acceuil;
