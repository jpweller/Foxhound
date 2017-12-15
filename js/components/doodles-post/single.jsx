/** @format */
/**
 * External Dependencies
 */
import React from 'react';

/**
 * Internal Dependencies
 */
import { getFeaturedMedia } from 'utils/content';
import PostMedia from './image';

export default function Post( props ) {
	const post = props;

	const featuredMedia = getFeaturedMedia( post );

	if ( ! featuredMedia ) {
		return null;
	}

	return (
		<div id={ `post-${ post.id }` } className="post" >
			<PostMedia media={ featuredMedia } parentClass="post-image" altText={ post.title.rendered } />
		</div>
	);
}
