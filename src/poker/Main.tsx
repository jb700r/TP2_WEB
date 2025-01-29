import { ICarte } from "./Carte";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface MainProps {
  cartes: ICarte[] | null;
  imageDos: string | null;
}

export function Main(props: MainProps) {
  return (
    <Container>
      <Row className="row justify-content-center d-flex flex-nowrap">
        {(props.cartes ?? Array.from({ length: 5 })).map((carte, index) => (
          <Col key={index} className="col-auto">
            <img
              src={
                props.cartes
                  ? carte.image
                  : props.imageDos || "default-back.png"
              }
              className="img-fluid carte-img"
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
