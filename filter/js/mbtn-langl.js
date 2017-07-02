jQuery(document).ready( function() {
	$(".mbtn-with-langle--item").click( function(el) {
		var btn = $(el.currentTarget);
		var value = btn.children("input[type=hidden]");
		var angle = btn.children(".a");
		if (btn.attr("data") === "na") {
			angle.removeClass("angle").addClass("angle-dark-blue");
		 	btn.attr("data", "a");
		 	btn.children(".btn").css({
		 		"background-color": "#1F334C",
		 		"color": "white"
		 	});
		 	value.attr("value", btn.attr("data-value"));
		} else {
			angle.removeClass("angle-dark-blue").addClass("angle");
		 	btn.attr("data", "na");
		 	btn.children(".btn").css({
		 		"background-color": "white",
		 		"color": "#2F4157"
		 	});
		 	value.attr("value", "null");
		}
	});

	$(".mbtn-with-langle--all").click (function(el) {
		var event = new Event("click");
		var btns = $(".mbtn-with-langle--item");
		var status = $(el.currentTarget).children("input[type=hidden]");
		if (status.attr("value") === "")
		{
			for (var i = 0; i < btns.length; i++)
			{
				var value = $(btns[i]).children("input[type=hidden]").attr("value");
				if (value === "null" || value === "")	
					btns[i].dispatchEvent(event);
			}
			status.attr("value", "a");
			$(el.currentTarget).children(".a").removeClass("angle").addClass("angle-dark-blue");
			$(el.currentTarget).children(".btn").css({
		 		"background-color": "#1F334C",
		 		"color": "white"
		 	});
		}
		else {
			for (var i = 0; i < btns.length; i++)
			{
				var value = $(btns[i]).children("input[type=hidden]").attr("value");
				if (value !== "null" && value !== "")	
					btns[i].dispatchEvent(event);
			}
			status.attr("value", "");
			$(el.currentTarget).children(".a").removeClass("angle-dark-blue").addClass("angle")
			$(el.currentTarget).children(".btn").css({
		 		"background-color": "white",
		 		"color": "#2F4157"
		 	});
		}
	});
});