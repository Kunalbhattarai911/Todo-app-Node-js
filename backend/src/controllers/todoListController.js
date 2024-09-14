import mongoose from "mongoose";
import { TodoList } from "../models/todoListModel.js";

export const addTask = async (req,res) => {
try {
    const {title, description , priority, isCompleted} = req.body;
    const userId = req.id;

    await TodoList.create ({
        userId,
        title,
        description,
        priority,
        isCompleted
    })

    return res.status(201).json({
        message : "Task added successfully",
        success : true,
        task : title,
        taskDescription : description,
        taskPriority : priority,
        isTaskCompleted : isCompleted
    })
} catch (error) {
    return res.status(500).json({
        message: "An error occurred while adding the task",
        error: error.message,
        success: false
    });
}
};

export const getUserTask = async (req,res) => {
    try {
        const userId = req.id;

        const toDoList = await TodoList.find({userId})

        return res.status(200).json({
            message: "Tasks retrieved successfully",
            success : true,
            toDoList
        })
    } catch (error) {
        console.log("Error Details", error);
        return res.status(500).json({
            message: "An error occured while retrieving the tasks",
            success : false
        })   
    }
}

export const getSingleUserTask = async (req, res) => {
    try {
        const userId = req.id;  
        const { taskId } = req.params;  

        // Validate the taskId format
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({
                message: "Invalid task ID format",
                success: false
            });
        }

        // Find the task by ID and ensure it belongs to the authenticated user
        const task = await TodoList.findOne({ _id: taskId, userId });

        if (!task) {
            return res.status(404).json({
                message: "Task not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Task retrieved successfully",
            success: true,
            task
        });
    } catch (error) {
        console.log("Error Details", error);
        return res.status(500).json({
            message: "An error occurred while retrieving the task",
            success: false,
            error: error.message  // Provide more details in the error response
        });
    }
};

export const updateTask = async (req,res) => {
    try {
        const { taskId } = req.params;
        const { title, description, priority, isCompleted } = req.body;
        const userId = req.id;

        let task = await TodoList.findOne({ _id: taskId, userId });
        if(!task) {
            return res.status(404).json({
                message: "Task not found",
                success : false
            })
        }

        if(title) task.title = title;
        if(description) task.description = description;
        if(priority) task.priority = priority;
        if (isCompleted !== undefined) task.isCompleted = isCompleted;

        await task.save();

        return res.status(200).json({
            message : "Task updated successfully",
            success : true,
            task
        })
    }catch (error) {
        console.log("Error Details", error);
        return res.status(500).json({
            message: "An error occured while updating the tasks",
            success : false
        })   
    }
}

export const markTaskAsCompleted = async (req, res) => {
    try {
        const { taskId } = req.params;
        const userId = req.id; //authentication bata userid lyaune

        // task by id ra userid le find garne
        const task = await TodoList.findOne({ _id: taskId, userId });

        if (!task) {
            return res.status(404).json({
                message: "Task not found",
                success: false
            });
        }

        // check task complete xa ki xaina 
        if (task.isCompleted) {
            return res.status(400).json({
                message: "Task is already completed",
                success: false
            });
        }

        // task ko status change garne true ma
        task.isCompleted = true;
        await task.save();

        return res.status(200).json({
            message: "Task marked as completed",
            success: true,
            task
        });

    } catch (error) {
        console.log("Error Details", error);
        return res.status(500).json({
            message: "An error occurred while marking the task as completed",
            error: error.message,
            success: false
        });
    }
};

export const deleteTask = async (req,res) => {
    try {
        const { taskId } = req.params;
        const userId = req.id;

        const task = await TodoList.findOneAndDelete({_id: taskId, userId})

        if(!task) {
            return res.status(404).json({
                message : "Task not found",
                success : false
            })
        }

        return res.status(200).json({
            message : "Task deleted Successfully.",
            success : true
        });
    } catch (error) {
        console.log("Error Deails:", error);
        return res.status(500).json({
            message : "An error occured while deleting the task",
            success : false
        })
    }
}