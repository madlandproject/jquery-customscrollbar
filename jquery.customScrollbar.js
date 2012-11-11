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
		upButton.on({mousedown: upButtonMouseDownHandler, click: upButtonClickHandler});
		downButton.on({mousedown: downButtonMouseDownHandler, click: downButtonClickHandler});

		track.on({click: trackClickHandler});
		thumb.on({mousedown: thumbMouseDownHandler, mouseup: thumbMouseUpHandler});

		if ( $.event.special.mousewheel ) {$scrollElement.on({mousewheel: scrollElementMouseWheelHandler});}

		update();	
	}
	
	// general methods
	
	function update()
	{
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
		
	}
	
	function mouseDownLoop()
	{
		
	}
	
	// event handlers
	// up button
	function upButtonClickHandler(event)
	{
		event.preventDefault();
		
		scrollPosition -= 0.03;
		
		update();
		
		event.stopPropagation();
	}
	
	function upButtonMouseDownHandler(event)
	{
		event.preventDefault();
		
		
		event.stopPropagation();
	}
	
	// down button
	function downButtonClickHandler(event)
	{
		event.preventDefault();
		
		scrollPosition += 0.03;
			
		update();
		
		event.stopPropagation();
	}
	
	function downButtonMouseDownHandler(event)
	{
		event.preventDefault();
		
		
		
		event.stopPropagation();
	}
	
	function scrollElementMouseWheelHandler(event, delta, deltaX, deltaY)
	{
		event.preventDefault();
				
		scrollPosition -= (deltaY / 100);
				
		update();
	}
	
	function trackClickHandler(event)
	{
		event.preventDefault();
		
		console.log("track click");
	}
	
	function thumbMouseDownHandler(event)
	{
		event.preventDefault();
		console.log("thumb mouse down");
		
		$(window).on('mouseup', windowMouseUpHandler);
		
		event.stopPropagation();
	}
	
	function thumbMouseUpHandler(event)
	{
		event.preventDefault();
		console.log("thumb mouse up");
		
		event.stopPropagation();
	}
	
	function windowMouseUpHandler(event)
	{
		event.preventDefault();
		
		$(window).off('mouseup', windowMouseUpHandler);
		
		console.log("window mouse up");
	}
	
	
	init();
	
	console.log("Custom scrollbar init");
};

}(window, jQuery));