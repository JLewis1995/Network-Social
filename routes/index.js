const router = require("express").Router();
const apiRoutes = require("./api");

// current route http://localhost:3001/

router.use("/api", apiRoutes);

router.use((req, res) => {
  return res.send("Wrong route!");
});

module.exports = router;
