const protected = require("../../middleware/protected");
const pingRoute = require("./ping");
const authRoutes = require("./auth");
const userRoutes = require("./user");

module.exports = app => {
  app.use("/ping", pingRoute);
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/users", protected, userRoutes);
}