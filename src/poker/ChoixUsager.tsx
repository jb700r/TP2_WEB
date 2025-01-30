import {
  Container,
  Row,
  Col,
  InputGroup,
  Button,
  FormControl,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface ChoixUsagerProps {
  jeuDemarre: boolean;
  setJeuDemarre: () => void;
  setMise: (mise: number) => void;
  pigerCartes: () => void;
}

export function ChoixUsager(props: ChoixUsagerProps) {
  return (
    <Container className="mt-4">
      <Row className="mb-3 justify-content-center">
        <Col md={2}>
          <InputGroup>
            <InputGroup.Text>Mise</InputGroup.Text>
            <FormControl
              type="number"
              onChange={(e) => props.setMise(Number(e.target.value))}
              min="0"
              placeholder="0"
              disabled={props.jeuDemarre}
            />
          </InputGroup>
        </Col>
      </Row>

      <Row className="mb-3 justify-content-center">
        <Col md={3}>
          <Button
            variant="primary"
            className="w-100"
            onClick={props.pigerCartes}
            disabled={!props.jeuDemarre}
          >
            Prochaine ronde
          </Button>
        </Col>

        <Col md={3}>
          <Button
            variant="success"
            className="w-100"
            onClick={props.setJeuDemarre}
            disabled={props.jeuDemarre}
          >
            Démarrer le jeu
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
