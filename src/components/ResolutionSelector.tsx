'use client';
import { useResolution } from '@/providers/ResolutionProvider';
import { resolutions } from '@/utils/resolutions';

export default function ResolutionSelector() {
  const { selected, setSelected } = useResolution();

  return (
    <div className="flex items-center gap-[var(--space-md)] mb-[var(--space-md)]">
      <label htmlFor="res-select" className="font-medium text-[var(--font-size-sm)]">
        Simular resolução:
      </label>
      <select
        id="res-select"
        onChange={(e) => setSelected(e.target.value as keyof typeof resolutions)}
        value={selected}
        className="p-[var(--space-sm)] border border-[var(--color-border)] rounded-[var(--border-radius-sm)]"
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
