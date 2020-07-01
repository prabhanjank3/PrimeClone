var dao = require("../dao/LowDB");
var Properties = require("../resources/properties");
const axios = require("axios");

const getInitialStateData = () => {
  return {
    latest: dao.getMovieDetails({ Year: "2020" }),
    marathi: dao.getMovieDetails({ Language: "Marathi" }),
    english: dao.getMovieDetails({ Language: "English" }),
    hindi: dao.getMovieDetails({ Language: "Hindi" }),
    telugu: dao.getMovieDetails({ Language: "Telugu" }),
    thriller: dao.getMovieDetails({ Genre: "Thriller" }),
    comedy: dao.getMovieDetails({ Genre: "Comedy" })
  };
};
const getMovieDetailsbyID = id => {
  return dao.getMovieDetailsbyID(id);
};
const getMovieDetails = obj => {
  return dao.getMovieDetails(obj);
};

const createNewUser = obj => {
  return dao.createNewUser(obj);
};

const authenticateUser = obj => {
  var resp = dao.autheticateUser(obj);
  console.log(resp);
  return resp;
};
const insertMovieDetails = movieName => {
  fetchMovieDetails(movieName).then(response => {
    if (
      response.data.Response === "True" &&
      checkIfUnique(response.data.imdbID)
    ) {
      var temp = {
        ...response.data,
        Genre: convertStringToObject(response.data.Genre),
        Actors: convertStringToObject(response.data.Actors)
      };
      dao.insertMovieDetails(temp);
      console.log("Inserted " + response.data.Title);
    } else {
      response.data.Response === "False"
        ? console.log("Movie Record not found for : " + movieName)
        : console.log("Duplicate Record found for : " + movieName);
    }
  });
};

const deleteMovieDetailsbyID = id => {
  dao.deleteMovieDetailsbyID(id);
};

// Helper Services

const removeDuplicates = id => {
  var length = dao.getMovieDetailsbyID(id).length;
  if (length > 1) {
    for (var i = length; i >= 1; i--) {
      dao.deleteMovieDetailsbyID(id);
    }
  }
};

const convertStringToObject = str => {
  var splittedArr = str.split(", ");
  return splittedArr;
};

const fetchMovieDetails = movieName => {
  var finalURL = Properties.BASE_URL_OMDBAPI + encodeURI(movieName);
  return axios.get(finalURL);
};

const checkIfUnique = id => {
  return dao.getMovieDetailsbyID(id).length === 0 ? true : false;
};

module.exports.getInitialStateData = getInitialStateData;
module.exports.getMovieDetailsbyID = getMovieDetailsbyID;
module.exports.insertMovieDetails = insertMovieDetails;
module.exports.deleteMovieDetailsbyID = deleteMovieDetailsbyID;
module.exports.removeDuplicates = removeDuplicates;
module.exports.getMovieDetails = getMovieDetails;
module.exports.createNewUser = createNewUser;
module.exports.authenticateUser = authenticateUser;
