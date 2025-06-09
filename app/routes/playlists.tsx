import { playlists } from '../data/playlists';
import { Link } from 'react-router';

export default function PlaylistsList() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Playlists</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {playlists.map((playlist) => (
          <Link
            to={`/playlists/${playlist.id}`}
            key={playlist.id}
            className="block bg-white rounded-xl shadow hover:shadow-lg border border-gray-200 hover:border-blue-400 transition p-6 group"
          >
            <div className="flex flex-col gap-2">
              <div className="text-xl font-semibold text-blue-700 group-hover:text-blue-900 mb-1">
                {playlist.name}
              </div>
              <div className="text-gray-500 text-sm truncate">
                {playlist.songs[0]?.title || 'No songs'}
              </div>
              <div className="mt-2 text-xs text-gray-400">
                {playlist.songs.length} song{playlist.songs.length !== 1 ? 's' : ''}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
