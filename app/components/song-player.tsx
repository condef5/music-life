import ReactPlayer from 'react-player';
import type { Song } from '../models/playlist';

export function SongPlayer({
  song,
  onEnded,
}: {
  song: Song;
  onEnded?: () => void;
}) {
  return (
    <div style={{ maxWidth: 560 }}>
      <ReactPlayer
        url={song.url}
        controls
        width="100%"
        height="315px"
        config={{
          youtube: { playerVars: { modestbranding: 1 } },
        }}
        onEnded={onEnded}
      />
      <div style={{ marginTop: 8, textAlign: 'center' }}>{song.title}</div>
    </div>
  );
}
