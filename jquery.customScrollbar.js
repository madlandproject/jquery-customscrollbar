(function(window, $){

var console = window.console;

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
		options = $.extend(opts, defaults);

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

		// attach events
		upButton.on({mousedown: upButtonMouseDownHandler});
		downButton.on({mousedown: downButtonMouseDownHandler});

		track.on({mousedown: trackMouseDownHandler});
		thumb.on({mousedown: thumbMouseDownHandler});

		if ( $.event.special.mousewheel ) {$scrollElement.on({mousewheel: scrollElementMouseWheelHandler});}

		update();	
	}
	
	// general methods
	
	function update()
	{
		window.requestAnimationFrame(function(){
			// frist clamp scroll pos
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
		
		$(window).on('mouseup', windowMouseUpHandler);
		
		startScrollLoop();		
	}
	
	function downButtonMouseDownHandler(event)
	{
		event.preventDefault();
		event.stopPropagation();
		
		scrollingDirection = 1;
		
		$(window).on('mouseup', windowMouseUpHandler);
		
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
		
		//console.log(scrollPosition);
		
		update();
		
		console.log("track click");
	}
	
	function thumbMouseDownHandler(event)
	{
		event.preventDefault();
				
		$(window).on({mousemove: windowMouseMoveHandler, mouseup: windowMouseUpHandler});
		
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
		
		$(window).off({mousemove: windowMouseMoveHandler, mouseup: windowMouseUpHandler});
	}
	
	
	init();
	
	console.log("Custom scrollbar init");
};

}(window, jQuery));