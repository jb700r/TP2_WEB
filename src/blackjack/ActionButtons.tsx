import { Button } from "react-bootstrap";
import EnumWinner from "./EnumWinner";
import ICarteData from "./ICarteData";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

interface ActionBoutonProps {
  winner: EnumWinner;
  scoreJoueur: number;
  scoreMax: number;
  jeuDeCarteId: string;
  cartesJoueur: ICarteData[];
  cartesCroupier: ICarteData[];
  mise: number;
  setCartesJoueur: (cartes: ICarteData[]) => void;
  setCartesCroupier: (cartes: ICarteData[]) => void;
  setCarteCaché: (carteCaché: boolean) => void;
  setWinner: (winner: EnumWinner) => void;
  initPartie: () => void;
  stay: () => void;
  hit: () => void;
  // double: () => void;
}
interface proptest {
  mise: number;
  initPartie: () => void;
}

function PopupExample(props: proptest) {
  return (
    <Popup trigger={<Button> Replay</Button>} position="top center" mouseLeaveDelay={100} mouseEnterDelay={0} on="hover">
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>Replay with the same bet?</div>
        <div style={{ display: "flex", justifyContent: "center" }}>Current bet: {props.mise}</div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={() => props.initPartie()}>Replay</Button>
        </div>
      </div>
      
    </Popup>
  );
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
        {/* <Button
          variant="warning"
          className={props.winner != EnumWinner.null ? "m-4 disabled" : "m-4 "}
          onClick={async () => {
            props.double();
          }}
        >
          Double
        </Button> */}
        {/* <Button onClick={() => props.initPartie()}>Replay</Button> */}
      </div>
      <div>
        <PopupExample mise={props.mise} initPartie={props.initPartie} />

        <h1>
          {EnumWinner[props.winner] == "null" ? "" : EnumWinner[props.winner]}
        </h1>
      </div>
    </>
  );
}
