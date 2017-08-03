/*******************************************************************************
*	@param
*		data: Object. {imgSrc, postTitle, postDescription, postLink}
********************************************************************************/
var postTemlate = function( data ) {
	let slide = document.createElement('article');
		slide.className = 'section__article section__article--post';

	let postFigure = document.createElement('figure');
		postFigure.className = 'article__figure article__figure--post';

	let figureImg = document.createElement('img');
		figureImg.className = 'article__figure-img article__figure-img--post';
		figureImg.setAttribute('src', data.imgSrc);

	postFigure.appendChild( figureImg );
	slide.appendChild( postFigure );

	let postTitle = document.createElement('h2');
		postTitle.className = 'article__post-title';
		postTitle.appendChild( document.createTextNode( data.postTitle ));

	slide.appendChild( postTitle );

	let postDescriptionLength = (data.postDescription >= 250) ? 250 : data.postDescription.length,

		postDescription = document.createElement('div');
		postDescription.className = 'article__post-desciption';
		postDescription.appendChild( 
			document.createTextNode( postDescriptionLength + '...' )
		);

	slide.appendChild( postDescription );

	let postMore = document.createElement('a');
		postMore.className = 'article__more';
		postMore.appendChild( document.createTextNode( 'Далее..' ));
		postMore.setAttribute('href', data.postLink);

	slide.appendChild( postMore );

	return slide;
}

class ETonySlider {
	/***************************************************************************
	*	@param
	*		s (slider): {id, divider, slidesContainerClass}
	***************************************************************************/
	constructor( s, template, tData) {
		this.id = s.id;

		this.slides = [];
		while ( tData.length ) {
			let slideContainer = document.createElement('div');
			if ( s.slidesContainerClass )
				slideContainer.className = s.slidesContainerClass;
			else
				slideContainer.className = 'section__articles';

			for (let i = 0; i < s.divider; i++)
				if ( tData.length )
					slideContainer.appendChild( template( tData.pop() ));

			this.slides.push( slideContainer );
		}
	}
}

var desc = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\
			tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\
			quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\
			consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\
			cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat no\
			proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',

	postSlider = new ETonySlider(
		{id: 'postSlider', divider: 3},
		postTemlate,
		[	{imgSrc: 'img/moto.jpg', postTitle: 'The post title', postDescription: desc, postLink: '#'},
			{imgSrc: 'img/moto.jpg', postTitle: 'The post title', postDescription: desc, postLink: '#'},
			{imgSrc: 'img/moto.jpg', postTitle: 'The post title', postDescription: desc, postLink: '#'},
			{imgSrc: 'img/moto.jpg', postTitle: 'The post title', postDescription: desc, postLink: '#'},
			{imgSrc: 'img/moto.jpg', postTitle: 'The post title', postDescription: desc, postLink: '#'},
			{imgSrc: 'img/moto.jpg', postTitle: 'The post title', postDescription: desc, postLink: '#'},
			{imgSrc: 'img/moto.jpg', postTitle: 'The post title', postDescription: desc, postLink: '#'},
			{imgSrc: 'img/moto.jpg', postTitle: 'The post title', postDescription: desc, postLink: '#'},
			{imgSrc: 'img/moto.jpg', postTitle: 'The post title', postDescription: desc, postLink: '#'}
		]);

var post = document.getElementsByClassName('section__content--post').firstElementNode;
	post.insertBefore( postSlider.slides[0], post.lastElementChild );
