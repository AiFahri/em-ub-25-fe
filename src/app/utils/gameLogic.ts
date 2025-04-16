export type Choice = 'rock' | 'paper' | 'scissors';
export type Result = 'win' | 'lose';

let roundCount = 0;

export function getBotChoice(userChoice: Choice): Choice {
  roundCount++;

  if (roundCount <= 2) {
    return forceBotToWin(userChoice);
  }

  if (roundCount === 3) {
    return forceBotToLose(userChoice);
  }

  return randomBotChoiceAvoidDraw(userChoice);
}

export function determineResult(user: Choice, bot: Choice): Result {
  if ((user === 'rock' && bot === 'scissors') || (user === 'paper' && bot === 'rock') || (user === 'scissors' && bot === 'paper')) {
    return 'win';
  }

  return 'lose';
}

function forceBotToWin(user: Choice): Choice {
  switch (user) {
    case 'rock':
      return 'paper';
    case 'paper':
      return 'scissors';
    case 'scissors':
      return 'rock';
  }
}

function forceBotToLose(user: Choice): Choice {
  switch (user) {
    case 'rock':
      return 'scissors';
    case 'paper':
      return 'rock';
    case 'scissors':
      return 'paper';
  }
}

function randomBotChoiceAvoidDraw(userChoice: Choice): Choice {
  const choices: Choice[] = ['rock', 'paper', 'scissors'];
  const filtered = choices.filter((c) => c !== userChoice);
  return filtered[Math.floor(Math.random() * filtered.length)];
}
