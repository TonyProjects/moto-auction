var 
	toAlign = function(type) 
	{	

		if (type === 'h')
			// [before, after]
			var align = ['vertical', 'horizontal'];
		else if (type === 'v')
			var align = ['horizontal', 'vertical'];
		else return -1;

		var elList = jQuery(('.' + align[0]));

		elList.find('.available__article').each( function(index, el) {
			el = jQuery(el);
			var 
				header = el.find('.article__header'),
				price = el.find('.article__header-price'),
				scope = el.find('.article__header-scope');

				if (type === 'v')
				{
					price.appendTo(header);
					scope.appendTo(header.children('.article__header-title'));
				}
				else 
				{
					scope.appendTo(header);
					price.appendTo(header.children('.article__header-title'));
				}
		});

		elList.each( function(index, el) {
			el = jQuery(el);
			el.attr('class').split(' ').forEach( function(value) {
				el
					.removeClass(value)
					.addClass(value.replace(align[0], align[1]));
			});
		});

		jQuery('#stream__current-align').val(align[1].charAt(0));
	};

jQuery(document).ready( function() {
	document.getElementById('align-to-horizontal').addEventListener('click', function() {
		toAlign('h');
	}, false);
		document.getElementById('align-to-vertical').addEventListener('click', function() {
		toAlign('v');
	}, false);
});
