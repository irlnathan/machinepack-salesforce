module.exports = {

  friendlyName: 'Describe object by Id',
  description: 'Describe a salseforce object type. Returns all the fields and values for type.',
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
    includeValues: {
      example: {},
      description: 'Salesforce objects have many properties. Optionally provide a hash of properties you are interested in.',
      extendedDescription: 'For example, return all field names with `{"fields":[{"name":true}]}`. Return all field names and all picker labels with values with `{"fields":[{"name":true, "picklistValues":[{"label":true,"value":true}]}]}`.',
      required: false
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

    success: {
      description: {
        autoNumber: false,
        byteLength: 765,
        calculated: false,
        calculatedFormula: null,
        cascadeDelete: false,
        caseSensitive: false,
        controllerName: null,
        createable: true,
        custom: true,
        defaultValue: null,
        defaultValueFormula: null,
        defaultedOnCreate: false,
        dependentPicklist: false,
        deprecatedAndHidden: false,
        digits: 0,
        displayLocationInDecimal: false,
        externalId: false,
        extraTypeInfo: null,
        filterable: true,
        filteredLookupInfo: null,
        groupable: true,
        highScaleNumber: false,
        htmlFormatted: false,
        idLookup: false,
        inlineHelpText: null,
        label: 'Customer Loyalty Program',
        length: 255,
        mask: null,
        maskType: null,
        name: 'Customer_Loyalty_Program__c',
        nameField: false,
        namePointing: false,
        nillable: true,
        permissionable: true,
        picklistValues: [{
          active: true,
          defaultValue: false,
          label: 'Yes',
          validFor: null,
          value: 'Yes'
        }, {
          active: true,
          defaultValue: false,
          label: 'No',
          validFor: null,
          value: 'No'
        }],
        precision: 0,
        queryByDistance: false,
        referenceTargetField: null,
        referenceTo: [],
        relationshipName: null,
        relationshipOrder: null,
        restrictedDelete: false,
        restrictedPicklist: false,
        scale: 0,
        soapType: 'xsd:string',
        sortable: true,
        type: 'picklist',
        unique: false,
        updateable: true,
        writeRequiresMasterRead: false
      }
    }

  },


  fn: function(inputs, exits) {

    var jsforce = require('jsforce');
    var _ = require('lodash');
    var conn = new jsforce.Connection();
    var email = inputs.email;
    var pass = inputs.password + inputs.token;

    function returnCleanedValues(whichFields, data) {
      if (_.isArray(data)) {
        // if data is array
        return _.map(data, function(singleData) {
          return returnCleanedValues(whichFields, singleData);
        });
      } else {
        // object, we want to map these fields
        // for each field requested, get value from data
        return _.mapValues(whichFields, function(value, key) {
          if (_.isArray(data[key]) && _.isArray(value)) {
            return returnCleanedValues(value[0], data[key]);
          }
          return data[key];
        });
      }
    }

    conn.login(email, pass, function(connErr, result) {
      if (connErr && connErr.toString().indexOf('INVALID_LOGIN') !== -1) {
        return exits.invalidLogin(connErr);
      } else if (connErr) {
        return exits.error(connErr);
      }
      conn
        .sobject(inputs.objectType)
        .describe(function(objErr, theObjectDescription) {
          if (objErr && objErr.toString().indexOf('NOT_FOUND') !== -1) {
            return exits.notFound(objErr);
          } else if (objErr) {
            return exits.error(objErr);
          }
          if (inputs.includeValues) {
            var cleaned = returnCleanedValues(
              inputs.includeValues,
              theObjectDescription
            );
            return exits.success(cleaned);
          } else {
            return exits.success(theObjectDescription.fields);
          }

        });

    });

  }

};









// fin