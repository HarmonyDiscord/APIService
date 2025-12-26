import Elysia, { t } from 'elysia';
import getYouTubeVideoId from '../../../util/getYouTubeVideoId';
import parseSearchResult from '../../../util/parseSearchResult';
import { getYTMusic } from '../../../util/ytmusic';

export const contentSearchRoute = new Elysia({
	name: 'routes:contentSearchRoute',
	prefix: '/content/search'
}).get(
	'/',
	async ({ params: { q } }) => {
		const ytmusic = await getYTMusic();

		if (!q) return [];

		const videoId = getYouTubeVideoId(q);

		if (videoId) {
			const video = await ytmusic.searchSongs(videoId);
			const firstVideo = video[0];

			if (!firstVideo) return [];

			return [parseSearchResult(firstVideo)];
		}

		const results = await ytmusic.search(q);

		return results.map((result) => parseSearchResult(result));
	},
	{ parse: 'none', params: t.Object({ q: t.String() }) }
);
