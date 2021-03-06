/* global hmGbToolsData */
import _get from 'lodash/get';

export default function getPostTypeTaxFilters( postType ) {
	return _get( hmGbToolsData, `postTypeTaxonomies.${postType}`, [] );
}
