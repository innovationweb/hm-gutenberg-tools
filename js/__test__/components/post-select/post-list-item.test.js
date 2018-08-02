/**
 * @jest-environment node
 */
import React from 'react';
import { mount } from 'enzyme';
import wp from 'wp'; // eslint-disable-line no-unused-vars
import PostListItem from '../../../components/post-select/post-list-item';

jest.mock( 'wp' );
jest.mock( '../../../components/post-select/post-list-item-author', () => () => <span /> );
jest.mock( '../../../components/post-select/post-list-item-actions', () => () => <div className="post-list-item-actions" /> );
jest.mock( '../../../utils/get-post-type-label', () => {
	return postType => `label for ${postType}`
} );
jest.mock( 'moment', () => ( () => ( {
	format: () => '01/01/01',
} ) ) );

const post = {
	id: 123,
	title: { rendered: 'Hello World' },
	type: 'post',
};

test( 'Post List Item', () => {
	const onClick = jest.fn();
	const postListItem = mount( <PostListItem post={ post } onClick={ onClick } className="foo" /> );

	expect( postListItem.find( 'h2' ).text() ).toBe( 'Hello World' );
	expect( postListItem.find( '.post-list-item--meta' ).length ).toBe( 1 );
	expect( postListItem.find( '.post-list-item-actions' ).length ).toBe( 1 );
} );
