jQuery(document).ready( function($) {

	var
		logics_select_item = function(el) {
			var item = (el instanceof jQuery) ? el : jQuery(el.currentTarget),
				select = item.parent().parent(),
				value = select.children("input[type=hidden]");

			value.val(item.attr("data-value"));
			select.attr("data-current", item.attr("data-index"));
			select.children(".select__items").css("top", ( parseInt(item.attr("data-index")) * (-27)) + "px");
		},

		logics_select = function(el) {
			el = jQuery(el.currentTarget);

			var values = el.children(".select__items"),
				arrow = el.find(".select__button-arrow");

			if (el.attr('data-state') === "hide")
			{
				el.css('overflow', "visible");
				values.css({
					"top": "-1px", 
					"left": "-1px",
					"border-width": "1px",
					"border-color": "rgb( 204, 208, 212 )",
					"border-style": "solid"
				});
				arrow
					.removeClass('select__button-arrow--up')
					.addClass('select__button-arrow--down');
				el.attr('data-state', 'show');
			}
			else 
			{
				el.css('overflow', "hidden");
				values.css({
					"border": "none",
					"left": "0"
				});
				arrow
					.removeClass('select__button-arrow--down')
					.addClass('select__button-arrow--up');
				el.attr('data-state', 'hide');
			}
		};

	
	jQuery(".select__items-item").click( function(el) {
		logics_select_item(el);
	});

	jQuery('.select').click( function(el) {
		logics_select(el);
	});
});


