/**
 * Handles Menus related functionalities.
 */

// Secondary Header related functionalities.
jQuery( function( $ ) {
	$eventFired = 0;
	$container = $( '.secondary-header' );
	$triggers = $( '.secondary-header .menu-item-has-children' );

	if ( ! $container || ! $triggers ) {
		return;
	}

	handleMenuToggling( $triggers, $eventFired );

	$( window ).on( 'resize', function() {
		handleMenuToggling( $triggers, $eventFired );
	} );

	window.addEventListener(
		'scroll',
		( e ) => scrollCallback( e ),
		{ passive: true }
	);

	const config = {
		headerClass: 'site-header',
		headerEle: document.getElementsByClassName( 'site-header' )[0],
		secondaryHeaderEle: document.getElementsByClassName( 'secondary-menu-wrapper' )[0],
		headerHeight: 0,
		wheelThreshold: 1, // In percentage.
		siteContentId: 'content',
		scrollToTopEle: '',
		scrollDirection: 'down',
		maxScroll: 0,
	};

	function scrollCallback() {
		config.headerHeight = config.headerEle.offsetHeight;
		if ( window.pageYOffset > config.headerHeight ) {
			modifyElementClass( config.secondaryHeaderEle, 'fixed', 'add' );
			modifyElementClass( config.secondaryHeaderEle, 'top-main', 'add' );
		} else {
			modifyElementClass( config.secondaryHeaderEle, 'fixed', 'remove' );
			modifyElementClass( config.secondaryHeaderEle, 'top-main', 'remove' );
		}
	}

	/**
	 * Modifies class for the given DOM element.
	 *
	 * @param {Object} element DOM Element to be proccessed.
	 * @param {string} className Class name.
	 * @param {string} action Action to be performed. add | remove | toggle.
	 *
	 * return {void}
	 */
	function modifyElementClass( element, className, action = 'add' ) {
		if ( 'add' === action ) {
			element.classList.add( className );
		} else if ( 'remove' === action ) {
			element.classList.remove( className );
		} else if ( 'toggle' === action ) {
			element.classList.toggle( className );
		}
	}

	function handleMenuToggling( $triggers, $eventFired ) {
		if ( $eventFired || $( window ).width() > 768 ) {
			return;
		}

		$triggers.each(
			function() {
				$( this ).click(
					function() {
						$( '.secondary-header .sub-menu.slide-up' ).removeClass( 'slide-up' );
						$( this ).find( '.sub-menu' ).addClass( 'slide-up' );

						$overlay = $( '.secondary-header__mobile-background-overlay' );
						$overlay.fadeIn( '100' );
						$overlay.click(
							function() {
								$( '.secondary-header .sub-menu.slide-up' ).removeClass( 'slide-up' );
								$overlay.fadeOut();
							}
						);

						return false;
					}
				);
			}
		);
	}
} );

// Footer menus related functionalities.
jQuery( function( $ ) {
	$( '.secondary-footer .accordion-heading' ).on( 'click', function() {
		$wrapperElement = $( this ).parent();
		$contentElement = $wrapperElement.find( '.accordion-content' );

		if ( 0 === $contentElement.height() ) {
			$contentElement.animate( { height: $contentElement.get( 0 ).scrollHeight }, 200 );
			$wrapperElement.addClass( 'expanded' );
		} else {
			$contentElement.animate( { height: 0 }, 200 );
			$wrapperElement.removeClass( 'expanded' );
		}
	} );

	const handlePrimaryFooterToggle = function() {
		if ( ! window.matchMedia( '(max-width: 576px)' ).matches ) {
			$( '.primary-footer .accordion-heading' ).off( 'click.footerMenu' );
			return;
		}

		$( '.primary-footer .accordion-heading' ).on( 'click.footerMenu', function() {
			$wrapperElement = $( this ).parent();
			$contentElement = $wrapperElement.find( '.accordion-content' );

			if ( 0 === $contentElement.height() ) {
				$contentElement.animate( { height: $contentElement.get( 0 ).scrollHeight }, 200 );
				$wrapperElement.addClass( 'expanded' );
			} else {
				$contentElement.animate( { height: 0 }, 200 );
				$wrapperElement.removeClass( 'expanded' );
			}
		} );
	};

	handlePrimaryFooterToggle();

	$( window ).on( 'resize', handlePrimaryFooterToggle );
} );
