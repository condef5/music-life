import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import type { Route } from './+types/playlists.$playlistId';
import { playlists } from '../data/playlists';
import { SongPlayer } from '~/components/song-player';
import { PlaylistSwitcher } from '~/components/playlist-switcher';

// Server-side loader for meta
export async function loader({ params }: Route.LoaderArgs) {
  const { playlistId } = params;
  const playlist = playlists.find((p) => p.id === playlistId);

  return { playlist };
}

// Client-side loader (this will merge with server data)
export async function clientLoader({
  request,
  params,
  serverLoader,
}: Route.ClientLoaderArgs) {
  const serverData = await serverLoader();

  return {
    ...serverData,
    isClientReady: true,
  };
}

clientLoader.hydrate = true;

type LoaderData = Awaited<ReturnType<typeof loader>>;

export function meta({ data }: { data: LoaderData }) {
  const playlist = data?.playlist;
  const title = playlist?.name ? `${playlist.name} | Music Life` : 'Music Life';
  const description = playlist?.songs?.[0]?.title
    ? `Now playing: ${playlist.songs[0].title} — ${playlist.name}`
    : 'Welcome to Music Life!';

  return [{ title }, { name: 'description', content: description }];
}

export function HydrateFallback() {
  const { playlistId } = useParams();
  const playlist = playlists.find((p) => p.id === playlistId);

  if (!playlist) {
    return <div>Playlist not found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full mx-auto px-4">
      <div className="flex flex-row gap-8 w-full max-w-5xl md:gap-5 md:items-center">
        {/* Player skeleton */}
        <div className="flex-1 min-w-0">
          <div className="max-w-xl h-[315px] bg-gray-200 animate-pulse rounded flex items-center justify-center">
            <p className="text-gray-500">Loading player...</p>
          </div>
          <div className="mt-4 font-medium text-lg text-center">
            {playlist.songs[0]?.title}
          </div>
          {/* Controls skeleton */}
          <div className="flex justify-center items-center gap-4 mt-4">
            <div className="bg-gray-200 rounded-full p-2 w-10 h-10 animate-pulse"></div>
            <div className="bg-gray-200 rounded-full p-3 w-14 h-14 animate-pulse"></div>
            <div className="bg-gray-200 rounded-full p-2 w-10 h-10 animate-pulse"></div>
            <div className="bg-gray-200 rounded-full p-2 w-10 h-10 animate-pulse ml-2"></div>
          </div>
        </div>
        {/* Playlist list - can still show */}
        <ul className="flex-1 max-h-[430px] overflow-y-auto bg-gray-50 rounded-lg shadow-md p-0 m-0 w-80 md:w-full md:max-w-full border border-gray-200 list-none">
          {playlist.songs.map((song, idx) => (
            <li
              key={song.id}
              className="px-4 py-3 flex items-center border-l-4 border-transparent opacity-50"
            >
              <span className="flex-1 truncate">{song.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function PlaylistDetail({ loaderData }: Route.ComponentProps) {
  const { playlist } = loaderData;
  const { songIdx, playlistId } = useParams();
  const navigate = useNavigate();
  const [currentSongIndex, setCurrentSongIndex] = useState(
    Number(songIdx) || 0
  );
  const [playing, setPlaying] = useState(true);
  const listRef = useRef<HTMLUListElement>(null);

  // Keep URL in sync when song changes
  useEffect(() => {
    if (Number(songIdx) !== currentSongIndex) {
      navigate(`/playlists/${playlistId}/${currentSongIndex}`, {
        replace: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSongIndex, playlistId]);

  const handlePlay = () => setPlaying(true);
  const handlePause = () => setPlaying(false);
  const handleStop = () => setPlaying(false);
  const handleNext = () => {
    if (currentSongIndex < (playlist?.songs.length ?? 0) - 1) {
      setCurrentSongIndex((i) => i + 1);
      setPlaying(true);
    }
  };
  const handlePrev = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex((i) => i - 1);
      setPlaying(true);
    }
  };

  if (!playlist) return <div>Playlist not found</div>;

  const handleEnded = () => {
    if (currentSongIndex < playlist.songs.length - 1) {
      setCurrentSongIndex((i) => i + 1);
      setTimeout(() => {
        const el = document.getElementById(`song-${currentSongIndex + 1}`);
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full mx-auto px-4">
      <PlaylistSwitcher />
      <div className="flex flex-row gap-8 w-full max-w-5xl md:gap-5 md:items-center">
        {/* Main video */}
        <div className="flex-1 min-w-0">
          <SongPlayer
            song={playlist.songs[currentSongIndex]}
            onEnded={handleEnded}
            playing={playing}
          />
          <div className="mt-4 font-medium text-lg text-center">
            {playlist.songs[currentSongIndex].title}
          </div>
          {/* Playback Controls */}
          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 disabled:opacity-50"
              onClick={handlePrev}
              disabled={currentSongIndex === 0}
              aria-label="Previous song"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path
                  d="M8 12L18 6v12L8 12zM6 6h2v12H6V6z"
                  fill="currentColor"
                />
              </svg>
            </button>
            {playing ? (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow disabled:opacity-50"
                onClick={handlePause}
                aria-label="Pause"
              >
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                  <rect x="6" y="5" width="4" height="14" fill="currentColor" />
                  <rect
                    x="14"
                    y="5"
                    width="4"
                    height="14"
                    fill="currentColor"
                  />
                </svg>
              </button>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow disabled:opacity-50"
                onClick={handlePlay}
                aria-label="Play"
              >
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
                </svg>
              </button>
            )}
            <button
              className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 disabled:opacity-50"
              onClick={handleNext}
              disabled={currentSongIndex === playlist.songs.length - 1}
              aria-label="Next song"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path
                  d="M16 12L6 6v12l10-6zM18 6h-2v12h2V6z"
                  fill="currentColor"
                />
              </svg>
            </button>
            <button
              className="bg-red-100 hover:bg-red-200 text-red-600 rounded-full p-2 ml-2"
              onClick={handleStop}
              aria-label="Stop"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <rect
                  x="6"
                  y="6"
                  width="12"
                  height="12"
                  rx="2"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </div>
        {/* Playlist list */}
        <ul
          ref={listRef}
          className="flex-1 max-h-[430px] overflow-y-auto bg-gray-50 rounded-lg shadow-md p-0 m-0 w-80 md:w-full md:max-w-full border border-gray-200 list-none"
        >
          {playlist.songs.map((song, idx) => (
            <li
              key={song.id}
              id={`song-${idx}`}
              className={[
                'px-4 py-3 flex items-center cursor-pointer transition-colors',
                idx === currentSongIndex
                  ? 'bg-blue-50 border-l-4 border-blue-500 font-semibold'
                  : 'border-l-4 border-transparent hover:bg-gray-100',
              ].join(' ')}
              onClick={() => {
                navigate(`/playlists/${playlistId}/${idx}`, { replace: true });
                setCurrentSongIndex(idx);
                setPlaying(true);
              }}
            >
              <span className="flex-1 truncate">{song.title}</span>
              {idx === currentSongIndex && (
                <span className="text-blue-500 ml-2">▶</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
