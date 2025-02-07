import { useAuth0 } from "@auth0/auth0-react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

function Accueil() {
  const { isAuthenticated, user, loginWithRedirect } = useAuth0();

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Bienvenue sur Skibid Casino 🎲</h1>

      {isAuthenticated ? (
        <p className="text-center">
          Bonjour <strong>{user?.name}</strong>, vous êtes connecté et prêt à jouer !
        </p>
      ) : (
        <div className="text-center mb-4">
          <p>Veuillez vous connecter pour accéder à tout le site.</p>
          <Button variant="primary" onClick={() => loginWithRedirect()}>
            Se connecter
          </Button>
        </div>
      )}

      <Row className="mt-4 justify-content-center">
        <Col md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>🃏 Poker & Blackjack</Card.Title>
              <Card.Text>
                Améliorez vos compétences stratégiques avec nos jeux de cartes classiques.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>🎯 Keno</Card.Title>
              <Card.Text>
                Découvrez des jeux comme le Keno pour varier les plaisirs et développer de nouvelles stratégies.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <footer className="text-center mt-5">
        <p>
          Skibidi Casino est le <strong>meilleur casino en ligne</strong> pour vous
          entraîner aux jeux classiques de casino, sans risque et avec un maximum de fun !
        </p>
      </footer>
    </Container>
  );
}

export default Accueil;
