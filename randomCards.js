function randomcard() {
  const suite = randomSuite();
  const cardValue = randomCardIndex();
  return cardValue + suite;
}

function randomCardIndex() {
  const cardIndex = Math.floor(Math.random() * 100) % 13 + 1;
  switch (cardIndex) {
    case 11: return "J";
    case 12: return "Q";
    case 13: return "K";
    case 1: return "A";
    default: return cardIndex;
  }
}
function randomSuite() {
  const cardIndex = Math.floor(Math.random() * 100) % 4 + 1;
  switch (cardIndex) {
    case 1: return " ♠️ (SPADE)";
    case 2: return " ♣️ (CLUB)";
    case 3: return " ❤️ (HEART)";
    case 4: return " ♦️ (DIAMOND)";
  }
}

function cardSet(number) {
  const set =[];
  for (let index = 1; index <= number; index++) {
    set.push(randomcard())
  }
  return set.join("\n")
}

const cards = prompt("ENTER HOW MANY CARDS DO YOU WANT")

console.log(cardSet(cards));
