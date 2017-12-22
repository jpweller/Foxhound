/** @format */
/**
 * External Dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
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
import InfiniteScroll from 'react-infinite-scroller';

/**
 * Internal Dependencies
 */
import Placeholder from 'components/placeholder';
// import DoodleList from './list';
import Doodle from './single';

class Doodles extends React.Component {
	renderDoodles = () => {
		return this.props.doodles.map( ( doodle, i ) => {
			return <Doodle key={ 'doodle-' + i } { ...doodle } />;
		} );
	};

	renderDoodleGroup = () => {
		const loader = <Placeholder />;
		return (
			<div className="doodle-group">
				<QueryDoodles query={ this.props.query } />
				{ this.props.loading ? loader : this.renderDoodles() }
			</div>
		);
	};

	incrimentQueryPage = () => {
		const page = this.props.query.page;
		if ( page === this.props.totalPages ) {
			this.setState( { hasMoreItems: false } );
			return;
		}
		this.setState( { query: {
			page: page + 1,
		} } );
	};

	loadMoreDoodles = () => {
		const doodleGroups = this.props.doodleGroups;
		doodleGroups.push( this.renderDoodleGroup() );
		this.setState( { doodleGroups: doodleGroups } );
		this.incrimentQueryPage();
	};

	// componentWillMount() {
	// 	this.loadMoreDoodles();
	// }

	render() {
		// const doodles = this.props.doodles;
		const loader = <div children="InfiniteScroll Loading..." />;
		const meta = {
			title: he.decode( FoxhoundSettings.meta.title ),
			description: he.decode( stripTags( FoxhoundSettings.meta.description ) ),
			canonical: FoxhoundSettings.URL.base,
		};

		const items = this.props.doodleGroups;

		return (
			<div className="site-content">
				<DocumentMeta { ...meta } />
				<BodyClass classes={ [ 'doodles' ] } />
				<InfiniteScroll
					pageStart = { 0 }
					loadMore = { this.loadMoreDoodles() }
					hasMore = { this.props.hasMoreItems }
					loader = { loader } >
					{ items }
				</InfiniteScroll>
			</div>
		);
	}
}

Doodles.propTypes = {
	doodleGroups: PropTypes.array,
	hasMoreItems: PropTypes.bool,
};

Doodles.defaultProps = {
	doodleGroups: [],
	hasMoreItems: true,
};

export default connect( ( state, { match, location } ) => {
	const query = {};
	query.sticky = false;
	query.page = match.params.paged || 1;

	let path = FoxhoundSettings.URL.path || '/';
	path += 'doodles/';

	const doodles = getDoodlesForQuery( state, query ) || [];
	const requesting = isRequestingDoodlesForQuery( state, query );

	const urlQuery = qs.parse( location.search.replace( '?', '' ) );
	const previewId = urlQuery.p || urlQuery.page_id || null;

	const totalPages = getTotalPagesForQuery( state, query );
	let hasMoreItems = false;
	if ( totalPages > 1 ) {
		hasMoreItems = true;
	}

	console.log( hasMoreItems );
	return {
		previewId,
		path,
		page: parseInt( query.page ),
		query,
		doodles,
		requesting,
		loading: requesting && ! doodles.length,
		totalPages: totalPages,
		hasMoreItems: hasMoreItems,
	};
} )( Doodles );
