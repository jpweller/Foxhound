/** @format */
/**
 * External Dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal Dependencies
 */
import Doodle from './single';

class DoodleList extends React.Component {
	renderDoodles = () => {
		return this.props.doodles.map( ( doodle, i ) => {
			return <Doodle key={ 'doodle-' + i } { ...doodle } />;
		} );
	};

	renderEmpty = () => {
		if ( ! this.props.shouldShowEmpty ) {
			return null;
		}

		return (
			<article className="entry">
				<h2 className="entry-title">Nothing Found</h2>

				<div className="entry-content">
					<p>{ this.props.error }</p>
				</div>

				<div className="entry-meta" />
			</article>
		);
	};

	render() {
		if ( ! this.props.doodles ) {
			return null;
		}

		return (
			<div className="site-main">
				{ this.props.doodles.length ? this.renderDoodles() : this.renderEmpty() }
			</div>
		);
	}
}

DoodleList.propTypes = {
	doodles: PropTypes.array.isRequired,
	shouldShowEmpty: PropTypes.bool,
	error: PropTypes.string,
};

DoodleList.defaultProps = {
	shouldShowEmpty: true,
	error: 'It seems we can’t find what you’re looking for. Perhaps searching can help.',
};

export default DoodleList;
