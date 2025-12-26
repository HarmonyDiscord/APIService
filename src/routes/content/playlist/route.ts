import { Elysia, t } from 'elysia';
import { getYTMusic } from '../../../util/ytmusic';

export const contentPlaylistRoute = new Elysia({
	name: 'routes:contentPlaylistRoute',
	prefix: '/api/content/playlist'
}).get(
	'/',
	async ({ params: { id } }) => {
		const ytmusic = await getYTMusic();

		const [playlist, videos] = await Promise.all([ytmusic.getPlaylist(id), ytmusic.getPlaylistVideos(id)]);

		return { ...playlist, videos: videos ?? [] };
	},
	{ parse: 'none', params: t.Object({ id: t.String() }) }
);
