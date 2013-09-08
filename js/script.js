/* Author: Ludovic Meyer

 */

$(document).ready(function() {

	var timers = {
		wraiths   : 50,
		wolves    : 50,
		golems    : 50,

		blue      : 300,
		red       : 300,

		dragon    : 360,
		nashor    : 420,
		
		ordertower: 300,
		chaostower: 300,

		buffs     :
		{
			blue  : 150,
			red   : 150,
			nashor: 240
		},
		
		wards     : 180,
		explorers : 60
	};
	
	$.countdown.setDefaults({
		compact: true, 
		format: 'MS',
		description: '',
		onTick: highlightLast10,
		onExpiry: timesUp
	});

	if($.cookie('mute')) {
		$('.sound-control').addClass('muted');
	}

	$('.sound-control').on("click", function(){
		if($.cookie('mute')) {
			$('.sound-control').removeClass('muted');
			$.removeCookie('mute');
		} else {
			$('.sound-control').addClass('muted');
			$.cookie('mute', 'on');
		}
	});

	$(".map").on("mousedown", '.cd', function( event ){

		switch (event.which) {
	        case 3:
	        	cdDestroy($(this));
	        	if($(this).hasClass('wards')){
	        		$(this).remove();
	    		}
	            break;
	        default:
		        if($(this).hasClass('blue') || $(this).hasClass('nashor') || $(this).hasClass('red')){
			        $(this).addClass('buff');
		        }
	        	if($(this).hasClass('explorer')){
	    			$(this).remove();
	    		} else if($(this).hasClass('pink')){
			        $(this).addClass('explorer');
			        $(this).attr('attr-cd', 'explorers');
		        }else if($(this).hasClass('wards')){
	    			$(this).addClass('pink');
	    		}
		        cdCreate($(this));
	            break;
	    }
	});
	
	$(".map").click(function( e ) {
		if(!$(e.target).hasClass('map')) return;
		
		var left = e.pageX - 12 - this.offsetLeft;
		var top = e.pageY - 12 - this.offsetTop;

		var new_ward = $('<div class="cd wards" attr-cd="wards" style="left:'+left+'px;top:'+top+'px"></div>');
		var new_wardup = $('#wardup').clone();

		if(!$.cookie('mute')) {
			new_wardup.get(0).play();
		}
		$(".map").append(new_ward);
		cdCreate(new_ward);
	});
	
	$(".map").noContext();
	
	function highlightLast10(periods) {
		var buff = timers['buffs'][$(this).attr('attr-cd')];
		if( buff !== undefined) {
			if ($.countdown.periodsToSeconds(periods) == timers[$(this).attr('attr-cd')]-buff) {
				$(this).removeClass('buff');
			}
		}

	    if ($.countdown.periodsToSeconds(periods) == 5) { 
	        $(this).effect('pulsate', 1000);
        	$(this).addClass('highlight');
	    } 
	}
	
	function cdCreate(elem) {
		var time = timers[ elem.attr('attr-cd') ];

		elem.countdown('destroy').countdown({
			until: +time
		});
	}

	function timesUp(elem) {
		if(elem == null ) elem = $(this);

		//Play sound before destroy the countdown
		if(!$.cookie('mute')) {
			if(elem.hasClass('wards')) {
				var new_warddown = $('#warddown').clone();
				new_warddown.get(0).play();
			} else {
				var new_timesup = $('#timesup').clone();
				new_timesup.get(0).play();
			}
		}
		cdDestroy(elem);
	}
	
	function cdDestroy(elem) {
		if(elem == null ) elem = $(this);

		elem.countdown('destroy');
		elem.removeClass('highlight');
		if(elem.hasClass('wards')){
			elem.fadeOutAndRemove('slow');
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
