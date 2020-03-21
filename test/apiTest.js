const expect = require("chai").expect;
const axios = require("axios");
const config = require("../src/config/index");
const { sequelize } = require("../src/models");
const BASE_URL = config.testHost || "http://localhost:4000";

if (config.environment == "local") {
  describe("API test", function() {
    before(async function() {
      await sequelize.query(`SET FOREIGN_KEY_CHECKS = 0;
      TRUNCATE cars;
      TRUNCATE customers;
      TRUNCATE rentals;
      TRUNCATE _migration;        
      SET FOREIGN_KEY_CHECKS = 1;`);
    });
    after(async function() {
      await sequelize.query(`SET FOREIGN_KEY_CHECKS = 0;
      TRUNCATE cars;
      TRUNCATE customers;
      TRUNCATE rentals;
      TRUNCATE _migration;        
      SET FOREIGN_KEY_CHECKS = 1;`);
    });
    describe("car API", function() {
      let input = {
        builtYear: 2011,
        vehicleNumber: "B 12345 Test",
        brand: "Toyota",
        available: true,
        capacity: 5,
        rentPrice: 150000
      };
      let fakeInput = {
        year: 2011,
        vehicleNumber: "B 12345 Test",
        brand: "Toyota",
        available: true,
        capacity: 5,
        rentPrice: 150000
      };
      let result = null;
      let brandNew = "Mitsubishi";
      let fakeCarId = 4444;
      it("should ok when add a car", async function() {
        const resp = await axios.post(BASE_URL + "/car", input);
        expect(resp.status).to.eql(200);
        result = resp.data;
      });

      it("should 400 when add a car with not formating payload", async function() {
        const resp = await axios
          .post(BASE_URL + "/car", fakeInput)
          .catch(function(err) {
            expect(err.response.status).to.eql(400);
          });
      });

      it("should ok when get a car", async function() {
        const resp = await axios.get(BASE_URL + `/car/${result.id}`);
        expect(resp.status).to.eql(200);
      });

      it("should 404 when get a not existing car", async function() {
        const resp = await axios
          .get(BASE_URL + `/car/${fakeCarId}`)
          .catch(function(err) {
            expect(err.response.status).to.eql(404);
          });
      });

      it("should ok when update a car", async function() {
        var payload = {
          brand: brandNew
        };
        const resp = await axios.put(BASE_URL + `/car/${result.id}`, payload);
        expect(resp.status).to.eql(200);
      });

      it("brand should updated to mitsubishi", async function() {
        const resp = await axios.get(BASE_URL + `/car/${result.id}`);
        expect(resp.status).to.eql(200);
        expect(resp.data.brand).to.eql(brandNew);
      });

      it("should ok when delete a car", async function() {
        const resp = await axios.delete(BASE_URL + `/car/${result.id}`);
        expect(resp.status).to.eql(200);
      });

      it("should 404 when delete a not existing car", async function() {
        const resp = await axios
          .delete(BASE_URL + `/car/${fakeCarId}`)
          .catch(function(err) {
            expect(err.response.status).to.eql(404);
          });
      });
    });
    // add other API to test in here
  });
}
