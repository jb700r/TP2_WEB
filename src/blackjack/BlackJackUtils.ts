import ICarteData from "./ICarteData";


export function calculateScore(cartes: ICarteData[]): number {
    let score = 0;
    let aceCount = 0;

    for (const card of cartes) {
      if (card.value === "ACE") {
        score += 11;
        aceCount += 1;
      } else if (["KING", "QUEEN", "JACK"].includes(card.value)) {
        score += 10;
      } else {
        score += parseInt(card.value);
      }
    }

    while (score > 21 && aceCount > 0) {
      score -= 10;
      aceCount -= 1;
    }

    return score;
  }

export async function tirerCarte(jeuDeCarteId: string): Promise<ICarteData> {
    try {
      const response = await fetch(
        `https://deckofcardsapi.com/api/deck/${jeuDeCarteId}/draw/?count=1`
      );
      const data = await response.json();
      return {
        image: data.cards[0].image,
        value: data.cards[0].value,
      } as ICarteData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

 