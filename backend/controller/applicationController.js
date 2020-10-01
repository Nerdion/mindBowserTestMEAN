
const Employee = require('../models/index.model')
const Manager = require('../models/manager.model')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

process.env.SECRET_KEY = 'secret'

module.exports =  class ApplicationController {
    constructor() {}

    async registerManager(req,res) {
        manager = new Manager({
            email:req.body.email,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            password:req.body.password,
            address:req.body.address,
            dob:new Date(),
            company:req.body.company,
        })
        
        let ifUserExists = await Manager.findOne({
            email: req.body.email
        })
        
        if(!ifUserExists) {
            await bcrypt.hash(req.body.password, 10, async (err,hash) => {
                manager.password = hash
                try {
                    await Manager.create(manager)
                    res.json({Success:true, message:'User created'})
                } catch(e) {
                    res.json({Success:false, message:e})
                }
            })
        } else {
            res.json({Success:false, message:'User already exists'})
        }
    }

    async verifyManager(token, res) {
        try {
            let decoded = jwt.verify(token, process.env.SECRET_KEY)
            let reAuth = await Manager.findOne({_id:decoded._id})

            if(!reAuth) {
                res.json({Success:false, message:'Not authorised'})
                return false
            }
            return decoded._id
        } catch(e) {
            res.json({Success:false, message:'Not authorised, malformed key, no session'})
            return false
        }
    }

    async loginManager(req,res) {
        try {
            let account = await Manager.findOne({email: req.body.email})
            if(account) {
                if(bcrypt.compareSync(req.body.password, account.password)) {
                    const information = {
                        _id:account._id,
                        firstName:account.firstName,
                        lastName:account.lastName,
                        email:account.email
                    }

                    let token = jwt.sign(information, process.env.SECRET_KEY, {
                        expiresIn:'1h'
                    })
                    res.json({Success:true,token:token, message:'Login Successful'})
                } else {
                    res.json({Success:false, message:'Please check your credentials'})
                }
            } else {
                res.json({Success:false, message:'User does not exist'})
            }
        } catch(e) {
            res.send({Success:false, message:e})
        }
    }

    async getAllEmployees(req,res) {
        try {
            let validateTrueUser = await this.verifyManager(req.headers['authorization'], res)
            if(validateTrueUser) {
                Employee.find({managerId:validateTrueUser},(e,employeesList)=>{
                    if(e) res.send({Success:false, message:`Unable to process,${e}`})
                    else res.json(employeesList)
                })
            }
        } catch(e) {
            res.json({Success:false, message:`Unable to process,${e}`})
        }
    }

    async addEmloyee(req,res) {
        try {
            let validateTrueUser = await this.verifyManager(req.headers['authorization'], res)
            if(validateTrueUser) {
                employee = new Employee({
                    empID:req.body.empID,
                    firstName:req.body.firstName,
                    lastName:req.body.lastName,
                    address:req.body.address,
                    dob:req.body.dob,
                    mobile:req.body.mobile,
                    city: req.body.city,
                    managerId: validateTrueUser
                })
        
                employee.save((err)=>{
                    res.json(employee)
                })
            }
        } catch(e) {
            res.json({Success:false, message:`Unable to process,${e}`})
        }
    }

    async updateEmloyee(req,res) {
        try {
            let validateTrueUser = await this.verifyManager(req.headers['authorization'], res)
            if(validateTrueUser) {
                employee = await Employee.findById(req.params.id)
        
                employee.empID=req.body.empID
                employee.firstName=req.body.firstName
                employee.lastName=req.body.lastName
                employee.address=req.body.address
                employee.dob=req.body.dob
                employee.mobile=req.body.mobile
                employee.city=req.body.city
                employee.managerId=validateTrueUser
        
                employee.save(()=> {
                    res.json(employee)
                })
            }
        }
        catch(e) {
            res.json({Success:false, message:`Unable to process,${e}`})
        }
    }

    async deleteEmloyee(req,res) {
        try {
            let validateTrueUser = await this.verifyManager(req.headers['authorization'], res)
            if(validateTrueUser) {
                Employee.findByIdAndDelete(req.params.id, (e) => {
                    res.json({'message':'deleted'})
                })
            }
        } catch(e) {
            res.json({Success:false, message:`Unable to process,${e}`})
        }
    }
}