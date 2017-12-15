/** @format */
/**
 * External Dependencies
 */
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import * as router from 'react-router-dom';

/**
 * Internal Dependencies
 */
import { mockStore } from 'test/mock-store';
import { data } from './fixtures/store';
import Posts from '../';

describe( 'Posts', function() {
	let RenderedPosts;
	let wrapper;

	beforeEach( () => {
		const store = mockStore( data );
		sinon.stub( router, 'Link' ).returns( <span /> );

		// Pass through `match` & `location`, which would come from react-router
		wrapper = mount(
			<Provider store={ store }>
				<Posts match={ { params: {} } } location={ { search: '' } } />
			</Provider>
		);

		RenderedPosts = wrapper.find( Posts );
	} );

	afterEach( () => {
		router.Link.restore();
		wrapper.unmount();
	} );

	it( 'should load an posts component', function() {
		expect( RenderedPosts.length ).to.equal( 1 );
	} );

	it( 'should contain two posts', function() {
		expect( RenderedPosts.find( '.entry' ).length ).to.equal( 2 );
	} );
} );
