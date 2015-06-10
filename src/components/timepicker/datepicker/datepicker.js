
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Dynamic.Components.Datepicker", {

    templateUrl: "../components/timepicker/%/%.html"

}).register();

//app.directive('diDatepicker', function() {
//
//    return {
//        restrict : 'E',
//        replace : true,
//        templateUrl : App.Paths.asset("{pages-directives}/doodadcontainer/inputs/timepicker/datepicker/template.html"),
//        scope : {
//            data : "=",
//            increment : "@"
//        },
//        controller : function ($scope) {
//
//            $scope.start_value = $scope.data.value || BetaJS.Time.now();
//
//        },
//        link : function ($scope, $element) {
//
//            var numberselement = $element.find( 'numbers' );
//
//            BetaJS.Async.eventually(function () {
//                var element = numberselement;
//
//                var today = BetaJS.Time.floorTime($scope.start_value, "hours");
//                inc_day = function (i) {
//                    var inc_day = new Date(BetaJS.Time.incrementTime(today, {day: i}));
//                    return inc_day;
//                };
//
//                var low = 0;
//                var high = 35;
//
//                appendedelement = function (i) {
//                    return "<number data-date='" + inc_day(i).getTime() + "'>"
//                        + "<p>" + App.Helpers.Time.day_to_string(inc_day(i).getDay()).slice(0,3).toLowerCase() + "&nbsp;" + "</p>"
//                        + "<p>" + App.Helpers.Time.two_digits(inc_day(i).getDate()) + "</p>"
//                        + "<p>" + App.Helpers.Time.month_to_string(inc_day(i).getMonth()).slice(0,3).toLowerCase() + "</p>"
//                        + "</number>";
//                };
//
//                for (var i = 0; i <= high; ++i)
//                    element.append(appendedelement(i));
//
//                element.find( '>:nth-child(1)' ).css({"background":"white","color":"black"});
//
//                var scroll = new BetaJS.UI.Interactions.InfiniteScroll(element, {
//                    enabled: true,
//                    discrete: true,
//                    currentCenter: true,
//                    append: function (count, callback) {
//                        for (var i = high+1; i <= high+1 + count; ++i)
//                            element.append(appendedelement(i));
//                        high += count;
//                        document.title = low + " - " + high;
//                        callback(count, true);
//                    },
//                    prepend: function (count, callback) {
//                        for (var i = low-1; i >= low-1-count; --i)
//                            element.prepend(appendedelement(i));
//                        low -= count;
//                        document.title = low + " - " + high;
//                        callback(count, true);
//                    }
//                });
//
//                scroll.on("scroll", function () {
//                    numberselement.children().css({"background":"#F4F4F4","color":"#999999"});
//                    scroll.currentElement().css({"background":"white","color":"black"});
//                });
//
//                scroll.on("scrolltoend", function () {
//                    $scope.data.value = scroll.currentElement().data( "date" );
//                    $scope.$apply();
//                });
//
//            });
//
//        }
//    };
//
//});
