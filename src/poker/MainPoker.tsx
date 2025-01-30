import { ICarte } from "./Carte";
import { Carte } from "./Carte";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface MainPokerProps {
  cartes: ICarte[] | null;
  imageDos: string | null;
  carteCliquee: (index: number) => void;
  jeuDemarre : boolean;
}

export function MainPoker(props: MainPokerProps) {
  return (
    <Container className="mt-4">
      <Row className="row justify-content-center d-flex flex-nowrap" style={{ minHeight: '210px' }}>
        {(props.cartes
          ? props.cartes.map((carte, index) => (
              <Col key={index} className="col-auto">
                <Carte carte={carte} onClick={() => props.carteCliquee(index)} jeuDemarre={props.jeuDemarre} />
              </Col>
            ))
          : Array.from({ length: 5 }).map((_, index) => (
              <Col key={index} className="col-auto">
                <img
                  src={props.imageDos || "default-back.png"}
                  alt="Dos de carte"
                  className="carte-img"
                />
              </Col>
            ))
        )}
      </Row>
    </Container>
  );
}
