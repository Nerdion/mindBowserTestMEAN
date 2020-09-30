const express = require('express')
const Employee = require('../models/index.model')
const router = express.Router()

router.get('/',(req,res) => {
    Employee.find({},(err,employeesList)=>{
        if(err) console.log(err)
        res.json(employeesList)
    })
})

router.post('/',(req,res) => {
    employee = new Employee({
        empID:req.body.empID,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        address:req.body.address,
        dob:req.body.dob,
        mobile:req.body.mobile,
        city: req.body.city,
    })

    employee.save((err)=>{
        console.log(err)
        res.json(employee)
    })
})

router.put('/:id', async (req,res)=> {
    employee = await Employee.findById(req.params.id)

    employee.empID=req.body.empID
    employee.firstName=req.body.firstName
    employee.lastName=req.body.lastName
    employee.address=req.body.address
    employee.dob=req.body.dob
    employee.mobile=req.body.mobile
    employee.city=req.body.city

    employee.save(()=> {
        res.json(employee)
    })
})

router.delete('/:id', (req,res)=> {
    Employee.findByIdAndDelete(req.params.id, (err) => {
        res.json({'message':'deleted'})
    })
})

module.exports = router
