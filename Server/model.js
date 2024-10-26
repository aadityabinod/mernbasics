import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    task: String
})

const TodoModel = mongoose.model("todos", todoSchema)
export default TodoModel;