var // selects
	// Производитель
	providerSelect = new Select('provider', 
		{ name: 'provider-item', value: ''},
		[	{ sent: '0', text: 'YAMAHA'},
			{ sent: '1', text: 'MINSK'},
			{ sent: '2', text: 'YAWA'}
		],'Производитель'),

	// Объем
	capacitySelect = new Select('capacity',
		{ name: 'capacity-item', value: ''},
		[	{ sent: '0', text: '3000'},
			{ sent: '1', text: '6000'},
			{ sent: '2', text: '9000'}
		],'Объем см^3'),

	// Модель
	modelSelect = new Select('model',
		{ name: 'model-item', value: ''},
		[	{ sent: '0', text: 'LOTUS'},
			{ sent: '1', text: 'KAWASAKI'},
			{ sent: '2', text: 'HONDA'}
		],'Модель');
	selectsCombiner = new SelectCombiner( 
		[providerSelect, capacitySelect, modelSelect]);


var // auction buttons
	bds = new AuctionButton('bds-auction', 'bds', 'bds', 'bds'),
	arai = new AuctionButton('arai-auction', 'arai', 'arai', 'arai'),
	aucnet = new AuctionButton('aucnet-auction', 'aucnet', 'aucnet', 'aucnet'),
	jba = new AuctionButton('jba-auction', 'jba', 'jba', 'jba');
	auctionCombiner = new AuctionButtonCombiner(
		'all-auction', 'all', 'all', 'all',
		[bds, arai, aucnet, jba]);


var // range-sliders
	// БАЛЛ
	ballSlider = new SliderRangeWrapper('ball-slider', {min:10, max:20}),
	// ГОД выпуска
	yearSlider = new SliderRangeWrapper('year-slider', {min:100, max:200}),
	// Что-то
	anythingSlider = new SliderRangeWrapper('any-slider', {min:1000, max:2000}),

	sCombiner = new SliderRangeWrapperCombiner( [ballSlider, yearSlider, anythingSlider] );



jQuery(document).ready( function($) {
	var 
		selectContainer = document.getElementsByClassName('filter-content__inputs--select')[0],
		filterSearch = document.getElementsByClassName('filter__search')[0],
		auctionButtonContainer = document.getElementsByClassName('filter-content__inputs--btn')[0],

		eventTarget = document.getElementById('filter'),
		event = function(event) { 
	 		event.target.dispatchEvent(new Event('submit') )
		}


	// Selects
	selectsCombiner.changeWidthAll( 144 );
	selectsCombiner.insertIntoBeforeAll( selectContainer, filterSearch);
	selectsCombiner.addListenerForAll( eventTarget, event);
	selectsCombiner.addTaskForAll( 
		add_selectOption, 
		[ 'id|text', 'id|type', 'currentItem|item' ],
		{ del: false, type: 'select-item' });


	// AuctionButtons
	auctionCombiner.insertIntoEndAll( auctionButtonContainer );
	auctionCombiner.addListenerForEventAll( eventTarget, event );
	auctionCombiner.addTaskForAll( 
		add_buttonOption, 
		[ 'text', 'id|type', 'state'], 
		{ type: 'button' });


	// range-sliders
	sCombiner.createSameWrappers( {type: 'div', className: 'slider-wrapper'} );
	sCombiner.createLabels( [ 'Оценка', 'Год выпуска', 'Что-то еще'] );
	sCombiner.insertAllIntoEnd( jQuery('.filter-content__inputs--slider')[0] );
	sCombiner.addListenersAll( eventTarget, event );
	sCombiner.addTaskForAll( 
		add_sliderOption, 
		['id|type', 'inputMax|max', 'inputMin|min'], 
		{ type: 'rangeSliser' });

	document.getElementById('to-default-filter').addEventListener('click', function(event) {
		
	})
});