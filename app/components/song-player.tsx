import ReactPlayer from 'react-player';
import type { Song } from '../models/playlist';

export function SongPlayer({
  song,
  onEnded,
  playing = true,
}: {
  song: Song;
  onEnded?: () => void;
  playing?: boolean;
}) {
  return (
    <div className="max-w-xl">
      <ReactPlayer
        fallback={<div className="h-[315px] bg-gray-200 animate-pulse rounded" />}
        url={song.url}
        controls
        playing={playing}
        width="100%"
        height="315px"
        config={{
          youtube: { playerVars: { modestbranding: 1 } },
        }}
        onEnded={onEnded}
      />
    </div>
  );
}
