export interface ICarte {
    value: string;
    suit: string;
    image: string;
    picked: boolean;
}

interface CarteProps {
    carte: ICarte;
    onClick: () => void;
    jeuDemarre: boolean;
}

export function Carte(props: CarteProps) {
  console.log(props.jeuDemarre); 
  
  return (
    <img
      src={props.carte.image}
      className={`carte carte-img ${props.carte.picked ? "picked" : ""}`}
      onClick={props.jeuDemarre ? props.onClick : undefined}
      style={{ pointerEvents: props.jeuDemarre ? 'auto' : 'none' }}
      alt="Carte"
    />
  );
}
