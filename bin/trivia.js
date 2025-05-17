#!/usr/bin/env node
const { quizQuestions } = require('../src/questions')
const { quizStats, userAnswers } = require('../src/stats')
const { showMainMenu } = require('../src/index')

showMainMenu(quizQuestions,userAnswers,quizStats)