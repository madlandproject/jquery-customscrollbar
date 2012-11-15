(function(window, $){

var console = window.console;

var eventNs = 'customscrollbar';

var defaults = {
	resizeThumb: true,
	scrollPosition: 0
};

$.fn.customScrollbar = function(opts)
{
	var options;
	
	var self = this;
	
	var scrollPosition;
	var scrollElement;
	var $scrollElement;
	
	var upButton;
	var track;
	var thumb;
	var downButton;
	
	var scrollingDirection = 0;
	var scrollingInterval;
	
	function init()
	{
		options = $.extend({}, defaults, opts);

		if ( ! options.scrollElement) 
		{
			throw( new Error('Plugin needs an element to scroll') );
		}

		// tracking vars
		scrollPosition = options.scrollPosition;

		// get elements
		scrollElement = options.scrollElement;
		$scrollElement = $(options.scrollElement);
		
		upButton   = ( options.upButton )   ? options.upButton : (self.find('.up').length > 0) ? self.find('.up') : null;

		track      = ( options.track )       ? options.track : self;

		thumb      = ( options.thumb )       ? options.thumb    : (self.find('.thumb').length > 0) ? self.find('.thumb') : null;

		downButton = ( options.downButton ) ? options.downButton     : (self.find('.down').length > 0) ? self.find('.down') : null;
		
		// check if scrolling is needed
		if (scrollElement.clientHeight >= scrollElement.scrollHeight) 
		{
			track.fadeOut(150);
			return;
		}
		else
		{
			track.fadeIn(150);
		}
		
		// kill events from previous plugin call
		for (var element in [scrollElement, upButton, track, thumb, downButton, window])
		{
			$(element).off('.customscrollbar');	
		}
		
		// attach events
		upButton.on({'mousedown.customscrollbar': upButtonMouseDownHandler});
		downButton.on({'mousedown.customscrollbar': downButtonMouseDownHandler});

		track.on({'mousedown.customscrollbar': trackMouseDownHandler});
		thumb.on({'mousedown.customscrollbar': thumbMouseDownHandler});

		if ( $.event.special.mousewheel ) {$scrollElement.on({'mousewheel.customscrollbar': scrollElementMouseWheelHandler});}

		update();	
	}
	
	// general methods
	
	function update()
	{		
		window.requestAnimationFrame(function(){
			// clamp scroll pos
			scrollPosition = (scrollPosition < 0) ? 0 : (scrollPosition > 1) ? 1 : scrollPosition;

			// update scrolled element
			scrollElement.scrollTop = (scrollElement.scrollHeight - scrollElement.clientHeight) * scrollPosition;

			// resize thumb
			if (options.resizeThumb)
			{

			}

			// update thumb position
			var startPosition = upButton.height() + (thumb.height()/2);

			var availableHeight = track.height() - upButton.height() - thumb.height() - downButton.height();

			var pixelPosition = startPosition + Math.round(availableHeight * scrollPosition) - (thumb.height()/2);

			thumb.css('top', pixelPosition+"px" );
		});
	}
	
	function startScrollLoop()
	{
		scrollingInterval = window.setInterval(function(){
			
			scrollPosition += (scrollingDirection * 0.01);  
			
			update();
			
		}, 33.3); // 30fps
	}
	
	function stopScrollLoop()
	{
		scrollingDirection = 0;
		
		window.clearInterval( scrollingInterval );
	}
	
	function stopThumbDragging()
	{
		
	}
	
	// event handlers
	
	function upButtonMouseDownHandler(event)
	{
		event.preventDefault();
		event.stopPropagation();
		
		scrollingDirection = -1;
		
		$(window).on({'mouseup.customscrollbar': windowMouseUpHandler});
		
		startScrollLoop();		
	}
	
	function downButtonMouseDownHandler(event)
	{
		event.preventDefault();
		event.stopPropagation();
		
		scrollingDirection = 1;
		
		$(window).on({'mouseup.customscrollbar': windowMouseUpHandler});
		
		startScrollLoop();		
	}
	
	function scrollElementMouseWheelHandler(event, delta, deltaX, deltaY)
	{
		event.preventDefault();
				
		scrollPosition -= (deltaY / 100);
				
		update();
	}
	
	function trackMouseDownHandler(event)
	{
		event.preventDefault();
		
		// get position
		var mouseY = event.pageY - track.offset().top;
		
		var adjustedMouseY = mouseY - upButton.height() - (thumb.height() / 2);
		var clampedHeight = track.height() - upButton.height() - downButton.height() - thumb.height();
		
		scrollPosition =  adjustedMouseY / clampedHeight;
		
		update();
	}
	
	function thumbMouseDownHandler(event)
	{
		event.preventDefault();
				
		$(window).on({'mousemove.customscrollbar': windowMouseMoveHandler, 'mouseup.customscrollbar': windowMouseUpHandler});
		
		event.stopPropagation();
	}
	
	
		
	function windowMouseMoveHandler(event)
	{
		event.preventDefault();
		
		//scrollPosition = (event.pageY - track.offset().top) / track.height();
		
		var mouseY = event.pageY - track.offset().top;
		
		var adjustedMouseY = mouseY - upButton.height() - (thumb.height() / 2);
		var clampedHeight = track.height() - upButton.height() - downButton.height() - thumb.height();
				
		scrollPosition =  adjustedMouseY / clampedHeight;
		
		update();
	}
	
	function windowMouseUpHandler(event)
	{
		event.preventDefault();
		
		// stop up/down button pressing
		stopScrollLoop();
		
		// stop dragging thumn
		stopThumbDragging();
		
		$(window).off('.customscrollbar');
		
		//$(window).off({mousemove: windowMouseMoveHandler, mouseup: windowMouseUpHandler});
	}
	
	init();
};

}(window, jQuery));