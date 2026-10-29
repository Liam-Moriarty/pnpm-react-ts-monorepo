import React, { useState } from 'react';

export const Counter: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <button
      id="counter"
      type="button"
      className="cursor-pointer rounded-lg border border-transparent bg-neutral-50 px-5 py-2.5 font-medium transition-colors hover:border-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:bg-neutral-900"
      onClick={() => setCount(count + 1)}
    >
      {count}
    </button>
  );
};
