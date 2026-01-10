import { useEffect, useState } from 'react';
import api from '../lib/api';

interface MediaItem {
  id: string;
  url: string;
  filename?: string;
}

interface Props {
  onSelect: (media: MediaItem) => void;
}

const MediaPicker: React.FC<Props> = ({ onSelect }) => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = (await api.cms.listMediaAdmin()) as { data?: MediaItem[] };
        setMedia(Array.isArray(res.data) ? res.data : []);
      } catch (e) {
        console.error('Error loading media:', e);
        setMedia([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {loading ? (
        <div>Loading...</div>
      ) : media.length === 0 ? (
        <div className="p-4 text-center text-sm text-muted-foreground">No media available</div>
      ) : Array.isArray(media) && media.length > 0 ? (
        media.map((m) => (
          <div key={m.id} className="p-2 border rounded hover:shadow cursor-pointer" onClick={() => onSelect(m)}>
            <img src={m.url} alt={m.filename || 'media'} className="w-full h-32 object-cover" />
            <div className="mt-2 text-xs text-muted-foreground truncate">{m.filename}</div>
            <div className="mt-1 text-xs text-primary">Select</div>
          </div>
        ))
      ) : (
        <div className="p-4 text-center text-sm text-muted-foreground">No media available</div>
      )}
    </div>
  );
};

export default MediaPicker;
