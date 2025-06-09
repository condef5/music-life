export type SongSource = "youtube" | "vimeo" | "custom";

export interface Song {
  id: string;
  title: string;
  source: SongSource;
  url: string; // YouTube/Vimeo ID or direct mp3/mp4 URL
}

export interface Playlist {
  id: string;
  name: string;
  songs: Song[];
}
