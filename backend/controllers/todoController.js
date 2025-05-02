import db from "../db.js";

const getTodos = (req, res) => {
    db.query("SELECT * FROM todos", (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

const addTodo = (req, res) => {
    const { title } = req.body;

    db.query("INSERT INTO todos (title) values(?)", [title], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ id: result.insertId, title, completed: false });
    });
};

const deleteTodos = (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM todos WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Deleted" });
    });
};

const toggleTodo = (req, res) => {
    const { id } = req.params;

    db.query(
        "UPDATE todos SET completed = NOT completed WHERE id = ?",
        [id],
        (err) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: "Toggled" });
        }
    );
};

const clearCompleted = (req, res) => {
    db.query("DELETE FROM todos WHERE completed = true", (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: err });
        }
        res.json({
            message: `${result.affectedRows} completed todos cleared.`,
        });
    });
};

const activeTodos = (req, res) => {
    db.query("SELECT * FROM todos WHERE completed = false", (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: err });
        }
        res.json(result);
    });
};

const completedTodos = (req, res) => {
    db.query(
        "SELECT * FROM todos WHERE completed = ?",
        [true],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: err });
            }
            res.json(result);
        }
    );
};

export {
    addTodo,
    getTodos,
    deleteTodos,
    toggleTodo,
    clearCompleted,
    activeTodos,
    completedTodos,
};
