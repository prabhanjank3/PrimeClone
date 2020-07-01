var service = require("../services/Services");

const getinitialStateData = (req, resp) => {
  resp.send(service.getInitialStateData());
};

const getMovieDetailsbyID = (req, resp) => {
  resp.send(service.getMovieDetailsbyID(req.params.id));
};

const deleteMovieDetailsbyID = (req, resp) => {
  service.deleteMovieDetailsbyID(req.params.id);
};

const insertMovieDetails = movieName => {
  service.insertMovieDetails(movieName);
};

const getMovieDetails = (req, resp) => {
  resp.send(service.getMovieDetails(req.query));
};

const createNewUser = (req, resp) => {
  resp.send(service.createNewUser(req.query));
};
const authenticateUser = (req, resp) => {
  resp.send(service.authenticateUser(req.query));
};
module.exports.getinitialStateData = getinitialStateData;
module.exports.getMovieDetailsbyID = getMovieDetailsbyID;
module.exports.deleteMovieDetailsbyID = deleteMovieDetailsbyID;
module.exports.insertMovieDetails = insertMovieDetails;
module.exports.getMovieDetails = getMovieDetails;
module.exports.createNewUser = createNewUser;
module.exports.authenticateUser = authenticateUser;
