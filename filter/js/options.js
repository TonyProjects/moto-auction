/*******************************************************************************
*	@include
*		jQuery
*******************************************************************************/

	// For auctions buttons
	function add_buttonOption( obj, a ) {
		var 
			options = jQuery(".filter-content__options").eq(0),
			close = '<img class="m-option__close-img" src="img/svg/cancel.svg" />',
			type = obj.type + '-' + a.type,
			option = options.children('#' + type);

		if ( obj.state) {
			options.append('\
				<div class="m-option" id="' + type + '"> \
					<div class="m-option__angle"></div> \
					<div class="m-option__value"> <p>' + obj.text + '</p></div> \
					<div class="m-option__close"> ' + close + ' </div> \
				</div> \
			');
			option.click( function(event) {
				console.log(event);
				event.currentTarget.remove();
			});
		}
		else option.remove();
	}

	// For selects
	function add_selectOption( obj, a ) {
		var 
			options = jQuery(".filter-content__options").eq(0),
			close = '<img class="m-option__close-img" src="img/svg/cancel.svg" />',
			type = obj.type + '-' + a.typem
			option = options.children('#' + type);

		if ( !parseInt(obj.item.getAttribute('data-index')) )
			option.remove()

		else if ( !option.length ) {
			options.append('\
				<div class="m-option" id="' + type + '" data-current="' + obj.item.getAttribute('data-index') + '"> \
					<div class="m-option__angle"></div> \
					<div class="m-option__value"> <p>' + obj.item.innerText + '</p></div> \
					<div class="m-option__close"> ' + close + ' </div> \
				</div> \
			');
			option.click( function(event) {
				event.currentTarget.remove();
			});
		} else
			option.children('.m-option__value').eq(0).text(obj.item.innerText);
	}

	// For range sliders
	function add_sliderOption( obj, a ) {
		var 
			options = jQuery(".filter-content__options").eq(0),
			close = '<img class="m-option__close-img" src="img/svg/cancel.svg" />',
			type = obj.type + '-' + a.type;
			value = obj.min.value + ' - ' + obj.max.value,
			option = options.children('#' + type);

		if ( !option.length ) {
			options.append('\
				<div class="m-option" id="' + type + '"> \
					<div class="m-option__angle"></div> \
					<div class="m-option__value"> <p>' + value + '</p></div> \
					<div class="m-option__close"> ' + close + ' </div> \
				</div> \
			');
			option.click( function(event) {
				event.currentTarget.remove();
			});
		} else
			option.children('.m-option__value').eq(0).text( value );
	}
	
	function clear_options() {
		var	options = jQuery(".filter-content__options");
			options.empty();
	}