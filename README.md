# Email Marketing Studio

A practice studio, run with [Claude Code](https://claude.com/claude-code), for planning and writing email campaigns that market the book *The AI Agent Factory* (Panaversity). The book teaches people who use AI in their daily work to assign, govern, and manage an AI Worker.

Book introduction: https://agentfactory2.panaversity.org/five-horizons

> **Practice mode.** All leads are made-up people. Sending goes through a local practice server or Resend test addresses only. No real email is ever sent.

## What is in the studio

| Folder / file | What it holds |
| --- | --- |
| `brand/voice.md` | Brand voice: tone, words to use and avoid, claims we must never make, sign-off. |
| `leads/leads.csv` | 24 made-up leads in three groups: new to AI, delegating to AI, building with AI. |
| `campaigns/` | One folder per campaign, with its plan and emails. |
| `notes/` | Research and working notes (fact-check, skills chosen). |
| `CLAUDE.md` | Project instructions Claude Code reads every session. |
| `ASSIGNMENT.md` | The course steps this studio was built from. |

## The campaign so far

**Start with Horizon 1** (`campaigns/agentfactory2.panaversity.org/`): a 4-week, email-only campaign inviting the waitlist to start reading the book. Goal: 300 of about 2,000 waitlist members start reading between 7 Dec 2026 and 3 Jan 2027.

- `plan.md`: objectives, audience, messaging, calendar, and tracking.
- `emails/`: the four emails.
  1. `01-book-is-open`
  2. `02-what-horizon-1-means`
  3. `03-pick-your-route`
  4. `04-one-honest-limit`
- `groups/<group>/emails/`: a version of each email for each lead group.

## Rules and safeguards

- **Brand voice:** plain English; no hype, no fear or pressure, no income or job claims, no guaranteed results, no fake urgency. See `brand/voice.md`.
- **Email format** (`.claude/rules/emails.md`): subject line 50 characters or fewer, preview 90 or fewer, greeting with `{{first_name}}`, one link per email.
- **Send guard** (`.claude/hooks/send-guard.mjs`): runs before every Resend tool call and allows only `@resend.dev` test addresses and the owner's own address.
- **Deleting:** Claude asks before deleting anything.

## Tools

- **`personalize` skill** (`.claude/skills/personalize/`): writes one version of each campaign email for every lead group. Run it with a campaign folder, for example `/personalize agentfactory2.panaversity.org`.
- **Resend MCP** (`.mcp.json`): sends test emails. The API key and settings come from environment variables, so keep secrets out of git.
- **Marketing plugin** (`.claude/settings.json`): campaign planning, drafting, and brand review skills.

## Getting started

1. Install Node.js 22 or newer, Git, and Claude Code (`npm install -g @anthropic-ai/claude-code`).
2. Clone this repo and set up your own Resend key:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your own `RESEND_API_KEY`. Each person uses their own key. `.env` is gitignored, so it is never committed.
3. Start Claude Code with the key loaded:
   ```bash
   ./start.sh
   ```
4. Ask Claude to plan, write, or personalize a campaign. For example: "Run the personalize skill on the launch campaign."
