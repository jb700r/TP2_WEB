import { useState } from "react";
import { TableauNombres } from "./TableauNombres";
import { ChoixUsager } from "./ChoixUsager";
import { Info } from "../poker/Info";
import { INombreKeno } from "./NombreKeno";
import { TableauPaiement } from "./TableauPaiement";
import { low, medium, high } from "./Data";
import { PayoutTable } from "./Data";

interface KenoProps {
  balance: number;
  setBalance: (value: number) => void;
}

export function Keno(props: KenoProps) {
  const [nombresKeno, setNombresKeno] = useState<INombreKeno[]>(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      value: i + 1,
      isSelected: false,
      className: "",
    }));
  });

  const [jeuDemarre, setJeuDemarre] = useState<boolean>(false);
  const [mise, setMise] = useState<number>(0);
  const [infoTexte, setInfoTexte] = useState<string>("");
  const [infovisible, setInfoVisible] = useState<boolean>(false);
  const [infoErreur, setInfoErreur] = useState<boolean>(false);
  const [difficulte, setDifficulte] = useState<string>("low");
  const [nombreChiffreChoisi, setNombreChiffreChoisi] = useState<number>(0);
  const [nombreWinner, setNombreWinner] = useState<number>(Infinity);

  function resetClasses(keno: INombreKeno[]) {
    return keno.map((n) => ({
      ...n,
      className: n.isSelected ? "active" : "",
    }));
  }

  function demarrerJeu() {
    const nombresSelectionnes = nombresKeno.filter((n) => n.isSelected);
    if (mise > 0 && mise <= props.balance) {
      if (nombresSelectionnes.length > 0) {
        props.setBalance(props.balance - mise);
        setJeuDemarre(true);
        setInfoVisible(false);
        setNombreWinner(Infinity);
        const tableauReset = resetClasses(nombresKeno);
        setNombresKeno(tableauReset);

        setTimeout(() => {
          genererNombreAleatoire(tableauReset);
        }, 500);
      } else {
        afficherMessage("Choisissez au moins 1 nombre!", true);
      }
    } else {
      afficherMessage("Mise non valide. Veuillez réessayer.", true);
    }
  }

  function genererNombreAleatoire(currentKeno: INombreKeno[]) {
    const nombresUniques: number[] = [];
    while (nombresUniques.length < 10) {
      const nombre = Math.floor(Math.random() * 40) + 1;
      if (!nombresUniques.includes(nombre)) {
        nombresUniques.push(nombre);
      }
    }
    afficherResultats(nombresUniques, currentKeno);
  }

  function afficherResultats(
    nombresAleatoires: number[],
    currentKeno: INombreKeno[]
  ) {
    let delay = 0;
    let updatedKeno = [...currentKeno];

    nombresAleatoires.forEach((randomNumber, index) => {
      setTimeout(() => {
        updatedKeno = updatedKeno.map((n) =>
          n.value === randomNumber
            ? { ...n, className: n.isSelected ? "winner" : "loser" }
            : n
        );
        setNombresKeno(updatedKeno);

        if (index === nombresAleatoires.length - 1) {
          setTimeout(() => {
            montrerGain(updatedKeno);
          }, 200);
        }
      }, delay);

      delay += 250;
    });
  }

  function montrerGain(updatedKeno: INombreKeno[]): void {
    const countWinners = updatedKeno.filter(
      (n) => n.isSelected && n.className === "winner"
    ).length;
  
    let data: PayoutTable | null = null;
    if (difficulte === "low") {
      data = low;
    } else if (difficulte === "medium") {
      data = medium;
    } else if (difficulte === "high") {
      data = high;
    }
  
    if (data && data[nombreChiffreChoisi] && data[nombreChiffreChoisi][countWinners] !== undefined) {
      const gain = (mise * data[nombreChiffreChoisi][countWinners]) - mise;
      const nouvelleBalance = props.balance + gain;
      props.setBalance(nouvelleBalance);
    }
  
    setJeuDemarre(false);
    setNombreWinner(countWinners);
  }
  

  function toggleNombreListe(nombre: INombreKeno) {
    setInfoVisible(false);
    if (jeuDemarre) {
      afficherMessage("Attendez la prochaine partie!", true);
      return;
    }
    setNombreWinner(Infinity);
    const resetKeno = resetClasses(nombresKeno);

    const updatedKeno = resetKeno.map((n) =>
      n.value === nombre.value
        ? {
            ...n,
            isSelected: !n.isSelected,
            className: !n.isSelected ? "active" : "",
          }
        : n
    );
    const countSelected = updatedKeno.filter((n) => n.isSelected).length;
    if (countSelected <= 10) {
      setNombresKeno(updatedKeno);
      setNombreChiffreChoisi(countSelected);
    } else {
      afficherMessage("La limite de 10 chiffres est atteinte!", true);
    }
  }

  function afficherMessage(message: string, isError: boolean) {
    setInfoTexte(message);
    setInfoVisible(true);
    setInfoErreur(isError);
  }

  return (
    <>
      <TableauNombres nombresKeno={nombresKeno} onClick={toggleNombreListe} />
      <ChoixUsager
        setMise={setMise}
        setJeu={demarrerJeu}
        jeuDemarre={jeuDemarre}
        setDifficulte={setDifficulte}
        setNombreWinner={setNombreWinner}
      />
      <Info text={infoTexte} visible={infovisible} error={infoErreur} />
      <TableauPaiement
        difficulte={difficulte}
        nombreChiffreChoisi={nombreChiffreChoisi}
        nombreWinner={nombreWinner}
      />
    </>
  );
}
