test("data/mesh : simple properties", function () {
	var outer = new BetaJS.Properties.Properties();
	outer.set("inner", 1);
	var mesh = new BetaJS.Dynamics.Data.Mesh([outer], outer);
	var counter = 0;
	mesh.watch(["inner"], function () {
		counter++;
	}, {});
	QUnit.equal(counter, 0);
	outer.set("inner", 2);
	QUnit.equal(counter, 1);
});

test("data/mesh : nested properties", function () {
	var outer = new BetaJS.Properties.Properties();
	var inner1 = new BetaJS.Properties.Properties();
	var inner2 = new BetaJS.Properties.Properties();
	outer.set("inner", inner1);
	inner1.set("attr", "value1");
	inner2.set("attr", "value2");
	var mesh = new BetaJS.Dynamics.Data.Mesh([outer], outer);
	var counter = 0;
	mesh.watch(["inner.attr"], function () {
		counter++;
	}, {});
	QUnit.equal(counter, 0);
	inner1.set("attr", "value1x");
	QUnit.equal(counter, 1);
	outer.set("inner", inner2);
	QUnit.equal(counter, 2);
});