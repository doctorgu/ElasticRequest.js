var express = require("express");
var router = express.Router();
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const dir = "public/files";

router.get("/", async function (req, res) {
  return res.send("");
});
router.post("/", async function (req, res) {
  const body = req.body;

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `http://198.18.227.37:9200${body.path}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: { query: body.query },
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return res.status(200).send(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
