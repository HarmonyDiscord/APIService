import { ContentType } from '../types/content/ContentType';
import type { Song } from '../types/content/Song';

export type UpNextRaw = {
	type: 'SONG';
	videoId: string;
	duration: string;
	thumbnail: string;
	title: string;
	artists: string;
};

function durationToSeconds(duration: string): number {
	const parts = duration.split(':').map(Number);
	const n = parts.length;
	if (n === 2) {
		return (parts[0] ?? 0) * 60 + (parts[1] ?? 0);
	}
	if (n === 3) {
		return (parts[0] ?? 0) * 3600 + (parts[1] ?? 0) * 60 + (parts[2] ?? 0);
	}
	return Number(duration) || 0;
}

export default function parseUpNext(result: UpNextRaw): Song {
	return {
		type: ContentType.Song,
		id: result.videoId,
		videoId: result.videoId,
		name: result.title,
		artist: {
			id: null,
			name: result.artists
		},
		album: null,
		thumbnail: result.thumbnail,
		duration: durationToSeconds(result.duration)
	};
}
