jQuery(document).ready( function() {

	var do_slider = function(slider_name){
		slider_name = jQuery(slider_name);
		var 
			param = new Object();
			param.min = parseInt(slider_name.attr("data-min"));
			param.max = parseInt(slider_name.attr("data-max"));
			param.range = param.max - param.min;

		slider_name.slider({
			range: true,
			min: param.min,
			max: param.max,
			values: [  
				param.range * 0.25 + param.min, 
				param.range * 0.75 + param.min
			],
			slide: function(event, ui) {
				var value = slider_name.children('.slider-value'),
					left = slider_name.children('span');
				value
					.first().val(ui.values[0])
					.next().val(ui.values[1])
			}
		});
		slider_name.children("input")
			.first().val(slider_name.slider("values", 0))
			.next().val(slider_name.slider("values", 1));
	};

	do_slider("#range-slider--mileage");
	do_slider("#range-slider--year");
});
