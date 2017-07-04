$(document).ready( function() {
	$(".filter-content__options-remove").click( function() {
		add_option("", "*", true);
	});

	$(".m-option").click( function(el) {
		add_option("", $(el.currentTurget).attr("id"), true);
	});
});

function add_option(content, type, del = false) {
	var options = $(".filter-content__options");
	var close = '<img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDIyNC41MTIgMjI0LjUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjI0LjUxMiAyMjQuNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCI+CjxnPgoJPHBvbHlnb24gcG9pbnRzPSIyMjQuNTA3LDYuOTk3IDIxNy41MjEsMCAxMTIuMjU2LDEwNS4yNTggNi45OTgsMCAwLjAwNSw2Ljk5NyAxMDUuMjYzLDExMi4yNTQgICAgMC4wMDUsMjE3LjUxMiA2Ljk5OCwyMjQuNTEyIDExMi4yNTYsMTE5LjI0IDIxNy41MjEsMjI0LjUxMiAyMjQuNTA3LDIxNy41MTIgMTE5LjI0OSwxMTIuMjU0ICAiIGZpbGw9IiNmNzhjODkiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />'
	if (!del) 
	{
		options.append('\
			<div class="m-option" id="' + type + '"> \
				<div class="m-option__angle"></div> \
				<div class="m-option__value"> <p>' + content + '</p></div> \
				<div class="m-option__close"> ' + close + ' </div> \
			</div> \
		');
	}
	else if (type === "*")
		$(options).empty();
	else
		$(options).children('#' + type).remove();
}

function call() {
	add_option("", "*", true);

	// lot
	var lot = $(".filter__search").children(".filter__search-value");
	if (lot.val() !== "")
		add_option(lot.val(), "lot");
	else 
	{
		// btns
		var btns = $(".filter-content__inputs--btn").children(".mbtn-with-langle--item");
		var btn_all = $(".filter-content__inputs--btn").children(".mbtn-with-langle--all");
		if (btn_all.attr("data") !== "a")
			for (var i = 0; i < btns.length; i++)
			{
				if (btns.eq(i).attr("data") === "a")
				{
					add_option( btns.eq(i).find(".title").text(), "btn-" + i, false);
				}
			}
		else
			add_option("Все аукционы", "btn-all");

		// selects
		var selects = $(".filter-content__inputs--select").children(".filter__mselect");
		for (var i = 0; i < selects.length; i++)
		{
			var current = selects.eq(i).attr("data-current");
			if (current !== "0")
				add_option( selects.eq(i).find(".item").eq(current).text(), "select-" + i);
		}

		// range-slider
		var sliders = $(".filter-content__inputs--slider").children(".slider");
		for (var i = 0; i < sliders.length; i++)
		{
			var inputs = sliders.eq(i).children(".slider-value");
			add_option(inputs.eq(0).val() + '-' + inputs.eq(1).val(), "slider-" + i);
		}
	}
}