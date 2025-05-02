import React, { useEffect, useState } from "react";

import axios from "axios";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [activeClass, setActiveClass] = useState("all");

    const API_URL = "http://localhost:5000/api/todos";

    const fetchTodos = async () => {
        const res = await axios.get(API_URL);
        setTodos(res.data);
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post(API_URL, { title: newTodo });

        fetchTodos();
        setNewTodo("");
    };

    const deleteTodo = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        fetchTodos();
    };

    const toggleTodo = async (id) => {
        await axios.put(`${API_URL}/toggle/${id}`);
        fetchTodos();
    };

    const clearCompleted = async () => {
        await axios.delete(`${API_URL}/clear`);
        fetchTodos();
    };

    const activeTodos = async () => {
        const res = await axios.get(`${API_URL}/active`);
        setTodos(res.data);
    };

    const completedTodos = async () => {
        const res = await axios.get(`${API_URL}/completed`);
        setTodos(res.data);
    };

    return (
        <div className="todo-list">
            <form className="input-group" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    className="input"
                    placeholder="Create a new todo..."
                />
                <button>Add</button>
            </form>
            <div className="todo-container">
                {todos.map((todo, i) => (
                    <div className="todo" key={i}>
                        <div>
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleTodo(todo.id)}
                            />
                            <label htmlFor={i}>{todo.title}</label>
                        </div>
                        <p
                            className="remove-todo"
                            onClick={() => deleteTodo(todo.id)}
                        >
                            x
                        </p>
                    </div>
                ))}
            </div>
            <div className="footer">
                <p>{todos.length} items left</p>
                <div className="details">
                    <p
                        className={activeClass === "all" ? "active" : ""}
                        onClick={() => {
                            fetchTodos();
                            setActiveClass("all");
                        }}
                    >
                        All
                    </p>
                    <p
                        className={activeClass === "active" ? "active" : ""}
                        onClick={() => {
                            activeTodos();
                            setActiveClass("active");
                        }}
                    >
                        Active
                    </p>
                    <p
                        className={activeClass === "completed" ? "active" : ""}
                        onClick={() => {
                            completedTodos();
                            setActiveClass("completed");
                        }}
                    >
                        Completed
                    </p>
                </div>
                <p className="clear-all" onClick={clearCompleted}>
                    Clear Completed
                </p>
            </div>
        </div>
    );
};

export default TodoList;
