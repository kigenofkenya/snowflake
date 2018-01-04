
const vaultSmartFx = () => {
	// browser window scroll (in pixels) after which the "menu" link is shown
	let offset = 300;
	let slowTransitionDelay = 300
	let fastTransitionDelay = 100
	//hide or show the "menu" link
	checkMenu();
	window.addEventListener("scroll", checkMenu);
	//open or close the menu clicking on the bottom "menu" link
	document.querySelector('.cd-nav-trigger').addEventListener('click', (event)=> {
		document.querySelector('.cd-nav-trigger').classList.toggle('menu-is-open');
		window.setTimeout(function () {
			document.querySelector('#cd-main-nav').querySelector('ul').classList.toggle('is-visible');
		}, fastTransitionDelay);
	});
	function checkMenu() {
		if( window.scrollTop > offset && !document.querySelector('#cd-nav').classList.contains('is-fixed')) {
				document.querySelector('#cd-main-nav').querySelector('ul').classList.add('is-fixed')
					window.setTimeout(function () {
					console.log('transition done')
					document.querySelector('#cd-main-nav').querySelector('ul').classList.add('has-transitions');
					}, slowTransitionDelay);

		} else if ( window.scrollTop <= offset) {
			//check if the menu is open when scrolling up
			if( document.querySelector('#cd-main-nav').querySelector('ul').classList.contains('is-visible')  && !document.documentElement.classList.contains('no-csstransitions') ) {
				 document.querySelector('#cd-main-nav').querySelector('ul').classList.add('is-hidden')
					window.setTimeout(function () {
					console.log('transition done')
					document.querySelector('#cd-main-nav').querySelector('ul').classList.remove('is-visible', 'is-hidden', 'has-transitions');
					document.querySelector('#cd-nav').classList.remove('is-fixed');
					document.querySelector('.cd-nav-trigger').classList.remove('menu-is-open');
					}, slowTransitionDelay);
			} else if( document.querySelector('#cd-main-nav').querySelector('ul').classList.contains('is-visible')  && document.documentElement.classList.contains('no-csstransitions') ) {
					document.querySelector('#cd-main-nav').querySelector('ul').classList.remove('is-visible has-transitions');
					document.querySelector('#cd-nav').classList.remove('is-fixed');
					document.querySelector('.cd-nav-trigger').classList.remove('menu-is-open');
					// $('.cd-nav-trigger').removeClass('menu-is-open');
			//scrolling up with menu closed
			} else {
				document.querySelector('#cd-nav').classList.remove('is-fixed');
				document.querySelector('#cd-main-nav').querySelector('ul').classList.remove('has-transitions');
				// mainNavigation.removeClass('has-transitions');
			}
		} 
	}
}
document.addEventListener('DOMContentLoaded', e => {
	vaultSmartFx()
})