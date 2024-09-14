import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    priority : {
        type : String,
        required : true,
        enum : ["Priority 1","Priority 2","Priority 3","Priority 4"]
    },
    isCompleted : {
        type : Boolean,
        default : false
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
})

export const TodoList = mongoose.model("toDoList", todoSchema);