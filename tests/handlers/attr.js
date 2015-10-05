"use strict";

/**
 * @TODO This test does not currently catch the edge case shadowing bug.
 * However, if the bug shows up again, this test serves as a starting point.
 *
 * This test is written in to ensure the updateElement does not cause a
 * permanent overshadowing of any variables in the Mesh layers.
 */
QUnit.test("handlers/attr : prevent variable overshadowing on event", function(assert) {
  /**
   * domEvent is the name of the temporarily overshadowed variable.
   */
  var dynamic = new BetaJS.Dynamics.Dynamic({
    element: $("div#qunit-fixture"),
    template: "<div id='attr-test' onkeyup='console.log({{domEvent}})' ba-repeat='{{ domEvent :: [1,2,3] }}'>{{domEvent}}</div>"}
  );
  dynamic.activate();

  var root = $("div#attr-test");

  assert.equal(root.html(), "123");

  /**
   * Triggering the keyup will execute attr#updateElement. This method is where
   * the overshadowing occurs.
   */
  root.keyup();

  assert.equal(root.html(), "123");
});
