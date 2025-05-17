//main game logic/functions goes here 
const { select, input } = require('@inquirer/prompts');
const { quizQuestions } = require('./questions')

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
      await startGame();
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