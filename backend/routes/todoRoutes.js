import express from "express";
const router = express.Router();
import {
    getTodos,
    addTodo,
    deleteTodos,
    toggleTodo,
    clearCompleted,
    activeTodos,
    completedTodos,
} from "../controllers/todoController.js";

router.get("/", getTodos);
router.get("/active", activeTodos);
router.get("/completed", completedTodos);
router.post("/", addTodo);
router.delete("/clear", clearCompleted);
router.delete("/:id", deleteTodos);
router.put("/toggle/:id", toggleTodo);

export default router;
