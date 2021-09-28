var express = require('express');
var router = express.Router();



router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tutorials' });
});


router.get('/tutorial1', function(req, res, next) {
  res.render('tutorials/tutorial1', { title: 'First Tutorial', url: req.hostname});
});


router.get('/raycasting', function(req, res, next) {
  res.render('tutorials/raycasting/raycasting', { title: 'Raycasting Tutorial', url: req.hostname});
});


router.get('/raycasting/example1', function(req, res, next) {
  res.render('tutorials/raycasting/example1');
});


router.get('/raycasting/example2', function(req, res, next) {
  res.render('tutorials/raycasting/example2');
});


router.get('/socketio', function(req, res, next) {
  res.render('tutorials/socketio', { title: 'Socket.io Tutorial', url: req.hostname});
});


router.get('/csstutorial', function(req, res, next) {
  res.render('tutorials/csstutorial', { title: 'CSS Tutorial'});
});



module.exports = router;
