import { useState } from "react";
import { Button, InputGroup, Form } from "react-bootstrap";
import EnumWinner from "./EnumWinner";
import ICarteData from "./ICarteData";
import { ActionButtons } from "./ActionButtons";
import { calculateScore, tirerCarte } from "./BlackJackUtils";
import "./css/Blackjack.css";

interface IBalanceData {
  balance: number;
  setBalance: (value: number) => void;
}

export function Blackjack(props: IBalanceData) {
  const [jeuDeCarteId, setJeuDeCarteId] = useState<string>();
  const [cartesCroupier, setCartesCroupier] = useState<ICarteData[]>([]);
  const [cartesJoueur, setCartesJoueur] = useState<ICarteData[]>([]);
  const [carteCaché, setCarteCaché] = useState<boolean>(false);
  const [winner, setWinner] = useState<EnumWinner>(EnumWinner.null);
  const [isDoubled,setIsDoubled] = useState<boolean>(false);

  // const fetchBalance = () => {
  //   return props.balance;
  // };

  const setBalance = (value: number) => {
    props.setBalance(value);
  };

  const scoreMax: number = 21;

  const dosCarte: string = "https://deckofcardsapi.com/static/img/back.png";

  let scoreCroupier: number = 0;
  scoreCroupier = calculateScore(cartesCroupier);
  let scoreJoueur: number = 0;
  scoreJoueur = calculateScore(cartesJoueur);

  function recupererJeuDeCarte() {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6")
      .then((response) => response.json())
      .then((data) => setJeuDeCarteId(data.deck_id))
      .catch((error) => console.error(error));
  }

  async function shuffleDecks() {
    fetch(
      `https://deckofcardsapi.com/api/deck/${jeuDeCarteId}/shuffle/?remaining=true`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.remaining + " Cartes restantes");
        if (data.remaining < 50) {
          fetch(`https://deckofcardsapi.com/api/deck/${jeuDeCarteId}/shuffle/`);
        } else {
          setJeuDeCarteId(data.deck_id);
        }
      })
      .catch((error) => console.error(error));
  }

  async function Stay(p_isdoubled: boolean = false) {
    setCarteCaché(true);
    let carteActuelle: ICarteData[] = [...cartesCroupier];
    let scoreCroupier: number = calculateScore(carteActuelle);

    let winnings: number = mise*2;

    p_isdoubled ? winnings*=2 : winnings;


    while (scoreCroupier < 17 && jeuDeCarteId && winner == EnumWinner.null) {
      const newCard = await tirerCarte(jeuDeCarteId);
      carteActuelle.push(newCard);
      scoreCroupier = calculateScore(carteActuelle);

      setCartesCroupier(carteActuelle);

      console.log("scoreCroupier:", scoreCroupier);
      console.log("scoreJoueur:", scoreJoueur);
    }
    if ((scoreCroupier > scoreMax ) || (scoreJoueur > scoreCroupier && scoreJoueur <= scoreMax)) {
      setBalance(props.balance + winnings);
      setWinner(EnumWinner.Joueur);
    }
    else if (scoreCroupier >= 17 && scoreJoueur === scoreCroupier) {
      setBalance(props.balance + mise);
      setWinner(EnumWinner.Egalité);
    } else {
      setWinner(EnumWinner.Croupier);
    }
  }



  async function hit() {
    let carteActuelle = [...cartesJoueur];
    let scoreJoueur = calculateScore(carteActuelle);

    if (jeuDeCarteId && winner == EnumWinner.null) {
      const nouvelleCarte = await tirerCarte(jeuDeCarteId);
      carteActuelle.push(nouvelleCarte);
      scoreJoueur = calculateScore(carteActuelle);

      await setCartesJoueur([...carteActuelle]);
      if (scoreJoueur > scoreMax) {
        setWinner(EnumWinner.Croupier);
      }
    }
  }

  async function double() {
    setBalance(props.balance - mise);
    await hit();
    await Stay(true);
  }




  async function initPartie() {
    setCarteCaché(false);
    setWinner(EnumWinner.null);
    setCartesCroupier([]);
    setCartesJoueur([]);
    
    console.log("balance: "+props.balance)
    console.log("mise : " + mise)


    let btn = document.getElementById("demarrer-partie");
    jeuDeCarteId ? await shuffleDecks() : await recupererJeuDeCarte();
    btn!.textContent = "Clicker pour tirer les cartes";

    if (jeuDeCarteId) {
      btn!.style.display = "none";
      const newCartesCroupier: ICarteData[] = [];
      const newCartesJoueur: ICarteData[] = [];

      setBalance(props.balance - mise);

      for (let i = 0; i < 2; i++) {
        const carteCroupier = await tirerCarte(jeuDeCarteId);
        newCartesCroupier.push(carteCroupier);

        const carteJoueur = await tirerCarte(jeuDeCarteId);
        newCartesJoueur.push(carteJoueur);
      }
      setCartesCroupier(newCartesCroupier);
      setCartesJoueur(newCartesJoueur);

      let jeu = document.getElementById("jeu");
      jeu!.style.display = "";
      let actions = document.getElementById("actions");
      actions!.style.display = "";
    }
  }

  const [mise, setMise] = useState<number>(0);
  return (
    <>
      <div id="bj">
        <h1>Blackjack</h1>
        <br></br>
        <InputGroup className="mb-3 w-25 mx-auto">
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control
            id="mise"
            type="number"
            onChange={(e) => {
              setMise(Number(e.currentTarget.value));
            }}
            aria-label="Entrez votre mise"
          />
        </InputGroup>
        <Button
          id="demarrer-partie"
          onClick={() => {
            initPartie();
          }}
        >
          Démarrer partie
        </Button>
        <div id="jeu" style={{ display: "none" }}>
          <div>
            <h2>Croupier</h2>
            <div>
              {cartesCroupier.map((carte, index) =>
                index === 0 ? (
                  <img
                    key={index}
                    src={carte.image}
                    alt={carte.value}
                    height={"auto"}
                    width={"150px"}
                    className="mx-2"
                  />
                ) : (
                  <img
                    key={index}
                    src={carteCaché ? carte.image : dosCarte}
                    alt={carteCaché ? carte.value : "Hidden Card"}
                    height={"auto"}
                    width={"150px"}
                    className="mx-2"
                  />
                )
              )}
            </div>
            <p>Score: {carteCaché ? calculateScore(cartesCroupier) : "?"}</p>
          </div>

          <div>
            <h2>Joueur</h2>
            <div>
              {cartesJoueur.map((carte, index) => (
                <img
                  key={index}
                  src={carte.image}
                  alt={carte.value}
                  height={"auto"}
                  width={"150px"}
                  className="mx-2"
                />
              ))}
            </div>
            <p>Score: {calculateScore(cartesJoueur)}</p>
          </div>
          {jeuDeCarteId && (
            <ActionButtons
              winner={winner}
              scoreMax={scoreMax}
              scoreJoueur={scoreJoueur}
              jeuDeCarteId={jeuDeCarteId}
              cartesJoueur={cartesJoueur}
              cartesCroupier={cartesCroupier}
              setCartesJoueur={setCartesJoueur}
              setCartesCroupier={setCartesCroupier}
              setCarteCaché={setCarteCaché}
              setWinner={setWinner}
              initPartie={initPartie}
              stay={Stay}
              hit={hit}
              double={double}
            />
          )}
        </div>
      </div>
    </>
  );
}
