import { Elysia, t } from 'elysia';

export const tokenRoute = new Elysia({
	name: 'routes:tokenRoute',
	prefix: '/token'
}).post(
	'/',
	async ({ body }) => {
		const response = await fetch('https://discord.com/api/oauth2/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				client_id: process.env['DISCORD_CLIENT_ID'] ?? '',
				client_secret: process.env['DISCORD_CLIENT_SECRET'] ?? '',
				grant_type: 'authorization_code',
				code: body.code
			})
		});

		const { access_token } = (await response.json()) as any;

		return { access_token };
	},
	{
		body: t.Object({
			code: t.String()
		})
	}
);
