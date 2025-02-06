import { useState } from "react";
import { TableauNombres } from "./TableauNombres";
import { ChoixUsager } from "./ChoixUsager";

export function Keno() {
  const [chiffresChoisisActuellement, setChiffresChoisisActuellement] = useState<number[]>([]);
  const [jeuCommence, setJeuCommence] = useState<boolean>(false);
  const [maxAtteint, setMaxAtteint] = useState<boolean>(false);
  const [mise, setMise] = useState<number>(0);

    function demarrerJeu()
    {
        setJeuCommence(true);
    }

  function toggleNombreListe(nombre: number) {
    setChiffresChoisisActuellement((prevChiffres) => {
      if (prevChiffres.length >= 10 && !prevChiffres.includes(nombre)) {
        setMaxAtteint(true);
        return prevChiffres;
      }

      if (prevChiffres.includes(nombre)) {
        const newChiffres = prevChiffres.filter((num) => num !== nombre);
        setMaxAtteint(newChiffres.length >= 10);
        return newChiffres;
      } else {
        const newChiffres = [...prevChiffres, nombre];
        setMaxAtteint(newChiffres.length >= 10);
        return newChiffres;
      }
    });
  }

  return (
    <>
      <TableauNombres onclick={toggleNombreListe} jeuCommence={jeuCommence} maxAtteint={maxAtteint} />
      <ChoixUsager setMise={setMise} setJeu={demarrerJeu}/>
      <div>
        <h3>Chiffres Choisis Actuellement:</h3>
        <p>{maxAtteint ? "La limite de 10 chiffres est atteinte!" : ""}</p>
      </div>
    </>
  );
}
