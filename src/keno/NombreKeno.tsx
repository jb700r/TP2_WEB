import { Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export interface INombreKeno {
  isSelected: boolean;
  value: number;
  className: string;
}

interface NombreKenoProps {
  nombre: INombreKeno;
  onClick: () => void;
}

export function NombreKeno(props: NombreKenoProps) {
  return (
    <Col
      key={props.nombre.value}
      xs={1}
      className={`tile ${props.nombre.className} m-2`}
      onClick={props.onClick}
      style={{ textAlign: "center", padding: "10px" }}
    >
      {props.nombre.value}
    </Col>
  );
}
