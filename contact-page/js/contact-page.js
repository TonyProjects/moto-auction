/******************************************************************************
*	How use:
*		<yourHTMLElement>.addEventListener('click', openCP);
*	CSS: contact-page.css
*	SVG:
*		
******************************************************************************/

var 
	pageResize = function( state ) {
		if ( state ) {
			let screenHeight = window.screen.availHeight,

				bodyHeight = document.body.offsetHeight;

			if ( bodyHeight < screenHeight )
				document.body.style.height = screenHeight + 'px';
			document.body.style.overflow = 'hidden';
		} else document.body.style.overflow = 'visible';
	},

	createListenerForCP = function() {
		let contactPage = document.getElementById('contact-page'),
			contactPageClose = contactPage.getElementsByClassName('contact-page__close')[0];

			contactPageClose.addEventListener('click', closeCP);
	},

	openCP = function() {
		pageResize( true );

		let contactPage = document.createElement('div');
			contactPage.id = 'contact-page';

		if ( !(contactPage.hasAttribute('data-state')) ) {
			contactPage.setAttribute('data-state', 'visible');

			let contactPageContent = '\
				<div class="contact-page__background"></div>\
				<div class="container container--contact">\
					<div class="contact-page__close">\
						<div class="contact-page-close__ico" style="background-image: url(svg/close-contact.svg);"></div>\
					</div>\
					<div class="contact-page__wrapper">\
						<div class="contact-page__wrapper-section contact-page__wrapper-section--contacts">\
							<div class="contact-page__section contact-page__section--phone">\
								<div class="contact-page-section__ico" style="background-image: url(svg/phone.svg);"></div>\
								<p class="contact-page-section__text contact-page-section__text--phone"> 8 800 987 65 43 </p>\
							</div>\
							<div class="contact-page__section contact-page__section--address">\
								<div class="contact-page-section__ico" style="background-image: url(svg/address.svg);"></div>\
								<p class="contact-page-section__text"> г.Екатеринбург, ул. Ленина д.56 оф.888 </p>\
							</div>\
							<div class="contact-page__section contact-page__section--runtime">\
								<div class="contact-page-section__ico" style="background-image: url(svg/runtime.svg);"></div>\
								<p class="contact-page-section__text"> \
									<span>Время работы:</span>\
									<span>пн/пт с 8:30 до 20:00</span>\
									<span>сб с 9:00 до 19:00.</span>\
								</p>\
							</div>\
							<div class="contact-page__section contact-page__section--skype">\
								<div class="contact-page-section__ico" style="background-image: url(svg/skype.svg);"> </div>\
								<p class="contact-page-section__text"> motoshar-office </p>\
							</div>\
						</div>\
						<div class="contact-page__wrapper-section contact-page__wrapper-section--map" style="background-image: url(img/contact-map.png);"></div>\
					</div>\
				</div>';

			contactPage.innerHTML = contactPageContent;

			document.body.insertBefore(contactPage, document.body.firstElementChild);

			createListenerForCP();
		}

		if ( contactPage.getAttribute('data-state') === 'hide' )
			contactPage.setAttribute('data-state', 'visible');
	},

	closeCP = function() {
		let contactPage = document.getElementById('contact-page');
			contactPage.setAttribute('data-state', 'hide');
			contactPage.style.display = 'none';
		pageResize();
	};