
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Dynamic.Components.Eventitem", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.eventitem

}).register("ba-eventitem");

//app.directive('diEventitem', function () {
//    return {
//        restrict: 'E',
//        templateUrl: App.Paths.asset("{pages-directives}/list/multilist/listitems/items/eventitem/template.html"),
//        replace: true,
//        scope: false,
//
//        link: function($scope,element) {
//
//            // TODO: what should happen when we drop onto an item? for now, we simply replace it's number with the original one as an example
//            var drop = new BetaJS.UI.Interactions.Drop(element, {
//                enabled: true,
//                droppable: function () {
//                    return true;
//                },
//                bounding_box: function (bb) {
//                    var height = bb.bottom - bb.top + 1;
//                    var margin = Math.floor(height * 0.2);
//                    bb.top += margin;
//                    bb.bottom -= margin;
//                    return bb;
//                }
//            });
//            drop.on("hover", function (dr) {
//                dr.modifier.css("background-color", "green");
//            });
//            drop.on("hover-invalid", function (dr) {
//                dr.modifier.css("background-color", "gray");
//            });
//            drop.on("dropped", function (event) {
//                console.log("Dropped Data: " + JSON.stringify(event.source.data));
//                $scope.number = event.source.data.number;
//                $scope.$digest();
//            });
//        }
//    };
//});