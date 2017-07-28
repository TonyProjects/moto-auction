	function add_option(content, type, del = false) {
		var options = $(".filter-content__options");
		var close = '<img class="m-option__close-img" src="img/svg/cancel.svg" />'
		if (!del) 
		{
			options.append('\
				<div class="m-option" id="' + type + '"> \
					<div class="m-option__angle"></div> \
					<div class="m-option__value"> <p>' + content + '</p></div> \
					<div class="m-option__close"> ' + close + ' </div> \
				</div> \
			');
		}
		else if (type === "*")
			$(options).empty();
		else
			$(options).children('#' + type).remove();
	}
	
jQuery(document).ready( function($) {

});