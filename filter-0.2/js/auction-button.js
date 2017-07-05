jQuery(document).ready( function() {

	function auctionButtonChangeState(el) {
		var auction_button = $(el.currentTarget),
			button = auction_button.children(".btn");
			value = auction_button.children("input[type=hidden]"),
			angle_left = auction_button.children(".angle--left"),
			angle_right = auction_button.children(".angle--right");

		// "ina" as "inactive"
		// "a" as "active"
		if (auction_button.attr("data-state") === "ina")
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
	}

	$(".auction-button--item").click( function(el) {
		auctionButtonChangeState(el);
	});

	$(".auction-button--all").click( function(el) {
		var event = new Event("click"),
			all =  $(el.currentTarget),
			auction_buttons = $(".auction-button--item");

		if (all.attr("data-state") === "ina")
		{
			for (var i = 0; i < auction_buttons.length; i++)
			{
				if (auction_buttons.eq(i).attr("data-state") === "ina")	
					auction_buttons.get(i).dispatchEvent(event);
			}
			auctionButtonChangeState(el);			
		}	
		else 
		{
			for (var i = 0; i < auction_buttons.length; i++)
			{
				if (auction_buttons.eq(i).attr("data-state") === "a")	
					auction_buttons.get(i).dispatchEvent(event);
			}
			auctionButtonChangeState(el);
		}
	});
	
});