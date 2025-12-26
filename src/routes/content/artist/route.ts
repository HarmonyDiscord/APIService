import { Elysia, t } from 'elysia';
import { getYTMusic } from '../../../util/ytmusic';

export const contentArtistRoute = new Elysia({
	name: 'routes:contentArtistRoute',
	prefix: '/api/content/artist'
}).get(
	'/',
	async ({ params: { id } }) => {
		const ytmusic = await getYTMusic();

		return await ytmusic.getArtist(id);
	},
	{ parse: 'none', params: t.Object({ id: t.String() }) }
);
