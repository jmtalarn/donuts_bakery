define(function(require) {
    var Donut = require('donut');
    var dataset;
    describe("Baking doughnuts! The Dunkin'donuts nightmare has arrived! ", function() {


        //Setup
        beforeEach(function() {
            dataset = {
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
        });
        //TearDown
        afterEach(function() {
            var myDonuts = document.getElementById("bakery");
            while (myDonuts.firstChild) {
                myDonuts.removeChild(myDonuts.firstChild);
            }
        });

        it("If we prepare the ingredients the Donut dough is ready to bake", function() {
            var aDonut = new Donut(dataset);

            expect(aDonut.data).toBeDefined();
        });
        it("Baking DOOOOOUGHNUUUUTS! There is a donut", function() {
            var aDonut = new Donut(dataset);
            expect(aDonut.data).toBeDefined();
            expect(aDonut.data).toEqual(dataset);
            aDonut.bake('#bakery');
            var bakery = document.getElementById('bakery');
            expect(bakery).toBeTruthy();
            var donut = bakery.getElementsByTagName("svg")[0];
            expect(donut).toBeTruthy();
            dataset.source.forEach(function(topping, index) {
                expect(donut.getElementById(topping.target)).toBeTruthy();
                expect(donut.getElementById(topping.target).getAttribute("fill")).toEqual(topping.color);
            });

        });
        it("Without place to work the dough there is nothing to do", function() {
            var aDonut = new Donut(dataset);
            aDonut.bake();
            expect(aDonut.bake()).toBeUndefined();
            var bakery = document.getElementById('bakery');
            expect(bakery.getElementsByTagName("svg").length).toBeFalsy();

            //expect(  aDonut.bake() ).toThrow(new Error("Failed to execute 'querySelector' on 'Document': The provided selector is empty."))
        });
        it("Without ingredients there isn't dough", function() {
            var aDonut = new Donut();

            expect(aDonut.data).toBeUndefined();
        });
        it("Without ingredients, you cannot bake the doughnuts", function() {
            var aDonut = new Donut();
            expect(function() {
                    aDonut.bake('#bakery');
                }).toThrow(new Error("Cannot read property 'source' of undefined"))
                //expect(aDonut.bake('#bakery')).toThrow(new Error());
        });

    });

});
