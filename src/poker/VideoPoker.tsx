import { useState, useEffect } from "react";
import { ICarte } from "./Carte";
import { MainPoker } from "./MainPoker";
import { ChoixUsager } from "./ChoixUsager";
import { RangMain } from "./RangMain";
import { verifierMain } from "./VerifierMain";

export function VideoPoker() {
  const [deckId, setDeckId] = useState<string | null>(null);
  const [main, setMain] = useState<ICarte[] | null>(null);
  const [totalMise, setTotalMise] = useState<number>(0);
  const [jeuDemarre, setJeuDemarre] = useState<boolean>(false);
  const [rangs, setRangs] = useState<
    { nom: string; paiement: number }[] | null
  >(null);
  const [valeurMainActuelle, setValeurMainActuelle] = useState<number>(0);
  const [compteAction, setCompteAction] = useState<number>(0);

  useEffect(() => {
    fetch("RangMain.json")
      .then((response) => response.json())
      .then((data) => setRangs(data))
      .catch((error) =>
        console.error("Erreur lors du chargement du fichier JSON:", error)
      );
  }, []);

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
    const value = verifierMain(cardArray);
    setValeurMainActuelle(value);
    setCompteAction(1);
  }

  async function pigerSecondeCartes() {
    if (main) {
      const newMain = [...main];

      for (let index = 0; index < newMain.length; index++) {
        const carte = newMain[index];

        if (!carte.picked) {
          const resultat = await fetch(
            `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
          );
          const resultatJson = await resultat.json();
          const newCard = resultatJson.cards[0];

          newMain[index] = {
            value: newCard.value,
            suit: newCard.suit,
            image: newCard.image,
            picked: false,
          };
        } else {
          newMain[index] = { ...carte, picked: !carte.picked };
        }
      }
      setMain(newMain);
      const value = verifierMain(newMain);
      setValeurMainActuelle(value);
      setCompteAction(2);
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
      <RangMain rangs={rangs} valeurMain={valeurMainActuelle} compteAction={compteAction}/>
      <MainPoker
        cartes={main}
        imageDos={dosCarteImage}
        carteCliquee={ToggleCarteSelectionnee}
        jeuDemarre={jeuDemarre}
      />
      <ChoixUsager
        jeuDemarre={jeuDemarre}
        setJeuDemarre={demarrerJeu}
        setMise={setTotalMise}
        pigerCartes={pigerSecondeCartes}
      />
    </>
  );
}
