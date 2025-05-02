import mysql from "mysql2";

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "noor",
    database: "todo_list_project",
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Database connected!");
});

export default connection;
