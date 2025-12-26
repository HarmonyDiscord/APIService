import { Elysia, t } from 'elysia';
import { getYTMusic } from '../../../../../util/ytmusic';

export const contentMediaSearchSuggestionsRoute = new Elysia({
	name: 'routes:contentMediaSearchSuggestionsRoute',
	prefix: '/content/media/search/suggestions'
}).get(
	'/',
	async ({ params: { q } }) => {
		const ytmusic = await getYTMusic();

		return await ytmusic.getSearchSuggestions(q);
	},
	{ parse: 'none', params: t.Object({ q: t.String() }) }
);
