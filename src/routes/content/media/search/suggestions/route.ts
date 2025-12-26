import { Elysia, t } from 'elysia';
import { getYTMusic } from '../../../../../util/ytmusic';

export const contentMediaSearchSuggestionsRoute = new Elysia({
	name: 'routes:contentMediaSearchSuggestionsRoute',
	prefix: '/api/content/media/search/suggestions'
}).get(
	'/',
	async ({ query: { q } }) => {
		const ytmusic = await getYTMusic();

		return await ytmusic.getSearchSuggestions(q);
	},
	{ parse: 'none', query: t.Object({ q: t.String() }) }
);
