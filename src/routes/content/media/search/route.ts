import Elysia, { t } from 'elysia';
import getYouTubeVideoId from '../../../../util/getYouTubeVideoId';
import parseSearchResult from '../../../../util/parseSearchResult';
import { getYTMusic } from '../../../../util/ytmusic';

export const contentMediaSearchRoute = new Elysia({
	name: 'routes:contentMediaSearchRoute',
	prefix: '/api/content/media/search'
}).get(
	'/',
	async ({ params: { q } }) => {
		const ytmusic = await getYTMusic();

		if (!q) return [];

		const videoId = getYouTubeVideoId(q);

		if (videoId) {
			const video = await ytmusic.getVideo(videoId);

			if (!video) return [];

			return [parseSearchResult(video)];
		}

		const results = await ytmusic.searchSongs(q);

		return results.map((result) => parseSearchResult(result));
	},
	{ parse: 'none', params: t.Object({ q: t.String() }) }
);
