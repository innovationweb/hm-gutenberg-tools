import wp from 'wp';
import config from '../config';
import _zipObject from 'lodash/zipObject';
import _sortBy from 'lodash/sortBy';

const { apiFetch } = wp;
const { addQueryArgs } = wp.url;

/**
 * Fetch JSON.
 *
 * Helper function to return parsed JSON and also the response headers.
 *
 * @param {object} args
 * @param {array} headerKeys Array of headers to include.
 */
export const fetchJson = ( args, headerKeys = [] ) => {
	return new Promise( resolve => {
		apiFetch( {
			...args,
			parse: false,
		} ).then( response => Promise.all( [
			response.json ? response.json() : [],
			_zipObject( headerKeys, headerKeys.map( key => response.headers.get( key ) ) ),
		] ) ).then( data => (
			resolve( data )
		) ).catch( () => {} );
	} )
}

export const fetchPosts = args => {
	const dispatch = wp.data.dispatch( 'hm-post-select' );
	return fetchJson( args, [ 'x-wp-totalpages' ] ).then( data => {
		dispatch.storePosts( data[0] );
		return data;
	} )
}

/**
 * Helper function to fetch posts by ID.
 *
 * If posts are already stored, it will return them.
 * If some are stored, it will fetch only those not stored from the API.
 *
 * @param {args} args
 */
export const fetchPostsById = ( ids, postTypes = [] ) => {
	// If no ids, resolve with empty array.
	if ( ! ids || ids.length < 1 ) {
		return Promise.resolve( [] );
	}

	const select = wp.data.select( 'hm-post-select' );
	const stored = select.getPosts( ids );

	// If all the requested post IDs were found in the store, return them.
	if ( stored.length === ids.length ) {
		return Promise.resolve( _sortBy( stored, 'id' ) );
	}

	const storedIds = stored.map( p => p.id )
	const diff = ids.filter( id => ! storedIds.includes( id ) );

	return new Promise( resolve => {
		fetchPosts( {
			path: addQueryArgs(
				config.endpoint,
				{
					include: diff,
					per_page: ids.length,
					context: 'view',
					types: postTypes.map( o => o.slug ),
				}
			),
		} ).then( () => {
			resolve( _sortBy( select.getPosts( ids ), 'id' ) )
		} ).catch( () => {} );
	} );
}
