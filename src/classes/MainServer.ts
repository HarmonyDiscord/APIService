import { cors } from '@elysiajs/cors';
import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';

export class MainServer {
	app: Elysia;
	port: string | number;

	constructor() {
		this.app = new Elysia();
		this.port = process.env['PORT'] ?? 4004;
	}

	setup() {
		this.app.use(cors()).head('/health', () => '');

		if (process.env['ENABLE_SWAGGER'] === 'true') {
			console.log('Swagger enabled.');

			this.app.use(
				swagger({
					documentation: {
						info: {
							version: 'latest',
							title: 'API documentation',
							description: 'Harmony API service documentation'
						}
					},
					swaggerOptions: {
						syntaxHighlight: { activate: true, theme: 'monokai' }
					},
					path: '/docs',
					exclude: /\/docs/
				})
			);
		}

		console.log('API started.');

		return this;
	}

	listen() {
		this.app.listen(this.port, () => console.log('Listening on port', `http://localhost:${this.port}`));
	}
}
