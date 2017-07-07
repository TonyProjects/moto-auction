jQuery(document).ready( function($) {

var 
	filter_submit = function(type, el = null, level = 0) {
		if (type === 'reset')
			filter_reset();
		else if (type === "auction-button--item")
			logics_auctionButtonOne(el);

		else if (type === "auction-button--all")
			logics_auctionButtonAll(el);

		else if (type === "select")
			logics_select(el);
		else if (type === "search")
		{
			
		}
		
		document.getElementById('filter').dispatchEvent(new Event('submit'));		
	}

	jQuery('#reset').click( function() {
		filter_submit("reset");
	});

	jQuery(".auction-button--item").click( function(el) {
		filter_submit("auction-button--item", el, 1);
	});

	jQuery(".auction-button--all").click( function(el) {
		// logics_auctionButtonAll(el);
		filter_submit("auction-button--all", el, 1);
	});

	jQuery(".item").click( function(el) {
		filter_submit("select", el, 2);
	});

	jQuery('#search-lot_search').click( function(el) {
		filter_submit("search", el);
	});

});