import { Button } from "react-bootstrap";
import EnumWinner from "./EnumWinner";
import ICarteData from "./ICarteData";

interface ActionBoutonProps {
  winner: EnumWinner;
  scoreJoueur: number;
  scoreMax: number;
  jeuDeCarteId: string;
  cartesJoueur: ICarteData[];
  cartesCroupier: ICarteData[];
  setCartesJoueur: (cartes: ICarteData[]) => void;
  setCartesCroupier: (cartes: ICarteData[]) => void;
  setCarteCaché: (carteCaché: boolean) => void;
  setWinner: (winner: EnumWinner) => void;
  initPartie: () => void;
  stay: () => void;
  hit: () => void;
}

export function ActionButtons(props: ActionBoutonProps) {
  return (
    <>
      <div id="actions" style={{ display: "none" }}>
        <Button
          variant="success"
          className={
            props.winner != EnumWinner.null ||
            props.scoreJoueur == props.scoreMax
              ? "m-4 disabled"
              : "m-4 "
          }
          onClick={async () => {
            props.hit();
          }}
        >
          Hit
        </Button>
        <Button
          variant="danger"
          className={props.winner != EnumWinner.null ? "m-4 disabled" : "m-4 "}
          onClick={async () => {
            props.stay();
          }}
        >
          Stay
        </Button>
      </div>
      <div>
        <Button onClick={() => props.initPartie()}>Reset</Button>
        <h1>{EnumWinner[props.winner]}</h1>
      </div>
    </>
  );
}
