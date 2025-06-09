import { type RouteConfig, route } from '@react-router/dev/routes';

export default [
  route('/', 'routes/home.tsx'),
  route('/playlists', 'routes/playlists.tsx'),
  route('/playlists/:playlistId', 'routes/playlists.$playlistId.tsx'),
] satisfies RouteConfig;
