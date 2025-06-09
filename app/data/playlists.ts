import type { Playlist } from '../models/playlist';
import playlistsJson from './playlists.json';

export const playlists: Playlist[] = playlistsJson as Playlist[];
