// External dependencies
import React from 'react';
import { Link } from 'react-router';
import find from 'lodash/find';

function getDoodleTaxonomy( doodle, taxonomy ) {
	if ( doodle === {} ) {
		return [];
	}
	const terms = find( doodle._embedded['wp:term'], function( item ) {
		return ( ( item.constructor === Array ) && ( 'undefined' !== typeof item[0] ) && ( item[0].taxonomy === taxonomy ) );
	} );
	return terms;
}

export default class DoodleMeta extends React.Component {
	render() {
		let categories = getDoodleTaxonomy( this.props.doodle, 'category' );
		let tags = getDoodleTaxonomy( this.props.doodle, 'doodle_tag' );

		if ( 'undefined' !== typeof categories ) {
			categories = categories.map( function( item, i ) {
				return (
					<Link key={ i } to={ item.link }>{ item.name }</Link>
				);
			} );
		} else {
			categories = null;
		}

		if ( 'undefined' !== typeof tags ) {
			tags = tags.map( function( item, i ) {
				return (
					<Link key={ i } to={ item.link }>{ item.name }</Link>
				);
			} );
		} else {
			tags = null;
		}

		return (
			<footer className="entry-meta">
				<div className="entry-meta-item">
					<span className="entry-meta-label">published </span>
					<time className="entry-meta-value entry-date published updated" dateTime={ this.props.doodle.date }>{ this.props.humanDate }</time>
				</div>
				<div className="entry-meta-item">
				{ categories ?
					<span>
						<span className="entry-meta-label">doodleed in </span>
						<span className="entry-meta-value">{ categories }</span>
					</span> :
					null
				}
				{ categories && tags ?
					<span className="fancy-amp"> &amp; </span> :
					null
				}

				{ tags ?
					<span>
						<span className="entry-meta-label">tagged </span>
						<span className="entry-meta-value">{ tags }</span>
					</span> :
					null
				}
				</div>
			</footer>
		);
	}
}
