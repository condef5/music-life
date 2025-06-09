import { useState, useRef } from "react";
import { useParams } from "react-router";
import { playlists } from "../data/playlists";
import { SongPlayer } from "../components/song-player";

export default function PlaylistDetail() {
  const { playlistId } = useParams();
  const playlist = playlists.find((p) => p.id === playlistId);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  if (!playlist) return <div>Playlist not found</div>;

  const handleEnded = () => {
    if (currentSongIndex < playlist.songs.length - 1) {
      setCurrentSongIndex((i) => i + 1);
      // Scroll to next song in list
      setTimeout(() => {
        const el = document.getElementById(`song-${currentSongIndex + 1}`);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  };

  return (
    <div style={{ display: "flex", gap: 32, alignItems: "flex-start", marginTop: 32 }}>
      {/* Main video */}
      <div style={{ flex: 2, minWidth: 0 }}>
        <SongPlayer song={playlist.songs[currentSongIndex]} onEnded={handleEnded} />
        <div style={{ marginTop: 16, fontWeight: 500, fontSize: 18 }}>
          {playlist.songs[currentSongIndex].title}
        </div>
      </div>
      {/* Playlist list */}
      <ul
        ref={listRef}
        style={{
          flex: 1,
          maxHeight: 400,
          overflowY: "auto",
          background: "#fafbfc",
          borderRadius: 8,
          boxShadow: "0 2px 8px #0001",
          padding: 0,
          margin: 0,
          width: 320,
          listStyle: "none"
        }}
      >
        {playlist.songs.map((song, idx) => (
          <li
            key={song.id}
            id={`song-${idx}`}
            style={{
              padding: "12px 16px",
              cursor: "pointer",
              background: idx === currentSongIndex ? "#e3e6f6" : undefined,
              borderLeft: idx === currentSongIndex ? "4px solid #3b82f6" : "4px solid transparent",
              display: "flex",
              alignItems: "center"
            }}
            onClick={() => setCurrentSongIndex(idx)}
          >
            <span style={{ fontWeight: idx === currentSongIndex ? 600 : 400, flex: 1 }}>{song.title}</span>
            {idx === currentSongIndex && <span style={{ color: "#3b82f6", marginLeft: 8 }}>▶</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
