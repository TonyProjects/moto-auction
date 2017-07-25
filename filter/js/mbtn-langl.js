var	
	auctionButtonClick = function(event) {
		btn = $(event.currentTarget);
		
		let 
			value = btn.children("input[type=hidden]"),
			angle = btn.children(".a");

		if (btn.attr("data") === "na")
		{
			angle.removeClass("angle").addClass("angle-dark-blue");
		 	btn.attr("data", "a");
		 	btn.children(".btn").css({
		 		"background-color": "#1F334C",
		 		"color": "white"
		 	});
		 	value.attr("value", btn.attr("data-value"));
		} 
		else 
		{
			angle.removeClass("angle-dark-blue").addClass("angle");
		 	btn.attr("data", "na");
		 	btn.children(".btn").css({
		 		"background-color": "white",
		 		"color": "#2F4157"
		 	});
		 	value.attr("value", "");
		}
	},

	auctionbuttonClickAll = function(event) {
		let
			ev = new Event("click"),
			btns = $(".mbtn-with-langle--item"),
			el =  $(event.currentTarget),
			status = el.children("input[type=hidden]");
			
		if (status.attr("value") === "")
		{
			for (let i = 0; i < btns.length; i++)
			{
				let value = btns.eq(i).children("input[type=hidden]").attr("value");
				if (value === "")	
					btns[i].dispatchEvent(ev);
			}
			status.attr("value", "a");
			el.children(".a").removeClass("angle").addClass("angle-dark-blue");
			el.children(".btn").css({
		 		"background-color": "#1F334C",
		 		"color": "white"
		 	});
			el.attr("data", "a");
		}
		else {
			for (let i = 0; i < btns.length; i++)
			{
				let value = btns.eq(i).children("input[type=hidden]").attr("value");
				if (value !== "")	
					btns[i].dispatchEvent(ev);
			}
			status.attr("value", "");
			el.children(".a").removeClass("angle-dark-blue").addClass("angle")
			el.children(".btn").css({
		 		"background-color": "white",
		 		"color": "#2F4157"
		 	});
			el.attr("data", "na");
		}
	}

jQuery(document).ready( function() {
	$(".mbtn-with-langle--item").click( function(event) {
		auctionButtonClick(event);
	});

	$(".mbtn-with-langle--all").click (function(event) {
		auctionbuttonClickAll(event);
	});
});