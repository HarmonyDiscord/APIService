import Elysia from 'elysia';
import parseSearchResult from '../../../util/parseSearchResult';
import { getYTMusic } from '../../../util/ytmusic';

export const contentFeedRoute = new Elysia({
	name: 'routes:contentFeedRoute',
	prefix: '/api/content/feed'
}).get(
	'/',
	async ({}) => {
		const ytmusic = await getYTMusic();

		try {
			const results = await ytmusic.getPlaylistVideos('PLOHoVaTp8R7d3L_pjuwIa6nRh4tH5nI4x');

			return results.map((result) => parseSearchResult(result));
		} catch {
			return [];
		}
	},
	{ parse: 'none' }
);
