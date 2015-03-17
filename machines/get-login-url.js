module.exports = {


  friendlyName: 'Get login url',
  description: 'Get the URL on salesforce.com that a user should visit to allow/deny the specified Salesforce Developer app (i.e. your app).',
  extendedDescription: 'This is the URL where you typically redirect a user in order for them to grant access to your Facebook app.',

  inputs: {
    consumerKey: {
      example: 'adf90878aKsloewurSDFIUFsdisoufsodfu',
      description: 'The consumer key for your Salesforce app.',
      required: true
    },
    callbackUrl: {
      example: 'http://localhost:1337/auth/login',
      description: 'The callback URL where the end user will be redirected after visiting the login URL returned by this machine',
      required: true
    }

  },


  defaultExit: 'success',


  exits: {

    error: {
      description: 'Triggered when the Salesforce API returns an error.',
    },

    success: {
      description: '"https://login.salesforce.com/services/oauth2/authorize?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A1337%2Fcallback&client_id=YyuYCKf4ly4M9A_GEiI2zRPTt58GYyuYCKf4ly4M9A_GEiI2zRPTtczEqV9cG0JDxzapp9Ge"',
    },

  },


  fn: function (inputs,exits) {

    var oauth2 = require('salesforce-oauth2');
    var util = require('util');

    var uri = oauth2.getAuthorizationUrl({
      redirect_uri: inputs.callbackUrl,
      client_id: inputs.consumerKey
        // scope: 'api'
    });

    return exits.success(uri);
  },



};
