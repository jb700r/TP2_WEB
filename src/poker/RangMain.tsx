import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export function RangMain() {
  const [rangs, setRangs] = useState<{ nom: string; paiement: number }[] | null>(null);

  useEffect(() => {
    fetch("RangMain.json")
      .then((response) => response.json())
      .then((data) => setRangs(data))
      .catch((error) => console.error("Erreur lors du chargement du fichier JSON:", error));
  }, []);

  if (!rangs) {
    return <p>Chargement des données...</p>;
  }

  return (
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
              {rangs.map((rang, index) => (
                <tr key={index}>
                  <td>{rang.nom}</td>
                  <td>{rang.paiement}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
