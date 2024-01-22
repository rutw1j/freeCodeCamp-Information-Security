const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

describe('Functional Tests', function() {

  /* Test 1: Viewing one Stock*/
  it("Viewing one Stock", function(done) {
    chai.request(server).keepOpen()
      .get('/api/stock-prices')
      .query({stock: 'GOOG'})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, 'stockData');
        assert.property(res.body.stockData, 'stock');
        assert.property(res.body.stockData, 'price');
        assert.property(res.body.stockData, 'likes');
        assert.equal(res.body.stockData.stock, 'GOOG');
        assert.isNotNull(res.body.stockData.price);
        done();
      });
  });
  /* Test 1: Viewing one Stock*/


  /* Test 2: Viewing one Stock and Liking it */
  it("Viewing one Stock and Liking it", function(done) {
    chai.request(server).keepOpen()
      .get('/api/stock-prices')
      .query({stock: 'GOOG', like: true})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, 'stockData');
        assert.property(res.body.stockData, 'stock');
        assert.property(res.body.stockData, 'price');
        assert.property(res.body.stockData, 'likes');
        assert.equal(res.body.stockData.stock, 'GOOG');
        assert.isNotNull(res.body.stockData.price);
        assert.isNotNull(res.body.stockData.likes);
        done();
      });
  });
  /* Test 2: Viewing one Stock and Liking it */


  /* Test 3: Viewing one Stock and Liking it Again */
  it("Viewing one Stock and Liking it Again", function(done) {
    chai.request(server).keepOpen()
    .get('/api/stock-prices')
    .query({stock: 'GOOG', like: true})
    .end(function(err, res) {
      assert.equal(res.status, 200);
      assert.property(res.body, 'stockData');
      assert.property(res.body.stockData, 'stock');
      assert.property(res.body.stockData, 'price');
      assert.property(res.body.stockData, 'likes');
      assert.equal(res.body.stockData.stock, 'GOOG');
      assert.isNotNull(res.body.stockData.price);
      assert.equal(res.body.stockData.likes, 1);
      done();
    });
  });
  /* Test 3: Viewing one Stock and Liking it Again */


  /* Test 4: Viewing two Stocks */
  it("Viewing two Stocks", function(done) {
    chai.request(server).keepOpen()
    .get('/api/stock-prices')
    .query({ stock: ['GOOG', 'MSFT'] })
    .end(function(err, res) {
      assert.equal(res.status, 200);
      assert.property(res.body, 'stockData');
      assert.isArray(res.body.stockData);
      assert.lengthOf(res.body.stockData, 2);
      assert.property(res.body.stockData[0], 'stock');
      assert.property(res.body.stockData[1], 'stock');
      assert.property(res.body.stockData[0], 'price');
      assert.property(res.body.stockData[1], 'price');
      assert.property(res.body.stockData[0], 'likes');
      assert.property(res.body.stockData[1], 'likes');
      assert.property(res.body.stockData[0], 'rel_likes');
      assert.property(res.body.stockData[1], 'rel_likes');
      assert.equal(res.body.stockData[0].stock, 'GOOG');
      assert.equal(res.body.stockData[1].stock, 'MSFT');
      assert.isNotNull(res.body.stockData[0].price);
      assert.isNotNull(res.body.stockData[1].price);
      done();
    });
  });
  /* Test 4: Viewing two Stocks */


  /* Test 5: Viewing two Stocks and Liking them */
  it("Viewing two Stocks and Liking them", function(done) {
    chai.request(server).keepOpen()
    .get('/api/stock-prices')
    .query({ stock: ['GOOG', 'MSFT'], like: true })
    .end(function(err, res) {
      assert.equal(res.status, 200);
      assert.property(res.body, 'stockData');
      assert.isArray(res.body.stockData);
      assert.lengthOf(res.body.stockData, 2);
      assert.property(res.body.stockData[0], 'stock');
      assert.property(res.body.stockData[1], 'stock');
      assert.property(res.body.stockData[0], 'price');
      assert.property(res.body.stockData[1], 'price');
      assert.property(res.body.stockData[0], 'likes');
      assert.property(res.body.stockData[1], 'likes');
      assert.property(res.body.stockData[0], 'rel_likes');
      assert.property(res.body.stockData[1], 'rel_likes');
      assert.equal(res.body.stockData[0].stock, 'GOOG');
      assert.equal(res.body.stockData[1].stock, 'MSFT');
      assert.isNotNull(res.body.stockData[0].price);
      assert.isNotNull(res.body.stockData[1].price);
      assert.equal(res.body.stockData[0].likes, 1);
      assert.equal(res.body.stockData[1].likes, 1);
      assert.equal(res.body.stockData[0].rel_likes, 0);
      assert.equal(res.body.stockData[1].rel_likes, 0);
      done();
    });
  });
  /* Test 5: Viewing two Stocks and Liking them */

});
