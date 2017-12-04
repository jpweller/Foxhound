// External dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Internal dependencies
import Doodle from './single';

export default class DoodleList extends React.Component {
	static propTypes = {
		doodles: PropTypes.array.isRequired,
		shouldShowEmpty: PropTypes.bool,
		error: PropTypes.string,
	};

	static defaultProps = {
		shouldShowEmpty: true,
		error: 'It seems we can’t find what you’re looking for. Perhaps searching can help.',
	};

	renderDoodles() {
		return this.props.doodles.map( ( doodle, i ) => {
			return <Doodle key={ 'doodle-' + i } { ...doodle } />
		} );
	}

	renderEmpty() {
		if ( ! this.props.shouldShowEmpty ) {
			return null;
		}

		return (
			<article className="entry">
				<h2 className="entry-title">Nothing Found</h2>

				<div className="entry-content">
					<p>{ this.props.error }</p>
				</div>

				<div className="entry-meta"></div>
			</article>
		)
	}

	render() {
		if ( ! this.props.doodles ) {
			return null;
		}

		return (
			<div className="site-main">
				{ this.props.doodles.length ?
					this.renderDoodles() :
					this.renderEmpty()
				}
			</div>
		);
	}
}
