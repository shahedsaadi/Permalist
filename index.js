import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

const app = express();
const port = 3000;

dotenv.config();

const dbConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
};

const db = new pg.Client(dbConfig);

db.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  .catch(err => {
    console.error('Error connecting to PostgreSQL database:', err);
  });
  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentHeaderId = 1;     // identify it as 1 to always open the first list (Today)

let items = [
  { id: 1, title: "Buy milk", header_id: 1},
  { id: 2, title: "Finish homework", header_id:2},
];
let headers = [
  {id:1, list_name: "Today"},
  {id:2, list_name: "Week"},
  {id:3, list_name: "Month"}
];

async function getItems(){
  const result = await db.query(
    "SELECT * FROM items WHERE header_id = $1 ORDER BY id ASC;",[currentHeaderId]
  );
  items = result.rows;
  return items;
}

async function getCurrentHeader(){
  const result = await db.query("SELECT * FROM headers");
  headers = result.rows;
  return headers.find((header)=> header.id == currentHeaderId);
}

//Read
app.get("/", async(req, res) => {
    const items = await getItems();
    const headers1 = await getCurrentHeader(); 

    res.render("index.ejs", {
    listTitle: headers1.list_name,
    listItems: items,
    headers1: headers
    });
 
});

//Create
app.post("/add", async(req, res) => {
  const item = req.body.newItem;
  const headers1 = await getCurrentHeader();

  try {
    await db.query("INSERT INTO items (title, header_id) VALUES ($1,$2)",
    [item, currentHeaderId]
    );
    res.redirect("/");
  }catch(err){
    console.log(err);
  }
});

//Update
app.post("/edit", async(req, res) => {
  const item = req.body.updatedItemTitle;
  const id = req.body.updatedItemId;
  try{
    await db.query("UPDATE items SET title = ($1) WHERE id = $2", 
    [item, id]
    );
    res.redirect("/");
  }catch(err){
    console.log(err);
  }
});

//Heading
app.post("/header", async (req, res) => {
  currentHeaderId = req.body.header; //header id it could be 1,2,3 and will update the currentHeader var.
  res.redirect("/");
});

//Delete
app.post("/delete", async(req, res) => {
  const id = req.body.deleteItemId;
  try{
    await db.query("DELETE FROM items WHERE id = $1",[id]);
    res.redirect("/");
  }catch(err){
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
