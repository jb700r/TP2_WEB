export interface ICarte {
  value: string;
  suit: string;
  image: string;
  picked: boolean;
  paid: boolean;
}

interface CarteProps {
  carte: ICarte;
  onClick: () => void;
  jeuDemarre: boolean;
  compteAction: number;
}

export function Carte(props: CarteProps) {
  return (
    <img
      src={props.carte.image}
      className={`carte carte-img ${props.carte.picked ? "picked" : ""} ${
        props.compteAction === 2 && props.carte.paid ? "paid" : ""
      }`}
      onClick={props.jeuDemarre ? props.onClick : undefined}
      style={{ pointerEvents: props.jeuDemarre ? "auto" : "none" }}
      alt="Carte"
    />
  );
}
