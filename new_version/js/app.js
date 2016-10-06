var xihuang = angular.module('xihuang', ['ui.bootstrap'])

.controller('MainCtrl', function($scope){

	$scope.nextSlide = function(){
		$carousel_items = $('.carousel_item');
		$carousel_items.each(function(i){
			if($(this).hasClass('show')){
				$(this).removeClass('show');
				$(this).addClass('hide');
			}else if($(this).hasClass('hide')){
				$(this).removeClass('hide');
				$(this).addClass('show');
			}
		});
	}

});


