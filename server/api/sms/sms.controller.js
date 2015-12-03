/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/smss              ->  index
 * POST    /api/smss              ->  create
 * GET     /api/smss/:id          ->  show
 * PUT     /api/smss/:id          ->  update
 * DELETE  /api/smss/:id          ->  destroy
 */

'use strict';

// from https://telerivet.com/
var telerivet = require('telerivet');
var API_KEY = 'SMLXzvuupVOtIP9SIOU5hdXRlSkRwvaM';  //
var PROJECT_ID = 'PJa61703ce18b3a11e';
var tr = new telerivet.API(API_KEY);
var project = tr.initProjectById(PROJECT_ID);

// send message

var _ = require('lodash');
var Sms = require('./sms.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function badSms(res, message, phone) {
  console.log(message);
  // sendSMS(phone, message);
  res.status(200).json({"error": message});
}

function sendSMS(phone, message) {
  project.sendMessage({
    to_number: phone,
    content: message
  }, function(err, message) {
      if (err) throw err;
      console.log(message);
  });
}


function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Smss
exports.index = function(req, res) {
  Sms.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Sms from the DB
exports.show = function(req, res) {
  Sms.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Sms in the DB
exports.create = function(req, res) {
  var parts = req.body.content.toLowerCase().trim().split(" ");
  var phone = req.body.from_number;

  console.log("\n\n--- SMS ---");
  console.log("parts: " + parts);

  if (parts.length < 1){
    message = "Your sms is too short";
    return badSms(res, message, phone);
  }

  if ((parts[0] !== 'buy') && (parts[0] !== 'sell')){
      message = 'missing key word buy or sell: '+ parts[0];
      return badSms(res, message, phone);
  }

  if ((parts.length > 1) && (isNaN(parts[1]))){
     var message = 'bad amount: ' + parts[1]
     return badSms(res, message, phone);
  }

  if (parts.length < 3){
     var message = 'bad fish type';
     return badSms(res, message, phone);
  }

  if ((parts.length > 3) && (parts[3][0] !== '@')){
     var message = ('bad @');
     return badSms(res, message, phone);
  }

  if ((parts.length > 3) && (isNaN(parts[3].substring(1)))){
    var message = 'bad price: ' + parts[3].substring(1);
    return badSms(res, message, phone);

  }

  var data = {
      number: phone,
      buysell: parts[0],
      quantity: parts[1],
      fish: parts[2],
      price: parts[3].substring(1)
  };


  console.log('GOOD: '+ data);

  Sms.createAsync(data)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Sms in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Sms.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Sms from the DB
exports.destroy = function(req, res) {
  Sms.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
