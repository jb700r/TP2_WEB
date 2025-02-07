import { Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { INombreKeno, NombreKeno } from "./NombreKeno";

interface TableauNombresProps {
  nombresKeno: INombreKeno[];
  onClick: (nombre: INombreKeno) => void;
}

export function TableauNombres(props: TableauNombresProps) {
  const rows = [];
  for (let rowIndex = 0; rowIndex < 5; rowIndex++) {
    const cols = [];

    for (let colIndex = 0; colIndex < 8; colIndex++) {
      const index = rowIndex * 8 + colIndex;
      const nombre = props.nombresKeno[index];

      if (nombre) {
        cols.push(
          <NombreKeno
            key={nombre.value}
            nombre={nombre}
            onClick={() => props.onClick(nombre)}
          />
        );
      }
    }

    rows.push(
      <Row
        key={rowIndex}
        className="justify-content-center"
        style={{ gap: "8px" }}
      >
        {cols}
      </Row>
    );
  }

  return <Container className="mt-4 container-custom">{rows}</Container>;
}
