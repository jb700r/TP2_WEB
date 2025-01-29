export interface ICarte {
    value: string;
    suit: string;
    image: string;
    picked: boolean;
}

interface CarteProps {
    carte: ICarte;
    onClick: () => void;
}

export function Carte(props: CarteProps) {
    return (
      <img
        src={props.carte.image}
        className={`carte ${props.carte.picked ? "picked" : ""}`}
        onClick={props.onClick}
      />
    );
  }