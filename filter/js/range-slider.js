$(document).ready( function() {
	/* range-slider --- begin */

	var slider_ball = $('#range-slider--ball');
	slider_ball.slider({
		range: true,
		min: 0,
		max: 100,
		values: [35, 65],
		slide: function (event, ui) {
			slider_ball.children('.slider-value').first().val(ui.values[0]).next().val(ui.values[1]);
		}
	});
	slider_ball.children("input")
		.first().val(slider_ball.slider("values", 0))
		.next().val(slider_ball.slider("values", 1));

	var slider_year = $('#range-slider--year');
	slider_year.slider({
		range: true,
		min: 1900,
		max: 2017,
		values: [1940, 1980],
		slide: function (event, ui) {
			var value = slider_year.children('.slider-value');
			var left = slider_year.children('span');
			value
				.first().val(ui.values[0])
				.next().val(ui.values[1]);
		}
	});
	slider_year.children("input")
		.first().val(slider_year.slider("values", 0))
		.next().val(slider_year.slider("values", 1));

	var slider_some =$('#range-slider--some'); 
	slider_some.slider({
		range: true,
		min: 0,
		max: 100,
		values: [35, 65],
		slide: function (event, ui) {
			slider_some.children('.slider-value')
				.first().val(ui.values[0])
				.next().val(ui.values[1]);
		}
	});
	slider_some.children("input")
		.first().val(slider_some.slider("values", 0))
		.next().val(slider_some.slider("values", 1));

	/* range-slider --- end */
});