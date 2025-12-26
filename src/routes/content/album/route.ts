import { Elysia, t } from 'elysia';
import { getYTMusic } from '../../../util/ytmusic';

export const contentAlbumRoute = new Elysia({
	name: 'routes:contentAlbumRoute',
	prefix: '/api/content/album'
}).get(
	'/',
	async ({ params: { id } }) => {
		const ytmusic = await getYTMusic();

		return await ytmusic.getAlbum(id);
	},
	{ parse: 'none', params: t.Object({ id: t.String() }) }
);
