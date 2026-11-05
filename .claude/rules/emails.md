---
paths:
  - "campaigns/**/emails/*.md"
---

# Email file rules

Every email file must follow these rules.

## Top of the file

- The first line is `Subject: ` followed by the subject line. The subject line must be 50 characters or fewer.
- The second line is `Preview: ` followed by the preview text. The preview text must be 90 characters or fewer.

## Greeting

- Greet the reader with `{{first_name}}`, for example "Hi {{first_name}},".

## Link

- Use exactly one main link, written as `[Button text](https://agentfactory2.panaversity.org/five-horizons)`.
- Change the button text to fit the email. Do not change the address.
- The button text must not repeat the sign-off link text ("Read the introduction"), so the two links read differently.
- The link in the sign-off from `brand/voice.md` does not count toward this. So each email has one button link plus the sign-off link, and no other links.

## Ending

- End the email with our sign-off from `brand/voice.md`.
- After the sign-off, add this two-line footer as plain text. Do not put it inside a code block, and keep each line on its own line:

You're getting this because you joined the agentfactory2.panaversity.org waitlist.
agentfactory2.panaversity.org, {{company_address}} · Unsubscribe: {{unsubscribe_url}}
