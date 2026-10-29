import React from 'react';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header id="header">
      <h1 className="font-display text-5xl font-light text-balance font-stretch-expanded sm:text-6xl">
        {title}
      </h1>
    </header>
  );
};
