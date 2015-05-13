module.exports = {

  friendlyName: 'Update object by Id',
  description: 'Update a salseforce object given Id and new values.',
  extendedDescription: 'Requires authentication with username, password, and secret token.',

  inputs: {
    email: {
      example: 'user@gmail.com',
      description: 'Email address used to login to your salseforce account.',
      required: true
    },
    password: {
      example: 'demo1234',
      description: 'Password used to login to your salseforce account.',
      required: true
    },
    token: {
      example: 'x1x2x3',
      description: 'If you do not have one, visit salseforce at My settings > personal > Reset My Security Token.',
      required: true
    },
    objectType: {
      example: 'Lead',
      description: 'Salseforce object type.',
      required: true
    },
    objectData: {
      example: {
        Id: '1234'
      },
      description: 'Object with updated properties. Must contain Id',
      required: true
    }
  },

  defaultExit: 'success',

  exits: {

    error: {
      description: 'Unexpected error occurred.',
    },

    invalidLogin: {
      description: 'Login was not successful',
    },

    notFound: {
      description: 'Object not found for this Id.',
    },

    objectIdMissing: {
      description: 'Object Id must be provided as `objectId` or in `objectData` hash.'
    },

    requiredFieldMissing: {
      description: 'Required field missing'
    },

    success: {
      description: 'success!'
    }

  },


  fn: function(inputs, exits) {

    var jsforce = require('jsforce');
    var conn = new jsforce.Connection();
    var email = inputs.email;
    var pass = inputs.password + inputs.token;

    if(!inputs.objectData.Id) {
      return exists.objectIdMissing();
    }

    conn.login(email, pass, function(connErr, result) {
      if (connErr && connErr.toString().indexOf('INVALID_LOGIN') !== -1) {
        return exits.invalidLogin(connErr);
      } else if (connErr) {
        return exits.error(connErr);
      }
      conn
        .sobject(inputs.objectType)
        .update(inputs.objectData, function(objErr, theObject) {
          if (objErr && objErr.toString().indexOf('NOT_FOUND') !== -1) {
            return exits.notFound(objErr);
          } else if (objErr && objErr.toString().indexOf('REQUIRED_FIELD_MISSING') !== -1) {
            return exits.requiredFieldMissing(objErr);
          } else if (objErr) {
            return exits.error(objErr);
          }
          return exits.success(theObject);
        });

    });

  }

};









// fin