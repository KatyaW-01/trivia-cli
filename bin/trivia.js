#!/usr/bin/env node
//const { program } = require('commander')
const { quizQuestions } = require('../src/questions')
const { quizStats, userAnswers } = require('../src/stats')
const { showMainMenu } = require('../src/index')

showMainMenu(quizQuestions,userAnswers,quizStats)
//program.parse(process.argv);