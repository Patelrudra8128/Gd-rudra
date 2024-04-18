const express = require('express');
const routes = express.Router();

const indexController = require('../controllers/indexController');

routes.post('/addCountry',indexController.addCountry);
routes.get('/viewCountry',indexController.viewCountry);
routes.post('/addState',indexController.addState);
routes.get('/viewState',indexController.viewState);
routes.post('/addCity',indexController.addCity);
routes.get('/viewCity',indexController.viewCity);
routes.delete('/deleteCountry',indexController.deleteCountry);
routes.put('/updateCountry',indexController.updateCountry);
routes.put('/updateState',indexController.updateState);
routes.put('/updateCity',indexController.updateCity);
routes.delete('/deleteCity',indexController.deleteCity);
routes.delete('/deleteState',indexController.deleteState);

module.exports = routes;