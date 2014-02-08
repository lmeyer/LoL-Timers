/* Author: Ludovic Meyer
 */

(function($){
	var socket = io.connect('http://' + $(location).attr('host') + ':8080');

	$(document).ready(function() {

		var room = $(location).attr('hash');

		/**
		 * Defaults and parameters
		 * @type {{wraiths: number, wolves: number, golems: number, blue: number, red: number, dragon: number, nashor: number, ordertower: number, chaostower: number, buffs: {blue: number, red: number, nashor: number}, wards: number, explorers: number}}
		 */
		var timers = {
			wraiths   : 50,
			wolves    : 50,
			golems    : 50,

			blue      : 300,
			red       : 300,

            vilemaw   : 300,
			dragon    : 360,
			nashor    : 420,

			ordertower: 300,
			chaostower: 300,
            altar: 90,
            heal: 90,

			buffs     :
			{
				blue  : 150,
				red   : 150,
				nashor: 240,
                vilemaw   : 120
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

		$(".map").noContext();

		/**
		 * Sound Control
		 */
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

		/**
		 * Rooms Control
		 */
		$('#generate-sync-url').on('click', function(event){
			event.preventDefault();
			var url =  $(location).attr('protocol') + '//' +  $(location).attr('host') + $(location).attr('pathname') + '#' + Math.random().toString(36).substr(2, 7);
			$('#sync-url').attr('href', url).html(url).fadeIn();
		});
		$('#sync-url').on('click', function(event){
			event.preventDefault();
			window.location.href = $(this).attr('href');
			location.reload();
		});

		if(room == '' || room == '#helpModal' || room == '#commentModal' || room == '#syncModal') {
			$('#qrcode-public').show();
		} else {
			$('#private-instance').show();
			$('#sync-url').attr('href', $(location)).html($(location).attr('href')).show();
			$('#generate-sync-url').hide();
			var qrcode = new QRCode("qrcode", {
				width: 128,
				height: 128,
				colorDark : "#333333",
				colorLight : "#ffffff",
				correctLevel : QRCode.CorrectLevel.H
			});
			qrcode.makeCode($(location).attr('href'));
		}

		/**
		 * Countdown Control
		 */
		$(".map").on("mousedown", '.cd', function( event ){
			socket.emit('launchCd', {
				clickType: event.which,
				elemId   : $(this).attr('id'),
				room     : room
			});
			launchCd(event.which, $(this).attr('id'));
		});

		$(".map").click(function( event ) {
            if($(this).parent().parent().hasClass('jungle')) {
                return; // No ward on 3v3
            }
			var id = (new Date).getTime();
            var width = $(".map").width();
            var height = $(".map").height();
            socket.emit('createWard', {
				canCreate: $(event.target).hasClass('bg'),
				id     : id,
				pageX  : event.pageX,
				pageY  : event.pageY,
				offsetLeft : this.offsetLeft,
				offsetTop: this.offsetTop,
                width: width,
                height: height
			});
			createWard( $(event.target).hasClass('bg'), id, event.pageX, event.pageY, this.offsetLeft, this.offsetTop, width, height);
		});

		function launchCd(clickType, elemId) {
			var elem = $('#' + elemId);
			switch (clickType) {
				case 3:
					cdDestroy(elem);
					if(elem.hasClass('wards')){
						elem.remove();
					}
					break;
				default:
                    var buff = timers['buffs'][elem.attr('attr-cd')];
					if(buff !== undefined){
						elem.addClass('buff');
					}
					if(elem.hasClass('explorer')){
						elem.remove();
					} else if(elem.hasClass('pink')){
						elem.addClass('explorer');
						elem.attr('attr-cd', 'explorers');
					}else if(elem.hasClass('wards')){
						elem.addClass('pink');
					}
					cdCreate(elem);
					break;
			}
		}

		function createWard ( canCreate, id, pageX, pageY, offsetLeft, offsetTop, width, height ) {
			if(!canCreate) return;

			var left = pageX - offsetLeft;
			var top = pageY - offsetTop;
            left = left / width * 100;
            top = top / height * 100;

			var new_ward = $('<div class="cd wards" id="'+id+'" attr-cd="wards" style="left:'+left+'%;top:'+top+'%"></div>');
			var new_wardup = $('#wardup').clone();

			if(!$.cookie('mute')) {
				new_wardup.get(0).play();
			}
			$(".map").append(new_ward);
			cdCreate(new_ward);
		}

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
				//Play sound before destroy the countdown
				if(!$.cookie('mute')) {
					if($(this).hasClass('wards')) {
						var new_warddown = $('#warddown').clone();
						new_warddown.get(0).play();
					} else {
						var new_timesup = $('#timesup').clone();
						new_timesup.get(0).play();
					}
				}
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
			cdDestroy(elem);
		}

		function cdDestroy(elem) {
			if(elem == null ) elem = $(this);

			elem.countdown('destroy');
			elem.removeClass('highlight').removeClass('buff');
			if(elem.hasClass('wards')){
				elem.fadeOutAndRemove('slow');
			};
		}

		/**
		 * Mobile Custom
		 */
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

		/**
		 * Sockets Control
		 */

		socket.on('connect', function() {
			socket.emit('room', room);
		});

		socket.on('connected', function(connected){
			$('#connected').html(connected);
		});
		socket.on('join', function(connected){
			var join_sound = $('#join').clone();

			if(!$.cookie('mute')) {
				join_sound.get(0).play();
			}
		});
		socket.on('launchCd', function(data){
			launchCd(data.clickType, data.elemId);
		});
		socket.on('createWard', function(data){
			createWard( data.canCreate, data.id, data.pageX, data.pageY, data.offsetLeft, data.offsetTop, data.width, data.height);
		});
	});
})(jQuery);
