import { useState } from "react";
import { ICarte } from "./Carte";
import { Main } from "./Main";
import { ChoixUsager } from "./ChoixUsager";

export function VideoPoker() {
  const [deckId, setDeckId] = useState<string>();
  const [main, setMain] = useState<ICarte[] | null>();
  const [mainChoisie, setMainChoisie] = useState<ICarte[] | null>();
  const [totalMise, setTotalMise] = useState<number>(0);
  const [jeuDemarre, setJeuDemarre] = useState<boolean>(false);
  const dosCarteImage: string =
    "https://deckofcardsapi.com/static/img/back.png";

  function demarrerJeu()
  {
    if(totalMise > 0)
    {
      setJeuDemarre(true);
    }

  }

  return (
    <>
      <Main cartes={null} imageDos={dosCarteImage} />
      <ChoixUsager jeuDemarre={jeuDemarre} setJeuDemarre={demarrerJeu} setMise={setTotalMise}/>
    </>
  );
}
