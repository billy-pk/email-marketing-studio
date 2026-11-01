# Skills I chose (checked 2026-11-01)

Searches run on skills.sh: "email marketing", "email sequence", "campaign plan", "resend". Stars are GitHub stars for the publisher's repository.

## Use these

1. **anthropics/knowledge-work-plugins (marketing plugin)** for writing campaigns.
   - Published by Anthropic, with about 34,000 stars and activity today.
   - It has the campaign-plan, email-sequence and brand-review commands we need, as one plugin.
   - Its email-sequence skill is also listed on skills.sh as `anthropics/knowledge-work-plugins@email-sequence` (about 3,000 installs). We install the whole plugin with `claude plugin install`, not through `npx skills`.
   - A close second is **coreyhaines31/marketingskills** (about 57,700 stars). Its `emails` skill has about 81,700 installs. Installs and stars are both high, so the popularity looks real.
   - Note: that repository's old `email-sequence` skill (the skills.sh page still shows about 55,100 installs) has been merged into `emails`. Use `emails`, not `email-sequence`.
2. **resend/resend-skills@resend** for sending email.
   - Resend is the company behind the service, so this is the official source (about 24,000 installs, 208 stars).
   - Its sibling `resend/email-best-practices` (about 8,100 installs, 146 stars) is also official and useful for deliverability advice.
   - The star counts are modest because Resend is a small, focused publisher, but the owner is the vendor itself.

## Avoid these

1. **mbfinotti/advertising-skills** (for example `ad-budget-pacing`, about 24,500 installs).
   - The repository has only 2 GitHub stars. Thousands of installs with almost no stars is a warning sign that the numbers may be inflated.
   - It is also about paid ads, and our campaign is email only.
2. **open.feishu.cn@lark-mail**, the top "email marketing" result with about 835,000 installs.
   - It is a connector for one chat vendor's mail product, not a campaign-writing skill.
   - A big install count tells you nothing about whether it fits the job. (I did not inspect its repository.)

Also not a fit: `mattpocock/skills@grill-with-docs` (1.3M installs) tops "campaign plan" because the words match loosely. It is a developer-documentation skill, not marketing.

## How I decided

1. **Who publishes it?** Prefer official owners (anthropics, resend) or well-known publishers over anonymous accounts.
2. **Do the stars match the installs?** Open the GitHub repository. Many installs and few stars, or a repository with little history, means don't trust the number.
3. **Does it do what I need, and is it current?** Read the skill's page and files. Check the last-pushed date, and that it hasn't been renamed or merged into another skill.
