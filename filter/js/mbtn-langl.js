jQuery(document).ready( function() {
	$(".mbtn-with-langle--item").click( function(el) {
		var btn = $(el.currentTarget);
		var value = btn.children("input[type=hidden]");
		var angle = btn.children(".a");

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
	});

	$(".mbtn-with-langle--all").click (function(el) {
		var event = new Event("click");
		var btns = $(".mbtn-with-langle--item");
		var el =  $(el.currentTarget);
		var status = el.children("input[type=hidden]");
		if (status.attr("value") === "")
		{
			for (var i = 0; i < btns.length; i++)
			{
				var value = btns.eq(i).children("input[type=hidden]").attr("value");
				if (value === "")	
					btns[i].dispatchEvent(event);
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
			for (var i = 0; i < btns.length; i++)
			{
				var value = btns.eq(i).children("input[type=hidden]").attr("value");
				if (value !== "")	
					btns[i].dispatchEvent(event);
			}
			status.attr("value", "");
			el.children(".a").removeClass("angle-dark-blue").addClass("angle")
			el.children(".btn").css({
		 		"background-color": "white",
		 		"color": "#2F4157"
		 	});
			el.attr("data", "na");
		}
	});
});