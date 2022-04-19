const User = require("../models/user.model");
const axios = require("axios").default;

test("test get developers", () => {
  const num = 1;
  axios
    .get("http://localhost:5000/developers")
    .then(function (response) {
      expect(typeof response.data).toBe("object");
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});
test("test get testers", () => {
  const num = 1;
  axios
    .get("http://localhost:5000/testers")
    .then(function (response) {
      expect(typeof response.data).toBe("object");
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

test("test login", () => {
  const num = 1;
  axios
    .post("http://localhost:5000/login", {
      email: "huzaifa@fast.com",
      password: "1234",
    })
    .then(function (response) {
      expect(response.data.message).toBe("Logged In");
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});
test("test register", () => {
  const num = 1;
  axios
    .post("http://localhost:5000/register", {
      name: "Huzaifa",
      email: "huzaifa@fast2.com",
      password: "1234",
      userType: "admin",
    })
    .then(function (response) {
      expect(response.data.message).toBe("New User Created");
    })
    .catch(function (error) {});
});
