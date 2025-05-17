const chalk = require("chalk");
const { select, input } = require('@inquirer/prompts');
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

let timeUp = false

async function startQuiz(quizQuestions, userAnswers) {
  timeUp = false
  const timerId = setTimeLimit(); 
  for (const object of quizQuestions) {
    if(timeUp === true) { //if time limit has been reached, stops giving questions
      break;
    } else {
      const answer = await input({ message: object.question }); //displays question
      userAnswers.push(answer) //pushes the users input to an empty array 
    }
  }
  clearTimeout(timerId) //stops timer if all questions have been answered
  updateStats(userAnswers,quizQuestions,quizStats)
  await showMainMenu(quizQuestions,userAnswers,quizStats)
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
  let missedQuestions = quizStats.missed
  console.log(chalk.white("Missed Questions:"))
  for(const object of missedQuestions) {
    console.log(chalk.white(`Question: ${object.question}, Correct answer: ${object.answer} `))
  }
}

function resetStats(quizStats,userAnswers) {
  quizStats.stats = { Correct: 0, Incorrect: 0 };
  quizStats.missed = []
  userAnswers.length = 0;
}

function setTimeLimit() { //sets a 5min timer for the quiz
    return setTimeout(()=>{
      console.log(chalk.red("You have reached the time limit for this quiz, calculating scores now..."));
      console.log(chalk.blue("Press Enter to return to main menu"))
      timeUp = true;
    },300000);
}

module.exports = { showMainMenu };