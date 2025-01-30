import { useState } from "react";
import { ICarte } from "./Carte";
import { MainPoker } from "./MainPoker";
import { ChoixUsager } from "./ChoixUsager";
import { RangMain } from "./RangMain";

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
        pigerPremiereCartes(deck_id);
      } else {
        await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
        pigerPremiereCartes(deckId);
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
    resultatJson.cards.map(
      (card: { value: string; suit: string; image: string }) => {
        const newCarte: ICarte = {
          value: card.value,
          suit: card.suit,
          image: card.image,
          picked: false,
        };
        cardArray.push(newCarte);
      }
    );
    setMain(cardArray);
  }

  async function pigerSecondeCartes() {
    if (main) {
      // Créer une copie de l'état principal des cartes
      const newMain = await Promise.all(
        main.map(async (carte) => {
          if (!carte.picked) {
            const resultat = await fetch(
              `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
            );
            const resultatJson = await resultat.json();
            const newCard = resultatJson.cards[0];
  
            return {
              value: newCard.value,
              suit: newCard.suit,
              image: newCard.image,
              picked: false, 
            };
          } else {
            return { ...carte, picked: !carte.picked };
          }
        })
      );
      setMain(newMain);
    }
    setJeuDemarre(false);
  }
  
  
  
  function ToggleCarteSelectionnee(index: number) {
    if (main) {
      const newMain = [...main];  
      newMain[index] = { ...newMain[index], picked: !newMain[index].picked };
      setMain(newMain);
    }
  }

  return (
    <>
      <RangMain/>
      <MainPoker cartes={main} imageDos={dosCarteImage} carteCliquee={ToggleCarteSelectionnee} jeuDemarre={jeuDemarre}/>
      <ChoixUsager
        jeuDemarre={jeuDemarre}
        setJeuDemarre={demarrerJeu}
        setMise={setTotalMise}
        pigerCartes={pigerSecondeCartes}
      />
    </>
  );
}
