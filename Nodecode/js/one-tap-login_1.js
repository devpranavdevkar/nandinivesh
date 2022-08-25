jQuery(function($) {

	$( document ).ready( function() {

		const userPicture = UserLoginSuccess();
		const footerLoggedInUserSection = document.getElementsByClassName( 'logged-in-user-section' )[0];
		const footerLoggedOutUserSection = document.getElementsByClassName( 'logged-out-user-section' )[0];

		if ( userPicture ) {
			if ( footerLoggedInUserSection && footerLoggedOutUserSection ) {
				footerLoggedInUserSection.classList.remove( 'hidden' );
				footerLoggedOutUserSection.classList.add( 'hidden' );
			}
		} else {
			footerLoggedInUserSection.classList.add( 'hidden' );
		}

		if ( userPicture.picture ) {
			setProfilePicture( userPicture.picture );
		} else if ( readCookie( 'lead_id' ) ) {
			fetch('https://scripbox.com/content-api/personalize.json', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			} ).then(
				userData => userData.json()
			)
				.then( function ( data ) {

					if ( data.success !== false ) {

						user_picture = {
							"picture": data.profile_image_url,
						};

						// Expiry is 30 mins.
						createCookie('USER_DETAILS', encodeJwt(user_picture), 1 / 48);

						if ( footerLoggedInUserSection && footerLoggedOutUserSection ) {
							footerLoggedInUserSection.classList.remove( 'hidden' );
							footerLoggedOutUserSection.classList.add( 'hidden' );
						}

						setProfilePicture(data.profile_image_url);
					}
				} );
		}
	} );

	/**
	 * sets user profile picture.
	 *
	 * @param string userPicture
	 * @returns null | value
	 */
	function setProfilePicture( userPicture ) {

		const picture = document.getElementById( 'user-picture' );
		const userMenu = document.getElementById( 'user-menu' );
		const loginButton = document.getElementById( 'login-button' );

		if ( ! picture || ! userMenu || ! loginButton ) {
			return;
		}

		picture.src = userPicture;
		userMenu.style.display = 'block';
		loginButton.style.display = 'none';

	}

	/**
	 * Encodes to JWT.
	 *
	 * @param Array payload
	 * @returns string | value
	 */
	function encodeJwt( data ) {

		const user_data = JSON.stringify( data );
		let toEncodeData = btoa( user_data );
		return decodeURIComponent( toEncodeData.replace( /-/g, '+' ).replace( /_/g, '/' ) );

	}

	/**
	 * Decodes JWT token.
	 *
	 * @param token payload
	 * @returns string
	 */
	function parseJwt( token ) {
		let base64 = decodeURIComponent( token.replace( /-/g, '+' ).replace( /_/g, '/' ) );
		let jsonPayload = decodeURIComponent( atob( base64 ).split( '' ).map( function( c ) {
			return '%' + ( '00' + c.charCodeAt( 0 ).toString( 16 ) ).slice( -2 );
		} ).join( '' ) );

		return jsonPayload;
	}

	/**
	 * Cookie setter
	 *
	 * @param name string name
	 * @param value mixed value
	 * @param days int days
	 */
	function createCookie( name, value, days ) {
		var expires;

		if ( days ) {
			var date = new Date();
			date.setTime( date.getTime() + ( days * 24 * 60 * 60 * 1000 ) );
			expires = '; expires=' + date.toGMTString();
		} else {
			expires = '';
		}
		document.cookie = encodeURIComponent( name ) + '=' + encodeURIComponent( value ) + expires + '; path=/; domain=.scripbox.com';
	}

	/**
	 * Cookie reader
	 *
	 * @param name string name
	 * @returns string | value
	 */
	function readCookie( name ) {
		const value = `; ${document.cookie}`;
		const parts = value.split( `; ${name}=` );
		if ( parts.length === 2 ) return parts.pop().split( ';' ).shift();
	}

	/**
	 * Checks if cookie USER_DETAILS is set.
	 *
	 * @returns null | value
	 */
	function UserLoginSuccess( ) {

		var cookie = readCookie( 'USER_DETAILS' );
		if( cookie ) {
			return JSON.parse( parseJwt( cookie ) );
		}
		return '';

	}

	// Logout cookie clear.
	$( '#scripbox-logout' ).on('click', function(e) {
		e.preventDefault();

		let url = $( this ).attr( 'href' );

		let request = {
			action: 'clear_cookies',
			url: url,
		};

		$.ajax( {
			type: 'GET',
			url: mainJsExports.ajaxUrl,
			data: request,
			success: function( response ) {
				window.location.href = url;
			},
			dataType: 'json'
		} );
	} );

} );
