import _reduce from 'lodash/reduce';

const DEFAULT_STATE = {
	posts: {},
};

const types = {
	STORE_POST: 'STORE_POST',
	STORE_POSTS: 'STORE_POSTS',
	FETCH_POSTS_BY_ID: 'FETCH_POSTS_BY_ID',
};

const postsArrayToObject = posts => {
	return _reduce( posts, ( object, post ) => {
		object[ post.id ] = post;
		return object;
	}, {} );
}

export const reducer = ( state = DEFAULT_STATE, action ) => {
	switch ( action.type ) {
		case types.STORE_POST:
			return {
				...state,
				...postsArrayToObject( [ action.post ] ),
			};

		case types.STORE_POSTS:
			return {
				...state,
				...postsArrayToObject( action.posts ),
			};

		default:
			return state;
	}
};

export const actions = {
	storePost( post ) {
		return {
			type: types.STORE_POST,
			post,
		};
	},
	storePosts( posts ) {
		return {
			type: types.STORE_POSTS,
			posts,
		};
	},
};

export const selectors = {
	getPost( state, id ) {
		return state[ id ];
	},

	getPosts( state, ids ) {
		return ids.map( id => state[ id ] ).filter( p => !! p );
	},
};
