

BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Dynamic.Components.Emailinput", {

    templateUrl: "component/%.html",

    initial : {

        attrs : {
            selected_recipient : null,
            showcontacts : false
        },

        collections : {
            recipients : [
                {name: "Oliver Friedmann", email: "Oliver.Friedmann@gmail.com"},
                {name: "Victor Lingenthal", email: "Victor.Lingenthal@gmail.com"}
            ]
        },

        create : function () {
            this.get("recipients").add_secondary_index("email");

        },

        functions : {
            select: function () {},
            add_recipient : function (email) {
                if (email != undefined && BetaJS.Strings.is_email_address(email)) {
                    this.get("recipients").add({name: null, email: email});
                    this.set('value','');
                } else
                    App.Dynamics.notifications.call('error', {message: 'This is not a valid Email'});
            },
            keydown : function (event) {
                var key = event[0].keyCode;
                if (key == 32 || key == 13) {
                    this.call('add_recipient',this.get('value'));
                } else if (key != 8) {
                    this.set('selected_recipient', null);
                } else if (this.get('selected_recipient') && (key == 8 || key == 68)) {
                    this.get("recipients").remove(this.get('selected_recipient'));
                    this.set('selected_recipient', null);
                    $("#recipient_input").focus();
                } else if (key == 8 && !this.get('value') && $("#recipient_input").is(":focus")) {
                    var r = this.get('recipients');
                    var last_recipient = r.getByIndex(r.count() - 1);
                    this.set('selected_recipient', last_recipient);
                }
            }
        }

    }

}).register();


//app.directive('diEmailinput', function() {
//	return {
//		restrict : 'E',
//		replace : true,
//        templateUrl : App.Paths.asset("{pages-directives}/doodadcontainer/inputs/email_input/template.html"),
//        controller: function($scope) {
//            $scope.searchQueryValue = {
//                value: ""
//            };
//            $scope.items = [{
//                name: "Oliver Friedmann", email: "Oliver.Friedmann@gmail.com"},{
//                name: "Victor Lingenthal", email: "Victor.Lingenthal@gmail.com"
//            }];
//            var findIndexByKeyValue = function(obj, key, value) {
//                for (var i = 0; i < obj.length; i++) {
//                    if (obj[i][key] == value) {
//                        return i;
//                    }
//                }
//                return null;
//            };
//            this.add = function (email) {
//                $scope.add(email);
//            };
//            $scope.add = function(email) {
//                if (email != undefined && BetaJS.Strings.is_email_address(email)) {
//                    if (findIndexByKeyValue($scope.items, "email", email) == null) {
//                        $scope.items.push({name: null, email: email});
//                        $scope.to = "";
//                    }
//                    else $scope.to = "";
//                }
//            };
//            $scope.globalKeypress = function(key) {
//                if (key == 32 || key == 13) {
//                    $scope.add($scope.to);
//                } else if (key != 8) {
//                    $scope.selected = null;
//                } else if ($scope.selected && key == 8) {
//                    var index = findIndexByKeyValue($scope.items, "email", $scope.selected);
//                    console.log(index);
//                    $scope.items.splice(index, 1);
//                    $scope.selected = null;
//                    $("#emails").focus();
//                } else if (key == 8 && !($scope.searchQueryValue.value) && $("#emails").is(":focus")) {
//                    var lastitem = $scope.items[$scope.items.length-1];
//                    $scope.setMaster(lastitem.email);
//                }
//            };
//            $scope.isSelected = function(email) {
//                return $scope.selected === email;
//            };
//        },
//		link : function(scope, elem, attrs) {
//            scope.setMaster = function (email) {
//                scope.selected = email;
//            };
//		}
//	};
//});
//
//app.directive('onKeyupFn', function() {
//    return function(scope, elm, attrs) {
//        var keyupFn = scope.$eval(attrs.onKeyupFn);
//        $("body").bind('keyup', function(evt) {
//            scope.$apply(function() {
//                keyupFn.call(scope, evt.which);
//            });
//        });
//    };
//});

