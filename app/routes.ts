import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/playlists.tsx'),
  route('/playlists/:playlistId/:songIdx?', 'routes/playlists.$playlistId.tsx'),
] satisfies RouteConfig;
