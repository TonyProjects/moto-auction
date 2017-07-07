// auction-button logics
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