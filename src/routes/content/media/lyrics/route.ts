import { Elysia, t } from 'elysia';
import { getYTMusic } from '../../../../util/ytmusic';

export const contentMediaLyricsRoute = new Elysia({
	name: 'routes:contentMediaLyricsRoute',
	prefix: '/api/content/media/lyrics'
}).get(
	'/',
	async ({ query, set }) => {
		const { id, name, artist, album } = query;

		if (name) {
			const data: any = await fetch(
				`https://lrclib.net/api/search?track_name=${encodeURIComponent(
					name
				)}&artist_name=${encodeURIComponent(artist ?? '')}`
			)
				.then((res) => res.json())
				.catch(() => null);

			const syncedLyricsItem = data?.find((item: any) => item.syncedLyrics);
			if (syncedLyricsItem) {
				return {
					lyrics: syncedLyricsItem.syncedLyrics.split('\n'),
					type: 'synced'
				};
			}

			const dataRetry: any = await fetch(
				`https://lrclib.net/api/search?track_name=${encodeURIComponent(
					name
				)}&album_name=${encodeURIComponent(album ?? '')}`
			)
				.then((res) => res.json())
				.catch(() => null);

			const syncedLyricsItemRetry = dataRetry?.find((item: any) => item.syncedLyrics);

			if (syncedLyricsItemRetry) {
				return {
					lyrics: syncedLyricsItemRetry.syncedLyrics.split('\n'),
					type: 'synced'
				};
			}
		}

		if (!id) {
			set.status = 400;
			return 'Invalid';
		}

		const ytmusic = await getYTMusic();

		return {
			lyrics: await ytmusic.getLyrics(id),
			type: 'plain'
		};
	},
	{
		query: t.Object({
			id: t.Optional(t.String()),
			name: t.Optional(t.String()),
			artist: t.Optional(t.String()),
			album: t.Optional(t.String())
		})
	}
);
