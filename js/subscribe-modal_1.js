jQuery(function($) {

	// Getting all elements.
	const subscribeModal = document.getElementById('subscribe-modal');
	const successModal = document.getElementById('success-modal');
	const subscribeButton = document.getElementById('subscribe-button');
	const subscribeButtonMobile = document.getElementById('subscribe-button--mobile');
	const mobileBottomStickyWidget = document.getElementsByClassName('mobile-bottom-sticky-widget')[0];
	const subscribeModalClose = document.getElementById('subscribe-modal-close');
	const subscriptionForms = document.getElementsByClassName('subscriber-email-form');
	const successModalClose = document.getElementById('sub-success-close');
	const subscribeFormButton = document.getElementsByClassName('newsletter-form-submit');

	if (
		! subscribeModal ||
		! successModal ||
		! subscriptionForms.length
		) {
		return;
	}

	/**
	 * Function to toggle hidden class on element.
	 * @param {object} moodal
	 * @param {string} className
	 * @param {string} operation
	 */
	function modifyClass( modal, className, operation = 'add' ) {
		if ( 'add' === operation ) {
			modal.classList.add( className );
		} else if ( 'remove' === operation ) {
			modal.classList.remove( className );
		} else if ( 'toggle' === operation ) {
			modal.classList.toggle( className );
		}
	}

	/**
	 * Function for Validating Email
	 *
	 * @param {string} email
	 */
	function validateEmail( email ) {

		// Email Regex
		const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

		if( email.match( emailRegex ) ) {
			return true;
		}

		return false;

	}

	/**
	 * Cookie setter
	 *
	 * @param string name
	 * @param mixed value
	 * @param int days
	 */
	function createCookie(name, value, days) {
		var expires;

		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = '; expires=' + date.toGMTString();
		} else {
			expires = '';
		}
		document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + expires + '; path=/';
	}

	/**
	 * Cookie reader
	 *
	 * @param string name
	 * @returns null | value
	 */
	function readCookie(name) {

		var cookieName = encodeURIComponent(name) + '=';
		var cookieArray = document.cookie.split(';');
		for (var index = 0; index < cookieArray.length; index++) {
			var currentCookie = cookieArray[index];
			while (currentCookie.charAt(0) === ' ')
				currentCookie = currentCookie.substring(1, currentCookie.length);
			if (currentCookie.indexOf(cookieName) === 0)
				return decodeURIComponent(currentCookie.substring(cookieName.length, currentCookie.length));
		}
		return null;
	}

	/**
	 * Cookie delete
	 *
	 * @param string name
	 */
	function eraseCookie(name) {
		createCookie(name,'',-1);
	}

	if ( subscribeButton ) {
		subscribeButton.addEventListener("click", function() {
			$( subscribeModal ).toggle(300);
		});
	}

	if ( subscribeFormButton ) {
		Array.from( subscribeFormButton ).forEach(
			function( button ) {
				button.addEventListener( "click", function() {
					$( subscribeModal ).toggle(300);
				} );
			}
		);
	}

	if ( subscribeButtonMobile ) {
		subscribeButtonMobile.addEventListener("click", function() {
			$( subscribeModal ).toggle(300);
		});
	}

	if ( subscribeModalClose ) {
		subscribeModalClose.addEventListener("click", function() {
			$( subscribeModal ).toggle(300);
		});
	}

	if ( successModalClose ) {
		successModalClose.addEventListener("click", function() {
			$( successModal ).toggle(300);
		});
	}

	// Close modal on click outside of modal.
	$(document).click(function (e) {

		if ( $(e.target).is('.subscribe-modal-layout') ) {
			$( subscribeModal).toggle(300);
		}
		if ( $(e.target).is('.sub-success-layout') ) {
			$( successModal).toggle(300);
		}
	});

	// Hide subscribe button if cookie is set.
	if( readCookie('scripbox_subscriber_email') ) {
		modifyClass( subscribeButton, 'hidden', 'add' );
		modifyClass( mobileBottomStickyWidget, 'sm:hidden', 'add' );
	}

	Array.from( subscriptionForms ).forEach( subscriptionForm => {
		subscriptionForm.addEventListener('submit', async (event) => {

			var formSource = subscriptionForm.getAttribute( 'data-source' );

			// setting up the form elements.
			const invalidEmailWarning = subscriptionForm.getElementsByClassName('sub-modal-invalid')[0];
			const dotFlashingLoader = subscriptionForm.getElementsByClassName('dot-flashing--subscribe')[0];

			if (
				! invalidEmailWarning ||
				! dotFlashingLoader
			) {
				return;
			}

			// Prevent default form submission.
			event.preventDefault();

			// Display loader
			$( dotFlashingLoader ).show();

			// Get user email.
			let userEmail = subscriptionForm.elements['subscribe-modal__input-email'].value;

			if ( ! validateEmail( userEmail ) ) {
				// Show invalid email warning.
				$( invalidEmailWarning ).show();
				$( dotFlashingLoader ).hide();

				// reset form.
				subscriptionForm.reset();
				return;
			}

			var cookieEmail = readCookie('scripbox_subscriber_email');

			// If no Cookie available or does not match entered email, check data through API.
			if( cookieEmail === null || cookieEmail !== userEmail ) {

				// Erase previous cookie.
				eraseCookie('scripbox_subscriber_email');

				let postData = {'email':userEmail, 'source': 'subscription'};

				if ( formSource === 'footer' ) {
					postData.source = 'Footer Subscription';
				}

				await fetch( subscribeModalExports?.SCRIPBOX_SUBSCRIBERS_LIST_API, {
				method: 'POST',
				crossDomain: true,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(postData),
				}).then( data => {

					// Setting cookie for 30 days.
					createCookie('scripbox_subscriber_email', userEmail , 30);

					// Hide Subscribe button.
					modifyClass( subscribeButton, 'hidden', 'add' );
					modifyClass( mobileBottomStickyWidget, 'sm:hidden', 'add' );

					if ( 'header' === formSource ) {
						// Hide subscribe modal.
						$( subscribeModal ).hide(300);
					} else if ( 'footer' === formSource ) {
						subscriptionForm.elements['subscribe-modal__button-submit'].innerText = 'Subscribed!';
					}

					if( readCookie('scripbox_subscriber_email') !== null ) {
						if ( 'header' === formSource ) {
							// Open success modal.
							$( successModal).show(300);
						}
					}

					// Hide if the are not hidden
					$( dotFlashingLoader ).hide();
					$( invalidEmailWarning ).hide();

				})
				.catch((error) => {

					if ( 'header' === formSource ) {
						// Hide subscribe modal.
						$( subscribeModal ).hide(300);
					}

					// Hide if the are not hidden
					$( dotFlashingLoader ).hide();
					$( invalidEmailWarning ).hide();
				});

			} else if( cookieEmail === userEmail ) {

				// Hide Subscribe button.
				modifyClass( subscribeButton, 'hidden', 'add' );
				modifyClass( mobileBottomStickyWidget, 'sm:hidden', 'add' );
			}

			subscriptionForm.reset();
		});
	} );

});
