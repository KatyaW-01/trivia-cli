//main game logic/functions goes here 
const chalk = require("chalk");
const { select, input } = require('@inquirer/prompts');
//const { quizQuestions } = require('./questions')
//const { quizStats, userAnswers } = require('./stats')
const { quizStats } = require('./stats')

async function showMainMenu(quizQuestions,userAnswers,quizStats) {
  const action = await select({
    message: "Main Menu",
    choices: [
      { name: "Start Quiz", value: "start" },
      { name: "Check Scores", value: "stats"},
      { name: "Reset Scores", value: "reset"},
      { name: "Quit", value: "quit"},
    ]
  });

  switch (action) {
    case "start":
      await startQuiz(quizQuestions,userAnswers);
      break;
    case "stats":
      displayStats(quizStats);
      await select({ message: "Press Enter to go back", choices: [{ name: "Back", value: "back" }] });
      showMainMenu(quizQuestions,userAnswers,quizStats);
      break;
    case "reset":
      resetStats(quizStats,userAnswers);
      console.log(chalk.magenta("Stats have been reset."));
      await showMainMenu(quizQuestions,userAnswers,quizStats);
      break;
    case "quit":
      console.log("Goodbye!");
      process.exit(0);
  }
}

async function startQuiz(quizQuestions, userAnswers) {
  for (const object of quizQuestions) {
    const answer = await input({ message: object.question }); //displays question
    userAnswers.push(answer) //pushes the users input to an empty array
  }

  updateStats(userAnswers,quizQuestions,quizStats)
  showMainMenu(quizQuestions,userAnswers,quizStats)
}

function updateStats(userAnswers,quizQuestions,quizStats) {
  for (let i = 0; i < quizQuestions.length; i++) {
    const quizAnswer = String(quizQuestions[i].answer).trim().toLowerCase();
    const userAnswer =  String(userAnswers[i]).trim().toLowerCase();

    if(quizAnswer === userAnswer) {
      quizStats.stats.Correct += 1;
    } else {
      quizStats.stats.Incorrect +=1
      quizStats.missed.push(quizQuestions[i])
    }
  }
}

function displayStats(quizStats) {
  console.log(chalk.blue("Quiz Score"));
  console.log(chalk.green(`Number Correct: ${quizStats.stats.Correct}`))
  console.log(chalk.red(`Number Incorrect: ${quizStats.stats.Incorrect}`))
  console.log(chalk.white(`Missed Questions: ${quizStats.missed}`))
}

function resetStats(quizStats,userAnswers) {
  quizStats.stats = { Correct: 0, Incorrect: 0 };
  quizStats.missed = []
  userAnswers.length = 0;
}

module.exports = { showMainMenu };