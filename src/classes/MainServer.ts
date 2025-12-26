import { cors } from '@elysiajs/cors';
import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { contentAlbumRoute } from '../routes/content/album/route';
import { contentArtistRoute } from '../routes/content/artist/route';
import { contentHomeRoute } from '../routes/content/home/route';
import { contentMediaLyricsRoute } from '../routes/content/media/lyrics/route';
import { contentMediaSearchRoute } from '../routes/content/media/search/route';
import { contentMediaSearchSuggestionsRoute } from '../routes/content/media/search/suggestions/route';
import { contentPlaylistRoute } from '../routes/content/playlist/route';
import { contentSearchRoute } from '../routes/content/search/route';
import { contentSongRoute } from '../routes/content/song/route';
import { contentVideoRoute } from '../routes/content/video/route';
import { tokenRoute } from '../routes/token/route';

export class MainServer {
	app: Elysia;
	port: string | number;

	constructor() {
		this.app = new Elysia();
		this.port = process.env['PORT'] ?? 4004;
	}

	setup() {
		this.app
			.use(cors())
			.use(contentAlbumRoute)
			.use(contentArtistRoute)
			.use(contentHomeRoute)
			.use(contentMediaLyricsRoute)
			.use(contentMediaSearchRoute)
			.use(contentMediaSearchSuggestionsRoute)
			.use(contentPlaylistRoute)
			.use(contentSearchRoute)
			.use(contentSongRoute)
			.use(contentVideoRoute)
			.use(tokenRoute)
			.head('/health', () => '');

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
