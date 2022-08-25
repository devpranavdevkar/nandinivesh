function setupListeners() {
	const subscribeButtonElements = document.getElementsByClassName( 'subscribe-button__event-tracking' );
	const subscribeModalTriggers = document.getElementsByClassName( 'subscribe-modal-trigger' );
	const genericSubscribeModal = document.getElementById( 'generic-subscribe-modal' );

	Array.from( subscribeButtonElements ).forEach( ( subscribeButton ) => {
		subscribeButton.addEventListener( 'click', function() {
			const dataSource = subscribeButton.getAttribute( 'data-source' );

			if ( typeof ga === 'function' ) { // Check if GA is loaded.
				// eslint-disable-next-line no-undef
				ga( 'gtag_UA_31140942_1.send', {
					hitType: 'event',
					eventCategory: dataSource,
					eventAction: 'Subscribe',
					eventLabel: 'Newsletter',
				} );
			}
		} );
	} );

	if ( genericSubscribeModal ) {
		/**
		 * The subscribe modal can be triggered from multiple places on the website and the same
		 * subscribe modal will be used for all of the triggers. Below snippet forwards the location
		 * (data-source) from the trigger to the modal to ensure correct GA data are sent based on
		 * where the modal was opened. If you're adding a new trigger or location from where the modal
		 * can be opened, ensure to add the 'subscribe-modal-trigger' class along with desired GA source
		 * value as 'data-source' attribute.
		 */
		Array.from( subscribeModalTriggers ).forEach( ( modalTrigger ) => {
			modalTrigger.addEventListener( 'click', function() {
				const dataSource = modalTrigger.getAttribute( 'data-source' );

				if ( dataSource ) {
					genericSubscribeModal.elements[ 'subscribe-modal__button-submit' ].setAttribute( 'data-source', dataSource );
				}
			} );
		} );
	}
}

window.addEventListener( 'DOMContentLoaded', setupListeners );
