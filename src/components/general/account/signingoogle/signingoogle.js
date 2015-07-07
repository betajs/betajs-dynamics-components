
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Dynamic.Pages.XXX", {

	template: BetaJS.Dynamics.Dynamic.Components.Templates.xxx,

	initial: {

		attrs: {
			welcomemessage : 'Welcome',
			brandname : 'Doodads',
			slogan : 'Simplify your life',
			signin : "Signin",
			register : "Register"
		},

		functions: {

		}
	}

}).register();

//
//appControllers.controller('signingoogleController', ['$scope', '$state', '$routeParams', '$http', '$location',
//function($scope, $state, $http, $location) {
//
//	var url;
//
//	if (App.Config.tags.server) {
//		BetaJS.$.ajax({
//			type : "POST",
//			async : true,
//			url : "/api/accounts/signin",
//			data: {
//				redirect: "/"
//			},
//			success : function(data) {
//				if (data.email) {
//					App.Config.email = data.email;
//					App.Config.signed_in = true;
//					$state.go("list.mix");
//				} else {
//					console.log(data);
//					url = data.oauth;
//				}
//			}
//		});
//	}
//
//	$scope.startmessage = {show: false};
//
//	$scope.version = App.Config.app.version;
//	$scope._ = function(s) {
//		return BetaJS.Locales.get("doodadsapp.account." + s);
//	};
//	$scope.signin = function() {
//		if (App.Config.tags.server) {
//			document.location.href = url;
//		} else {
//			//App.Config.email = $scope.email;
//			App.Config.signed_in = true;
//            $state.go("list.mix");
//		}
//	};
//}]);
