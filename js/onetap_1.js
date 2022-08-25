window.LoginWithGoogleDataCallBack = function( response ) {

	var xhr = new XMLHttpRequest();
	xhr.open('POST', TempAccessOneTap.ajaxurl, true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = function() {
		if(xhr.readyState === XMLHttpRequest.DONE) {
			const status = xhr.status;
			if ( status === 200 ) {
				const response = JSON.parse( xhr.responseText );

				if ( ! response.success ) {
					alert( response.data );
					return;
				}

				try {

				const userPicture = response.data.picture;

				if( userPicture ) {

					const picture     = document.getElementById('user-picture');
					const userMenu    = document.getElementById('user-menu');
					const loginButton = document.getElementById('login-button');

					if( ! picture || ! userMenu || ! loginButton ) {
						return;
					}

					picture.src = userPicture;
					userMenu.style.display = 'block';
					loginButton.style.display = 'none';
				}

				} catch ( e ) {
					alert( e.message );
					return;
				}
			}
		}
	};
	xhr.send( 'action=validate_id_token&token=' + response.credential + '&state=' + TempAccessOneTap.state );
};
