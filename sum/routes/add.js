var express = require("express");
var router = express.Router();

router.post("/add", function (req, res, next) {
  var a = req.body.firstValue;
  var b = req.body.secondValue;
  var arr = {};
  if (a.length > b.length) {
    var extra = "";
    var diff = a.length - b.length;
    for (i = 0; i < diff; i++) {
      extra += "0";
    }
    b = extra + b;
  } else if (b.length > a.length) {
    var extra = "";
    var diff = b.length - a.length;
    for (i = 0; i < diff; i++) {
      extra += "0";
    }
    a = extra + a;
  }
  var j = 1;
  var lastcarry = "";
  var sum = "";
  var max = a.length > b.length ? a.length : b.length;
  for (i = max - 1; i >= 0; i--) {
    var k = parseInt(a[i] || 0);
    var m = parseInt(b[i] || 0);
    var t =
      k + m + (j > 1 ? parseInt(arr["step" + (j - 1)]["one"][0]) : 0) + "";
    arr["step" + j] = { one: t[0], two: t[1] };
    lastcarry = (t.length > 1 ? t[0] : "0") + "" + lastcarry;

    if (j > 1) {
      sum = arr["step" + (j - 1)]["two"];
      arr["step" + j]["two"] =
        (i != 0 ? (t.length > 1 ? parseInt(t[1]) : t) : parseInt(t)) + sum;
      arr["step" + j]["one"] = i != 0 ? lastcarry : lastcarry.slice(1) + "_";
    }
    j++;
  }
  res.json({ status: true, data: arr });
});

module.exports = router;
