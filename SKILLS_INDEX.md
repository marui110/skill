# Skills Index

Runtime: `~/.claude/skills`（148）。镜像：`global/`。路由：`SKILL_ROUTER.md`。

| Skill | Source | Description |
|-------|--------|-------------|
| `animate` | global | Build an animation from scratch, making the decisions in the order that determines whether it feels right — should it... |
| `animation-vocabulary` | global | Reverse-lookup glossary that turns a vague description of a web animation or motion effect into its exact term ("the ... |
| `api-and-interface-design` | global | Guides stable API and interface design. Use when designing APIs, module boundaries, or any public interface. Use when... |
| `apple-design` | global | Apple's approach to interface design and fluid, physical motion, translated for the web. Use when building or reviewi... |
| `apple-notes` | global | Manage Apple Notes via memo CLI: create, search, edit. |
| `ask-matt` | global | Ask which skill or flow fits your situation. A router over the skills in this repo. |
| `baseline-ui` | ui-skills | Quickly deslop UI code by fixing spacing, hierarchy, typography, and small layout issues. Use when the interface need... |
| `brainstorming` | global | You MUST use this before any creative work - creating features, building components, adding functionality, or modifyi... |
| `brandkit` | global | Premium brand-kit image generation skill for creating high-end brand-guidelines boards, logo systems, identity decks,... |
| `browser-testing-with-devtools` | global | Tests in real browsers via Chrome DevTools MCP. Use when building or debugging anything that runs in a browser. Use w... |
| `cavecrew` | global | Decision guide for delegating to caveman-style subagents. Tells the main thread WHEN to spawn `cavecrew-investigator`... |
| `caveman` | global | Ultra-compressed communication mode. Cuts output tokens 65% (measured) by speaking like caveman while keeping full te... |
| `caveman-commit` | global | Ultra-compressed commit message generator. Cuts noise from commit messages while preserving intent and reasoning. Con... |
| `caveman-compress` | global | Compress natural language memory files (CLAUDE.md, todos, preferences) into caveman format to save input tokens. Pres... |
| `caveman-help` | global | Quick-reference card for all caveman modes, skills, and commands. One-shot display, not a persistent mode. Trigger: /... |
| `caveman-review` | global | Ultra-compressed code review comments. Cuts noise from PR feedback while preserving the actionable signal. Each comme... |
| `caveman-stats` | global | Show real token usage and estimated savings for the current session. Reads directly from the Claude Code session log ... |
| `ci-cd-and-automation` | global | Automates CI/CD pipeline setup. Use when setting up or modifying build and deployment pipelines. Use when you need to... |
| `code-review` | global | Review the changes since a fixed point (commit, branch, tag, or merge-base) along two axes — Standards (does the code... |
| `code-review-and-quality` | global | Conducts multi-axis code review. Use before merging any change. Use when reviewing code written by yourself, another ... |
| `code-review-skill` | global | Provides comprehensive code review guidance for React 19, Vue 3, Angular 17+, Svelte 5, Rust, TypeScript, Java, PHP, ... |
| `code-simplification` | global | Simplifies code for clarity. Use when refactoring code for clarity without changing behavior. Use when code works but... |
| `codebase-design` | global | Shared vocabulary for designing deep modules. Use when the user wants to design or improve a module's interface, find... |
| `context-engineering` | global | Optimizes agent context setup. Use when starting a new session, when agent output quality degrades, when switching be... |
| `create-design-md` | ui-skills | Create or update a DESIGN.md from an existing product repository or public website. Use when asked to document an int... |
| `debugging-and-error-recovery` | global | Guides systematic root-cause debugging. Use when tests fail, builds break, behavior doesn't match expectations, or yo... |
| `deploy-to-vercel` | global | Deploy applications and websites to Vercel. Use when the user requests deployment actions like "deploy my app", "depl... |
| `deprecation-and-migration` | global | Manages deprecation and migration. Use when removing old systems, APIs, or features. Use when migrating users from on... |
| `design-taste-frontend` | global | Anti-slop frontend skill for landing pages, portfolios, and redesigns. The agent reads the brief, infers the right de... |
| `design-taste-frontend-v1` | global | The original v1 taste-skill, preserved for projects depending on its exact behavior. The current default is `design-t... |
| `diagnosing-bugs` | global | Diagnosis loop for hard bugs and performance regressions. Use when the user says "diagnose"/"debug this", or reports ... |
| `dispatching-parallel-agents` | global | Use when facing 2+ independent tasks that can be worked on without shared state or sequential dependencies |
| `documentation-and-adrs` | global | Records decisions and documentation. Use when making architectural decisions, changing public APIs, shipping features... |
| `domain-modeling` | global | Build and sharpen a project's domain model. Use when the user wants to pin down domain terminology or a ubiquitous la... |
| `doubt-driven-development` | global | Subjects every non-trivial decision to a fresh-context adversarial review before it stands. Use when correctness matt... |
| `dws` | global | 管理钉钉产品能力(AI表格/AI搜问/日历/通讯录/群聊与机器人/待办/审批/考勤/日志/DING消息/开放平台文档/钉钉文档/钉钉云盘/AI听记/邮箱/在线电子表格/知识库等)。当用户需要操作表格数据、管理日程会议、模糊找人/查谁负... |
| `emil-design-eng` | global | This skill encodes Emil Kowalski's philosophy on UI polish, component design, animation decisions, and the invisible ... |
| `evolve-skills` | codeskill | Evolve global Agent Skills from corrections, repeated failures, or reusable workflows. Use when the user corrects the... |
| `executing-plans` | global | Use when you have a written implementation plan to execute in a separate session with review checkpoints |
| `find-animation-opportunities` | global | Search a codebase or UI for places that don't animate but should, and reject everything that shouldn't. Read-only; it... |
| `finishing-a-development-branch` | global | Use when implementation is complete, all tests pass, and you need to decide how to integrate the work - guides comple... |
| `fixing-accessibility` | ui-skills | Audit and fix HTML accessibility issues including ARIA labels, keyboard navigation, focus management, color contrast,... |
| `fixing-metadata` | ui-skills | Audit and fix HTML metadata including page titles, meta descriptions, canonical URLs, Open Graph tags, Twitter cards,... |
| `fixing-motion-performance` | ui-skills | Audit and fix animation performance issues including layout thrashing, compositor properties, scroll-linked motion, a... |
| `framer-motion-patterns` | codeskill | framer-motion 动效实现模板。用于添加列表入场、数字动画、页面区块 stagger、侧边栏 layout 动画，或新建 lib/motion.ts 时。 |
| `frontend-design` | global | Guidance for distinctive, intentional visual design when building new UI or reshaping an existing one. Helps with aes... |
| `frontend-ui-engineering` | global | Builds production-quality UIs. Use when building or modifying user-facing interfaces. Use when creating components, i... |
| `full-output-enforcement` | global | Overrides default LLM truncation behavior. Enforces complete code generation, bans placeholder patterns, and handles ... |
| `git-workflow-and-versioning` | global | Structures git workflow practices. Use when making any code change. Use when committing, branching, resolving conflic... |
| `gpt-taste` | global | Elite UX/UI & Advanced GSAP Motion Engineer. Enforces Python-driven true randomization for layout variance, strict AI... |
| `grill-me` | global | A relentless interview to sharpen a plan or design. |
| `grill-with-docs` | global | A relentless interview to sharpen a plan or design, which also creates docs (ADR's and glossary) as we go. |
| `grilling` | global | Grill the user relentlessly about a plan, decision, or idea. Use when the user wants to stress-test their thinking, o... |
| `gsap-core` | global | Official GSAP skill for the core API — gsap.to(), from(), fromTo(), easing, duration, stagger, defaults, gsap.matchMe... |
| `gsap-frameworks` | global | Official GSAP skill for Vue, Svelte, and other non-React frameworks — lifecycle, scoping selectors, cleanup on unmoun... |
| `gsap-performance` | global | Official GSAP skill for performance — prefer transforms, avoid layout thrashing, will-change, batching. Use when opti... |
| `gsap-plugins` | global | Official GSAP skill for GSAP plugins — registration, ScrollToPlugin, ScrollSmoother, Flip, Draggable, Inertia, Observ... |
| `gsap-react` | global | Official GSAP skill for React — useGSAP hook, refs, gsap.context(), cleanup. Use when the user wants animation in Rea... |
| `gsap-scrolltrigger` | global | Official GSAP skill for ScrollTrigger — scroll-linked animations, pinning, scrub, triggers. Use when building or reco... |
| `gsap-timeline` | global | Official GSAP skill for timelines — gsap.timeline(), position parameter, nesting, playback. Use when sequencing anima... |
| `gsap-utils` | global | Official GSAP skill for gsap.utils — clamp, mapRange, normalize, interpolate, random, snap, toArray, wrap, pipe. Use ... |
| `hallmark` | global | Anti-AI-slop design skill for greenfield pages, audits, redesigns, and design extraction from URLs or screenshots. Us... |
| `handoff` | global | Compact the current conversation into a handoff document for another agent to pick up. |
| `high-end-visual-design` | global | Teaches the AI to design like a high-end agency. Defines the exact fonts, spacing, shadows, card structures, and anim... |
| `idea-refine` | global | Refines raw ideas into sharp, actionable concepts through structured divergent and convergent thinking. Use when an i... |
| `image-to-code` | global | Elite website image-to-code skill for Codex. For visually important web tasks, it must first generate the design imag... |
| `imagegen-frontend-mobile` | global | Elite mobile app image-generation skill for creating premium, app-native screen concepts and flows. Designed for iOS,... |
| `imagegen-frontend-web` | global | Elite frontend image-direction skill for generating premium, conversion-aware website design references. CRITICAL OUT... |
| `impeccable` | global | Use when the user wants to design, redesign, shape, critique, audit, polish, clarify, distill, harden, optimize, adap... |
| `implement` | global | Implement a piece of work based on a spec or set of tickets. |
| `improve-animations` | global | Survey a codebase's animation and motion code as a senior motion advisor, then produce a prioritized audit and self-c... |
| `improve-codebase-architecture` | global | Scan a codebase for deepening opportunities, present them as a visual HTML report, then grill through whichever one y... |
| `improve-ui` | ui-skills | Audit an existing product surface against its own design evidence, identify verified UI problems, and write self-cont... |
| `incremental-implementation` | global | Delivers changes incrementally. Use when implementing any feature or change that touches more than one file. Use when... |
| `industrial-brutalist-ui` | global | Raw mechanical interfaces fusing Swiss typographic print with military terminal aesthetics. Rigid grids, extreme type... |
| `interview-me` | global | Extracts what the user actually wants instead of what they think they should want. Achieves this through one-question... |
| `minimalist-ui` | global | Clean editorial-style interfaces. Warm monochrome palette, typographic contrast, flat bento grids, muted pastels. No ... |
| `nextjs-saas-feature-scaffold` | codeskill | 在 Next.js SaaS 项目中脚手架新 feature。用于新增 app 页面、Server Action、DB query、shared/domain 组件的完整切片时。 |
| `observability-and-instrumentation` | global | Instruments code so production behavior is visible and diagnosable. Use when adding logging, metrics, tracing, or ale... |
| `performance-optimization` | global | Optimizes application performance. Use when performance requirements exist, when you suspect performance regressions,... |
| `pick-ui-library` | global | Pick the right library for a given frontend task from a curated, opinionated list — numbers, OTP inputs, charts, comm... |
| `planning-and-task-breakdown` | global | Breaks work into ordered tasks. Use when you have a spec or clear requirements and need to break work into implementa... |
| `playwright-skill` | global | Complete browser automation with Playwright. Auto-detects dev servers, writes clean test scripts to /tmp. Test pages,... |
| `ponytail` | global | Forces the laziest solution that actually works, simplest, shortest, most minimal. Channels a senior dev who has seen... |
| `ponytail-audit` | global | Whole-repo audit for over-engineering. Like ponytail-review, but scans the entire codebase instead of a diff: a ranke... |
| `ponytail-debt` | global | Harvest every `ponytail:` comment in the codebase into a debt ledger, so the deliberate shortcuts and deferrals ponyt... |
| `ponytail-gain` | global | Show ponytail's measured impact as a compact scoreboard: less code, less cost, more speed, from the benchmark medians... |
| `ponytail-help` | global | Quick-reference card for all ponytail modes, skills, and commands. One-shot display, not a persistent mode. Trigger: ... |
| `ponytail-review` | global | Code review focused exclusively on over-engineering. Finds what to delete: reinvented standard library, unneeded depe... |
| `pptx` | global | Use this skill any time a .pptx file is involved in any way — as input, output, or both. This includes: creating slid... |
| `preview-first-sync` | codeskill | 实现「预览先展示、异步入库」三层缓存模式。用于 AI 生成内容需即时 UI 反馈、Radar/Insight 类批量生成、或用户要求 preview-first / optimistic display 时。 |
| `prototype` | global | Build multiple genuinely different versions of a UI piece you describe, rendered behind a visual picker so you can fl... |
| `receiving-code-review` | global | Use when receiving code review feedback, before implementing suggestions, especially if feedback seems unclear or tec... |
| `redesign-existing-projects` | global | Upgrades existing websites and apps to premium quality. Audits current design, identifies generic AI patterns, and ap... |
| `remotion-best-practices` | global | Router for all Remotion skills |
| `remotion-captions` | global | Transcribing, displaying and animating captions |
| `remotion-create` | global | Create a new Remotion video |
| `remotion-docs` | global | Search Remotion documentation |
| `remotion-interactivity` | global | Structure Remotion markup for interactivity |
| `remotion-maps` | global | Remotion Map animation knowledge |
| `remotion-markup` | global | Content, animation and effects best practices |
| `remotion-multimedia` | global | Interacting with Mediabunny |
| `remotion-render` | global | Export a Remotion video |
| `remotion-saas` | global | Build an app with Remotion |
| `remotion-studio` | global | Preview a Remotion video |
| `remotion-upgrade` | global | Upgrade Remotion, and related packages |
| `requesting-code-review` | global | Use when completing tasks, implementing major features, or before merging to verify work meets requirements |
| `research` | global | Investigate a question against high-trust primary sources and capture the findings as a Markdown file in the repo. Us... |
| `resolving-merge-conflicts` | global | Use when you need to resolve an in-progress git merge/rebase conflict. |
| `review-animations` | global | Reviews animation and motion code against a high craft bar derived from Emil Kowalski's design engineering philosophy... |
| `saas-tenant-membership` | codeskill | Rules for SaaS multi-tenant membership provisioning. Use when designing or implementing tenant open, owner/admin assi... |
| `security-and-hardening` | global | Hardens code against vulnerabilities. Use when handling user input, authentication, data storage, or external integra... |
| `setup-matt-pocock-skills` | global | Configure this repo for the engineering skills — set up its issue tracker, triage label vocabulary, and domain doc la... |
| `shadcn-app-components` | codeskill | shadcn SaaS 应用组件模板与三层分层。用于新建 shared 组件、空状态、页面头、工作区布局、或搭建 components/ui + shared + domain 结构时。 |
| `shipping-and-launch` | global | Prepares production launches. Use when preparing to deploy to production. Use when you need a pre-launch checklist, w... |
| `source-driven-development` | global | Grounds every implementation decision in official documentation. Use when you want authoritative, source-cited code f... |
| `spec-driven-development` | global | Creates specs before coding. Use when starting a new project, feature, or significant change and no specification exi... |
| `stitch-design-taste` | global | Semantic Design System Skill for Google Stitch. Generates agent-friendly DESIGN.md files that enforce premium, anti-g... |
| `subagent-driven-development` | global | Use when executing implementation plans with independent tasks in the current session |
| `supabase` | global | Use when doing ANY task involving Supabase. Triggers: Supabase products (Database, Auth, Edge Functions, Realtime, St... |
| `supabase-postgres-best-practices` | global | Postgres performance optimization and best practices from Supabase. Use this skill when writing, reviewing, or optimi... |
| `systematic-debugging` | global | Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes |
| `tdd` | global | Test-driven development. Use when the user wants to build features or fix bugs test-first, mentions "red-green-refact... |
| `teach` | global | Teach the user a new skill or concept, within this workspace. |
| `test-driven-development` | global | Use when implementing any feature or bugfix, before writing implementation code |
| `theme-factory` | global | Toolkit for styling artifacts with a theme. These artifacts can be slides, docs, reportings, HTML landing pages, etc.... |
| `to-spec` | global | Turn the current conversation into a spec and publish it to the project issue tracker — no interview, just synthesis ... |
| `to-tickets` | global | Break a plan, spec, or the current conversation into a set of tracer-bullet tickets, each declaring its blocking edge... |
| `triage` | global | Move issues and external PRs through a state machine of triage roles — categorise, verify, grill if needed, and write... |
| `typeui-fundamentals` | global | Universal UI/UX design principles covering visual hierarchy, interaction laws, typography foundations, and WCAG acces... |
| `ui-skills-root` | ui-skills | Use before UI-related work to select the smallest useful UI Skills context through the ui-skills CLI. |
| `using-agent-skills` | global | Discovers and invokes agent skills. Use when starting a session or when you need to discover which skill applies to t... |
| `using-git-worktrees` | global | Use when starting feature work that needs isolation from current workspace or before executing implementation plans -... |
| `vercel-cli-with-tokens` | global | Deploy and manage projects on Vercel using token-based authentication. Use when working with Vercel CLI using access ... |
| `vercel-composition-patterns` | global | React composition patterns that scale. Use when refactoring components with boolean prop proliferation, building flex... |
| `vercel-optimize` | global | Use for Vercel cost and performance optimization on deployed projects, especially Next.js, SvelteKit, Nuxt, and limit... |
| `vercel-react-best-practices` | global | React and Next.js performance optimization guidelines from Vercel Engineering. This skill should be used when writing... |
| `vercel-react-native-skills` | global | React Native and Expo best practices for building performant mobile apps. Use when building React Native components, ... |
| `vercel-react-view-transitions` | global | Guide for implementing smooth, native-feeling animations using React's View Transition API (`<ViewTransition>` compon... |
| `verification-before-completion` | global | Use when about to claim work is complete, fixed, or passing, before committing or creating PRs - requires running ver... |
| `wayfinder` | global | Plan a huge chunk of work — more than one agent session can hold — as a shared map of decision tickets on your issue ... |
| `web-artifacts-builder` | global | Suite of tools for creating elaborate, multi-component claude.ai HTML artifacts using modern frontend web technologie... |
| `web-design-guidelines` | global | Review UI code for Web Interface Guidelines compliance. Use when asked to "review my UI", "check accessibility", "aud... |
| `webapp-testing` | global | Toolkit for interacting with and testing local web applications using Playwright. Supports verifying frontend functio... |
| `writing-great-skills` | global | Reference for writing and editing skills well — the vocabulary and principles that make a skill predictable. |
| `writing-guidelines` | global | Review docs/prose for Writing Guidelines compliance. Use when asked to "review my docs", "check writing style", "audi... |
| `writing-plans` | global | Use when you have a spec or requirements for a multi-step task, before touching code |
| `writing-skills` | global | Use when creating new skills, editing existing skills, or verifying skills work before deployment |
