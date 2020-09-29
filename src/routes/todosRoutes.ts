import { Router } from "express";
import { type } from "os";
import { Todo } from "../models/todosModel";

type RequestBody = {
  text: string;
};

type RequestParams = {
  todoId: string;
};

const router = Router();
let todos: Todo[] = [];

router.get("/", (req, res, next) => {
  res.status(200).json({ todos });
});

router.post("/todo", (req, res, next) => {
  const body = req.body as RequestBody;
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: body.text,
  };
  console.log(newTodo);

  todos.push(newTodo);

  res.status(201).json({ message: "Added todo", todo: newTodo, todos: todos });
});

router.put("/todo/:todoId", (req, res, next) => {
  const body = req.body as RequestBody;
  const params = req.params as RequestParams;
  const todoId = params.todoId;
  const todoIndex = todos.findIndex((item) => item.id === todoId);

  if (todoIndex >= 0) {
    todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
    return res.status(200).json({ message: "Updated todo", todos });
  }

  res.status(404).json({ message: "To do not found" });
});

router.delete("/todo/:todoId", (req, res, next) => {
  const params = req.params as RequestParams;
  todos = todos.filter((item) => item.id !== params.todoId);

  res.status(200).json({ message: "Deleted todos", todos });
});

export default router;
