// External dependencies
import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazy-load';

export default class DoodleMedia extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			isLoaded: false
		}
	}

	static propTypes = {
		media: PropTypes.object.isRequired,
		parentClass: PropTypes.string,
		altText: PropTypes.string,
	};

	handleImageLoaded() {
		this.setState( {isLoaded: true});
	}

	handleImageLoaded = () => {
		this.setState( {isLoaded: true} );
	}

	render() {
		const media = this.props.media;
		const mediaPadding = media.media_details.height / media.media_details.width * 100; // containter has height of image
		const mediaWidth = media.mime_type === 'image/gif' ? media.media_details.width : media.media_details.width * 0.5; // retina images except for gifs
		const isLoaded = this.state.isLoaded ? 'yes' : 'no';

		let mediaElement;
		switch ( media.media_type ) {
			case 'image':
				mediaElement = (
					<img src={ media.source_url }
						height={ media.media_details.height }
						width={ media.media_details.width }
						alt={ this.props.altText }
						onLoad={ this.handleImageLoaded } />
				);
				break;
		}

		return (
			<div className={ this.props.parentClass }
				style={{ paddingBottom: mediaPadding + '%', width: mediaWidth + "px" }}
				data-is-loaded={ isLoaded }>
				<LazyLoad offsetVertical={100} debounce={false} >
					{ mediaElement }
				</LazyLoad>
			</div>
		);
	}
}