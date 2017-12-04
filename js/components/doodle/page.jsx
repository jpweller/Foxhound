/* global FoxhoundSettings */
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import DocumentMeta from 'react-document-meta';
import BodyClass from 'react-body-class';
import he from 'he';

// Internal dependencies
import QueryPage from 'wordpress-query-page';
import { getPageIdFromPath, isRequestingPage, getPage } from 'wordpress-query-page/lib/selectors';
import ContentMixin from 'utils/content-mixin';

// Components
import DoodleMedia from './image';
// import Comments from 'components/comments';
import Placeholder from 'components/placeholder';
import DoodlePreview from './preview';

class SingleDoodlePage extends React.Component {

	renderArticle() {
		const doodle = this.props.doodle;
		if ( ! doodle ) {
			return null;
		}

		const meta = {
			title: doodle.title.rendered + ' – ' + FoxhoundSettings.meta.title,
			description: doodle.excerpt.rendered,
			canonical: doodle.link,
		};
		meta.title = he.decode( meta.title );

		const classes = classNames( {
			entry: true
		} );
		const featuredMedia = ContentMixin.getFeaturedMedia( doodle );

		return (
			<article id={ `doodle-${ doodle.id }` } className={ classes }>
				<DocumentMeta { ...meta } />
				<BodyClass classes={ [ 'page', 'single', 'single-page' ] } />
				<h1 className="entry-title" dangerouslySetInnerHTML={ ContentMixin.getTitle( doodle ) } />
				{ featuredMedia ?
					<DoodleMedia media={ featuredMedia } parentClass='entry-image' /> :
					null
				}
				<div className="entry-meta"></div>
				<div className="entry-content" dangerouslySetInnerHTML={ ContentMixin.getContent( doodle ) } />
			</article>
		);
	}

	// renderComments() {
	// 	const doodle = this.props.doodle;
	// 	if ( ! doodle ) {
	// 		return null;
	// 	}

	// 	return (
	// 		<Comments
	// 			doodleId={ this.props.doodleId }
	// 			title={ <span dangerouslySetInnerHTML={ this.getTitle( doodle ) } /> }
	// 			commentsOpen={ 'open' === doodle.comment_status } />
	// 	)
	// },

	render() {
		if ( !! this.props.previewId ) {
			return (
				<DoodlePreview id={ this.props.previewId } />
			);
		}

		return (
			<div className="card">
				<QueryPage pagePath={ this.props.path } />

				{ this.props.loading ?
					<Placeholder type="page" /> :
					this.renderArticle()
				}

				{ /* ! this.props.loading && this.renderComments() */ }
			</div>
		);
	}
}

export default connect( ( state, ownProps ) => {
	let path = ownProps.params.splat || ownProps.route.slug;
	if ( '/' === path[ path.length - 1 ] ) {
		path = path.slice( 0, -1 );
	}

	const doodleId = getPageIdFromPath( state, path );
	const requesting = isRequestingPage( state, path );
	const doodle = getPage( state, parseInt( doodleId ) );

	const previewId = ownProps.location.query.preview_id;

	return {
		previewId,
		path,
		doodleId,
		doodle,
		requesting,
		loading: requesting && ! doodle
	};
} )( SingleDoodlePage );
