import { Elysia, t } from 'elysia';
import { getYTMusic } from '../../../util/ytmusic';

export const contentSongRoute = new Elysia({
	name: 'routes:contentSongRoute',
	prefix: '/api/content/song'
}).get(
	'/',
	async ({ params: { id } }) => {
		const ytmusic = await getYTMusic();

		return await ytmusic.getSong(id);
	},
	{ parse: 'none', params: t.Object({ id: t.String() }) }
);
