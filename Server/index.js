import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import TodoModel from './model.js';



const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/')
.then(()=> console.log("mongodb connected"))
.catch(err=> console.log(err)
)



app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { task } = req.body;

    TodoModel.findByIdAndUpdate(id, { task }, { new: true })
        .then(result => res.json(result))
        .catch(err => res.status(400).json({ error: err.message }));
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;

    TodoModel.findByIdAndDelete(id)
      
    .then(result => res.json({ message: 'Todo deleted successfully' }))
        .catch(err => res.status(400).json({ error: err.message }));
});


app.get('/get', (req, res) => {
    TodoModel.find()
        .then(result => res.json(result))  
        .catch(err => res.status(400).json({ error: err.message }));
});


app.post('/add', (req,res)=>{
  const task = req.body.task;

  TodoModel.create({task})
    .then((result)=> res.json(result))
    .catch(err=> console.log(err)
    )
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});