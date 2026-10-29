import React, { useState } from 'react';

export const Counter: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <button
      id="counter"
      type="button"
      className="min-w-16 cursor-pointer border-[1.5px] border-border bg-surface px-5 py-2.5 font-mono text-lg text-text tabular-nums transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      onClick={() => setCount(count + 1)}
    >
      {count}
    </button>
  );
};
