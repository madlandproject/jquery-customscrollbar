(function(window, $){

var console = window.console;

var defaults = {
	resizeThumb: true,
	scrollPosition: 0
};

$.fn.customScrollbar = function(opts)
{
	var options = $.extend(opts, defaults);
	
	if ( ! options.scrollElement) 
	{
		throw( new Error('Plugin needs an element to scroll') );
	}
	
	// tracking vars
	var scrollPosition = options.scrollPosition;
	
	// get elements
	var scrollElement = options.scrollElement;
	var $scrollElement = $(options.scrollElement);

	var upButton   = ( options.upButton )   ? options.upButton : (this.find('.up').length > 0) ? this.find('.up') : $('<div />') ;
	
	var track      = ( options.track )       ? options.track : this;
	
	var thumb      = ( options.thumb )       ? options.thumb    : (this.find('.thumb').length > 0) ? this.find('.thumb') : $("<div />");
																			
	var downButton = ( options.downButton ) ? options.downButton     : (this.find('.down').length > 0) ? this.find('.down') : $("<div />");
	
	// attach events
	upButton.on('click', upButtonClickHandler);
	track.on('click', trackClickHandler);
	thumb.on({mousedown: thumbMouseDownHandler, mouseup: thumbMouseUpHandler});
	downButton.on('click', downButtonClickHandler);
	
	if ( $.event.special.mousewheel )
	{
		console.log("binding mousewheel");
		$scrollElement.on({mousewheel: scrollElementMouseWheelHandler});
	}
	
	function update()
	{
		// update scrolled element
		scrollElement.scrollTop = scrollElement.scrollHeight * scrollPosition;
		
		// update thumb position
				
		console.log(scrollElement.scrollTop);
	}
	
	
	// event handlers
	
	function upButtonClickHandler(event)
	{
		event.preventDefault();
		
		console.log("up button");
		event.stopPropagation();
	}
	
	function downButtonClickHandler(event)
	{
		event.preventDefault();
		
		console.log("down button");
		
		event.stopPropagation();
	}
	
	function scrollElementMouseWheelHandler(event, delta, deltaX, deltaY)
	{
		event.preventDefault();
		
		console.log(scrollPosition);
		
		scrollPosition -= (deltaY / 100);
		console.log(scrollPosition);
		//clamp
		scrollPosition = (scrollPosition < 0) ? 0 : (scrollPosition > 1) ? 1 : scrollPosition;
		
		
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
	
	
	
	
	console.log("Custom scrollbar init");
};

}(window, jQuery));