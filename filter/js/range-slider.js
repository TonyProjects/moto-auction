/*
*	included: jquery-1.12.4.js, jquery-ui.min.js (jquery-ui.min.css)
*/
class SliderRangeWrapper extends Common {

	/***********************************
	*	@param
	*		sliderId: string.
	*		sliderParam: object. look like this: {min: number, max: number}
	*
	*/
	constructor( sliderId, sliderParams ) {
		super( 'changeRange' );

		this.id = sliderId;

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

		// this.listeners = [];
		// this.event = 'moveHandle';
	}

	/****************************************
	*	@param
	*		wrapper: object. Look like this:
	*		{type: string ('div' | 'p' | other), ClassName: string}
	*	@todo
	*		Creating wrapper that will be contain
	*		slider and label
	****************************************/
	createWrapper( wrapper ) {		
		if ( typeof wrapper === 'object' ) {
			this.wrapper = document.createElement( wrapper.type );
			this.wrapper.className = wrapper.className;
		}
	}

	/****************************************
	*	@param
	*		text: string.
	*		className: string.
	*	@todo
	*		Creating label that will be inserted
	*		before slider
	****************************************/
	createLabel( text, className ) {
		this.label = document.createElement('div');
		this.label.appendChild( document.createTextNode( text ) );

		if ( className )
			this.label.className = className;
		else this.label.className = 'filter-label';
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

			if ( this.wrapper ) {
				if ( this.label )
					this.wrapper.appendChild( this.label );
				this.wrapper.appendChild( this.sliderNative );
				parent.append( this.wrapper );
			} else {
				if ( this.label )
					parent.append( this.label );
				parent.append(this.sliderNative);
			}

			this.toActive();
			this.sliderHandlers = jQuery(this.sliderNative).find('.ui-slider-handle');

			this.sliderHandlers.mouseup( function(event) {
				self.emitEventForListeners();
			});

			return true;
		}
		else return false;
	}

	// addListenerForEvent( newListener, callback ) {
	// 	if ( (newListener instanceof HTMLElement) 
	// 	&&	 (typeof callback === 'function') ) {
	// 		this.listeners.push( newListener );
	// 		newListener.addEventListener( this.event, callback );
	// 	}
	// }

	/**********************************
	*	@todo
	*		
	*/
	// emitEventForListeners() {
	// 	for (let i = 0; i < this.listeners.length; i++)
	// 		this.listeners[i].dispatchEvent( new Event(this.event) );
	// }
}

class SliderRangeWrapperCombiner {
	constructor( children ) {
		if ( children.hasOwnProperty('length') )
			this.children = children;
	}

	addListenersAll( newListener, callback ) {
		this.children.forEach( function( child ) {
			child.addListenerForEvent( newListener, callback );
		});
	}

	createSameWrappers ( wrapper ) {
		this.children.forEach( function( child ) {
			child.createWrapper( wrapper );
		});
	}

	createLabels( labels, className ) {
		this.children.forEach( function( child, id ) {
			child.createLabel( labels[ id ], className );
		});
	}

	insertAllIntoEnd( parent ) {
		this.children.forEach( function( child ) {
			child.insertIntoEnd( parent );
		});
	}

	addTaskForAll( t, an, aa ) {
		this.children.forEach( function( child ) {
			child.addTask(  t, an, aa );
		});
	}
}

