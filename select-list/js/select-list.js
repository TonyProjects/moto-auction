// select logics
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

	logics_selectsClear = function(select = null) {
		if (select != null)
		{
			select = (select instanceof jQuery) ? select : jQuery(select);
			var items = select.find(".select-list__items-item");
			for (var i = 0; i < items.length; i++)
				if (items.eq(i).hasClass("item--selected"))
					items.eq(i).removeClass("item--selected");
			select.children('input').val("0");
		}
		else
		{
			var selects = jQuery('.select-list');

			for (var i = 0; i < selects.length; i ++)
			{
				var items = selects.eq(i).find(".item");
				for (var j = 0; j < items.length; j++)
					if (items.eq(j).hasClass("item--selected"))
						items.eq(j).removeClass("item--selected");
				selects.eq(i).children('input').val("0");
			}
		}
	};
