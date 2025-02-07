import {
  Button,
  InputGroup,
  FormControl,
  Container,
  Row,
  Col,
  FormSelect,
} from "react-bootstrap";

interface ChoixUsagerProps {
  setMise: (value: number) => void;
  setJeu: () => void;
  jeuDemarre: boolean;
  setDifficulte: (value: string) => void;
  setNombreWinner : (value : number) =>void;
}
export function ChoixUsager(props: ChoixUsagerProps) {
  return (
    <Container className="mt-4">
      <Row className="mb-2 justify-content-center">
        <Col md={3}>
          <InputGroup className="mb-3">
            <InputGroup.Text>$</InputGroup.Text>
            <FormControl
              type="number"
              onChange={(e) => props.setMise(Number(e.target.value))}
              min="0"
              placeholder="0"
              disabled={props.jeuDemarre}
            />
          </InputGroup>
        </Col>
        <Col md={3}>
          <FormSelect
            onChange={(e) => {props.setDifficulte(e.target.value);
              props.setNombreWinner(0)}
            }
            disabled={props.jeuDemarre}
            defaultValue="low"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </FormSelect>
        </Col>
      </Row>
      <Button
        variant="primary"
        onClick={props.setJeu}
        disabled={props.jeuDemarre}
        className="mb-4"
      >
        Démarrer le jeu
      </Button>
    </Container>
  );
}
