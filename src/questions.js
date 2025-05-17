const quizQuestions = [
  {question: "How many toes do cats typically have on their front paws?", answer: 5},
  {question: "What is the name of the cat in Alice in Wonderland?", answer: "The Cheshire Cat"},
  {question: "When was the first cat video recorded?", answer: 1894},
  {question: "What is the term for a group of kittens?", answer: "A litter"}
]

module.exports = { quizQuestions } //need to use this because package.json doesnt have type: module which would allow for export const quizQuestions and then import {quizQuestions} from filepath