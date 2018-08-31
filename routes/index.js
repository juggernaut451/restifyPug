/**
 * Module Dependencies
 */
const errors = require('restify-errors');
const config = require('../config');
const fs = require('fs');
const path = require('path');
const restify = require('restify');
const contentDisposition = require('content-disposition');
const _ = require('underscore');
const moment = require('moment');


/**
 * Model Schema
 */
const User = require('../models/user');

module.exports = function(server) {

  server.get('/500', function (req, res, next) {
    res.render('500.pug');
    next()
  })

  server.get('/user', (req, res, next) => {
    User.find({}, function(err, user) {
      if (err) {
        console.error(err)
        res.redirect(500, '500', next);
      }
      res.send(user)
    });
  });

  server.post('/user', (req, res, next) => {

    let data = req.body || {};

    let user = new User(data);
    user.save(function(err, user) {
      if (err) {
        console.error(err);
        return next(new errors.InternalError(err.message));
        next();
      }
      res.send(user);
      next();
    });
  });

  server.get('/', function (req, res, next) {
    res.redirect(301, '/404', next);
  })

  server.get('/404', function (req, res, next) {
    res.render('404.pug');
    next()
  })

  server.get('*', restify.plugins.serveStatic({
    directory: path.join(__dirname,'..', 'assets'),
    default: '/favicon.png'
  }));

  server.on('NotFound', (req, res, err, next) => {
    res.redirect(301, '404', next);
  });


};
