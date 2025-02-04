import { useState, useEffect } from "react";
import { ICarte } from "./Carte";
import { MainPoker } from "./MainPoker";
import { ChoixUsager } from "./ChoixUsager";
import { RangMain } from "./RangMain";
import { verifierMain } from "./VerifierMain";
import { Info } from "./Info";

interface VideoPokerProps {
  balance: number;
  setBalance: (value: number) => void;
}

export function VideoPoker(props: VideoPokerProps) {
  const [deckId, setDeckId] = useState<string | null>(null);
  const [main, setMain] = useState<ICarte[] | null>(null);
  const [totalMise, setTotalMise] = useState<number>(0);
  const [jeuDemarre, setJeuDemarre] = useState<boolean>(false);
  const [rangs, setRangs] = useState<
    { nom: string; paiement: number }[] | null
  >(null);
  const [valeurMainActuelle, setValeurMainActuelle] = useState<number>(0);
  const [compteAction, setCompteAction] = useState<number>(0);
  const [infoTexte, setInfoTexte] = useState<string>("");
  const [infovisible, setInfoVisible] = useState<boolean>(false);
  const [infoErreur, setInfoErreur] = useState<boolean>(false);

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
    if (totalMise > 0 && totalMise <= props.balance) {
      setJeuDemarre(true);
      props.setBalance(props.balance - totalMise);

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
    } else {
      setInfoTexte("Mise non valide. Veuillez réessayer.");
      setInfoVisible(true);
      setInfoErreur(true);
    }
  }

  async function pigerPremiereCartes(deckId: string) {
    setInfoVisible(false);
    const resultat = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=5`
    );
    const resultatJson = await resultat.json();
    const cardArray: ICarte[] = [];
    resultatJson.cards.map(
      (card: { value: string; suit: string; image: string }) => {
        const newCarte: ICarte = {
          value: card.value,
          suit: card.suit,
          image: card.image,
          picked: false,
          paid: false,
        };
        cardArray.push(newCarte);
      }
    );
    setMain(cardArray);
    const value = verifierMain(cardArray, setMain);
    setValeurMainActuelle(value);
    setCompteAction(1);
  }

  async function pigerSecondeCartes() {
    setJeuDemarre(false);

    if (main) {
      const newMain = [...main];

      const cartesAPiger = newMain.filter((carte) => !carte.picked).length;

      if (cartesAPiger > 0) {
        const resultat = await fetch(
          `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${cartesAPiger}`
        );
        const resultatJson = await resultat.json();
        const nouvellesCartes = resultatJson.cards;

        let indexNouvelleCarte = 0;
        for (let index = 0; index < newMain.length; index++) {
          if (!newMain[index].picked) {
            const newCard = nouvellesCartes[indexNouvelleCarte++];
            newMain[index] = {
              value: newCard.value,
              suit: newCard.suit,
              image: newCard.image,
              picked: false,
              paid: false,
            };
          } else {
            newMain[index] = {
              ...newMain[index],
              picked: !newMain[index].picked,
            };
          }
        }
      } else {
        for (let index = 0; index < newMain.length; index++) {
          newMain[index] = {
            ...newMain[index],
            picked: !newMain[index].picked,
          };
        }
      }
      setMain(newMain);
      const value = verifierMain(newMain, setMain);
      props.setBalance(props.balance + totalMise * value);
      setValeurMainActuelle(value);

      if (value != 0) {
        setInfoTexte("Félicitation! Vous remportez " + totalMise * value + "$");
        setInfoErreur(false);
        setInfoVisible(true);
      }

      setCompteAction(2);
    }
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
      <RangMain
        rangs={rangs}
        valeurMain={valeurMainActuelle}
        compteAction={compteAction}
      />
      <MainPoker
        cartes={main}
        imageDos={dosCarteImage}
        carteCliquee={ToggleCarteSelectionnee}
        jeuDemarre={jeuDemarre}
        compteAction={compteAction}
      />
      <ChoixUsager
        jeuDemarre={jeuDemarre}
        setJeuDemarre={demarrerJeu}
        setMise={setTotalMise}
        pigerCartes={pigerSecondeCartes}
      />

      <Info text={infoTexte} visible={infovisible} error={infoErreur} />
    </>
  );
}
