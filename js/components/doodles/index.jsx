/** @format */
/**
 * External Dependencies
 */
import React from 'react';
import BodyClass from 'react-body-class';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import {
	getDoodlesForQuery,
	getTotalPagesForQuery,
	isRequestingDoodlesForQuery,
} from 'wordpress-query-doodles/lib/selectors';
import he from 'he';
import qs from 'qs';
import QueryDoodles from 'wordpress-query-doodles';
import stripTags from 'striptags';

/**
 * Internal Dependencies
 */
import Placeholder from 'components/placeholder';
import DoodleList from './list';

function Doodles( props ) {
	const doodles = props.doodles;
	const meta = {
		title: he.decode( FoxhoundSettings.meta.title ),
		description: he.decode( stripTags( FoxhoundSettings.meta.description ) ),
		canonical: FoxhoundSettings.URL.base,
	};

	return (
		<div className="site-content">
			<DocumentMeta { ...meta } />
			<BodyClass classes={ [ 'doodles' ] } />
			<QueryDoodles query={ props.query } />
			{ props.loading ? <Placeholder /> : <DoodleList doodles={ doodles } /> }
		</div>
	);
}

export default connect( ( state, { match, location } ) => {
	const query = {};
	query.sticky = false;
	query.page = match.params.paged || 1;

	let path = FoxhoundSettings.URL.path || '/';
	// if ( FoxhoundSettings.frontPage.page ) {
	// 	// path += 'page/' + FoxhoundSettings.frontPage.blog + '/'; // from current theme
	// 	path += FoxhoundSettings.frontPage.blog + '/'; // from from fh-dos
	// }
	path += 'doodles/';

	const doodles = getDoodlesForQuery( state, query ) || [];
	const requesting = isRequestingDoodlesForQuery( state, query );

	const urlQuery = qs.parse( location.search.replace( '?', '' ) );
	const previewId = urlQuery.p || urlQuery.page_id || null;

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
} )( Doodles );
