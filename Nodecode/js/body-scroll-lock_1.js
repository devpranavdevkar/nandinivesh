( function( global, factory ) {
	if ( typeof define === 'function' && define.amd ) {
		define( [ 'exports' ], factory );
	} else if ( typeof exports !== 'undefined' ) {
		factory( exports );
	} else {
		const mod = {
	  exports: {},
		};
		factory( mod.exports );
		global.bodyScrollLock = mod.exports;
	}
}( this, function( exports ) {
	'use strict';

	Object.defineProperty( exports, '__esModule', {
		value: true,
	} );

	function _toConsumableArray( arr ) {
		if ( Array.isArray( arr ) ) {
	  for ( var i = 0, arr2 = Array( arr.length ); i < arr.length; i++ ) {
				arr2[ i ] = arr[ i ];
	  }

	  return arr2;
		}
	  return Array.from( arr );
	}

	// Older browsers don't support event options, feature detect it.

	// Adopted and modified solution from Bohdan Didukh (2017)
	// https://stackoverflow.com/questions/41594997/ios-10-safari-prevent-scrolling-behind-a-fixed-overlay-and-maintain-scroll-posi

	let hasPassiveEvents = false;
	if ( typeof window !== 'undefined' ) {
		const passiveTestOptions = {
	  get passive() {
				hasPassiveEvents = true;
				return undefined;
	  },
		};
		window.addEventListener( 'testPassive', null, passiveTestOptions );
		window.removeEventListener( 'testPassive', null, passiveTestOptions );
	}

	const isIosDevice = typeof window !== 'undefined' && window.navigator && window.navigator.platform && ( /iP(ad|hone|od)/.test( window.navigator.platform ) || window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1 );

	let locks = [];
	let documentListenerAdded = false;
	let initialClientY = -1;
	let previousBodyOverflowSetting = void 0;
	let previousBodyPaddingRight = void 0;

	// returns true if `el` should be allowed to receive touchmove events.
	const allowTouchMove = function allowTouchMove( el ) {
		return locks.some( function( lock ) {
	  if ( lock.options.allowTouchMove && lock.options.allowTouchMove( el ) ) {
				return true;
	  }

	  return false;
		} );
	};

	const preventDefault = function preventDefault( rawEvent ) {
		const e = rawEvent || window.event;

		// For the case whereby consumers adds a touchmove event listener to document.
		// Recall that we do document.addEventListener('touchmove', preventDefault, { passive: false })
		// in disableBodyScroll - so if we provide this opportunity to allowTouchMove, then
		// the touchmove event on document will break.
		if ( allowTouchMove( e.target ) ) {
	  return true;
		}

		// Do not prevent if the event has more than one touch (usually meaning this is a multi touch gesture like pinch to zoom).
		if ( e.touches.length > 1 ) {
			return true;
		}

		if ( e.preventDefault ) {
			e.preventDefault();
		}

		return false;
	};

	const setOverflowHidden = function setOverflowHidden( options ) {
	// If previousBodyPaddingRight is already set, don't set it again.
		if ( previousBodyPaddingRight === undefined ) {
	  const _reserveScrollBarGap = !! options && options.reserveScrollBarGap === true;
	  const scrollBarGap = window.innerWidth - document.documentElement.clientWidth;

	  if ( _reserveScrollBarGap && scrollBarGap > 0 ) {
				previousBodyPaddingRight = document.body.style.paddingRight;
				document.body.style.paddingRight = scrollBarGap + 'px';
	  }
		}

		// If previousBodyOverflowSetting is already set, don't set it again.
		if ( previousBodyOverflowSetting === undefined ) {
	  previousBodyOverflowSetting = document.body.style.overflow;
	  document.body.style.overflow = 'hidden';
		}
	};

	const restoreOverflowSetting = function restoreOverflowSetting() {
		if ( previousBodyPaddingRight !== undefined ) {
	  document.body.style.paddingRight = previousBodyPaddingRight;

	  // Restore previousBodyPaddingRight to undefined so setOverflowHidden knows it
	  // can be set again.
	  previousBodyPaddingRight = undefined;
		}

		if ( previousBodyOverflowSetting !== undefined ) {
	  document.body.style.overflow = previousBodyOverflowSetting;

	  // Restore previousBodyOverflowSetting to undefined
	  // so setOverflowHidden knows it can be set again.
	  previousBodyOverflowSetting = undefined;
		}
	};

	// https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#Problems_and_solutions
	const isTargetElementTotallyScrolled = function isTargetElementTotallyScrolled( targetElement ) {
		return targetElement ? targetElement.scrollHeight - targetElement.scrollTop <= targetElement.clientHeight : false;
	};

	const handleScroll = function handleScroll( event, targetElement ) {
		const clientY = event.targetTouches[ 0 ].clientY - initialClientY;

		if ( allowTouchMove( event.target ) ) {
	  return false;
		}

		if ( targetElement && targetElement.scrollTop === 0 && clientY > 0 ) {
	  // element is at the top of its scroll.
	  return preventDefault( event );
		}

		if ( isTargetElementTotallyScrolled( targetElement ) && clientY < 0 ) {
	  // element is at the bottom of its scroll.
	  return preventDefault( event );
		}

		event.stopPropagation();
		return true;
	};

	const disableBodyScroll = exports.disableBodyScroll = function disableBodyScroll( targetElement, options ) {
	// targetElement must be provided
		if ( ! targetElement ) {
	  // eslint-disable-next-line no-console
	  console.error( 'disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.' );
	  return;
		}

		// disableBodyScroll must not have been called on this targetElement before
		if ( locks.some( function( lock ) {
	  return lock.targetElement === targetElement;
		} ) ) {
	  return;
		}

		const lock = {
	  targetElement,
	  options: options || {},
		};

		locks = [].concat( _toConsumableArray( locks ), [ lock ] );

		if ( isIosDevice ) {
	  targetElement.ontouchstart = function( event ) {
				if ( event.targetTouches.length === 1 ) {
		  // detect single touch.
		  initialClientY = event.targetTouches[ 0 ].clientY;
				}
	  };
	  targetElement.ontouchmove = function( event ) {
				if ( event.targetTouches.length === 1 ) {
		  // detect single touch.
		  handleScroll( event, targetElement );
				}
	  };

	  if ( ! documentListenerAdded ) {
				document.addEventListener( 'touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined );
				documentListenerAdded = true;
	  }
		} else {
	  setOverflowHidden( options );
		}
	};

	const clearAllBodyScrollLocks = exports.clearAllBodyScrollLocks = function clearAllBodyScrollLocks() {
		if ( isIosDevice ) {
	  // Clear all locks ontouchstart/ontouchmove handlers, and the references.
	  locks.forEach( function( lock ) {
				lock.targetElement.ontouchstart = null;
				lock.targetElement.ontouchmove = null;
	  } );

	  if ( documentListenerAdded ) {
				document.removeEventListener( 'touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined );
				documentListenerAdded = false;
	  }

	  // Reset initial clientY.
	  initialClientY = -1;
		} else {
	  restoreOverflowSetting();
		}

		locks = [];
	};

	const enableBodyScroll = exports.enableBodyScroll = function enableBodyScroll( targetElement ) {
		if ( ! targetElement ) {
	  // eslint-disable-next-line no-console
	  console.error( 'enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.' );
	  return;
		}

		locks = locks.filter( function( lock ) {
	  return lock.targetElement !== targetElement;
		} );

		if ( isIosDevice ) {
	  targetElement.ontouchstart = null;
	  targetElement.ontouchmove = null;

	  if ( documentListenerAdded && locks.length === 0 ) {
				document.removeEventListener( 'touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined );
				documentListenerAdded = false;
	  }
		} else if ( ! locks.length ) {
	  restoreOverflowSetting();
		}
	};
} ) );
