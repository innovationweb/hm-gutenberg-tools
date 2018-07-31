import wp from 'wp';
import React from 'react';
import Select from 'react-select';
import getPostTypeCollection from '../utils/get-post-type-collection';

/**
 * Simple Post Select.
 * This component is a very simple version of the post select interface that uses ONLY the react-select dropdown.
 * It supports searching, and pagination of results.
 * It also has limited support for multi-select.
 */
class SimplePostSelect extends React.Component {
	defaultProps = {
		postType: 'post',
	};

	// componentDidMount() {
	// }

	render() {
		const { multi, value, onChange } = this.props;
		return ( <Select.Async
			multi={ multi }
			value={ value }
			onChange={ option => onChange( option.id ) }
			loadOptions={ this.loadOptions.bind( this ) }
			backspaceRemoves
		/> )
	}

	loadOptions( search, callback ) {
		const { postType } = this.props;
		const Collection = getPostTypeCollection( postType ) || wp.api.collections.Posts;
		const postsCollection = new Collection();

		postsCollection.fetch( {
			hmCache: 30,
			data: {
				search,
				page: 1,
				per_page: 25,
			},
		} ).then( json => {
			callback( null, {
				options: json.map( item => ( {
					label: item.title.rendered,
					value: item.id,
				} ) ),
				complete: ! postsCollection.hasMore(),
			} );
		} );
	}

}

export default SimplePostSelect;
