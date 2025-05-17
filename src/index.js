//main game logic/functions goes here 
const { select, input } = require('@inquirer/prompts');
const { quizQuestions } = require('./questions')
const { quizStats, userAnswers } = require('./stats')

async function showMainMenu() {
  const action = await select({
    message: "Main Menu",
    choices: [
      { name: "Start Quiz", value: "start" },
      { name: "Check Scores", value: "stats"},
      { name: "Quit", value: "quit"},
    ]
  });

  switch (action) {
    case "start":
      await startQuiz(quizQuestions,userAnswers);
      break;
    case "stats":
      showStats();
      await select({ message: "Press Enter to go back", choices: [{ name: "Back", value: "back" }] });
      showMainMenu();
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