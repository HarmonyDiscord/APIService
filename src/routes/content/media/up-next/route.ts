import Elysia, { t } from 'elysia';
import parseUpNext from '../../../../util/parseUpNext';
import { getYTMusic } from '../../../../util/ytmusic';

export const contentMediaUpNextRoute = new Elysia({
	name: 'routes:contentMediaUpNextRoute',
	prefix: '/api/content/media/up-next'
}).get(
	'/',
	async ({ query: { id } }) => {
		const ytmusic = await getYTMusic();

		if (!id) return [];

		const results = await ytmusic.getUpNexts(id);

		return results.map((result: any) => parseUpNext(result));
	},
	{ parse: 'none', query: t.Object({ id: t.String() }) }
);
