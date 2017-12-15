/** @format */
/**
 * External Dependencies
 */
import React from 'react';

/**
 * Internal Dependencies
 */
import { getFeaturedMedia } from 'utils/content';
import DoodleMedia from './image';

export default function Doodle( props ) {
	const doodle = props;

	const featuredMedia = getFeaturedMedia( doodle );

	if ( ! featuredMedia ) {
		return null;
	}

	return (
		<div id={ `doodle-${ doodle.id }` } className="doodle" >
			<DoodleMedia media={ featuredMedia } parentClass="doodle-image" altText={ doodle.title.rendered } />
		</div>
	);
}
