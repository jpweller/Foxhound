/*global FoxhoundSettings */
// External dependencies
import React from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import BodyClass from 'react-body-class';
import he from 'he';

// Internal dependencies
import QueryDoodles from 'wordpress-query-custom-posts-doodles';
import {
	isRequestingDoodlesForQuery,
	getDoodlesForQuery,
	getTotalPagesForQuery,
} from 'wordpress-query-custom-posts-doodles/lib/selectors';

// Components
import DoodleList from './list';
import DoodlePreview from 'components/doodle/preview';
import Placeholder from 'components/placeholder';

class DoodleIndex extends React.Component {
	render() {
		if ( !! this.props.previewId ) {
			return (
				<DoodlePreview id={ this.props.previewId } />
			);
		}

		const doodles = this.props.doodles;
		const meta = {
			title: he.decode( FoxhoundSettings.meta.title ),
			description: FoxhoundSettings.meta.description,
			canonical: FoxhoundSettings.URL.base,
		};

		return (
			<div className="site-content">
				<DocumentMeta { ...meta } />
				<BodyClass classes={ [ 'doodles' ] } />
				<QueryDoodles query={ this.props.query } />

				{ this.props.loading ? <Placeholder type="doodles" /> : <DoodleList doodles={ doodles } /> }

			</div>
		);
	}
}

export default connect( ( state, ownProps ) => {
	const query = {};
	query.page = ownProps.params.paged || 1;

	let path = FoxhoundSettings.URL.path || '/';
	if ( FoxhoundSettings.frontPage.page ) {
		path += FoxhoundSettings.frontPage.blog + '/';
	}

	const doodles = getDoodlesForQuery( state, query ) || [];
	const requesting = isRequestingDoodlesForQuery( state, query );
	const previewId = ownProps.location.query.p || ownProps.location.query.page_id;

	return {
		previewId,
		path,
		page: parseInt( query.page ),
		query,
		doodles,
		requesting,
		loading: requesting && ! doodles.length,
		totalPages: getTotalPagesForQuery( state, query ),
	};
} )( DoodleIndex );
