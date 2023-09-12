import express from "express";
import mysql from "mysql";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "react_app",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected...");
});

app.use(express.json());
app.use(cors());

const sendUpdatedDataToClients = (id) => {
  let sql = `SELECT * FROM makina_verileri WHERE makina_id = ${id}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    io.emit("dataUpdated", results);
  });
  console.log("Data updated.");
};

app.get("/makinaVerileri", (req, res) => {
  const id = req.query.id;
  if (!id) {
    res.status(400).send("id parametresi zorunludur.");
  }

  let sql = `SELECT * FROM makina_verileri where makina_id = ${id}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// app.post("/makinaVerileri/:id", (req, res) => {
//   const id = req.params.id;

//   const basinc = req.body.basinc;
//   const pozisyon = req.body.pozisyon;
//   const zaman = req.body.zaman;

//   if (!id || !basinc || !pozisyon || !zaman) {
//     res.status(400).send("id, basinc, pozisyon ve zaman zorunludur.");
//   }

//   let sql = `INSERT INTO makina_verileri (makina_id, basınç_değeri, pozisyon_değeri, zaman) VALUES (${id}, ${basinc}, ${pozisyon}, '${zaman}')`;
//   let query = db.query(sql, (err, results) => {
//     if (err) throw err;
//     res.send(results);
//   });
// });

app.get("/makinalar", (req, res) => {
  let sql = "SELECT * FROM makinlar";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

io.on("connection", (socket) => {
  console.log("Bir kullanıcı bağlandı.");
  socket.on("disconnect", () => {
    console.log("Bir kullanıcı ayrıldı.");
  });

  socket.on("updateData", (id) => {
    sendUpdatedDataToClients(id);
    console.log("Data updateddddd.");
  });
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
