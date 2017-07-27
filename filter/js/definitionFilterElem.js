// selects
var 
	// Производитель
	providerSelect = new Select('provider', 
		{ name: 'provider-item', value: ''},
		[	{ sent: '0', text: 'YAMAHA'},
			{ sent: '1', text: 'MINSK'},
			{ sent: '2', text: 'YAWA'}
		],'Производитель'
	),
	// Объем
	capacitySelect = new Select('capacity',
		{ name: 'capacity-item', value: ''},
		[	{ sent: '0', text: '3000'},
			{ sent: '1', text: '6000'},
			{ sent: '2', text: '9000'}
		],'Объем см^3'
	),
	// Модель
	modelSelect = new Select('model',
		{ name: 'model-item', value: ''},
		[	{ sent: '0', text: 'LOTUS'},
			{ sent: '1', text: 'KAWASAKI'},
			{ sent: '2', text: 'HONDA'}
		],'Модель'
	);
	selectsCombiner = new SelectCombiner( [providerSelect, capacitySelect, modelSelect] );

// auction buttons
var
	bds = new AuctionButton('bds-auction', 'bds', 'bds', 'bds'),
	arai = new AuctionButton('arai-auction', 'arai', 'arai', 'arai'),
	aucnet = new AuctionButton('aucnet-auction', 'aucnet', 'aucnet', 'aucnet'),
	jba = new AuctionButton('jba-auction', 'jba', 'jba', 'jba');
	auctionCombiner = new AuctionButtonCombiner(
		'all-auction', 'all', 'all', 'all',
		[bds, arai, aucnet, jba]
	);

// range-sliders
var 
	ballSlider = new SliderRangeWrapper('newRangeSlider', {min:10, max:20}),
	yearSlider = new SliderRangeWrapper('newRangeSlider2', {min:100, max:200}),
	anythingSlider = new SliderRangeWrapper('newRangeSLider3', {min:1000, max:2000}),

	sCombiner = new SliderRangeWrapperCombiner( [ballSlider, yearSlider, anythingSlider] );

jQuery(document).ready( function() {
	var 
		selectContainer = document.getElementsByClassName('filter-content__inputs--select')[0],
		filterSearch = document.getElementsByClassName('filter__search')[0],
		auctionButtonContainer = document.getElementsByClassName('filter-content__inputs--btn')[0],

		eventTurget = document.getElementById('filter'),
		event = function(event) { 
	 		event.target.dispatchEvent(new Event('submit') )
		}

	// Selects
	selectsCombiner.insertIntoBeforeAll( selectContainer, filterSearch);
	selectsCombiner.changeWidthAll( 144 );
	selectsCombiner.addListenerForAll( eventTurget, event);

	// AuctionButtons
	auctionCombiner.insertIntoEndAll( auctionButtonContainer );
	auctionCombiner.addStateAllEventListener( eventTurget, event );

	// range-sliders
	sCombiner.createSameWrappers( {type: 'div', className: 'slider-wrapper'} );
	sCombiner.createLabels( [ 'Оценка', 'Год выпуска', 'Что-то еще'] );
	sCombiner.insertAllIntoEnd( jQuery('.filter-content__inputs--slider')[0] );
	sCombiner.addListenersAll( eventTurget, event );
});