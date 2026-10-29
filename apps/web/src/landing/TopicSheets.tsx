import { Counter } from '@repo/ui';
import { CopyableCode } from './CopyableCode';
import { Schedule } from './Schedule';
import { Notes, Sheet, SheetHeading, SubHeading } from './Sheet';
import { Steps } from './Steps';

// What the sheets say comes from the README. When one changes, change the
// other.

export const SetupSheet = () => (
  <Sheet id="setup">
    <SheetHeading>Get it running</SheetHeading>
    <p>
      You need Node.js 26 and pnpm 10. Both versions are pinned, so everyone on
      the team runs the same ones.
    </p>
    <Steps
      steps={[
        {
          text: (
            <>
              Switch to the Node version pinned in <code>.nvmrc</code>.
            </>
          ),
          command: 'nvm install && nvm use',
        },
        {
          text: 'Install pnpm 10. Node 25 and later no longer include Corepack, so it comes from npm.',
          command: 'npm install -g pnpm@10.34.9',
        },
        {
          text: 'Install the dependencies. This also sets up the git hooks.',
          command: 'pnpm install',
        },
        {
          text: (
            <>
              Start the app. It runs on <code>http://localhost:5173</code>.
            </>
          ),
          command: 'pnpm dev',
        },
      ]}
    />
    <SubHeading>Before you build a feature</SubHeading>
    <ul className="checklist max-w-prose space-y-3">
      <li>
        <span>
          Fill in the six planning docs in <code>docs/</code> and get them
          approved. Building starts when all six are.
        </span>
      </li>
      <li>
        <span>
          Set the project stage at the top of <code>CLAUDE.md</code>: Prototype,
          MVP or Production.
        </span>
      </li>
      <li>
        <span>
          Rename the root package in <code>package.json</code>. It&apos;s still
          called <code>with-vite-react</code>.
        </span>
      </li>
      <li>
        <span>
          Replace this landing page in <code>apps/web/src/landing</code> and the
          sample <code>Header</code> and <code>Counter</code> components.
        </span>
      </li>
    </ul>
  </Sheet>
);

export const RunSheet = () => (
  <Sheet id="run">
    <SheetHeading>Run, check and test</SheetHeading>
    <p>
      Run these from the repository root. Turborepo runs each one in every
      package and skips work it has already cached.
    </p>
    <Schedule
      caption="Scripts"
      head={['Command', 'What it does']}
      rows={[
        [<CopyableCode code="pnpm dev" />, 'Starts every app in dev mode'],
        [
          <CopyableCode code="pnpm build" />,
          'Builds everything. Typecheck and tests run first.',
        ],
        [<CopyableCode code="pnpm lint" />, 'Lints every package'],
        [<CopyableCode code="pnpm typecheck" />, 'Type-checks every package'],
        [<CopyableCode code="pnpm test" />, "Runs every package's tests"],
        [
          <CopyableCode code="pnpm precheck" />,
          'Lint, typecheck, test and build. Run it before opening a pull request.',
        ],
        [
          <CopyableCode code="pnpm format" />,
          'Formats the whole repo with Prettier',
        ],
      ]}
    />
    <SubHeading>One package or one test file</SubHeading>
    <CopyableCode code="pnpm turbo run test --filter=web" />
    <CopyableCode code="pnpm --filter web exec vitest run src/App.test.tsx" />
    <Notes>
      <li>
        Tests sit next to the code as <code>*.test.ts</code> or{' '}
        <code>*.test.tsx</code> and run in jsdom with Testing Library.
      </li>
      <li>
        ESLint and TypeScript settings are shared from{' '}
        <code>packages/eslint-config</code> and{' '}
        <code>packages/typescript-config</code>. Extend them in a package rather
        than copying rules into it.
      </li>
    </Notes>
  </Sheet>
);

export const WorkflowSheet = () => (
  <Sheet id="workflow">
    <SheetHeading>Branch, commit, release</SheetHeading>
    <p>
      Every pull request and push to a long-lived branch starts a workflow. This
      is what runs, and when.
    </p>
    <Schedule
      caption="What runs when"
      head={['Event', 'What runs']}
      rows={[
        [
          <>
            Pull request into <code>main</code>
          </>,
          'CI (install, lint, typecheck, build, test) and a Vercel preview',
        ],
        [
          <>
            Pull request into <code>dev</code> or <code>stage</code>
          </>,
          'A Vercel preview',
        ],
        [
          <>
            Push to <code>dev</code>
          </>,
          'CD for dev: checks, build, deploy step',
        ],
        [
          <>
            Push to <code>stage</code>
          </>,
          'CD for stage: checks, then the deploy step',
        ],
        [
          <>
            Push to <code>main</code>
          </>,
          'CI, CD for production (deploys after approval), and the release workflow',
        ],
        [
          'Every week',
          'Dependabot: one pull request for minor and patch updates, one per major, one for GitHub Actions',
        ],
      ]}
    />
    <SubHeading>Commit messages</SubHeading>
    <p>
      Commitlint rejects any message that isn&apos;t a Conventional Commit. The
      header is <code>type(optional-scope): subject</code>, for example{' '}
      <code>ci: fix the release step</code>.
    </p>
    <p>
      The types are <code>feat</code>, <code>fix</code>, <code>docs</code>,{' '}
      <code>style</code>, <code>refactor</code>, <code>perf</code>,{' '}
      <code>test</code>, <code>build</code>, <code>ci</code>, <code>chore</code>
      , <code>revert</code> and <code>wip</code>. Start the subject with a
      lowercase word, acronyms included, keep the header to 100 characters, and
      leave off the full stop.
    </p>
    <Schedule
      caption="Git hooks"
      head={['Hook', 'What it does']}
      rows={[
        [<code>pre-commit</code>, 'Runs ESLint and Prettier on staged files'],
        [<code>commit-msg</code>, 'Checks the message with commitlint'],
        [
          <code>pre-push</code>,
          'Tests and type-checks everything not yet pushed, plus what depends on it',
        ],
        [<code>pre-rebase</code>, 'Blocks rebasing while on main'],
        [
          <code>post-merge</code>,
          'Reinstalls dependencies if the lockfile changed',
        ],
        [
          <code>post-checkout</code>,
          'Reinstalls dependencies if the lockfile differs between branches',
        ],
      ]}
    />
    <SubHeading>Versioning packages</SubHeading>
    <p>
      Packages in <code>packages/</code> are versioned with Changesets;{' '}
      <code>web</code> isn&apos;t. After changing a package, describe the change
      and commit the file this creates:
    </p>
    <CopyableCode code="pnpm changeset" />
    <p>
      Once it reaches <code>main</code>, the release workflow opens a pull
      request that bumps the versions.
    </p>
    <SubHeading>Once per repository</SubHeading>
    <ul className="checklist max-w-prose space-y-3">
      <li>
        <span>
          For pull request previews, add the secrets <code>VERCEL_TOKEN</code>,{' '}
          <code>VERCEL_ORG_ID</code> and <code>VERCEL_PROJECT_ID</code>. Without
          them the preview job builds but skips the deploy.
        </span>
      </li>
      <li>
        <span>
          Create the GitHub environments <code>development</code>,{' '}
          <code>staging</code> and <code>production</code>, with their URL
          variables and API secrets. Give <code>production</code> required
          reviewers.
        </span>
      </li>
      <li>
        <span>
          Pick a deploy target in each <code>cd-*.yml</code> workflow. Until
          then they build and deploy nothing.
        </span>
      </li>
      <li>
        <span>
          Let GitHub Actions create and approve pull requests, so the release
          workflow can open its pull request.
        </span>
      </li>
      <li>
        <span>
          Protect <code>main</code> and require the CI check to pass.
        </span>
      </li>
      <li>
        <span>Turn on secret scanning and push protection.</span>
      </li>
    </ul>
  </Sheet>
);

export const SharedUiSheet = () => (
  <Sheet id="shared-ui">
    <SheetHeading>Share components between apps</SheetHeading>
    <p>
      <code>@repo/ui</code> ships as source. Its exports point at{' '}
      <code>.tsx</code> files, <code>web</code> links it with{' '}
      <code>workspace:*</code>, and Vite compiles it with the app. There&apos;s
      no build step, so edits show up straight away.
    </p>
    <figure className="flex flex-wrap items-center gap-6 border border-dashed border-muted p-5">
      <span
        aria-hidden="true"
        className="grid size-14 shrink-0 grid-rows-2 overflow-hidden rounded-full border-[1.5px] border-text text-center font-display text-sm leading-none"
      >
        <span className="self-end border-b-[1.5px] border-text pb-1">A</span>
        <span className="pt-1">05</span>
      </span>
      <Counter />
      <figcaption className="max-w-xs text-sm text-muted">
        Detail A: a live component from <code>packages/ui</code>. Click it. The
        page title on sheet 01 comes from the same package.
      </figcaption>
    </figure>
    <SubHeading>Add a component</SubHeading>
    <Steps
      steps={[
        {
          text: (
            <>
              Create it in <code>packages/ui/components/</code>.
            </>
          ),
        },
        {
          text: (
            <>
              Write its test next to it, as <code>*.test.tsx</code>.
            </>
          ),
        },
        {
          text: (
            <>
              Export it from <code>components/index.ts</code>.
            </>
          ),
        },
        {
          text: 'Record the change for the next release.',
          command: 'pnpm changeset',
        },
      ]}
    />
    <SubHeading>Styling with Tailwind</SubHeading>
    <p>
      Tailwind CSS 4 is configured in CSS, with no{' '}
      <code>tailwind.config.js</code>. It doesn&apos;t scan{' '}
      <code>node_modules</code>, where <code>web</code> links{' '}
      <code>@repo/ui</code>, so <code>apps/web/src/style.css</code> points it at
      the package:
    </p>
    <CopyableCode
      code={"@import 'tailwindcss';\n@source '../../../packages/ui';"}
    />
    <Notes>
      <li>
        A new app that uses <code>@repo/ui</code> needs both lines, or the
        components render unstyled.
      </li>
      <li>
        Colours and fonts are tokens in the <code>@theme</code> block of the
        same file. This page&apos;s blueprint colours are placeholders until{' '}
        <code>docs/04-design-brief.md</code> is filled in.
      </li>
      <li>
        A change in <code>packages/ui</code> can break <code>web</code>, which
        is why <code>pre-push</code> and CI check both.
      </li>
    </Notes>
  </Sheet>
);

export const EnvSheet = () => (
  <Sheet id="env">
    <SheetHeading>Keep secrets out of the browser</SheetHeading>
    <p className="revision-cloud text-lg">
      Anything prefixed <code>VITE_</code> is built into the browser bundle and
      is public. Never put a secret in one.
    </p>
    <ul className="max-w-prose list-[square] space-y-3 pl-5 marker:text-muted">
      <li>
        <span>
          Local values go in <code>apps/web/.env.local</code>, which git
          ignores. Read them in code with <code>import.meta.env.VITE_*</code>.
        </span>
      </li>
      <li>
        <span>
          Secrets belong in server-side code. They never get the{' '}
          <code>VITE_</code> prefix and never appear under <code>apps/web</code>
          .
        </span>
      </li>
      <li>
        <span>
          The CD workflows pass <code>VITE_APP_ENV</code> and{' '}
          <code>VITE_API_URL</code> to the build.
        </span>
      </li>
    </ul>
    <Notes>
      <li>
        Turborepo runs tasks in strict env mode. A variable that isn&apos;t{' '}
        <code>VITE_*</code> must be listed in <code>turbo.json</code>, under{' '}
        <code>env</code> or <code>globalEnv</code>, or the build won&apos;t see
        it.
      </li>
    </Notes>
  </Sheet>
);

export const SupabaseSheet = () => (
  <Sheet id="supabase">
    <SheetHeading>Add a database when a feature needs one</SheetHeading>
    <p>
      Supabase is the planned database and auth provider. It isn&apos;t
      installed yet: add it with the first feature that stores data, following{' '}
      <code>docs/05-database-schema.md</code>.
    </p>
    <Steps
      steps={[
        {
          text: 'Install the Supabase client in the web app.',
          command: 'pnpm --filter web add @supabase/supabase-js',
        },
        {
          text: 'Create the client in a single module, so the rest of the app imports it from one place.',
        },
        {
          text: (
            <>
              Put <code>VITE_SUPABASE_URL</code> and the publishable key in{' '}
              <code>.env.local</code>. The <code>service_role</code> key never
              goes in a <code>VITE_</code> variable or anywhere in{' '}
              <code>apps/web</code>.
            </>
          ),
        },
        {
          text: (
            <>
              Write schema changes as SQL migrations in{' '}
              <code>supabase/migrations/</code>, with row-level security on
              every table.
            </>
          ),
        },
      ]}
    />
    <Notes>
      <li>
        <code>apps/server</code> is a placeholder. Build a server only when
        something needs one, like holding a secret or receiving webhooks, and
        try row-level security, Postgres functions and Edge Functions first.
      </li>
      <li>
        <code>CLAUDE.md</code> has the full list of security rules.
      </li>
    </Notes>
  </Sheet>
);

export const ClaudeSheet = () => (
  <Sheet id="claude">
    <SheetHeading>Work with Claude Code</SheetHeading>
    <p>
      <code>CLAUDE.md</code> tells Claude how to work in this repo: the project
      stage, simplicity rules, a security baseline for every stage, and extra
      checklists for MVP and Production.
    </p>
    <Schedule
      caption="Project stages"
      head={['Stage', 'Means']}
      rows={[
        [
          'Prototype',
          'Testing an idea. May be thrown away. No real users or personal data.',
        ],
        ['MVP', 'Real users and their data, small scale, changing fast.'],
        ['Production', 'Paying users, an uptime promise, or sensitive data.'],
      ]}
    />
    <p>
      Claude reads the planning docs before building a feature, and stops to ask
      when one is missing or unapproved.
    </p>
    <Notes>
      <li>
        Keep the stage line at the top of <code>CLAUDE.md</code> current. It
        decides how much engineering rigour applies, for people and for Claude.
      </li>
    </Notes>
  </Sheet>
);
