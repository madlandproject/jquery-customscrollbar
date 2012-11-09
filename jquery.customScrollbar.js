(function(window, $){

var console = window.console;

var defaults = {
	resizeThumb: true
};

$.fn.customScrollbar = function(options)
{
	var options = $.extend(options, defaults);
	
	if ( ! options.scrollElement) 
	{
		throw( new Error('Plugin needs an element to scroll') );
	}
	
	// get elements
	var scrollElement = options.scrollElement;

	var upButton   = ( options.upButton )   ? options.upButton : 
											  (this.find('.up').length > 0) ? this.find('.up') : $('<div />') ;
												
	var thumb      = ( option.thumb )       ? options.thumb    : 
											  (this.find('thumb').length > 0) ? this.find('thumb') : $("<div />");
																			
	var downButton = ( options.downButton ) ? options.down     : 
										      (this.find('down').length > 0) ? this.find('down') : $("<div />");
	
	// attach events
	
	
	console.log("Custom scrollbar init");
}

}(window, jQuery));