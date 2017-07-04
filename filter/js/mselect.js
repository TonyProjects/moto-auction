jQuery(document).ready( function() {
	$(".item").click( function(el) {
		var item = $(el.currentTarget);
		var mselect = item.parent().parent();
		var value = mselect.children("input[type=hidden]");

		value.attr("value", item.attr("data-index"));
		mselect.attr("data-current", item.attr("data-index"));
		mselect.children(".values").css("top", ( item.attr("data-index") * (-25)) + "px");
	});
});

function selectElement(el) {
	el = $(el);

	var values = el.children(".values");
	var arrow = el.children(".arrow");

	if (el.css('overflow') === "hidden"){
		el.css('overflow', "visible");
		values.css({
			"top": "0", 
			"left": "-1px",
			"border-width": "1px",
			"border-color": "rgb( 204, 208, 212 )",
			"border-style": "solid"
		});
		arrow.css("border", "none");
		arrow.css({
			"border": "4px",
			"border-style": "solid",
			"border-color": "transparent",
			"border-bottom": "5px",
			"border-bottom-color": "#AFBDCA",
			"margin": "0",
			"margin-bottom": "5px"
		});
	} else {
		el.css('overflow', "hidden");
		values.css({
			"border": "none",
			"left": "0"
		});
	}
}
