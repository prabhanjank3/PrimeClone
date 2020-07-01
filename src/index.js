// Module Import
const express = require("express");
const bodyParser = require("body-parser");
const controller = require("./controller/controller");
const cors = require("cors");
// Module Setup
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", controller.getinitialStateData);
app.get("/movie/:id", controller.getMovieDetailsbyID);
app.delete("/:id", controller.deleteMovieDetailsbyID);
app.get("/movies/", controller.getMovieDetails);
app.get("/signup/", controller.createNewUser);
app.get("/signin/", controller.authenticateUser);
// Helper Functions

[
  "Geetha Govindam",
  "Naal",
  "Hera Pheri",
  "Baaghi",
  "Baaghi 3",
  "Tanhaji",
  "Thappad",
  "Malnag",
  "War",
  "Kabir Singh",
  "Saaho",
  "Gulabo Sitabo",
  "Kesari",
  "Dangal",
  "2 States",
  "Madaari",
  "3 Idiots",
  "PK",
  "Murder",
  "Dilwale Dulhania le jayenge",
  "Sairat",
  "Hirkani",
  "Natsamrat",
  "Ananedi Gopal",
  "Balak Palak",
  "Fandry",
  "Double Seat",
  "Duniyadari",
  "Faster fene",
  "Bloodshot",
  "Avengers",
  "Wonder Woman",
  "Joker",
  "Jumanji",
  "Penguins of Madagascar",
  "Pail te Sumbran",
  "Coffee & Kareem",
  "The Main Event",
  "Dangerous Lies",
  "The Lovebirds",
  "Irresistible",
  "Da 5 Bloods",
  "Hamilton"
].forEach(element => controller.insertMovieDetails(element));
// Production

app.listen(9090);
