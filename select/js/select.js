/**************************************
*
*	@include
*		common.js
*
**************************************/

class Select extends Common {

	/**********************************
	*	@param
	*		id: 	string
	*		input: 	object. Look like this: {name: string, value: string}
	*		list: 	array of objects. where each object contains two parameters:
	*			(sent: string, text: string)
	*/
	constructor(id, input, list, labelText = null) {
		super( 'changeCurrentItem' );

		// select
		this.id = id;
		this.select = document.createElement('div');
		this.select.className = 'select';
		this.select.id = id;
		this.select.setAttribute('data-current', 0);
		this.isOpenList = false;
		this.countItems = 0;

		// label
		if (labelText !== null)
		{
			// container
			this.container = document.createElement('div');
			this.container.className = 'select-container';

			this.select.className += ' select--with-label'

			let label = document.createElement('div');
			label.className = 'select-label';
			label.appendChild( document.createTextNode(labelText) );
			this.label = label;
			this.isHaveLabel = true;
		} else {
			this.isHaveLabel = false;
		}

		// items lists
		this.items = [];
		// default item
		this.addItem( {sent: 0, text: 'all items'}, 0);
		this.currentItem = this.items[0];
		this.addItems(list);

		// button
		{
			let angleWrapper = document.createElement('div');
			angleWrapper.className = 'select__button';

			let angle = document.createElement('div');
			angle.className = 'select__button-arrow select__button-arrow--up';

			let inpt = document.createElement('input');
			inpt.setAttribute('type', 'hidden');
			inpt.setAttribute('name', input.name);
			inpt.setAttribute('value', input.value);

			angleWrapper.appendChild(angle);

			this.button = angleWrapper;
			this.button.angle = angle;
			this.input = inpt;
			this.select.appendChild(angleWrapper);
			this.select.appendChild(inpt);
		}
	}

	/**********************************
	*	@todo
	*		add only one items into items list
	*	@param
	*		item: object. Look like this: { sent: string, text: string}
	*/
	addItem(item, index) {
		if ( !("itemsContainer" in this) )
		{
			this.itemsContainer = document.createElement('ul');
			this.itemsContainer.className = 'select__items';
			this.select.appendChild( this.itemsContainer );
		}

		if ( !index )
			index = this.countItems;

		let 
			self = this,
			newItem = document.createElement('li');

			newItem.className = 'select__items-item';
			newItem.setAttribute('data-index', index);
			newItem.setAttribute('data-value', item.sent);
			newItem.appendChild( document.createTextNode(item.text) );
			newItem.addEventListener('click', function(event) { 
				if ( self.isOpenList )
					self.changeCurrentItem(event.currentTarget);
			});
		this.items.push(newItem);
		this.itemsContainer.appendChild(newItem);
		this.countItems++;
	}

	/**********************************
	*	@todo
	*		add new items into items list
	*	@param
			items: array of objects. 
				Look like this: [ {sent: string, text: string} ... ]
	*/
	addItems(newItems) {
		if ( 'length' in newItems)
			for (let index = 0; index < newItems.length; index++)
				this.addItem( newItems[index]);
		else console.log(' invalid function argument');
	}

	/**********************************
	*	@todo
	*		remove all items of select
	*/
	removeItems() {
		for (let i = 1; i < this.items.length; i++)
		{
			this.items[i].remove();
		}

		while (this.items.length)
			this.items.pop();

		this.countItems = 1;
	}

	/**********************************
	*	@todo
	*		insert this.select into obj
	*	@param
	*		obj: HTMLElement
	*/
	insertInto(obj) {
		if (!this.inserted)
			if (obj instanceof HTMLElement){
				this.parent = obj;
				if (this.isHaveLabel)
				{
					this.container.appendChild(this.label);
					this.container.appendChild(this.select);
					obj.appendChild(this.container);
				}
				else {
					obj.appendChild(this.select);
					this.isInsert = true;
				}
			}
		this.toActive();
	}

	insertIntoBefore(obj, before) {
		if (!this.inserted)
			if ( (obj instanceof HTMLElement) 
			&& (before instanceof HTMLElement) ){
				this.parent = obj;
				if (this.isHaveLabel)
				{
					this.container.appendChild(this.label);
					this.container.appendChild(this.select);
					obj.insertBefore(this.container, before);
				}
				else {
					obj.insertBefore(this.select, before);
					this.isInsert = true;
				}
			}
		this.toActive();
	}

	/**********************************
	*	@todo
	*		change select width
	*	@param
	*		newWidth: number
	*/
	changeWidth(newWidth) {
		this.select.style.maxWidth = newWidth + 'px';
		this.select.style.minWidth = newWidth + 'px';
		this.itemsContainer.style.maxWidth = newWidth + 'px';
		this.itemsContainer.style.minWidth = newWidth + 'px';
	}

	/**********************************
	*	@todo
	*		create listener for select
	*	@param
	*		void
	*/
	toActive() {
		if (!this.active)
		{
			var self = this;

			// create listener for select
			this.select.addEventListener('click', function(event) {
				if ( self.isOpenList )
					self.hideList();
				else
					self.showList();
			});

			this.button.angle.parentNode.addEventListener('click', function(event) {
				if ( self.isOpenList )
					self.changeCurrentItem( self.currentItem );
			});

			this.isActive = true;
		}
	}

	/**********************************
	*	@todo
	*		chande state of select to show
	*/
	showList() {
		let newClasses = this.button.angle.className.replace(
			'select__button-arrow--up', 
			'select__button-arrow--down'
		);
		this.button.angle.setAttribute('class', newClasses);

		this.itemsContainer.style.top = '-1px';
		this.itemsContainer.style.left = '-1px';
		this.itemsContainer.style.border = '1px solid rgb( 204, 208, 212)';
		
		this.select.style.overflow = 'visible';
		this.select.style.zIndex = 4;
		this.isOpenList = true;
	}

	/**********************************
	*	@todo
	* 		change state of select to hide
	*/
	hideList() {
		let newClasses = this.button.angle.className.replace(
			'select__button-arrow--down',
			'select__button-arrow--up'
		);
		this.button.angle.setAttribute('class', newClasses);

		this.itemsContainer.style.border = 'none';
		this.itemsContainer.style.left = 0;
		this.itemsContainer.style.zIndex = 'unset';

		this.select.style.overflow = 'hidden';
		this.select.style.zIndex = 3;
		this.isOpenList = false;
	}

	/**********************************
	*	@todo
	*		change current item of select
	*/
	changeCurrentItem(item, silence = false) {
		if ( !(this.currentItem === item) )
		{
			this.currentItem = item;
			this.input.setAttribute( 'value', item.getAttribute('data-value') );
			this.itemsContainer.style.top = (item.getAttribute('data-index') * (-27)) + 'px';

			this.execAllTasks();
			if ( this.getCountListeners && !silence){
				this.emitEventForListeners();
			}
		} else {
			this.itemsContainer.style.top = (this.currentItem.getAttribute('data-index') * (-27)) + 'px';
		}
	}

	//
	toDefault( silence = false) {
		this.changeCurrentItem( this.items[ 0 ], silence );
	}
} // Select

class SelectCombiner {
	constructor( children ) {
		if (children.hasOwnProperty('length'))
			this.children = children;
	}

	addTaskForAll( t, an, aa ) {
		this.children.forEach( function( select ) {
			select.addTask( t, an, aa );
		});
	}
	addListenerForAll( newListener, callback ) {
		this.children.forEach( function( select ) {
			select.addListenerForEvent( newListener, callback );
		});
	}

	insertIntoEndAll( parent ) {
		this.children.forEach( function( select ) {
			select.insertInto( parent );
		});
	}

	insertIntoBeforeAll( parent, before ) {
		this.children.forEach( function( select ) {
			select.insertIntoBefore( parent, before );
		});
	}

	changeWidthAll( newWidth ) {
		this.children.forEach( function( select ) {
			select.changeWidth( newWidth );
		});
	}

	toDefaultAll( silence = false ) {
		this.children.forEach( function(child) {
			child.toDefault( silence );
		});
	}
}