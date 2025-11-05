console.clear();
const grid = ["⬜️", "⬜️", "⬜️", "⬜️", "⬜️", "⬜️", "⬜️", "⬜️", "⬜️"];
console.log(["⬜️1", "⬜️2", "⬜️3", "⬜️4", "⬜️5", "⬜️6", "⬜️7", "⬜️8", "⬜️9"]);

function gameBegin() {
  const name1 = prompt("ENTER 1st PLAYER NAME  :  ").toUpperCase();
  console.log("\n\t\t" + name1 + " !! IS GRANTED THE SYMBOL ⭕️\n");

  const name2 = prompt("ENTER 2nd PLAYER NAME  :  ").toUpperCase();
  console.log("\n\t\t" + name2 + " !! IS GRANTED THE SYMBOL ❌\n");
  console.log(grid);
  return mainPlay(name1, name2);
}

function mainPlay(name1, name2, turns = 9) {
  let placeChoosen = prompt(name1 + " ENTER THE POSITION FROM 1 TO 9");
  while (grid[placeChoosen - 1] !== "⬜️") {
    console.log("\n\t\tINVALID POSITION  (PLACE ALREADY OCCUPIED)");
    placeChoosen = prompt(name1 + " ENTER THE POSITION FROM 1 TO 9");
  }
  console.clear();
  fillGrid(placeChoosen, "⭕️");
  console.log(grid);
  if (whoWon(grid, name1, name2) !== "none") {
    return console.log(displayMessage(whoWon(grid, name1, name2)));
  }
  if (turns === 1) {
    return console.log("DAMN ITS A TIE ! LOOKS LIKE YOU FOUND A WORTHY OPPONENT  !!");
  }
  placeChoosen = prompt(name2 + " ENTER THE POSITION FROM 1 TO 9");
  while (grid[placeChoosen - 1] !== "⬜️") {
    console.log("\n\t\tINVALID POSITION  (PLACE ALREADY OCCUPIED)");
    placeChoosen = prompt(name1 + " ENTER THE POSITION FROM 1 TO 9");
  }
  console.clear();
  fillGrid(placeChoosen, "❌");
  console.log(grid);
  if (whoWon(grid, name1, name2) !== "none") {
    return console.log(displayMessage(whoWon(grid, name1, name2)));
  }
  return mainPlay(name1, name2, turns - 2)
}

function fillGrid(place, symbol) {
  grid[place - 1] = symbol;
  return grid;
}

function whoWon(grid, name1, name2) {
  for (let index = 0; index < 9; index = index + 3) {
    if (grid[index] !== "⬜️" && grid[index] === grid[index + 1] && grid[index + 1] === grid[index + 2]) {
      return grid[index] === "⭕️" ? name1 : name2;
    }
  }
  for (let index = 0; index < 3; index++) {
    if (grid[index] !== "⬜️" && grid[index] === grid[index + 3] && grid[index + 3] === grid[index + 6]) {
      return grid[index] === "⭕️" ? name1 : name2;
    }
  }
  if (grid[4] !== "⬜️" && grid[0] === grid[4] && grid[4] === grid[8]) {
    return grid[0] === "⭕️" ? name1 : name2;
  }
  if (grid[4] !== "⬜️" && grid[2] === grid[4] && grid[4] === grid[6]) {
    return grid[0] === "⭕️" ? name1 : name2;
  }

  return "none";
}

function displayMessage(wonPlayer) {
  if (wonPlayer === "none") {
    return "TOO BAD !!! ITS A TIE WELL PLAYED"
  }
  return "\n\t\tCONGRATS !!!!! " + wonPlayer + ": Won the MATCH BRUTALLY !!!!";
}

gameBegin();
