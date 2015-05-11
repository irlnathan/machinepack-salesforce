module.exports = {

  friendlyName: 'Get object by Id',
  description: 'Get a salseforce object by Id. Returns the entire object.',
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
    objectId: {
      example: '12345',
      description: 'Salesforce object Id.',
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

    invalidObjectType: {
      description: 'Object type is not valid for this account.',
    },

    success: {
      description: {
        attributes: {
          type: 'Lead',
          url: '/services/data/v33.0/sobjects/Lead/00Q5000000yrUgaAAA'
        },
        Id: '00Q5000000yrUgaAAA',
        IsDeleted: false,
        MasterRecordId: null,
        LastName: 'Testerson',
        FirstName: 'Test',
        Salutation: null,
        Name: 'Test Testerson',
        Title: null,
        Company: 'Test Company',
        Street: '1 Test Drive',
        City: 'Testing'
      }
    }

  },


  fn: function(inputs, exits) {

    var jsforce = require('jsforce');
    var conn = new jsforce.Connection();
    var email = inputs.email;
    var pass = inputs.password + inputs.token;

    conn.login(email, pass, function(connErr, result) {
      if (connErr && connErr.toString().indexOf('INVALID_LOGIN') !== -1) {
        return exits.invalidLogin(connErr);
      } else if (connErr) {
        return exits.error(connErr);
      }
      conn
        .sobject(inputs.objectType)
        .retrieve(inputs.objectId, function(objErr, theObject) {
          if (objErr && objErr.toString().indexOf('NOT_FOUND') !== -1) {
            return exits.notFound(objErr);
          } else if (objErr) {
            return exits.error(objErr);
          }
          return exits.success(theObject);
        });

    });

  }

};









// fin