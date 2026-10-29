import React from 'react';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header id="header">
      <h1 className="my-8 text-5xl font-bold">{title}</h1>
    </header>
  );
};
