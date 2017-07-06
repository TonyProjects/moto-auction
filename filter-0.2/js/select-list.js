jQuery(document).ready( function($) {

	// select logics
	$(".item").click( function(el) {
		var current_item = $(el.currentTarget);
		var select = current_item.parent().parent();

		if (current_item.hasClass("item--selected"))
			current_item.removeClass("item--selected");
		else
			current_item.addClass("item--selected");

		var selected_items = select.find(".item--selected");
		var tmp = new String();
		for (var i = 0; i < selected_items.length; i++)
			tmp += selected_items.eq(i).attr("data-index") + ",";

		var id_selected_items = select.children("input");
		id_selected_items.val(tmp.substr(0, tmp.length - 1));
	});
	
});


