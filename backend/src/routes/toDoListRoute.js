import express from "express";
import { toDoListValidator, updateToDoListValidator } from "../middlewares/toDoListValidation.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { addTask, deleteTask, getSingleUserTask, getUserTask, markTaskAsCompleted, updateTask } from "../controllers/todoListController.js";

const router = express.Router();

router.post("/addTask", isAuthenticated ,toDoListValidator, addTask)
router.get("/getTask", isAuthenticated, getUserTask)
router.get("/getSingleTask/:taskId", isAuthenticated, getSingleUserTask)
router.put("/updateTask/:taskId", isAuthenticated,updateToDoListValidator, updateTask);
router.put("/markTaskCompleted/:taskId", isAuthenticated, markTaskAsCompleted);
router.delete("/deleteTask/:taskId", isAuthenticated,deleteTask)


export default router;