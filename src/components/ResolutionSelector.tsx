'use client';
import { useResolution } from '@/providers/ResolutionProvider';
import { resolutions } from '@/utils/resolutions';

export default function ResolutionSelector() {
  const { selected, setSelected } = useResolution();

  return (
    <div className="flex items-center gap-4 mb-4">
      <label htmlFor="res-select" className="font-medium text-sm">
        Simular resolução:
      </label>
      <select
        id="res-select"
        onChange={(e) => setSelected(e.target.value as keyof typeof resolutions)}
        value={selected}
        className="p-2 border border-gray-300 rounded"
      >
        {Object.keys(resolutions).map((label) => (
          <option key={label} value={label}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
