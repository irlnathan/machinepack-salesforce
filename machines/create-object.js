module.exports = {

  friendlyName: 'Create new salesforce object',
  description: 'Create a salseforce object given object properties. Returns new object Id',
  extendedDescription: 'Requires authentication with username, password, and secret token.',

  inputs: {
    url: {
      example: 'https://cs2.salesforce.com/',
      description: 'URL for connecting your salesforce instance, sandbox, etc.'
    },
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
      example: {},
      description: 'Object with new properties. If Id is present it will be deleted.',
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

    requiredFieldMissing: {
      description: 'Required field missing'
    },

    success: {
      description: 'success!',
      example: '00Q5000000yzUmOEAU'
    }

  },


  fn: function(inputs, exits) {

    var jsforce = require('jsforce');
    var connString = {};
    if (inputs.url) {
      connString.loginUrl = inputs.url;
    }
    var conn = new jsforce.Connection(connString);
    var email = inputs.email;
    var pass = inputs.password + inputs.token;

    conn.login(email, pass, function(connErr, result) {
      if (connErr && connErr.toString().indexOf('INVALID_LOGIN') !== -1) {
        return exits.invalidLogin(connErr);
      } else if (connErr) {
        return exits.error(connErr);
      }
      if (inputs.objectType.Id) {
        delete inputs.objectType.Id;
      }
      conn
        .sobject(inputs.objectType)
        .create(inputs.objectData, function(objErr, theObject) {
          if (objErr && objErr.toString().indexOf('NOT_FOUND') !== -1) {
            return exits.notFound(objErr);
          } else if (objErr && objErr.toString().indexOf(
            'REQUIRED_FIELD_MISSING') !== -1) {
            return exits.requiredFieldMissing(objErr);
          } else if (objErr) {
            return exits.error(objErr);
          }
          return exits.success(theObject.id);
        });

    });

  }

};









// fin