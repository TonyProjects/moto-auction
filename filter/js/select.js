// Create 

class Select {

	/**********************************
	*	@param
	*		id: 	string
	*		input: 	object. Look like this: {name: string, value: string}
	*		list: 	array of objects. where each object contains two parameters:
	*			(sent: string, text: string)
	*/
	constructor(id, input, list, labelText = null) {
		// select
		this.id = id;
		this.select = document.createElement('div');
		this.select.className = 'select';
		this.select.id = id;
		this.select.setAttribute('data-current', 0);
		this.select.setAttribute('data-state', 'hide');

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

		let newItem = document.createElement('li');
			newItem.className = 'select__items-item';
			newItem.setAttribute('data-index', index);
			newItem.setAttribute('data-value', item.sent);
			newItem.appendChild( document.createTextNode(item.text) );
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
		for (let index = 0; index < newItems.length; index++)
			this.addItem( newItems[index], index);
	}

	/**********************************
	*	@todo
	*		remove all items of select
	*/
	removeItems() {
		for (let i = 0; i < this.countItems; i++)
		{
			this.items[i].remove();
		}
		while (this.items.length)
			this.items.pop();
		this.countItems = 0;
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
			this.select.addEventListener('click', function(el) { 
				logics_select( jQuery(el.currentTarget) );
			}, false);

			this.items.forEach( function(value) {
				value.addEventListener('click', function(el) {
					logics_select_item( jQuery(el.currentTarget) );
				});
			});

			this.isActive = true;
		}
	}
}

var 
	logics_select_item = function(el) {
		var item = (el instanceof jQuery) ? el : jQuery(el.currentTarget),
			select = item.parent().parent(),
			value = select.children("input[type=hidden]");

		value.val(item.attr("data-value"));
		select.attr("data-current", item.attr("data-index"));
		select.children(".select__items").css(
			"top", 
			( parseInt(item.attr("data-index")) * (-27)) + "px"
		);
	},

	logics_select = function(el) {
		el = (el instanceof jQuery) ? el : jQuery(el.currentTarget);

		let items = el.children(".select__items"),
			arrow = el.find(".select__button-arrow");

		if (el.attr('data-state') === "hide")
		{
			el.css({
				"overflow": "visible",
				"z-index": "4"
			});
			items.css({
				"top": "-1px", 
				"left": "-1px",
				"border-width": "1px",
				"border-color": "rgb( 204, 208, 212 )",
				"border-style": "solid"
			});
			arrow
				.removeClass('select__button-arrow--up')
				.addClass('select__button-arrow--down');
			el.attr('data-state', 'show');
		}
		else 
		{
			el.css({
				"overflow": "hidden",
				"z-index": "3"
			});
			items.css({
				"border": "none",
				"left": "0",
				"z-index": "unset"
			});
			arrow
				.removeClass('select__button-arrow--down')
				.addClass('select__button-arrow--up');
			el.attr('data-state', 'hide');
		}
	};


