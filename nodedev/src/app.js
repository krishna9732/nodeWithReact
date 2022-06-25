const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
require('./db/conn');
const Student = require("./models/students")

app.use(express.json());



app.get('/',(req,res)=>{
res.send('Welcome to our page!.........')
})


// Get all data
app.get('/students',async (req,res)=>{
    try{
        let studentData = await Student.find({});
         res.json(studentData);
    }catch(e){
        res.status(400).send(e);
    }
})
//Get student data by id
app.get('/students/:id',async (req,res)=>{
    try{
        const id = req.params.id;
        let studentData = await Student.findById({_id:id});
        if(!studentData){
            res.status(500).send()
        }else{
            res.json(studentData);
        }
    }catch(e){
        res.status(500).send(e);
    }
})

// create student data using promises
app.post('/students',(req,res)=>{
    const user = new Student(req.body);
    user.save().then(()=>{
        res.status(201).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    })
})

// create student data by using async and await
app.post('/add-students',async(req,res)=>{
    try{
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(200).send(createUser);
    }catch(e){
        res.status(400).send(e);
    }
})


// update data by id
app.patch('/students/:id', async (req,res)=>{
    try{
        const _id = req.params.id;
        const updateStudent = await Student.findByIdAndUpdate(_id,req.body,{new:true})
       res.send(`${updateStudent} data updated successfully`);
    }catch(e){
        res.status(500).send(e);
    }
})



//delete student data 
app.delete('/students/:id',async(req,res)=>{
    console.log('req.id',req.body);
    try{
        const deleteData = await Student.find({id:req.id}).remove();
        res.json(studentData);
    }catch(e){
        res.status(400).send(e);
    }
})


app.listen(port,()=>{
console.log(`Server is running at ${port}`)
})