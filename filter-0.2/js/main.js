jQuery(document).ready( function() {


/******************************************************************************
*	AUCTION BUTTON															  *
******************************************************************************/
var 
	logics_auctionButtonOne = function(el, clear = false) {
		var auction_button = (el instanceof jQuery) ? el : jQuery(el.currentTarget),
			button = auction_button.children(".btn");
			value = auction_button.children("input[type=hidden]"),
			angle_left = auction_button.children(".angle--left"),
			angle_right = auction_button.children(".angle--right");

		// "ina" as "inactive"
		// "a" as "active"
		if (auction_button.attr("data-state") === "ina" && !clear)
		{
			angle_right.css("display", "none");
			angle_left.css("display", "block");
			button
				.removeClass("btn--inactive")
				.addClass("btn--active");
		 	value.attr("value", auction_button.attr("data-value"));
		 	auction_button.attr("data-state", "a");
		} 
		else 
		{
			angle_left.css("display", "none");
			angle_right.css("display", "block");
			button
				.removeClass("btn--active")
				.addClass("btn--inactive");
		 	value.attr("value", "");
		 	auction_button.attr("data-state", "ina");
		}
	},

	logics_auctionButtonAll = function(el) {
		var event = new Event("click"),
			all =  (el instanceof jQuery) ? el : jQuery(el.currentTarget),
			auction_buttons = jQuery(".auction-button--item");

		if (all.attr("data-state") === "ina")
		{
			for (var i = 0; i < auction_buttons.length; i++)
			{
				if (auction_buttons.eq(i).attr("data-state") === "ina")	
					auction_buttons.get(i).dispatchEvent(event);
			}
			logics_auctionButtonOne(el);			
		}	
		else 
		{
			for (var i = 0; i < auction_buttons.length; i++)
			{
				if (auction_buttons.eq(i).attr("data-state") === "a")	
					auction_buttons.get(i).dispatchEvent(event);
			}
			logics_auctionButtonOne(el);
		}
	},

	logics_auctionButtonsClear = function() {
		var 
			auction_buttons = jQuery('.auction-button'),
			auction_buttonAll = auction_buttons.find('.auction-button--all');

		if (auction_buttonAll.attr('data-state') === 'a')
			logics_auctionButtonAll(auction_buttonAll);
		else
			for (var i = 0; i < auction_buttons.length; i++)
				logics_auctionButtonOne( auction_buttons.eq(i), true );
	};



/******************************************************************************
*	SELECT-LIST 															  *
******************************************************************************/
var 
	logics_select = function(el) {
		var current_item =  (el instanceof jQuery) ? el : jQuery(el.currentTarget),
			select = current_item.parent().parent(),
			select_items_id = select.children("input"),
			tmp = new String();

		if (current_item.hasClass("item--selected"))
			current_item.removeClass("item--selected");
		else
			current_item.addClass("item--selected");

		var select_items = select.find(".item--selected");

		if (select_items.length != 0)
		{

			for (var i = 0; i < select_items.length; i++)
				tmp += select_items.eq(i).attr("data-value") + ",";
			select_items_id.val(tmp.substr(0, tmp.length - 1));
		}
		else
		{
			select_items_id.val(new String("0"));
		}
	},

	logics_selectsClear = function() {
		var selects = jQuery('.select-list');

		for (var i = 0; i < selects.length; i ++)
		{
			var items = selects.eq(i).find(".item");
			for (var j = 0; j < items.length; j++)
				if (items.eq(j).hasClass("item--selected"))
					items.eq(j).removeClass("item--selected");
			selects.eq(i).children('input').val("0");
		}
	};



/******************************************************************************
*	RANGE SLIDER															  *
******************************************************************************/

var 
	do_slider = function(slider_name) {
		slider_name = jQuery(slider_name);
		var 
			param = new Object();
			param.min = parseInt(slider_name.attr("data-min"));
			param.max = parseInt(slider_name.attr("data-max"));
			param.range = param.max - param.min;

		slider_name.slider({
			range: true,
			min: param.min,
			max: param.max,
			values: [  
				param.range * 0.25 + param.min, 
				param.range * 0.75 + param.min
			],
			slide: function(event, ui) {
				var value = slider_name.children('.slider-value'),
					left = slider_name.children('span');
				value
					.first().val(ui.values[0])
					.next().val(ui.values[1])
			}
		});
		slider_name.children("input")
			.first().val(slider_name.slider("values", 0))
			.next().val(slider_name.slider("values", 1));
	};

	do_slider("#range-slider--mileage");
	do_slider("#range-slider--year");



/******************************************************************************
*	SEARCH LOT																  *
******************************************************************************/
var
	logics_searchLot = function() {

	},

	logics_searchLotClear = function() {
		jQuery('#lot').val("");
	};



/******************************************************************************
*	RESET																	  *
******************************************************************************/
var
	filter_paramsClear = function() {
		jQuery('#params').empty();
	},

	filter_reset = function() {
		logics_auctionButtonsClear();

		logics_selectsClear();

		logics_searchLotClear();

		filter_paramsClear();
	},

	filter_addProperty = function(type, el) {
		var 
			params = jQuery('#params'),

			el = (el instanceof jQuery) ? el : jQuery(el.currentTarget),

			template = '\
				<div class="params__property" data-typ="' + type + '-param">\
					<p class="property__text"> ' + el.text() + ' </p>\
					<div class="property__close">\
						<?xml version="1.0" encoding="iso-8859-1"?>\
						<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 371.23 371.23" style="enable-background:new 0 0 371.23 371.23;" xml:space="preserve" width="14px" height="14px">\
						<polygon points="371.23,21.213 350.018,0 185.615,164.402 21.213,0 0,21.213 164.402,185.615 0,350.018 21.213,371.23   185.615,206.828 350.018,371.23 371.23,350.018 206.828,185.615 " fill="#cd150e"/>\
						</svg>\
					</div>\
				</div>\
			';

		params.append(template);
	};



/******************************************************************************
*	PAGE FORMING 															  *
******************************************************************************/
var 
	filter_submit = function(type, el = null, level = 0) {
		if (type === 'reset')
			filter_reset();

		else if (type === "auction-button--item")
			logics_auctionButtonOne(el);

		else if (type === "auction-button--all")
			logics_auctionButtonAll(el);

		else if (type === "select")
			logics_select(el);
		else if (type === "search")
		{

		}

		filter_addProperty(type, el);

		document.getElementById('filter').dispatchEvent(new Event('submit'));		
	}

	jQuery('#reset').click( function() {
		filter_submit("reset");
	});

	jQuery(".auction-button--item").click( function(el) {
		filter_submit("auction-button--item", el, 1);
	});

	jQuery(".auction-button--all").click( function(el) {
		// logics_auctionButtonAll(el);
		filter_submit("auction-button--all", el, 1);
	});

	jQuery(".item").click( function(el) {
		filter_submit("select", el, 2);
	});

	jQuery('#search-lot_search').click( function(el) {
		filter_submit("search", el);
	});

});