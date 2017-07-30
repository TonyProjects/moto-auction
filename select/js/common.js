class Common {
	constructor( event ) {
		this.tasks = [];
		this.taskCount = 0;

		this.event = event;
		this.listeners = [];
	}

	/***************************************************************************
	*	@param
	*		t (task): function.
	*		an (argumentsName): object of strings 
	*			where each string is method name of this (class instance)
	*		aa (additionalArguments): object. look like this:
	*			{ argumentName: argumentValue, ...}
	*	@todo
	*		add new task for executing
	***************************************************************************/
	addTask( t, an, aa ) {
		if ( typeof t === 'function' ) {	
			this.tasks.push({ 
				task: t,
				arguments: an,
				additional: aa 
			});
			this.taskCount++;
		}
	}

	/***************************************************************************	
	*	@param
	*		p (propertiesName): string array.
	*	@todo
	*		transform this: [ propertyName, ... ]
	*		to: { propertyName: propertyValue of current object, ...}	
	***************************************************************************/	
	getPropertiesAsObj( p ) {
		if ( p.hasOwnProperty('length') ) {
			let i, args = {},
				// new propertys name
				np = this.transformArgumentNames( p ),
				// object properties name
				op = this.transformArgumentNames( p, true );

			for (i = 0; i < p.length; i++)
				if ( op[ i ] in this )
					args[ np[i] ] = this[ op[i] ];
			return args;
		}
	}

	/**************************************************************************
	*	@param
	*		p (propertis): An array Of strings where each array element looks like this: 
	*		'<propName[|<propNameForReplace>]>'
	*		before: bool.
	*	@todo
	*		transform elements of "p" array
	**************************************************************************/
	transformArgumentNames( p, before = false ) {
		let i, tmp = [], args = p;
		for (i = 0; i< args.length; i++) {
			let code = args[ i ].indexOf('|');
			if ( (code++ === -1) )
				tmp[ i ] = args[ i ];
			else if ( !before )
				tmp[ i ] = args[ i ].slice( code, args[ i ].length );
			else
				tmp[ i ] = args[ i ].slice( 0, --code );
		}
		return tmp;
	}

	/***************************************************************************
	*	@param
	*		i (index of task): number.
	*	@todo
	*		Execute task with number i
	***************************************************************************/
	execTask( i ) {
		return this.tasks[ i ].task( 
			this.getPropertiesAsObj( this.tasks[ i ].arguments ),
			this.tasks[ i ].additional
		) || true;
	}

	/***************************************************************************
	*	@todo
	*		execute all tasks in order
	***************************************************************************/	
	execAllTasks() {
		let i;
		for (i = 0; i < this.taskCount; i++)
			this.execTask( i );
	}


	// Listener
	/***************************************************************************
	*	@todo
	*		Retern count of listeners
	***************************************************************************/	
	get getCountListeners() {
		return this.listeners.length;
	}

	/***************************************************************************
	*	@todo
	*		
	*	@param
	*		newListener: HTMLElement
	*		eventFor: string
	***************************************************************************/	
	addListenerForEvent( newListener, callback ) {
		if ( (newListener instanceof HTMLElement) 
		&&	 (typeof callback === 'function') ) {
			this.listeners.push( newListener );
			newListener.addEventListener('changeSelectItem', callback);
		}
	}

	/***************************************************************************
	*	@todo
	*		
	***************************************************************************/	
	emitEventForListeners() {
		for (let i = 0; i < this.listeners.length; i++)
			this.listeners[i].dispatchEvent( new Event( this.event ) );
		this.execAllTasks();
	}
}