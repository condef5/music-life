import { Link, useParams } from 'react-router';
import { playlists } from '../data/playlists';

export function PlaylistSwitcher() {
  const { playlistId: currentPlaylistId } = useParams();

  return (
    <nav className="w-full flex flex-wrap gap-2 items-center justify-center mb-6 mt-2">
      {playlists.map((playlist) => (
        <Link
          key={playlist.id}
          to={`/playlists/${playlist.id}`}
          className={[
            'px-4 py-2 rounded font-medium transition',
            playlist.id === currentPlaylistId
              ? 'bg-blue-500 text-white shadow'
              : 'bg-gray-100 hover:bg-blue-100 text-gray-800',
          ].join(' ')}
        >
          {playlist.name}
        </Link>
      ))}
    </nav>
  );
}
