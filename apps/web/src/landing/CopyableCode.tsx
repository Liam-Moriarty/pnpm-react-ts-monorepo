import { useEffect, useId, useState } from 'react';

type CopyResult = { copied: boolean; at: number };

export const CopyableCode = ({ code }: { code: string }) => {
  const codeId = useId();
  const [result, setResult] = useState<CopyResult | null>(null);

  useEffect(() => {
    if (!result) return;
    const timer = setTimeout(() => setResult(null), 1800);
    return () => clearTimeout(timer);
  }, [result]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setResult({ copied: true, at: Date.now() });
    } catch {
      // No clipboard access, e.g. on a page served over plain http.
      setResult({ copied: false, at: Date.now() });
    }
  };

  return (
    <div>
      <div className="relative flex border border-border bg-surface">
        <pre className="min-w-0 flex-1 overflow-x-auto px-4 py-3 text-sm">
          <code id={codeId}>{code}</code>
        </pre>
        <button
          type="button"
          onClick={copy}
          aria-describedby={codeId}
          className="shrink-0 cursor-pointer border-l border-border px-4 font-display text-sm text-primary transition-colors hover:bg-primary hover:text-background focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
        >
          Copy
        </button>
        {result?.copied && (
          <span
            key={result.at}
            aria-hidden="true"
            className="stamp pointer-events-none absolute top-1/2 right-20 -translate-y-1/2 bg-surface text-sm"
          >
            Copied
          </span>
        )}
      </div>
      <p role="status" className="text-sm text-primary empty:hidden">
        {result?.copied === true && <span className="sr-only">Copied</span>}
        {result?.copied === false &&
          "Couldn't copy here. Select the text and copy it yourself."}
      </p>
    </div>
  );
};
