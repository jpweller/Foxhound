/** @format */
/**
 * External Dependencies
 */
// Load in the babel (es6) polyfill, and fetch polyfill
import 'babel-polyfill';
import 'whatwg-fetch';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { escapeRegExp } from 'lodash';

// Load the CSS
require( '../sass/style.scss' );

// Internal
import { createReduxStore } from './state';
import ScrollToTop from './utils/scroll-to-top';
import { setMenu } from 'wordpress-query-menu/lib/state';
import { setPost, setPosts } from './utils/initial-actions';

// Components
import Index from 'components/posts';
import Navigation from 'components/navigation';
import NotFound from 'components/not-found';
import SinglePage from 'components/post/page';
import Doodles from 'components/doodles';
// import SingleDoodle from 'components/doodle';
import SinglePost from 'components/post';
import Term from 'components/term';

// Accessibility!
import {
	skipLink,
	// toggleFocus,
} from 'utils/a11y';

// Now the work starts.
const store = createReduxStore();
const history = createHistory();
const path = FoxhoundSettings.URL.path || '/';

function renderApp() {
	// console.log( FoxhoundSettings.frontPage.page );
	let blogURL, frontPageRoute;
	if ( FoxhoundSettings.frontPage.page ) {
		blogURL = path + FoxhoundSettings.frontPage.blog + '/';
		frontPageRoute = <Route path={ path } exact slug={ FoxhoundSettings.frontPage.page } component={ SinglePage } />;
	} else {
		blogURL = path;
		frontPageRoute = null;
	}

	const getTermComponent = taxonomy => props => <Term { ...props } taxonomy={ taxonomy } />;

	// <Route path={ `${ path }doodles/:slug` } component={ SingleDoodle } />

	// Routes
	const routes = (
		<ScrollToTop>
			<Switch>
				<Route path={ blogURL } exact component={ Index } />
				{ frontPageRoute }
				<Route path={ `${ path }doodles/` } component={ Doodles } />
				<Route path={ `${ path }category/:slug` } component={ getTermComponent( 'category' ) } />
				<Route path={ `${ path }tag/:slug` } component={ getTermComponent( 'post_tag' ) } />
				<Route path={ `${ path }about` } component={ SinglePage } />
				<Route path={ `${ path }:slug` } component={ SinglePost } />
				<Route path="*" component={ NotFound } />
			</Switch>
		</ScrollToTop>
	);

	// console.log( routes );
	render(
		<Provider store={ store }>
			<ConnectedRouter history={ history }>{ routes }</ConnectedRouter>
		</Provider>,
		document.getElementById( 'main' )
	);

	if ( FoxhoundMenu.enabled ) {
		render(
			<Provider store={ store }>
				<Navigation />
			</Provider>,
			document.getElementById( 'site-navigation' )
		);
	} else {
		// Run this to initialize the focus JS for PHP-generated menus
		initNoApiMenuFocus();
	}
}

// const button = document.getElementById( 'menu-toggle' );
// 	button.addEventListener( 'click', function( e ) {
// 		if ( -1 !== menu.className.indexOf( 'menu-open' ) ) {
// 			menu.className = menu.className.replace( ' menu-open', '' );
// 			menu.setAttribute( 'aria-expanded', 'false' );
// 			button.setAttribute( 'aria-expanded', 'false' );
// 		} else {
// 			menu.className += ' menu-open';
// 			menu.setAttribute( 'aria-expanded', 'true' );
// 			button.setAttribute( 'aria-expanded', 'true' );
// 		}
// 		e.preventDefault();
// 	} );

function initNoApiMenuFocus() {
	const container = document.getElementById( 'masthead' );
	if ( ! container ) {
		return;
	}

	const menu = container.getElementsByClassName( 'site-nav' )[ 0 ];
	// No menu, no need to run the rest.
	if ( ! menu ) {
		return;
	}

	const button = container.getElementsByTagName( 'button' )[ 0 ];

	const closeMenu = function() {
		container.className = container.className.replace( ' menu-open', '' );
		menu.setAttribute( 'aria-expanded', 'false' );
		button.setAttribute( 'aria-expanded', 'false' );
	};

	button.onclick = function() {
		if ( -1 !== container.className.indexOf( 'menu-open' ) ) {
			closeMenu();
		} else {
			container.className += ' menu-open';
			menu.setAttribute( 'aria-expanded', 'true' );
			button.setAttribute( 'aria-expanded', 'true' );
		}
	};

	const linksSite = menu.getElementsByTagName( 'a' );
	// Each time a menu link is focused or blurred, toggle focus.
	let i, len;
	for ( i = 0, len = linksSite.length; i < len; i++ ) {
		// linksSite[ i ].addEventListener( 'focus', toggleFocus, true );
		// linksSite[ i ].addEventListener( 'blur', toggleFocus, true );
		linksSite[ i ].addEventListener( 'click', closeMenu, true );
	}

	// const linksSocial = menuSocial.getElementsByTagName( 'a' );
	// // Each time a menu link is focused or blurred, toggle focus.
	// for ( i = 0, len = linksSocial.length; i < len; i++ ) {
	// 	// linksSocial[ i ].addEventListener( 'focus', toggleFocus, true );
	// 	// linksSocial[ i ].addEventListener( 'blur', toggleFocus, true );
	// }
}

// Set up link capture on all links in the app context.
function handleLinkClick() {
	// This regex matches any string with the wp site's URL in it, but we want to trim the trailing slash
	let regexBaseUrl = FoxhoundSettings.URL.base;
	if ( '/' === regexBaseUrl[ regexBaseUrl.length - 1 ] ) {
		regexBaseUrl = regexBaseUrl.slice( 0, regexBaseUrl.length - 1 );
	}
	const escapedSiteURL = new RegExp( escapeRegExp( regexBaseUrl ).replace( /\//g, '\\/' ) );

	jQuery( 'body' ).on( 'click', 'a[rel!=external][target!=_blank]', event => {
		// Don't capture clicks offsite
		if ( ! escapedSiteURL.test( event.currentTarget.href ) ) {
			return;
		}

		// Custom functionality for attachment pages
		const linkRel = jQuery( event.currentTarget ).attr( 'rel' );
		if ( linkRel && linkRel.search( /attachment/ ) !== -1 ) {
			event.preventDefault();
			const result = jQuery( event.currentTarget )
				.attr( 'rel' )
				.match( /wp-att-(\d*)/ );
			const attachId = result[ 1 ];
			history.push( path + 'attachment/' + attachId );
			return;
		}

		// Don't capture clicks to wp-admin, or the RSS feed
		if (
			/wp-(admin|login)/.test( event.currentTarget.href ) ||
			/\/feed\/$/.test( event.currentTarget.href )
		) {
			return;
		}
		event.preventDefault();
		let url = event.currentTarget.href;

		url = url.replace( FoxhoundSettings.URL.base, FoxhoundSettings.URL.path );
		history.push( url );
	} );

	jQuery( 'body' ).on( 'click', 'a[href^="#"]', event => {
		skipLink( event.target );
	} );
}

// If we have pre-loaded data, we know we're viewing the list of posts, and should pre-load it.
function renderPreloadData() {
	const actions = bindActionCreators( { setMenu, setPost, setPosts }, store.dispatch );
	actions.setMenu( 'primary', FoxhoundMenu.data );

	if ( FoxhoundData.data.length > 1 ) {
		actions.setPosts( FoxhoundData.data, FoxhoundData.paging );
	} else if ( FoxhoundData.data.length ) {
		const post = FoxhoundData.data[ 0 ];
		actions.setPost( post );
	}
}

function logoHover() {
	let canGo = true;
	const delay = 1000;
	const logoAnimate = function() {
		if ( canGo ) {
			canGo = false;
			jQuery( '.logo animateTransform' )[ 0 ].beginElement();
			jQuery( '.logo animate' )[ 0 ].beginElement();
			setTimeout( function() {
				canGo = true;
			}, delay );
		}
	};

	jQuery( '.logo' ).mouseenter( function() {
		logoAnimate();
	} );
}

document.addEventListener( 'DOMContentLoaded', function() {
	renderApp();
	renderPreloadData();
	handleLinkClick();
	logoHover();
} );
