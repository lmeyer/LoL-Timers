/* Author: Ludovic Meyer

 */

$(document).ready(function() {

	var timers = {
		wraiths : 50,
		wolves  : 60,
		golems  : 60,

		blue    : 300,
		red     : 300,

		dragon  : 360,
		nashor  : 420,
		
		ordertower: 300,
		chaostower: 300
	};
	
	$.countdown.setDefaults({
		compact: true, 
		format: 'MS',
		description: '',
		onTick: highlightLast10,
		onExpiry: cdDestroy
	});


	$(".cd").click(function() {
		$(this).countdown('destroy').countdown({
			until: +timers[ $(this).attr('class').substr(3) ]
		});
	});
	
	function highlightLast10(periods) { 
	    if ($.countdown.periodsToSeconds(periods) == 5) { 
	        $(this).effect('pulsate', 1000);
	    } 
	}
	
	function cdDestroy() { 
		$(this).countdown('destroy'); 
	}
	
});
