
define(function (require) {
    "use strict";

    var Donut = require('js/donut');
    require('js/scroll');

  var dataset = {
      title: "REVENUE",
      source: [{
          target: "Tablet",
          color: "red",
          value: [20000, 40000, 30000, 20000, 10000]
      }, {
          target: "Smartphone",
          color: "blue",
          value: [10000, 20000, 20000, 60000, 80000]
      }]
  };
  //We prepare the dough
  var mahDoughnut = new Donut(dataset);
  //We bake them
  mahDoughnut.bake("#donut_choco")
  mahDoughnut.bake("#donut_glace")
  mahDoughnut.bake("#donut_cream")

 });
