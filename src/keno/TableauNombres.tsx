import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface TableauNombresProps {
  onclick: (nombre: number) => void;
  jeuCommence: boolean;
  maxAtteint: boolean;
}

export function TableauNombres(props: TableauNombresProps) {
  const rows = [];
  let number = 1;

  const handleClick = (value: number, event: React.MouseEvent) => {
    if (props.jeuCommence) {
      return;
    }
    const tile = event.currentTarget;
    if (props.maxAtteint && !tile.classList.contains("active")) {
      return;
    }
    tile.classList.toggle("active");
    props.onclick(value);
  };

  for (let rowIndex = 0; rowIndex < 5; rowIndex++) {
    const cols = [];
    for (let colIndex = 0; colIndex < 8; colIndex++) {
      const value = number;
      cols.push(
        <Col
          key={value}
          xs={4}
          sm={3}
          md={2}
          lg={1}
          className="tile m-2"
          onClick={(event) => handleClick(value, event)}
        >
          {number}
        </Col>
      );
      number++;
    }
    rows.push(
      <Row
        key={rowIndex}
        className="mt-2 mb-2 justify-content-center"
        style={{ flexWrap: "wrap" }}
      >
        {cols}
      </Row>
    );
  }

  return <Container className="mt-4 container-custom">{rows}</Container>;
}
