const InfinitoApi = require('../index');
const ConfigTest = require('./config.test');
const chai = require('chai');
chai.should();

const opts = {
  apiKey: ConfigTest.API_KEY,
  secret: ConfigTest.SECRECT,
  baseUrl: ConfigTest.BASE_URL,
  logLevel: ConfigTest.LOG_LEVEL
};

var api = null;
var webhookAPI = null;
const userEventId = '5dad651f0bba6141af371ffa';
const addresses = [
  '0xbb562e5624165953e3d026054a951509c7e9600f'
];

describe('api.v2.webhook', async() => {
  beforeEach(async() => {
    api = new InfinitoApi(opts);
    webhookAPI = api.getWebhookService('v2').Webhook;
  });

  describe('#get_all_user_event()', async() => {
    it('', async() => {
      let userEvents = await webhookAPI.getWebhookEvents();
      userEvents.should.have.property('data');
      userEvents.data[0].should.have.property('event_id');
    });
  });
 
  describe('#get_user_event()', async() => {
    it('', async() => {
      let userEvent = await webhookAPI.getUserWebhookEvent(userEventId);
      userEvent.should.have.property('data');
      userEvent.data.should.have.property('event_id');
      userEvent.data.should.have.property('user_event_id');
    });
  });

  describe('#add_addresses_of_user_event()', async() => {
    it('', async() => {
      let userEvent = await webhookAPI.addAddrsOfUserEvent(userEventId, { addresses : addresses });
      userEvent.should.have.property('data');
    });
  });


  describe('#delete_addresses_of_user_event()', async() => {
    it('', async() => {
      let userEvent = await webhookAPI.deleteAddrsOfUserEvent(userEventId, { addresses : addresses });
      userEvent.should.have.property('data');
    });
  });

  
  describe('#get_addresses_of_user_event()', async() => {
    it('', async() => {
      let userEvent = await webhookAPI.getAddrsOfUserEvent(userEventId);
      userEvent.should.have.property('data');
      userEvent.data.should.have.property('items');
    });
  });

  describe('#stop_user_event()', async() => {
    it('', async() => {
      let userEvent = await webhookAPI.stopUserEvent(userEventId);
      userEvent.should.have.property('data');
    });
  });

  describe('#start_user_event()', async() => {
    it('', async() => {
      let userEvent = await webhookAPI.startUserEvent(userEventId);
      userEvent.should.have.property('data');
    });
  });
  
});