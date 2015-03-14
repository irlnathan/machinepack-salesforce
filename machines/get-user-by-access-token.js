module.exports = {


  friendlyName: 'Get user by access token',
  description: 'Get information about the Salesforce user with the specified access token.',
  extendedDescription: '',

  inputs: {
    id: {
      example: 'https://login.salesforce.com/id/29ZXzEAM/005j0Xz00C7enEAM/00000C7enf00C7enAAB',
      description: 'The URL used to get user information witht he specified access token.',
      required: true
    },
    accessToken: {
      example: 'AQDvCav5zRSafS795TckAerUV53xzgqRyrcfYX2i_PJF9QOe_md7h5hy2gMhOS6TL9IBk5qxMA2q_8EJxGPTqEbmTqOBqqCIOlvPEPCeIiy21VD9_Y',
      required: true
    },
    tokenType: {
      example: 'Bearer',
      required: true
    }

  },


  defaultExit: 'success',


  exits: {

    error: {
      description: 'Unexpected error occurred.',
    },

    success: {
      description: {
        id: 'https://login.salesforce.com/id/3234234029ZXzasdfasdf00C',
        asserted_user: true,
        user_id: '3234234029ZXzasdfasdf00C',
        organization_id: '08923iasdfisfAM',
        username: 'nikola@tesla.com',
        nick_name: 'nikola1.892384387321',
        display_name: 'Nikola Tesla',
        email: 'nikola@tesla.com',
        email_verified: true,
        first_name: 'Nikola',
        last_name: 'Tesla',
        timezone: 'America/Los_Angeles',
        photos: {
          picture: 'https://c.na16.content.force.com/profilephoto/004/G',
          thumbnail: 'https://c.na16.content.force.com/profilephoto/004/E'
        },
        addr_street: null,
        addr_city: null,
        addr_state: null,
        addr_country: 'US',
        addr_zip: '90210',
        mobile_phone: null,
        mobile_phone_verified: false,
        status: {
          created_date: null,
          body: null
        },
        urls: {
          enterprise: 'https://na16.salesforce.com/services/Soap/c/{version}/3234234029ZXzasdfasdf00C',
          metadata: 'https://na16.salesforce.com/services/Soap/m/{version}/3234234029ZXzasdfasdf00C',
          partner: 'https://na16.salesforce.com/services/Soap/u/{version}/3234234029ZXzasdfasdf00C',
          rest: 'https://na16.salesforce.com/services/data/v{version}/',
          sobjects: 'https://na16.salesforce.com/services/data/v{version}/sobjects/',
          search: 'https://na16.salesforce.com/services/data/v{version}/search/',
          query: 'https://na16.salesforce.com/services/data/v{version}/query/',
          recent: 'https://na16.salesforce.com/services/data/v{version}/recent/',
          profile: 'https://na16.salesforce.com/3234234029ZXzasdfasdf00C',
          feeds: 'https://na16.salesforce.com/services/data/v{version}/chatter/feeds',
          groups: 'https://na16.salesforce.com/services/data/v{version}/chatter/groups',
          users: 'https://na16.salesforce.com/services/data/v{version}/chatter/users',
          feed_items: 'https://na16.salesforce.com/services/data/v{version}/chatter/feed-items'
        },
        active: true,
        user_type: 'STANDARD',
        language: 'en_US',
        locale: 'en_US',
        utcOffset: -28800000,
        last_modified_date: '2015-03-12T22:02:09.000+0000',
        is_app_installed: true
      } {
        id: 'https://login.salesforce.com/id/3234234029ZXzasdfasdf00C',
        asserted_user: true,
        user_id: '3234234029ZXzasdfasdf00C',
        organization_id: '3234234029ZXzasdfasdf00C',
        username: 'nikola@tesla.com',
        nick_name: 'nikola.2394723984902',
        display_name: 'Nikola Tesla',
        email: 'nikola@tesla.com',
        email_verified: true,
        first_name: 'Nikola',
        last_name: 'Tesla',
        timezone: 'America/Los_Angeles',
        photos: {
          picture: 'https://c.na16.content.force.com/profilephoto/005/F',
          thumbnail: 'https://c.na16.content.force.com/profilephoto/005/T'
        },
        addr_street: null,
        addr_city: null,
        addr_state: null,
        addr_country: 'US',
        addr_zip: '90210',
        mobile_phone: null,
        mobile_phone_verified: false,
        status: {
          created_date: null,
          body: null
        },
        urls: {
          enterprise: 'https://na16.salesforce.com/services/Soap/c/{version}/234234029ZXzasdfasdf00C',
          metadata: 'https://na16.salesforce.com/services/Soap/m/{version}/234234029ZXzasdfasdf00C',
          partner: 'https://na16.salesforce.com/services/Soap/u/{version}/234234029ZXzasdfasdf00C',
          rest: 'https://na16.salesforce.com/services/data/v{version}/',
          sobjects: 'https://na16.salesforce.com/services/data/v{version}/sobjects/',
          search: 'https://na16.salesforce.com/services/data/v{version}/search/',
          query: 'https://na16.salesforce.com/services/data/v{version}/query/',
          recent: 'https://na16.salesforce.com/services/data/v{version}/recent/',
          profile: 'https://na16.salesforce.com/3234234029ZXzasdfasdf00C',
          feeds: 'https://na16.salesforce.com/services/data/v{version}/chatter/feeds',
          groups: 'https://na16.salesforce.com/services/data/v{version}/chatter/groups',
          users: 'https://na16.salesforce.com/services/data/v{version}/chatter/users',
          feed_items: 'https://na16.salesforce.com/services/data/v{version}/chatter/feed-items'
        },
        active: true,
        user_type: 'STANDARD',
        language: 'en_US',
        locale: 'en_US',
        utcOffset: -28800000,
        last_modified_date: '2015-03-12T22:02:09.000+0000',
        is_app_installed: true
      },
    },

  },


  fn: function(inputs, exits) {

    var request = require('request');

    console.log("made it here.");

    var options = {
      url: inputs.id,
      headers: {
        'Authorization': inputs.tokenType + " " + inputs.accessToken
      }
    };

    // console.log("options: ", options);

    request(options, function(error, res, body) {

      body = JSON.parse(body);

      console.log(body);

      return exits.success(body);

    })

  },



};
