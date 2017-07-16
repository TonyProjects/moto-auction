var
	getImageUri = function(el) {
		el = (el instanceof jQuery) ? el : jQuery(el.currentTarget);
		return el.find('img').attr('src');
	},

	closeGallery = function(el) {
		el.currentTarget.remove();
		jQuery('html').css('overflow', 'visible');
	},

	openGallery = function(uri) {
		jQuery('html').css('overflow', 'hidden');
		var 
			body = jQuery('body'),
			gallery = '\
				<div class="gallery">\
					<figure class="gallery__img-wrapper">\
						<img class="gallery__img" src="' + uri + '"></img>\
					</figure>\
				</div>\
			';
		body.append( gallery );
	};

jQuery(document).ready( function() {

	jQuery('.overphoto').click( function(el) {
		openGallery( getImageUri(el) );
		jQuery('.gallery').click( function(el){
			closeGallery(el);
		});	
	});

});