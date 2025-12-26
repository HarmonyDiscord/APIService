import { Elysia, t } from 'elysia';
import { getYTMusic } from '../../../util/ytmusic';

export const contentVideoRoute = new Elysia({
	name: 'routes:contentVideoRoute',
	prefix: '/content/video'
}).get(
	'/',
	async ({ params: { id } }) => {
		const ytmusic = await getYTMusic();

		return await ytmusic.getVideo(id);
	},
	{ parse: 'none', params: t.Object({ id: t.String() }) }
);
