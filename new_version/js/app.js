var xihuang = angular.module('xihuang', ['ui.bootstrap'])

.controller('MainCtrl', function($scope){
	$(function(){
		$("#xh_portfolio").owlCarousel({
		
		    autoPlay: 3000, //Set AutoPlay to 3 seconds
		
		    items : 3,
		    itemsDesktop : [1199,3],
		    itemsDesktopSmall : [979,3]
		
		});
	});
});


