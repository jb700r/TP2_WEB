import { useState } from "react";
import { ICarte } from "./Carte";
import { MainPoker } from "./MainPoker";
import { ChoixUsager } from "./ChoixUsager";

export function VideoPoker() {
  const [deckId, setDeckId] = useState<string | null>(null);
  const [main, setMain] = useState<ICarte[] | null>(null);
  const [mainChoisie, setMainChoisie] = useState<ICarte[] | null>();
  const [totalMise, setTotalMise] = useState<number>(0);
  const [jeuDemarre, setJeuDemarre] = useState<boolean>(false);

  const dosCarteImage: string =
    "https://deckofcardsapi.com/static/img/back.png";

  async function demarrerJeu() {
    if (totalMise > 0) {
      setJeuDemarre(true);

      if (deckId == null) {
        const resultat = await fetch(
          "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
        );
        const resultatJson = await resultat.json();
        const deck_id: string = resultatJson.deck_id;
        setDeckId(deck_id);
        await pigerPremiereCartes(deck_id);
      } else {
        await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
        await pigerPremiereCartes(deckId);
      }
    }
  }

  async function pigerPremiereCartes(deckId: string) {
    const resultat = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=5`
    );
    const resultatJson = await resultat.json();
    console.log(resultatJson);
    const cardArray: ICarte[] = [];
    resultatJson.cards.map((card: { value: string; suit: string; image: string; }) => {
      const newCarte: ICarte = {
        value: card.value,
        suit: card.suit,
        image: card.image,
        picked: false,
      };
      cardArray.push(newCarte);
    });
    console.log(cardArray);
    setMain(cardArray)
  }

  return (
    <>
      <MainPoker cartes={main} imageDos={dosCarteImage} />
      <ChoixUsager
        jeuDemarre={jeuDemarre}
        setJeuDemarre={demarrerJeu}
        setMise={setTotalMise}
      />
    </>
  );
}
