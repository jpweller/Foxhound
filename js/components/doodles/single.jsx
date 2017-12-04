/*global FoxhoundSettings */
// External dependencies
import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';

// Internal dependencies
import ContentMixin from 'utils/content-mixin';
import Media from './image';

export default class Doodle extends React.Component {

	render() {
		let doodle = this.props;

		if ( 'attachment' === doodle.type ) {
			return null;
		}

		const featuredMedia = ContentMixin.getFeaturedMedia( doodle );

		return (
			<div id={ `doodle-${doodle.id}` } className='doodle'>
				{ featuredMedia ?
					<Media media={ featuredMedia } parentClass='doodle-image' altText={ doodle.title.rendered }/> :
					null
				}
			</div>
		);
	}
}
