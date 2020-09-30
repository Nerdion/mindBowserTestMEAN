const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

process.env.SECRET_KEY = 'secret'

const ApplicationController = require('../controller/applicationController')
applicationController = new ApplicationController()

//retrieves all the employee
router.get('/', (req,res)=> applicationController.getAllEmployees(req,res))

//adds a new employee
router.post('/',(req,res) => applicationController.addEmloyee(req,res))

//updates a particular employee
router.put('/:id', async (req,res)=> applicationController.updateEmloyee(req,res))

//delete a particular employee
router.delete('/:id', (req,res)=> applicationController.deleteEmployee(req,res))

// registers a new manager
router.post('/register', (req,res) => applicationController.registerManager(req,res))

// logs in a new manager
router.post('/login', (req,res) => applicationController.loginManager(req,res))

module.exports = router
