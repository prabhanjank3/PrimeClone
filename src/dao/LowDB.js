const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const uniqid = require("uniqid");

const adapter = new FileSync("src/data/movie_data.json");
const db = lowdb(adapter);

db.defaults({
  on_show: [],
  user_data: [
    {
      email: "admin",
      password: "admin",
      id: uniqid(),
      firstname: "Admin",
      lastname: "Kulkarni"
    }
  ]
}).write();
//Private Functions

const insert_ON_SHOW = obj => {
  db.get("on_show")
    .push(obj)
    .write();
};
const delete_ON_SHOW = id => {
  db.get("on_show")
    .remove({ imdbID: id })
    .write();
};
const update_ON_SHOW = (id, obj) => {
  db.get("on_show")
    .find({ imdbID: id })
    .assign(obj)
    .write();
};

const insert_USER_DATA = obj => {
  console.log(obj);
  db.get("user_data")
    .push({
      ...obj,
      id: uniqid()
    })
    .write();
};

//Public Functions

const getMovieDetailsbyID = id => {
  return db
    .get("on_show")
    .filter({ imdbID: id })
    .value();
};

const getMovieDetails = conditionObject => {
  const allItems = db.get("on_show").value();

  const arr = allItems.filter(item => {
    var flag = true;
    for (const property in conditionObject) {
      if (Array.isArray(item[property])) {
        flag &= item[property].includes(conditionObject[property]);
      } else {
        flag &= item[property] === conditionObject[property];
      }
    }
    return flag;
  });

  /*const arr = db
    .get("on_show")
    .filter(conditionObject)
    .value();*/

  return arr.map(movieObject => {
    const { Title, imdbID, Poster } = movieObject;
    return { Title, imdbID, Poster };
  });
};
const insertMovieDetails = movie => {
  insert_ON_SHOW(movie);
};

const deleteMovieDetailsbyID = id => {
  delete_ON_SHOW(id);
};

const updateMovieDetailsbyID = (id, obj) => {
  update_ON_SHOW(id, obj);
};

const createNewUser = async obj => {
  await insert_USER_DATA(obj);
  return true;
};
const autheticateUser = obj => {
  var userArr = db
    .get("user_data")
    .filter({ email: obj.username })
    .value();
  if (userArr.length > 0) {
    if (userArr[0].password === obj.password) {
      return {
        status: 200,
        authID: userArr[0].id,
        firstName: userArr[0].firstname
      };
    } else {
      return { status: 405, msg: "Wrong Password" };
    }
  } else {
    return { status: 404, msg: "User Not Found" };
  }
};
module.exports.getMovieDetailsbyID = getMovieDetailsbyID;
module.exports.insertMovieDetails = insertMovieDetails;
module.exports.deleteMovieDetailsbyID = deleteMovieDetailsbyID;
module.exports.getMovieDetails = getMovieDetails;
module.exports.updateMovieDetailsbyID = updateMovieDetailsbyID;
module.exports.createNewUser = createNewUser;
module.exports.autheticateUser = autheticateUser;
