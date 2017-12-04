/* global FoxhoundSettings */
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import DocumentMeta from 'react-document-meta';
import BodyClass from 'react-body-class';
import he from 'he';

// Internal dependencies
import QueryDoodles from 'wordpress-query-custom-posts-doodles';
import { getDoodleIdFromSlug, isRequestingDoodle, getDoodle } from 'wordpress-query-custom-posts-doodles/lib/selectors';
import ContentMixin from 'utils/content-mixin';

// Components
import DoodleMeta from './meta';
import Media from './image';
// import Comments from 'components/comments';
import Placeholder from 'components/placeholder';
import DoodlePreview from './preview';

class SingleDoodle extends React.Component {

	renderArticle() {

		// console.log("doodle index.jsx SingleDoodle renderArticle()");
		// console.log("this: ", this);

		const doodle = this.props.doodle;
		if ( ! doodle ) {
			return null;
		}

		console.log("doodle: ", doodle);

		const meta = {
			title: doodle.title.rendered + ' – ' + FoxhoundSettings.meta.title,
			// description: doodle.excerpt.rendered,
			description: "Experimental work",
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
				<BodyClass classes={ [ 'single', 'single-doodle' ] } />
				<h1 className="entry-title" dangerouslySetInnerHTML={ ContentMixin.getTitle( doodle ) } />
				{ featuredMedia ?
					<Media media={ featuredMedia } parentClass='entry-image' /> :
					null
				}
				<div className="entry-meta"></div>
				<div className="entry-content" dangerouslySetInnerHTML={ ContentMixin.getDoodle( doodle ) } />

				<DoodleMeta doodle={ doodle } humanDate={ ContentMixin.getDate( doodle ) } />
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
	// 			protected={ doodle.content.protected }
	// 			doodleId={ this.props.doodleId }
	// 			title={ <span dangerouslySetInnerHTML={ this.getTitle( doodle ) } /> }
	// 			commentsOpen={ 'open' === doodle.comment_status } />
	// 	)
	// },

	render() {

		console.log("doodle index.jsx SingleDoodle render()");

		if ( !! this.props.previewId ) {
			return (
				<DoodlePreview id={ this.props.previewId } />
			);
		}

		return (
			<div className="card">
				<QueryDoodles doodleSlug={ this.props.slug } />
				{ this.props.loading ?
					<Placeholder type="doodle" /> :
					this.renderArticle()
				}

				{ /* ! this.props.loading && this.renderComments() */ }
			</div>
		);
	}
}

export default connect( ( state, ownProps ) => {
	const slug = ownProps.params.slug || false;
	const doodleId = getDoodleIdFromSlug( state, slug );
	const requesting = isRequestingDoodle( state, slug );
	const doodle = getDoodle( state, parseInt( doodleId ) );

	const previewId = ownProps.location.query.preview_id;

	return {
		previewId,
		slug,
		doodleId,
		doodle,
		requesting,
		loading: requesting && ! doodle
	};
} )( SingleDoodle );
