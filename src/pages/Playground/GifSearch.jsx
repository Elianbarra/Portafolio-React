import { useState } from "react";
import PlaygroundShell from "../../components/PlaygroundShell.jsx";
import useApi from "../../hooks/useApi.js";

const GifSearch = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("cats");
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIPHY_API_KEY}&q=${encodeURIComponent(
    category
  )}&limit=12`;
  const { loaded, data } = useApi(url);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!query.trim()) return;
    setCategory(query.trim());
  };

  return (
    <PlaygroundShell title="GIF Search" description="Search the Giphy API by keyword.">
      <form onSubmit={handleSubmit} className="mb-8 flex max-w-md gap-3">
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search GIFs..."
          className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-slate-100 outline-none focus:border-accent/60"
        />
        <button type="submit" className="btn-primary px-5 py-2.5 text-sm">
          Search
        </button>
      </form>

      {loaded && data ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {data.map((gif) => (
            <div key={gif.id} className="card overflow-hidden">
              <img src={gif.images.downsized_medium.url} alt={gif.title} className="w-full" />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500">Loading…</p>
      )}
    </PlaygroundShell>
  );
};

export default GifSearch;
