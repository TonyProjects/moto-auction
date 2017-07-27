/*
*	included: jquery-1.12.4.js, jquery-ui.min.js (jquery-ui.min.css)
*/
class SliderRangeWrapper {

	/***********************************
	*	@param
	*		sliderId: string.
	*		sliderParam: object. look like this: {min: number, max: number}
	*
	*/
	constructor( sliderId, sliderParams ) {
		this.sliderNative = document.createElement('div');
		this.sliderNative.id = sliderId;
		this.sliderNative.className = 'slider';

		this.mnv = sliderParams.min;
		this.mxv = sliderParams.max;
		this.rangeLength = this.mxv - this.mnv;
		this.defv = [
			parseInt(this.rangeLength * 0.30 + this.mnv),
			parseInt(this.rangeLength * 0.75 + this.mnv)
		];

		// inputs
		this.inputMin = document.createElement('input');
		this.inputMin.id = this.sliderNative.id + '--min';
		this.inputMin.className = 'slider-value';
		this.inputMin.name = this.sliderNative.id + '-name--min';
		this.inputMin.value = this.defv[ 0 ];
		this.inputMin.type = 'text';

		this.inputMax = document.createElement('input');
		this.inputMax.id = this.sliderNative.id + '--max';
		this.inputMax.className = 'slider-value';
		this.inputMax.name = this.sliderNative.id + '-name--max';
		this.inputMax.value = this.defv[ 1 ];
		this.inputMax.type = 'text';

		this.sliderNative.appendChild( this.inputMin );
		this.sliderNative.appendChild( this.inputMax );
	}

	/****************************************
	*	@todo
	*		using jQurty ui slider method with
	*		param o this
	****************************************/
	toActive() {
		let self = this;
		jQuery(this.sliderNative).slider( {
			range: true,
			min: this.mnv,
			max: this.mxv,
			values: [ this.defv[ 0 ], this.defv[ 1 ] ],
			slide: function(event, ui) {
				jQuery(self.inputMin).val( ui.values[ 0 ] );
				jQuery(self.inputMax).val( ui.values[ 1 ] );
			}
		});
	}

	/****************************************
	*	@param
	*		parent: HTMLElement | jQuery object.
	*	@todo
	*		insert slider into end of parent
	*
	****************************************/	
	insertIntoEnd( parent ) {
		if (parent instanceof HTMLElement)
			parent = jQuery(parent);

		if (parent instanceof jQuery) {
			let self = this;

			parent.append(this.sliderNative);
			this.toActive();
			this.sliderHandlers = jQuery(this.sliderNative).find('.ui-slider-handle');
			this.sliderHandlers.mouseup( function(event) {
				self.emitSliderChangeValue();
			});

			return true;
		}
		else return false;
	}

	emitSliderChangeValue() {
		console.log('up');
	}
}

class SliderRangeWrapperCombiner {
	constructor( sliders ) {
		
	}
}

var s = new SliderRangeWrapper('newRangeSlider', {min:10, max:20})

jQuery(document).ready( function() {

		s.insertIntoEnd( jQuery('.container')[0] );

});
