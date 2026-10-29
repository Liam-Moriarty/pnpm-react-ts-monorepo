import { useCallback, useState } from 'react';
import { PlanSheet } from './landing/PlanSheet';
import {
  ClaudeSheet,
  EnvSheet,
  RunSheet,
  SetupSheet,
  SharedUiSheet,
  SupabaseSheet,
  WorkflowSheet,
} from './landing/TopicSheets';
import { Welcome } from './landing/Welcome';

export const App = () => {
  const [welcomed, setWelcomed] = useState(false);
  const finishWelcome = useCallback(() => setWelcomed(true), []);

  return (
    <>
      {!welcomed && <Welcome onDone={finishWelcome} />}
      <main className="mx-auto max-w-6xl space-y-12 px-4 py-8 sm:space-y-16 sm:px-6 sm:py-14">
        <PlanSheet drawn={welcomed} />
        <SetupSheet />
        <RunSheet />
        <WorkflowSheet />
        <SharedUiSheet />
        <EnvSheet />
        <SupabaseSheet />
        <ClaudeSheet />
      </main>
    </>
  );
};
