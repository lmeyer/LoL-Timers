/* Author: Ludovic Meyer

 */

$(document).ready(function() {

	var timers = {
		wraiths   : 50,
		wolves    : 60,
		golems    : 60,

		blue      : 300,
		red       : 300,

		dragon    : 360,
		nashor    : 420,
		
		ordertower: 300,
		chaostower: 300,
		
		wards     : 180
	};
	
	$.countdown.setDefaults({
		compact: true, 
		format: 'MS',
		description: '',
		onTick: highlightLast10,
		onExpiry: cdDestroy
	});


	$(".cd").click(function() {
		cdCreate($(this));
	});
	
	$(".map").click(function( e ) {
		if(!$(e.target).hasClass('map')) return;
		
		var left = e.pageX-12;
		var top = e.pageY-12;
		
		var $new_ward = $('<div class="cd wards" style="left:'+left+'px;top:'+top+'px"></div>');
		$("body").append($new_ward)
		cdCreate($new_ward);
	});
	
	
	
	function highlightLast10(periods) { 
	    if ($.countdown.periodsToSeconds(periods) == 5) { 
	        $(this).effect('pulsate', 1000);
        	$(this).addClass('highlight');
	    } 
	}
	
	function cdCreate(elem) {
		elem.countdown('destroy').countdown({
			until: +timers[ elem.attr('class').substr(3) ]
		});
	}
	
	function cdDestroy() { 
		$(this).countdown('destroy');
		$(this).removeClass('highlight');
		if($(this).hasClass('wards')){
			$(this).fadeOutAndRemove('slow');
		};
	}

	window.setTimeout(function() {
		var bubble = new google.bookmarkbubble.Bubble();
		bubble.hasHashParameter = function() {
		};
		bubble.setHashParameter = function() {
		};
		bubble.showIfAllowed();
	}, 1000);
	
	jQuery.fn.fadeOutAndRemove = function(speed){
	    $(this).fadeOut(speed,function(){
	        $(this).remove();
	    })
	}
});
