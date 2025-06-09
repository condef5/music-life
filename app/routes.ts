import { type RouteConfig, route } from '@react-router/dev/routes';

export default [
  route('/', 'routes/playlists.tsx'),
  route('/playlists/:playlistId/:songIdx?', 'routes/playlists.$playlistId.tsx'),
] satisfies RouteConfig;
