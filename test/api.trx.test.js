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

const addresses = {
  normal: 'TWcyPXgKwMkF8LcwzvJpP1vsAuqDpgizpC'
};

const assets = {
  normal: '1002000'
};

const contracts = {
  address: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
  owner: 'THPvaUhoh2Qn2y9THCZML3H815hhFhn5YC'
};

const blocks = {
  num: 1000000,
  hash: '0000000000c65d40780706f987c228f45289a6c9c081dd90323e5855b469abf3'
};

var api = null;
var coinAPI = null;

describe('api.trx', async() => {
  beforeEach(async() => {
    api = new InfinitoApi(opts);
    coinAPI = api.TRX;
  });
  // ---------------------------------------------------------------------------------------------------
  /** ************************* get TRX wallet Balances *******************************/
  describe('#getBalance', async() => {
    it('TRX', async() => {
      let info = await coinAPI.getBalance(addresses.normal);
      console.log(info);
      info.should.have.property('cd');
      info.should.have.property('data');
      info.data.should.have.property('address');
      info.data.should.have.property('balance');
    });

    it('TRC10', async() => {
      let info = await coinAPI.getTrc10Balance(addresses.normal, assets.normal);
      console.log(info);
      info.should.have.property('cd');
      info.should.have.property('data');
      info.data.should.have.property('address');
      info.data.should.have.property('asset');
      info.data.should.have.property('balance');
    });

    it('TRC20', async() => {
      let info = await coinAPI.getTrc20Balance(addresses.normal, contracts.address, contracts.owner);
      console.log(info);
      info.should.have.property('cd');
      info.should.have.property('data');
      info.data.should.have.property('address');
      info.data.should.have.property('contract');
      info.data.should.have.property('balance');
    });
  });

  /** ************************* get Account info *******************************/
  describe('#getAccountInfo', async() => {
    it('Resource', async() => {
      let info = await coinAPI.getResource(addresses.normal);
      console.log(info);
      info.should.have.property('cd');
      info.should.have.property('data');
    });

    it('Is Active', async() => {
      let info = await coinAPI.isActive(addresses.normal);
      console.log(info);
      info.should.have.property('cd');
      info.should.have.property('data');
    });
  });

  /** ************************* get TRX wallet History *******************************/
  describe('#getHistory', async() => {
    it('TRX', async() => {
      let info = await coinAPI.getTrxHistory(addresses.normal, 0, 10);
      console.log(info);
      info.should.have.property('cd');
      info.should.have.property('data');
      info.data.should.have.property('transactions');
    });

    it('TRC10', async() => {
      let info = await coinAPI.getTrc10History(addresses.normal, assets.normal, 0, 10);
      console.log(info);
      info.should.have.property('cd');
      info.should.have.property('data');
      info.data.should.have.property('transactions');
    });

    it('TRC20', async() => {
      let info = await coinAPI.getTrc20History(addresses.normal, contracts.address, 0, 10);
      console.log(info);
      info.should.have.property('cd');
      info.should.have.property('data');
      info.data.should.have.property('transactions');
    });
  });

  /** ************************* get Network info *******************************/
  describe('#getStatistic', async() => {
    it('Latest Block', async() => {
      let info = await coinAPI.getLatestBlock();
      console.log(info);
      info.should.have.property('cd');
      info.should.have.property('data');
    });

    it('Block Info', async() => {
      let info = await coinAPI.getBlockInfo(blocks.num);
      console.log(info);
      info.should.have.property('cd');
      info.should.have.property('data');
    });
  });
    
  // ---------------------------------------------------------------------------------------------------
  /** ************************* send raw TRX transaction *******************************/
  describe('#sendTransaction', async() => {
    it('Should be fail', async() => {
      let info = await coinAPI.sendTransaction({
        rawtx: { 'visible':false,'txID':'8697c9669dc9b7155c9a6f9809eb63b781b6943f2b62516096518577d235bfe8','raw_data':{ 'contract':[{ 'parameter':{ 'value':{ 'amount':1,'owner_address':'41e286f5824f187aee3896ba4f6be33364b41fd1eb','to_address':'413f9b2979221e27eb3cc1a0abcc926ba48ada300c' },'type_url':'type.googleapis.com/protocol.TransferContract' },'type':'TransferContract' }],'ref_block_bytes':'612c','ref_block_hash':'94edcfa5a43bfcb7','expiration':1571608788000,'timestamp':1571823050458 },'raw_data_hex':'0a02612c220894edcfa5a43bfcb740a0f8bbd9de2d5a65080112610a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412300a1541e286f5824f187aee3896ba4f6be33364b41fd1eb1215413f9b2979221e27eb3cc1a0abcc926ba48ada300c180170dabdd1bfdf2d','signature':['e705424a5bc711f7a3356afd00fe89b770bf92e41f0a21c14aad02c03c6cb0ffd96dfd42e94a84b9a3125cea6f64236f8935399410f591d63f64e2995d376f5901'] }
      });
      console.log(info);
      info.should.have.property('cd');
      info.should.have.property('msg');
    });

    it('Send transaction', async() => {
      let info = await coinAPI.sendTransaction({
        rawtx: { 'visible':false,'txID':'8697c9669dc9b7155c9a6f9809eb63b781b6943f2b62516096518577d235bfe8','raw_data':{ 'contract':[{ 'parameter':{ 'value':{ 'amount':1,'owner_address':'41e286f5824f187aee3896ba4f6be33364b41fd1eb','to_address':'413f9b2979221e27eb3cc1a0abcc926ba48ada300c' },'type_url':'type.googleapis.com/protocol.TransferContract' },'type':'TransferContract' }],'ref_block_bytes':'612c','ref_block_hash':'94edcfa5a43bfcb7','expiration':1571608788000,'timestamp':1571823050458 },'raw_data_hex':'0a02612c220894edcfa5a43bfcb740a0f8bbd9de2d5a65080112610a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412300a1541e286f5824f187aee3896ba4f6be33364b41fd1eb1215413f9b2979221e27eb3cc1a0abcc926ba48ada300c180170dabdd1bfdf2d','signature':['e705424a5bc711f7a3356afd00fe89b770bf92e41f0a21c14aad02c03c6cb0ffd96dfd42e94a84b9a3125cea6f64236f8935399410f591d63f64e2995d376f5901'] }
      });
      console.log(info);
      info.should.have.property('cd');
      info.should.have.property('data');
      info.data.should.have.property('tx_id');
    });
  });

  /** ************************* search tokens *******************************/
  describe('#searchTokens', async() => {
    it('Search Trc10', async() => {
      let info = await coinAPI.searchTrc10('all', 'bit', 0, 10);
      console.log(info);
      info.should.have.property('cd');
      info.should.have.property('data');
    });

    it('Search Trc20', async() => {
      let info = await coinAPI.searchTrc20('all', 'win', 0, 10);
      console.log(info);
      info.should.have.property('cd');
      info.should.have.property('data');
    });
  });
});