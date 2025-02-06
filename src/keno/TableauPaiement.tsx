import { Container, Row, Col, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export function TableauPaiement()
{
    <Container className="mt-4">
    <Row>
      <Col>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Paiement (x la mise)</th>
            </tr>
          </thead>
          <tbody>
            {props.rangs.map((rang) => {
              let highlightClass = "";
              if (rang.paiement === props.valeurMain) {
                if (props.compteAction === 1) {
                  highlightClass = "table-warning";
                } else if (props.compteAction === 2) {
                  highlightClass = "table-primary";
                }
              }


              return (
                <tr key={rang.paiement} className={highlightClass}>
                  <td>{rang.nom}</td>
                  <td>{rang.paiement}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Col>
    </Row>
  </Container>
}