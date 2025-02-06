import { useState } from "react";
import { Button, InputGroup, FormControl, Container } from "react-bootstrap";

interface ChoixUsagerProps {
  setMise: (value : number) => void;
  setJeu: () => void;
}

export function ChoixUsager(props: ChoixUsagerProps) {
  return (
    <Container className="d-flex flex-column align-items-center m-4">
      <InputGroup className="mb-3" style={{ maxWidth: "300px" }}>
        <InputGroup.Text>$</InputGroup.Text>
        <FormControl
          type="number"
          onChange={(e) => props.setMise(Number(e.target.value))}
          min="0"
          placeholder="0"
          //disabled={props.jeuDemarre}
        />
      </InputGroup>

      <Button
        variant="primary"
        onClick={props.setJeu}
        //disabled={mise <= 0} // Désactive le bouton si la mise est 0 ou négative
      >
        Démarrer le jeu
      </Button>
    </Container>
  );
}
