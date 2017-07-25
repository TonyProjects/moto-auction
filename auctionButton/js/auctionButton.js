class AuctionButton {
	/**************************************************************************
	*	@param
	*		id: 		string. Button id
	*		titleText: 	string. Text content of auctionButton__title (CSS class)
	*		inputName: 	string.	Name of input that is in the button
	*		sendData: 	string. Data of input to be sent
	*	@create
	*		sendData: 	string
	*		button: 			HTMLElement.
	*		button_base: 		HTMLElement.
	*		button_base_title: 	HTMLElement.
	*		button_angle: 		HTMLElement.
	*		button_sendData: 	HTMLElement.
	*		state 		bool
	*		isInserted: bool.
	*		isListen: 	bool. 		
	*		
	***************************************************************************/
	constructor(id, titleText, inputName, sendData) {
		this.sendData = sendData;
		// auctionButton
		this.button = document.createElement('div');
		this.button.id = id;
		this.button.className = 'auctionButton';

		// button base
		this.button_base = document.createElement('div');
		this.button_base.className = 'auctionButton__base auctionButton__base--light';

		// button base title
		this.button_base_title = document.createElement('p');
		this.button_base_title.className = 'auctionButton__title';
		this.button_base_title.appendChild( document.createTextNode(titleText));

		// #### ADD #### 
		// title --> base
		this.button_base.appendChild(this.button_base_title);

		// base --> button
		this.button.appendChild(this.button_base);

		// button angle
		this.button_angle = document.createElement('div');
		this.button_angle.className = 'auctionButton__angle auctionButton__angle--light';

		// #### ADD ####
		// angle --> button
		this.button.appendChild(this.button_angle);

		this.button_sendData = document.createElement('input');
		this.button_sendData.className = 'auctionButton__send';
		this.button_sendData.setAttribute('type', 'hidden');
		this.button_sendData.setAttribute('name', inputName);
		this.button_sendData.setAttribute('value', '');

		// #### ADD ####
		// sendData --> button
		this.button.appendChild(this.button_sendData);

		// default
		this.state = false;
		this.isInserted = false;
		this.isListen = false;
	}

	/**************************************************************************
	*	@todo
	*		Add the click event listener for button
	**************************************************************************/
	createListener() {
		if ( !this.isListen ){
			let self = this;
			this.button.addEventListener('click', function(event) {
				if (!self.state)
					self.makeActive();
				else self.makeInactive();
			});
			return true;
		} else return false;
	}

	get getSendData() {
		if ( this.state )
			return this.sendData;
		else return '';
	}

	get getText() {
		return this.button_base_title.innerText;
	}

	/**************************************************************************
	*	@todo
	*		Insert the button into obj
	*	@param
	*		obj: HTMLElement. Dom element to be content the button
	*	@create
	*		parent: 	HTMLElement
	*			Where the button was inserted	
	**************************************************************************/
	insertIntoEnd( obj ) {
		if ( !this.isInserted )
		{
			if (obj instanceof HTMLElement) {
				obj.appendChild( this.button );
				this.parent = obj;
				this.isInserted = true;

				this.createListener();
				return true;

			} else return false;
		} else return false;
	}
	/**************************************************************************
	*	@param
	*		before: HTMLElement
	*			Before whom the button will be inserted
	***************************************************************************/
	insertIntoBefore( obj, before ) {
		if ( !this.isInserted )
		{
			if (obj instanceof HTMLElement) {
				obj.insertBefore( this.button, before);
				this.parent = obj;
				this.isInserted = true;

				this.createListener();

				return true;
			} else return false;
		} else return false;
	}

	insertIntoBegin( obj ) {
		return this.insertIntoBefore( obj, obj.firstChild );
	}

	makeActive() {
		if (!this.state) {
			let 
				newBaseClases = this.button_base.className
					.replace('auctionButton__base--light', 'auctionButton__base--dark'),
				newAngleClases = this.button_angle.className
					.replace('auctionButton__angle--light', 'auctionButton__angle--dark');

			this.button_base.setAttribute('class', newBaseClases);
			this.button_angle.setAttribute('class', newAngleClases);
			this.button_sendData.setAttribute('value', this.sendData);
			this.state = true;
		}
	}

	makeInactive() {
		if (this.state) {
			let 
				newBaseClases = this.button_base.className
					.replace('auctionButton__base--dark', 'auctionButton__base--light'),
				newAngleClases = this.button_angle.className
					.replace('auctionButton__angle--dark', 'auctionButton__angle--light');

			this.button_base.setAttribute('class', newBaseClases);
			this.button_angle.setAttribute('class', newAngleClases);
			this.button_sendData.setAttribute('value', '');
			this.state = false;
		}
	}
}

class AuctionButtonCombiner extends AuctionButton {
	constructor( id, titleText, inputName, sendData, children ) {
		super(id, titleText, inputName, sendData);

		if ( children.hasOwnProperty('length') )
			this.children = children;
		else console.lot('ERROR: children argument is not array');

		// default
		this.isInsertedAll = false;
		this.isListenAll = false;
		this.stateAll = false;
		this.listeners = [];
		this.stateAllEvent = 'changeStateAll';

		this.listenAll();
	}

	insertIntoEndAll( obj ) {
		if ( (!this.isInsertedAll)
		&&	 (obj instanceof HTMLElement) ) {
			for (let i = 0; i < this.children.length; i++)
				if ( !this.children[i].isInserted )
					this.children[i].insertIntoEnd( obj );
				this.insertIntoEnd( obj );
			return true;
		} else return false;
	}

	listenAll() {
		if ( !this.isListenAll )
		{	
			let self = this;
			this.button.addEventListener('click', function(event) {
				if ( !self.stateAll ) {
					self.makeAllActive();
				} else {
					self.makeAllInactive();
				} 
			});
			this.isListenAll = true;
			return true;
		} else return false;
	}

	makeAllActive() {
		console.log('active')
		if ( !this.stateAll ) {
			for (let i = 0; i < this.children.length; i++)
				this.children[i].makeActive();
			this.stateAll = true;
		}
	}

	makeAllInactive() {
		console.log('inactive')
		if ( this.stateAll ) {
			for (let i = 0; i < this.children.length; i++)
				this.children[i].makeInactive()
			this.stateAll = false;
		}
	}

	emitStateAllEvent() {
		if (this.listeners.length) {
			for (let i = 0; i < this.listeners.length; i++)
				this.listeners[i].dispatchEvent( new Event(this.stateAllEvent) );
			return true;
		} else return false;
	}

	addStateAllEventListener( newListener, callback ) {
		if ((newListener instanceof HTMLElement)
		&&	(typeof callback === 'function')) {

			this.listeners.push(newListener);

			newListener.addEventListener( this.stateAllEvent, callback );

			return true;
		} else return false;
	}
}