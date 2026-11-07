#!/usr/bin/env bash
# Load .env, then start Claude Code in this folder.
set -euo pipefail
cd "$(dirname "$0")"

if [ ! -f .env ]; then
  echo "Missing .env file. Run: cp .env.example .env  and add your Resend API key." >&2
  exit 1
fi

set -a
source .env
set +a

if [ -z "${RESEND_API_KEY:-}" ] || [ "$RESEND_API_KEY" = "re_replace_with_your_key" ]; then
  echo "RESEND_API_KEY in .env is not set. Add your own key." >&2
  exit 1
fi

exec claude "$@"
