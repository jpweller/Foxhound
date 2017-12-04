/* global FoxhoundSettings */
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import DocumentMeta from 'react-document-meta';
import BodyClass from 'react-body-class';
import he from 'he';

// Internal dependencies
import { getDoodle } from 'wordpress-query-custom-posts-doodles/lib/selectors';
import { getPage } from 'wordpress-query-page/lib/selectors';
import ContentMixin from 'utils/content-mixin';

// Components
import DoodleMeta from './meta';
import DoodleMedia from './image';

class SingleDoodle extends React.Component {

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
				<BodyClass classes={ [ 'single', 'single-doodle' ] } />
				<h1 className="entry-title" dangerouslySetInnerHTML={ ContentMixin.getTitle( doodle ) } />
				{ featuredMedia ?
					<DoodleMedia media={ featuredMedia } parentClass='entry-image' /> :
					null
				}
				<div className="entry-meta"></div>
				<div className="entry-content" dangerouslySetInnerHTML={ ContentMixin.getContent( doodle ) } />

				{ 'doodle' === doodle.type && <DoodleMeta doodle={ doodle } humanDate={ ContentMixin.getDate( doodle ) } /> }
			</article>
		);
	}

	render() {
		return (
			<div className="card">
				{ this.renderArticle() }
			</div>
		);
	}
}

export default connect( ( state, ownProps ) => {
	const doodleId = parseInt( ownProps.id, 10 );
	const doodle = getPost( state, doodleId ) || getPage( state, doodleId );

	return {
		doodleId,
		doodle
	};
} )( SingleDoodle );
