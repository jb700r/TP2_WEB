import { useState } from "react";
import { Button } from "react-bootstrap";

interface ICarteData {
  image: string;
  value: string;
}

export function Blackjack() {
  const [jeuDeCarteId, setJeuDeCarteId] = useState<string>();
  const [cartesCroupier, setCartesCroupier] = useState<ICarteData[]>([]);
  const [cartesJoueur, setCartesJoueur] = useState<ICarteData[]>([]);
  const [carteCaché, setCarteCaché] = useState<boolean>(false);
  const [winner, setWinner] = useState<boolean>(null);

  const scoreMax: number = 21;

  const dosCarte: string = "https://deckofcardsapi.com/static/img/back.png";

  let scoreCroupier: number = 0;
  cartesCroupier.map((carte) => {
    if (
      carte.value === "KING" ||
      carte.value === "QUEEN" ||
      carte.value === "JACK"
    ) {
      scoreCroupier += 10;
    } else if (carte.value === "ACE") {
      if (scoreCroupier + 11 > scoreMax) {
        scoreCroupier += 1;
      } else {
        scoreCroupier += 11;
      }
    } else {
      scoreCroupier += parseInt(carte.value);
    }
  });
  let scoreJoueur: number = 0;
  cartesCroupier.map((carte) => {
    if (
      carte.value === "KING" ||
      carte.value === "QUEEN" ||
      carte.value === "JACK"
    ) {
      scoreCroupier += 10;
    } else if (carte.value === "ACE") {
      if (scoreCroupier + 11 > scoreMax) {
        scoreCroupier += 1;
      } else {
        scoreCroupier += 11;
      }
    } else {
      scoreCroupier += parseInt(carte.value);
    }
  });

  function recupererJeuDeCarte() {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6")
      .then((response) => response.json())
      .then((data) => setJeuDeCarteId(data.deck_id))
      .catch((error) => console.error(error));
  }

  async function tirerCarte(jeuDeCarteId: string): Promise<ICarteData> {
    try {
      const response = await fetch(
        `https://deckofcardsapi.com/api/deck/${jeuDeCarteId}/draw/?count=1`
      );
      const data = await response.json();
      return {
        image: data.cards[0].image,
        value: data.cards[0].value,
      } as ICarteData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  function calculateScore(cartes: ICarteData[]): number {
    let score = 0;
    let aces = 0;

    cartes.forEach((carte) => {
      if (["KING", "QUEEN", "JACK"].includes(carte.value)) {
        score += 10;
      } else if (carte.value === "ACE") {
        aces++;
      } else {
        score += parseInt(carte.value);
      }
    });

    // Handle Aces (1 or 11)
    for (let i = 0; i < aces; i++) {
      if (score + 11 > 21) {
        score += 1;
      } else {
        score += 11;
      }
    }

    return score;
  }

  return (
    <div>
      <h1>Blackjack</h1>
      <Button
        id="demarrer-partie"
        onClick={async () => {
          let btn = document.getElementById("demarrer-partie");
          await recupererJeuDeCarte();
          btn!.textContent = "Clicker pour tirer les cartes";

          if (jeuDeCarteId) {
            btn!.style.display = "none";
            const newCartesCroupier: ICarteData[] = [];
            const newCartesJoueur: ICarteData[] = [];
            for (let i = 0; i < 2; i++) {
              const carteCroupier = await tirerCarte(jeuDeCarteId);
              newCartesCroupier.push(carteCroupier);

              const carteJoueur = await tirerCarte(jeuDeCarteId);
              newCartesJoueur.push(carteJoueur);
            }
            setCartesCroupier(newCartesCroupier);
            setCartesJoueur(newCartesJoueur);

            let jeu = document.getElementById("jeu");
            jeu!.style.display = "";
            let actions = document.getElementById("actions");
            actions!.style.display = "";
          }
        }}
      >
        Démarrer partie
      </Button>
      <div id="jeu" style={{ display: "none" }}>
        <div>
          <h2>Croupier</h2>
          <div>
            {cartesCroupier.map((carte, index) =>
              index === 0 ? (
                <img key={index} src={carte.image} alt={carte.value} />
              ) : (
                <img
                  key={index}
                  src={carteCaché ? carte.image : dosCarte}
                  alt={carteCaché ? carte.value : "Hidden Card"}
                />
              )
            )}
          </div>
          <p>Score: {carteCaché ? calculateScore(cartesCroupier) : "?"}</p>
        </div>

        <div>
          <h2>Joueur</h2>
          <div>
            {cartesJoueur.map((carte, index) => (
              <img key={index} src={carte.image} alt={carte.value} />
            ))}
          </div>
          <p>Score: {calculateScore(cartesJoueur)}</p>
        </div>
        <div id="actions" style={{ display: "none" }}>
          <Button
            variant="success"
            className="m-4"
            onClick={async () => {
              let carteActuelle = [...cartesJoueur];
              let scoreJoueur = calculateScore(carteActuelle);

              if (jeuDeCarteId && winner == null) {
                const nouvelleCarte = await tirerCarte(jeuDeCarteId);
                carteActuelle.push(nouvelleCarte);
                scoreJoueur = calculateScore(carteActuelle);

                await setCartesJoueur([...carteActuelle]);
                scoreJoueur > scoreMax ? setWinner(false) : null;
                if (scoreCroupier > scoreJoueur && scoreCroupier <= scoreMax) {
                  setWinner(false);
                }
              }
            }}
          >
            Hit
          </Button>
          <Button
            variant="danger"
            className="m-4"
            onClick={async () => {
              setCarteCaché(true);
              let carteActuelle = [...cartesCroupier];
              let scoreCroupier = calculateScore(carteActuelle);

              while (scoreCroupier < 17 && jeuDeCarteId && winner == null) {
                const newCard = await tirerCarte(jeuDeCarteId);
                carteActuelle.push(newCard);
                scoreCroupier = calculateScore(carteActuelle);

                setCartesCroupier([...carteActuelle]);

                if (scoreCroupier > scoreJoueur && scoreCroupier <= scoreMax) {
                  setWinner(false);
                }
              }
            }}
          >
            Stay
          </Button>
        </div>
        <div>
          <Button onClick={() => window.location.reload()}>Reset</Button>
        </div>
      </div>
    </div>
  );
}
