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
import Doodles from '../';

describe( 'Doodles', function() {
	let RenderedDoodles;
	let wrapper;

	beforeEach( () => {
		const store = mockStore( data );
		sinon.stub( router, 'Link' ).returns( <span /> );

		// Pass through `match` & `location`, which would come from react-router
		wrapper = mount(
			<Provider store={ store }>
				<Doodles match={ { params: {} } } location={ { search: '' } } />
			</Provider>
		);

		RenderedDoodles = wrapper.find( Doodles );
	} );

	afterEach( () => {
		router.Link.restore();
		wrapper.unmount();
	} );

	it( 'should load an Doodles component', function() {
		expect( RenderedDoodles.length ).to.equal( 1 );
	} );

	it( 'should contain two doodles', function() {
		expect( RenderedDoodles.find( '.entry' ).length ).to.equal( 2 );
	} );
} );
