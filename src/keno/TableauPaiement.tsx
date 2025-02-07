import { Container, Row, Col, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { low, medium, high } from "./Data";

interface TableauPaiementProps {
  difficulte: string;
  nombreChiffreChoisi: number;
  nombreWinner: number;
}

export function TableauPaiement(props: TableauPaiementProps) {
  const { difficulte, nombreChiffreChoisi, nombreWinner } = props;

  let data;
  if (difficulte === "low") {
    data = low;
  } else if (difficulte === "medium") {
    data = medium;
  } else if (difficulte === "high") {
    data = high;
  }

  const nombreRow = [];
  const payoutRow = [];

  for (let i = 1; i <= nombreChiffreChoisi; i++) {
    const isWinner = i === nombreWinner;

    nombreRow.push(
      <th
        key={`nombre-${i}`}
        className={`text-center ${isWinner ? "custom-success" : ""}`}
      >
        {i}
      </th>
    );

    payoutRow.push(
      <td
        key={`payout-${i}`}
        className={`text-center ${isWinner ? "custom-success" : ""}`}
      >
        {data?.[nombreChiffreChoisi]?.[i] !== undefined
          ? data[nombreChiffreChoisi][i]
          : "0"}
      </td>
    );
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <Table bordered responsive className="text-center w-100">
            <thead>
              <tr>
                <th>Nombre</th>
                {nombreRow}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Paiement (x mise)</td>
                {payoutRow}
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
