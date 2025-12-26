import { Elysia } from 'elysia';
import { getYTMusic } from '../../../util/ytmusic';

export const contentHomeRoute = new Elysia({
	name: 'routes:contentHomeRoute',
	prefix: '/content/home'
}).get(
	'/',
	async ({}) => {
		const ytmusic = await getYTMusic();

		return await ytmusic.getHomeSections();
	},
	{ parse: 'none' }
);
