/**
 * @jest-environment node
 */
import React from 'react';
import { shallow } from 'enzyme';
import wp from 'wp'; // eslint-disable-line no-unused-vars
import PostList from '../../../components/post-select/post-list';
import PostListItem from '../../../components/post-select/post-list-item';

jest.mock( 'wp' );
jest.mock( '../../../components/post-select/post-list-item', () => () => <div className="post-list-item" /> );

test( 'Post List with defaults', () => {
	const postList = shallow( <PostList onToggleSelectedPosts={ () => {} }  /> );
	expect( postList.children( '.post-list-item' ).length ).toBe( 0 );
} );

test( 'Post List with posts ', () => {
	const posts = [
		{
			id: 1,
			title: { rendered: 'Foo' },
		},
		{
			id: 2,
			title: { rendered: 'Bar' },
		},
	];

	const selectedPosts = [
		{
			id: 2,
			title: { rendered: 'Bar' },
		},
	];

	const postList = shallow( <PostList
		posts={ posts }
		selectedPosts={ selectedPosts }
		onToggleSelectedPosts={ () => {} }
	/> );

	expect( postList.find( PostListItem ).length ).toBe( 2 );
	expect( postList.find( PostListItem ).at( 0 ).props().isSelected ).toBe( false );
	expect( postList.find( PostListItem ).at( 1 ).props().isSelected ).toBe( true );
} );

test( 'Post List select post', () => {
	const onToggleSelectedPosts = jest.fn();

	const posts = [
		{
			id: 1,
			title: { rendered: 'Foo' },
		},
		{
			id: 2,
			title: { rendered: 'Bar' },
		},
	];

	const selectedPosts = [
		{
			id: 2,
			title: { rendered: 'Bar' },
		},
	];

	const postList = shallow( <PostList
		posts={ posts }
		selectedPosts={ selectedPosts }
		onToggleSelectedPosts={ onToggleSelectedPosts }
	/> );


	postList.find( PostListItem ).at( 0 ).onSelectItem();

	console.log( func );
	func();
	expect( onToggleSelectedPosts.mock.calls.length ).toBe( 1 );
	expect( onToggleSelectedPosts.mock.calls[0][0] ).toEqual( posts[0] );
} );
