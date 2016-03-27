
define(function (require) {
    "use strict";

    var Donut = require('js/donut');
    require('js/scroll');
    require('js/lib/utils');

  var dataset =[
    {
      title: "REVENUE",
      units: "€",
      source: [{
          target: "Tablet",
          color: "#5cd235",
          value: [30000, 30000, 30000, 30000]
      }, {
          target: "Smartphone",
          color: "#0b6400",
          value: [20000, 20000, 20000, 20000]
      }]
  },
  {
    title: "IMPRESSIONS",
    source: [{
        target: "Tablet",
        color: "#1ec4e2",
        value: [5000000, 5000000, 5000000, 1000000, 2000000, 2000000]
    }, {
        target: "Smartphone",
        color: "#074b65",
        value: [5000000, 5000000, 5000000, 5000000, 5000000, 5000000]
    }]
},
{
  title: "VISITS",
  source: [{
      target: "Tablet",
      color: "#fdbf01", //480000000
      value: [100000000, 100000000, 100000000, 100000000, 40000000, 40000000]
  }, {
      target: "Smartphone",
      color: "#d85510", //120000000
      value: [50000000, 25000000, 25000000, 5000000, 10000000, 5000000]
  }]
}
];
  //We prepare the dough
  window.mahDoughnut= [];
  var myDonut = window.mahDoughnut;
  myDonut[0] = new Donut(dataset[0]);
  //We bake them
  myDonut[0].bake("#donut_choco");

  //We prepare the dough
  myDonut[1] = new Donut(dataset[1]);
  //We bake them
  myDonut[1].bake("#donut_glace");

  //We prepare the dough
  myDonut[2] = new Donut(dataset[2]);
  //We bake them
  myDonut[2].bake("#donut_cream");


 });
 var scrollCleanAndBake = function(scrolldiv,donut,total,cleandiv){
   scroll(scrolldiv,donut,total);
   cleanDiv(cleandiv);
   mahDoughnut[donut].bake('#'+cleandiv);
 };
