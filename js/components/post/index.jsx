/** @format */
/**
 * External Dependencies
 */
import React from 'react';
import BodyClass from 'react-body-class';
import classNames from 'classnames';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { getPost, getPostIdFromSlug, isRequestingPost } from 'wordpress-query-posts/lib/selectors';
import he from 'he';
import qs from 'qs';
import QueryPosts from 'wordpress-query-posts';
import stripTags from 'striptags';

/**
 * Internal Dependencies
 */
import { getContent, getDate, getFeaturedMedia, getTitle } from 'utils/content';
import Media from './image';
import Placeholder from 'components/placeholder';
import PostMeta from './meta';
import PostPreview from './preview';

class SinglePost extends React.Component {
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
				<BodyClass classes={ [ 'single', 'single-post' ] } />
				<h1 className="entry-title" dangerouslySetInnerHTML={ getTitle( post ) } />
				{ featuredMedia ? <Media media={ featuredMedia } parentClass="entry-image" /> : null }
				<div className="entry-meta" />
				<div className="entry-content" dangerouslySetInnerHTML={ getContent( post ) } />

				<PostMeta post={ post } humanDate={ getDate( post ) } />
			</article>
		);
	};

	render() {
		if ( !! this.props.previewId ) {
			return <PostPreview id={ this.props.previewId } />;
		}

		return (
			<div className="card">
				<QueryPosts postSlug={ this.props.slug } />
				{ this.props.loading ? <Placeholder type="post" /> : this.renderArticle() }
			</div>
		);
	}
}

export default connect( ( state, { match, location } ) => {
	const slug = match.params.slug || false;
	const postId = getPostIdFromSlug( state, slug );
	const requesting = isRequestingPost( state, slug );
	const post = getPost( state, parseInt( postId ) );

	const query = location.search.replace( '?', '' );
	const previewId = qs.parse( query ).preview_id || null;

	return {
		previewId,
		slug,
		postId,
		post,
		requesting,
		loading: requesting && ! post,
	};
} )( SinglePost );
