import { useState } from "react";

interface ICarteData {
  image: string;
  value: string;
}

export function Blackjack() {
  const [jeuDeCarteId, setJeuDeCarteId] = useState<string>();

  const [croupierCartes, setCroupierCartes] = useState<ICarteData[]>();

  const [joueurCartes, setJoueurCartes] = useState<ICarteData[]>();

  function recupererJeuDeCarte() {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6")
      .then((response) => response.json())
      .then((data) => setJeuDeCarteId(data.deck_id))
      .catch((error) => console.error(error));
  }

  function tirerCarte(jeuDeCarteId: string): Promise<ICarteData> {
    return fetch(
      `https://deckofcardsapi.com/api/deck/${jeuDeCarteId}/draw/?count=1`
    )
      .then((response) => response.json())
      .then((data) => {
        return {
          image: data.cards[0].image,
          value: data.cards[0].value,
        } as ICarteData;
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }

  recupererJeuDeCarte();

  if (jeuDeCarteId) {
    Promise.all([tirerCarte(jeuDeCarteId), tirerCarte(jeuDeCarteId)])
      .then((cartes) => setCroupierCartes(cartes))
      .catch((error) => console.error(error));

    Promise.all([tirerCarte(jeuDeCarteId), tirerCarte(jeuDeCarteId)])
      .then((cartes) => setJoueurCartes(cartes))
      .catch((error) => console.error(error));
  }

  console.log(croupierCartes);
  console.log(joueurCartes);
  return (
    <div>
      <h1>Blackjack</h1>
    </div>
  );
}
