import wp from 'wp';

import CurrentSelection from './components/current-selection';
import { fetchPostsById } from '../utils/fetch';

const { withSelect } = wp.data;

export default withSelect( ( select, ownProps ) => {
	const { getPosts } = select( 'hm-post-select' );
	const { postIds } = ownProps;
	const posts = getPosts( postIds );

	if ( posts.length !== postIds.length ) {
		fetchPostsById( postIds );
		return {
			posts: [],
			isLoading: true,
		}
	}

	return {
		posts,
		isLoading: false,
	}
} )( CurrentSelection );
