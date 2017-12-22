/** @format */
/**
 * External Dependencies
 */
import React from 'react';
import BodyClass from 'react-body-class';
import classNames from 'classnames';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import {
	getPage,
	getPageIdFromPath,
	isRequestingPage,
} from 'wordpress-query-page/lib/selectors';
import he from 'he';
import qs from 'qs';
import QueryPage from 'wordpress-query-page';
import stripTags from 'striptags';

/**
 * Internal Dependencies
 */
import {
	getContent,
	getFeaturedMedia,
	getTitle,
} from 'utils/content';
import Media from './image';
import Placeholder from 'components/placeholder';
import PostPreview from './preview';

class SinglePage extends React.Component {
	renderArticle = () => {
		const post = this.props.post;

		if ( ! post ) {
			return null;
		}

		const meta = {
			title: he.decode( `${ post.title.rendered } – ${ FoxhoundSettings.meta.title }` ),
			description: he.decode( stripTags( post.excerpt.rendered ) ),
			canonical: post.link,
		};

		const classes = classNames( {
			entry: true,
		} );

		const featuredMedia = getFeaturedMedia( post );

		return (
			<article id={ `post-${ post.id }` } className={ classes }>
				<DocumentMeta { ...meta } />
				<BodyClass classes={ [ 'page', 'single', 'single-page' ] } />
				<h1 className="entry-title" dangerouslySetInnerHTML={ getTitle( post ) } />
				{ featuredMedia ? <Media media={ featuredMedia } parentClass="entry-image" /> : null }
				<div className="entry-meta" />
				<div className="entry-content" dangerouslySetInnerHTML={ getContent( post ) } />
			</article>
		);
	};

	render() {
		if ( !! this.props.previewId ) {
			return <PostPreview id={ this.props.previewId } />;
		}

		return (
			<div className="card">
				<QueryPage pagePath={ this.props.path } />

				{ this.props.loading ? <Placeholder type="page" /> : this.renderArticle() }
			</div>
		);
	}
}

export default connect( ( state, { match, location, slug = false } ) => {
	console.log( match, location, slug );

	// from foxthound but returns false
	let path = match.params[ 0 ] || slug;

	// added because match.params was null
	path = location.pathname;

	// added because route wasn't sending slug
	if ( location.pathname === match.path ) {
		path = FoxhoundSettings.frontPage.page;
	}

	// from foxthound page.jsx 2.0.0-alpha
	if ( '/' === path[ path.length - 1 ] ) {
		path = path.slice( 0, -1 );
	}

	// from foxthound page.jsx 1.0.3
	if ( path.indexOf( '/' ) > -1 ) {
		path = path.slice( path.lastIndexOf( '/' ) );
	}

	const postId = getPageIdFromPath( state, path );
	const requesting = isRequestingPage( state, path );
	const post = getPage( state, parseInt( postId ) );

	const query = location.search.replace( '?', '' );
	const previewId = qs.parse( query ).preview_id || null;

	return {
		previewId,
		path,
		postId,
		post,
		requesting,
		loading: requesting && ! post,
	};
} )( SinglePage );
