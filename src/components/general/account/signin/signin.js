
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Dynamic.Pages.Signin", {

	template: BetaJS.Dynamics.Dynamic.Components.Templates.signin,

	initial: {

		attrs: {
			welcomemessage : 'Welcome',
			brandname : 'Doodads',
			slogan : 'Simplify your life',
			signin : "Signin",
			register : "Register"
		},

		create: function () {

		},

		functions: {

			signin : function () {
				//if (App.Config.tags.server) {
				//	BetaJS.$.ajax({
				//		type : "POST",
				//		async : true,
				//		url : "/api/v1/auth",
				//		data : {
				//			gmail_user : $scope.email,
				//			gmail_password : $scope.password
				//		},
				//		success : function() {
				//			App.Config.email = $scope.email;
				//			App.Config.signed_in = true;
				//			//Remotely.user($scope.email);
				//			//$state.go("list.mix");
				//		},
				//		error : function() {
				//			alert("Password not recognised");
				//		}
				//	});
				//} else {
				//	App.Config.email = $scope.email;
				//	App.Config.signed_in = true;
				//	//$state.go("list.mix");
				//}
			}

		}
	}

}).register();

//
//appControllers.controller('startscreenController', ['$scope', '$state', '$routeParams', '$http', '$location',
//function($scope, $state, $http, $location) {
//
//	BetaJS.Angular.Scope.linkKeyValue($scope, App.Settings, "email", "email", true);
//
//	$scope.version = App.Config.app.version;
//	$scope._ = function(s) {
//		return BetaJS.Locales.get("doodadsapp.account." + s);
//	};
//	$scope.signin = function() {
//		if (App.Config.tags.server) {
//			BetaJS.$.ajax({
//				type : "POST",
//				async : true,
//				url : "/api/v1/auth",
//				data : {
//					gmail_user : $scope.email,
//					gmail_password : $scope.password
//				},
//				success : function() {
//					App.Config.email = $scope.email;
//					App.Config.signed_in = true;
//					//Remotely.user($scope.email);
//                    //$state.go("list.mix");
//				},
//				error : function() {
//					alert("Password not recognised");
//				}
//			});
//		} else {
//			App.Config.email = $scope.email;
//			App.Config.signed_in = true;
//            //$state.go("list.mix");
//		}
//	};
//	$scope.more = function() {
//		// Nothing here for you.
//	};
//	//if (App.Config.signed_in)
//	//	$state.go("list.mix");
//}]);
