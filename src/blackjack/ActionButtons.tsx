import { Button } from "react-bootstrap";
import EnumWinner from "./EnumWinner";
import ICarteData from "./ICarteData";
import { calculateScore, tirerCarte } from "./BlackJackUtils";

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
            let carteActuelle = [...props.cartesJoueur];
            let scoreJoueur = calculateScore(carteActuelle);

            if (props.jeuDeCarteId && props.winner == EnumWinner.null) {
              const nouvelleCarte = await tirerCarte(props.jeuDeCarteId);
              carteActuelle.push(nouvelleCarte);
              scoreJoueur = calculateScore(carteActuelle);

              await props.setCartesJoueur([...carteActuelle]);
              if (scoreJoueur > props.scoreMax) {
                props.setWinner(EnumWinner.Croupier);
              }
            }
          }}
        >
          Hit
        </Button>
        <Button
          variant="danger"
          className={props.winner != EnumWinner.null ? "m-4 disabled" : "m-4 "}
          onClick={async () => {
            props.setCarteCaché(true);
            let carteActuelle = [...props.cartesCroupier];
            let scoreCroupier = calculateScore(carteActuelle);

            while (
              scoreCroupier < 17 &&
              props.jeuDeCarteId &&
              props.winner == EnumWinner.null
            ) {
              const newCard = await tirerCarte(props.jeuDeCarteId);
              carteActuelle.push(newCard);
              scoreCroupier = calculateScore(carteActuelle);

              props.setCartesCroupier([...carteActuelle]);

              console.log("scoreCroupier:", scoreCroupier);
              console.log("scoreJoueur:", props.scoreJoueur);
            }
            if (scoreCroupier > props.scoreMax) {
              props.setWinner(EnumWinner.Joueur);
            } else if (
              props.scoreJoueur > scoreCroupier &&
              props.scoreJoueur <= props.scoreMax
            ) {
              props.setWinner(EnumWinner.Joueur);
            } else if (
              scoreCroupier >= 17 &&
              props.scoreJoueur === scoreCroupier
            ) {
              props.setWinner(EnumWinner.Egalité);
            } else {
              props.setWinner(EnumWinner.Croupier);
            }
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
