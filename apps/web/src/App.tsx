import typescriptLogo from '/typescript.svg';
import { Header, Counter } from '@repo/ui';

export const App = () => {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center p-8 text-center">
      <div className="flex">
        <a href="https://vitejs.dev" target="_blank">
          <img
            src="/vite.svg"
            className="h-24 p-6 hover:drop-shadow-xl hover:drop-shadow-indigo-500/70"
            alt="Vite logo"
          />
        </a>
        <a href="https://www.typescriptlang.org/" target="_blank">
          <img
            src={typescriptLogo}
            className="h-24 p-6 hover:drop-shadow-xl hover:drop-shadow-yellow-300/70"
            alt="TypeScript logo"
          />
        </a>
      </div>
      <Header title="Web" />
      <div className="p-8">
        <Counter />
      </div>
    </div>
  );
};
