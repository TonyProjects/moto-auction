class Listener {
	constructor( event ) {
		// default
		this.listeners = [];
		this.listenedEvent = event;
	}

	/**********************************
	*	@todo
	*		
	*/
	isHaveListeners() {
		return !!this.listeners.length;
	}

	get getCountListeners() {
		return this.listeners.length;
	}

	/**********************************
	*	@todo
	*		
	*	@param
	*		newListener: HTMLElement
			eventFor: string
	*/
	addSelectListener( newListener, callback ) {
		if ( (newListener instanceof HTMLElement) 
		&&	 (typeof callback === 'function') ) {
			this.listeners.push( newListener );
			newListener.addEventListener('changeSelectItem', callback);
		}
	}

	/**********************************
	*	@todo
	*		
	*/
	emitSelectEvent( event ) {
		let selectEvent = new Event('changeSelectItem');
		for (let i = 0; i < this.listeners.length; i++)
			this.listeners[i].dispatchEvent( selectEvent );
		this.execAllTasks();
	}
}