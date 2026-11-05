---
name: personalize
description: Write a version of each campaign email for every lead group in leads/leads.csv. Use when a campaign's emails are final and you want one copy per group.
argument-hint: "[campaign folder]"
context: fork
allowed-tools: Read, Glob, Grep, Write
---

# Personalize a campaign's emails by lead group

Write one version of each campaign email for each lead group. Each version keeps the same structure, subject, preview, link and footer. Only the opening line and one example change.

## 1. Find the campaign folder

The campaign folder is the argument: `$ARGUMENTS`

- If it is empty, stop. Do not write any files. List the folders that exist directly under `campaigns/` and ask which one to use.
- If the path does not exist or has no `emails/` folder, stop and say so. List the campaign folders that exist.
- Accept either `campaigns/<name>` or just `<name>`.

## 2. Read what you need

1. Read `brand/voice.md`. Every new line must follow it: plain English, no hype or pressure words, none of the claims it forbids.
2. Read `.claude/rules/emails.md`. Every output file must still follow these email rules.
3. Read `leads/leads.csv`. Take the distinct values of the `group` column. These are the groups. Do not hard-code them, and do not read or copy any lead's name or email address.
4. Read `<campaign folder>/plan.md` if it exists, to keep the campaign's purpose in mind.
5. Find the source emails with Glob: `<campaign folder>/emails/*.md`. Do not use anything under `<campaign folder>/groups/` as a source.

## 3. Write the versions

For every group and every source email:

- Save to `<campaign folder>/groups/<group>/emails/<same file name>`.
- `<group>` is the group name in lowercase with spaces turned into hyphens, for example `new to AI` becomes `new-to-ai`.
- Copy the source email exactly, then change only:
  1. **The opening line.** This is the first sentence after the greeting. Rewrite it so it fits the group.
  2. **One example.** Pick one example or illustration already in the email and swap it for one that fits the group. If the email has no example, add one short sentence as the example, next to the opening.
- Keep unchanged: the `Subject:` and `Preview:` lines, the greeting with `{{first_name}}`, the structure and order of paragraphs, the main link and its button text, the sign-off, and the two-line plain-text footer.

Work out what each group needs from its name and from the campaign plan. Keep the fit light, for example a group that is new to something needs a gentler start than a group that already works with it. Do not invent facts about the group.

## 4. Check before you finish

For each file you wrote, confirm:

- The subject is 50 characters or fewer and the preview is 90 or fewer, because they were not changed.
- There is exactly one main link plus the sign-off link, and the footer is plain text.
- No word from section 3 of `brand/voice.md` appears, and no claim from section 4 is made.
- Nothing outside the opening line and the one example differs from the source email.

Fix any file that fails, then write it again.

## 5. Reply with a short summary only

Reply with:

- How many files you wrote.
- One example opening line per group, labelled with the group name.

Do not paste whole emails, and do not describe your steps.
