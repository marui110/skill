# Skills Index

Runtime: `~/.claude/skills`（98）。镜像：`global/`。路由：`SKILL_ROUTER.md`。

| Skill | Source | Description |
|-------|--------|-------------|
| `api-and-interface-design` | global | Guides stable API and interface design. Use when designing APIs, module boundaries, or any public interface. Use when creating REST or GraphQL endpoints, defini |
| `ask-matt` | global | Ask which skill or flow fits your situation. A router over the skills in this repo. |
| `baseline-ui` | ui-skills | Quickly deslop UI code by fixing spacing, hierarchy, typography, and small layout issues. Use when the interface needs a fast cleanup or polish pass. |
| `brainstorming` | global | "You MUST use this before any creative work - creating features, building components, adding functionality, or modifying behavior. Explores user intent, require |
| `browser-testing-with-devtools` | global | Tests in real browsers via Chrome DevTools MCP. Use when building or debugging anything that runs in a browser. Use when you need to inspect the DOM, capture co |
| `cavecrew` | global | > |
| `caveman` | global | > |
| `caveman-compress` | global | > |
| `caveman-help` | global | > |
| `ci-cd-and-automation` | global | Automates CI/CD pipeline setup. Use when setting up or modifying build and deployment pipelines. Use when you need to automate quality gates, configure test run |
| `code-review-and-quality` | global | Conducts multi-axis code review. Use before merging any change. Use when reviewing code written by yourself, another agent, or a human. Use when you need to ass |
| `code-simplification` | global | Simplifies code for clarity. Use when refactoring code for clarity without changing behavior. Use when code works but is harder to read, maintain, or extend tha |
| `codebase-design` | global | Shared vocabulary for designing deep modules. Use when the user wants to design or improve a module's interface, find deepening opportunities, decide where a se |
| `constraint-driven-development` | global | Establishes a project's quality bar as a written contract and stops agents quietly lowering it. Interviews the user on which dimensions matter, supplies sane de |
| `context-engineering` | global | Optimizes agent context setup. Use when starting a new session, when agent output quality degrades, when switching between tasks, or when you need to configure  |
| `create-design-md` | ui-skills | Create or update a DESIGN.md from an existing product repository or public website. Use when asked to document an interface's design language, reconstruct its v |
| `debugging-and-error-recovery` | global | Guides systematic root-cause debugging. Use when tests fail, builds break, something that worked yesterday broke, behavior doesn't match expectations, or you en |
| `deploy-to-vercel` | global | Deploy applications and websites to Vercel. Use when the user requests deployment actions like "deploy my app", "deploy and give me the link", "push this live", |
| `deprecation-and-migration` | global | Manages deprecation and migration. Use when removing old systems, APIs, or features. Use when migrating users from one implementation to another. Use when migra |
| `design-review` | global | Run a sharp, prioritized design critique of a UI — a URL, a screenshot/image, or a component file — covering visual hierarchy, typography, spacing, color & cont |
| `design-taste-frontend` | global | Anti-slop frontend skill for landing pages, portfolios, and redesigns. The agent reads the brief, infers the right design direction, and ships interfaces that d |
| `diagnosing-bugs` | global | Diagnosis loop for hard bugs and performance regressions. Use when the user says "diagnose"/"debug this", or reports something broken/throwing/failing/slow. |
| `dispatching-parallel-agents` | global | Use when facing 2+ independent tasks that can be worked on without shared state or sequential dependencies |
| `documentation-and-adrs` | global | Records decisions and documentation. Use when you need to document an architecture decision (ADR) or the reasoning behind a design choice, when changing public  |
| `domain-modeling` | global | Build and sharpen a project's domain model. Use when the user wants to pin down domain terminology or a ubiquitous language, record an architectural decision, o |
| `doubt-driven-development` | global | Subjects every non-trivial decision to a fresh-context adversarial review before it stands. Use when you want every assumption cross-examined before proceeding, |
| `encrypted-credential-cross-env-migration` | codeskill | >- |
| `evolve-skills` | codeskill | >- |
| `executing-plans` | global | Use when you have a written implementation plan to execute in a separate session with review checkpoints |
| `finishing-a-development-branch` | global | Use when implementation is complete, all tests pass, and you need to decide how to integrate the work |
| `fixing-accessibility` | ui-skills | Audit and fix HTML accessibility issues including ARIA labels, keyboard navigation, focus management, color contrast, and form errors. Use when adding interacti |
| `fixing-metadata` | ui-skills | > |
| `fixing-motion-performance` | ui-skills | Audit and fix animation performance issues including layout thrashing, compositor properties, scroll-linked motion, and blur effects. Use when animations stutte |
| `framer-motion-patterns` | codeskill | framer-motion 动效实现模板。用于添加列表入场、数字动画、页面区块 stagger、侧边栏 layout 动画，或新建 lib/motion.ts 时。 |
| `frontend-design` | global | Guidance for distinctive, intentional visual design when building new UI or reshaping an existing one. Helps with aesthetic direction, typography, and making ch |
| `frontend-ui-engineering` | global | Builds production-quality, accessible, responsive user-facing UIs. Use when building or modifying interfaces and pages, creating components, implementing layout |
| `full-output-enforcement` | global | Overrides default LLM truncation behavior. Enforces complete code generation, bans placeholder patterns, and handles token-limit splits cleanly. Apply to any ta |
| `git-workflow-and-versioning` | global | Structures git workflow practices. Use when making any code change. Use when committing, branching, resolving conflicts, splitting uncommitted work in a messy w |
| `graphify` | global | "Use for any question about a codebase, its architecture, file relationships, or project content — especially when graphify-out/ exists, where the question shou |
| `grilling` | global | Grill the user relentlessly about a plan, decision, or idea. Use when the user wants to stress-test their thinking, or uses any 'grill' trigger phrases. |
| `handoff` | global | Compact the current conversation into a handoff document for another agent to pick up. |
| `idea-refine` | global | Refines raw ideas into sharp, actionable concepts through structured divergent and convergent thinking. Use when an idea is still vague, when you need to stress |
| `impeccable` | global | Use when the user wants to design, redesign, shape, critique, audit, polish, clarify, distill, harden, optimize, adapt, animate, colorize, extract, or otherwise |
| `implement` | global | "Implement a piece of work based on a spec or set of tickets." |
| `improve-codebase-architecture` | global | Scan a codebase for deepening opportunities, present them as a visual HTML report, then grill through whichever one you pick. |
| `improve-ui` | ui-skills | Audit an existing product surface against its own design evidence, identify verified UI problems, and write self-contained implementation plans for another agen |
| `incremental-implementation` | global | Delivers changes incrementally in thin, verifiable slices. Use when implementing any feature or change that touches more than one file, or when picking up the n |
| `interview-me` | global | Extracts what the user actually wants instead of what they think they should want. Achieves this through one-question-at-a-time interview until ~95% confidence  |
| `investigate-first` | global | Diagnose ambiguous failures before editing. Use for unknown causes, intermittent behavior, performance regressions, or investigations needing evidence-ranked hy |
| `lean-build` | global | Build feature work with high overbuilding risk. Use for new behavior, product slices, or integrations where repository reuse, strict scope, and an explicit stop |
| `local-shell-tooling-portability` | codeskill | >- |
| `migration` | global | Implement reversible compatibility-safe transitions. Use for schema, data, API, protocol, configuration, or dependency migrations requiring rollback and preserv |
| `nextjs-saas-feature-scaffold` | codeskill | 在 Next.js SaaS 项目中脚手架新 feature。用于新增 app 页面、Server Action、DB query、shared/domain 组件的完整切片时。 |
| `observability-and-instrumentation` | global | Instruments code so production behavior is visible and diagnosable. Use when adding logging, metrics, tracing, or alerting. Use when shipping any feature that r |
| `performance-optimization` | global | Optimizes application performance across frontend, backend, queries, and databases. Use when performance requirements exist, when you suspect performance regres |
| `planning-and-task-breakdown` | global | Breaks work into ordered tasks. Use when you have a spec or clear requirements and need to break work into implementable tasks. Use when a task feels too large  |
| `playwright-skill` | global | Complete browser automation with Playwright. Auto-detects dev servers, writes clean test scripts to /tmp. Test pages, fill forms, take screenshots, check respon |
| `ponytail` | global | > |
| `ponytail-audit` | global | > |
| `ponytail-review` | global | > |
| `preview-first-sync` | codeskill | 实现「预览先展示、异步入库」三层缓存模式。用于 AI 生成内容需即时 UI 反馈、Radar/Insight 类批量生成、或用户要求 preview-first / optimistic display 时。 |
| `prod-error-layered-triage` | codeskill | >- |
| `receiving-code-review` | global | Use when receiving code review feedback, before implementing suggestions, especially if feedback seems unclear or technically questionable - requires technical  |
| `redesign-existing-projects` | global | Upgrades existing websites and apps to premium quality. Audits current design, identifies generic AI patterns, and applies high-end design standards without bre |
| `requesting-code-review` | global | Use when completing tasks, implementing major features, or before merging to verify work meets requirements |
| `research` | global | Investigate a question against high-trust primary sources and capture the findings as a Markdown file in the repo. Use when the user wants a topic researched, d |
| `resolving-merge-conflicts` | global | "Use when you need to resolve an in-progress git merge/rebase conflict." |
| `runtime-config-source-of-truth` | codeskill | >- |
| `saas-tenant-membership` | codeskill | >- |
| `safe-refactor` | global | Restructure code while preserving behavior. Use for extraction, consolidation, ownership moves, or cleanup where verification must bracket structural edits. |
| `security-and-hardening` | global | Hardens code against vulnerabilities. Use when auditing an input handler for vulnerabilities, when handling user input, authentication, data storage, or externa |
| `shadcn-app-components` | codeskill | shadcn SaaS 应用组件模板与三层分层。用于新建 shared 组件、空状态、页面头、工作区布局、或搭建 components/ui + shared + domain 结构时。 |
| `shipping-and-launch` | global | Prepares production launches. Use when preparing to deploy to production, or when asking what needs to be in place before shipping. Use when you need a pre-laun |
| `source-driven-development` | global | Grounds every implementation decision in official documentation. Use when you want to verify an approach against the official docs before implementing it, or wh |
| `spec-driven-development` | global | Creates specs before coding. Use when starting a new project, feature, or significant change and no specification exists yet. Use when drafting a PRD or require |
| `subagent-driven-development` | global | Use when executing implementation plans with independent tasks in the current session |
| `supabase` | global | "Use when doing ANY task involving Supabase. Triggers: Supabase products (Database, Auth, Edge Functions, Realtime, Storage, Vectors, Cron, Queues); client libr |
| `supabase-postgres-best-practices` | global | Postgres performance optimization and best practices from Supabase. Use this skill when writing, reviewing, or optimizing Postgres queries, schema designs, or d |
| `surgical-patch` | global | Fix bugs and small behavior changes at the narrowest responsible layer. Use when regression proof, preserved surrounding behavior, and task-relevant tests matte |
| `systematic-debugging` | global | Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes |
| `teach` | global | Teach the user a new skill or concept, within this workspace. |
| `test-driven-development` | global | Use when implementing any feature or bugfix, before writing implementation code |
| `to-spec` | global | Turn the current conversation into a spec and publish it to the project issue tracker — no interview, just synthesis of what you've already discussed. |
| `to-tickets` | global | Break a plan, spec, or the current conversation into a set of tracer-bullet tickets, each declaring its blocking edges, published to the configured tracker — ed |
| `triage` | global | Move issues and external PRs through a state machine of triage roles — categorise, verify, grill if needed, and write agent-ready briefs. |
| `ui-skills-root` | ui-skills | Use before UI-related work to select the smallest useful UI Skills context through the ui-skills CLI. |
| `using-agent-skills` | global | Discovers and invokes agent skills. Use when starting a session, or when you need to decide which skill or workflow applies to the piece of work at hand. This i |
| `using-git-worktrees` | global | Use when starting feature work that needs isolation from current workspace or before executing implementation plans - ensures an isolated workspace exists via n |
| `vercel-cli-with-tokens` | global | Deploy and manage projects on Vercel using token-based authentication. Use when working with Vercel CLI using access tokens rather than interactive login — e.g. |
| `vercel-composition-patterns` | global | React composition patterns that scale. Use when refactoring components with boolean prop proliferation, building flexible component libraries, or designing reus |
| `vercel-optimize` | global | "Use for Vercel cost and performance optimization on deployed projects, especially Next.js, SvelteKit, Nuxt, and limited Astro apps. Collect Vercel metrics, usa |
| `vercel-post-deploy-verify` | codeskill | >- |
| `vercel-react-best-practices` | global | React and Next.js performance optimization guidelines from Vercel Engineering. This skill should be used when writing, reviewing, or refactoring React/Next.js c |
| `verification-before-completion` | global | Use when about to claim work is complete, fixed, or passing, before committing or creating PRs - requires running verification commands and confirming output be |
| `wayfinder` | global | Plan a huge chunk of work — more than one agent session can hold — as a shared map of decision tickets on your issue tracker, and resolve them one at a time unt |
| `web-design-guidelines` | global | Review UI code for Web Interface Guidelines compliance. Use when asked to "review my UI", "check accessibility", "audit design", "review UX", or "check my site  |
| `writing-plans` | global | Use when you have a spec or requirements for a multi-step task, before touching code |
| `writing-skills` | global | Use when creating new skills, editing existing skills, or verifying skills work before deployment |
