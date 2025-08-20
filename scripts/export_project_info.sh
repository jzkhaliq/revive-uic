#!/usr/bin/env bash
# export_project_info.sh
# Usage:
#   ./export_project_info.sh            -> creates project_snapshot.md (no secrets)
#   ./export_project_info.sh --include-secrets  -> includes dotfiles (.env, etc.)
set -euo pipefail

ROOT="/Users/jz.khaliq/revive-uic"
OUT="$ROOT/project_snapshot.md"
INCLUDE_SECRETS=false
if [ "${1:-}" = "--include-secrets" ]; then INCLUDE_SECRETS=true; fi

cd "$ROOT"

echo "# Project snapshot — $(date)" > "$OUT"
echo "" >> "$OUT"

echo "## Git status" >> "$OUT"
echo '```' >> "$OUT"
git rev-parse --abbrev-ref HEAD 2>/dev/null || true
git log -n 5 --pretty=format:"%h %cd %s" --date=short 2>/dev/null || true
git status --short 2>/dev/null || true
git remote -v 2>/dev/null || true
echo '```' >> "$OUT"
echo "" >> "$OUT"

echo "## File tree (excluding node_modules & .git)" >> "$OUT"
echo '```' >> "$OUT"
find . -not -path "./node_modules/*" -not -path "./.git/*" -not -path "*/.DS_Store" -print | sed 's|^\./||' >> "$OUT"
echo '```' >> "$OUT"
echo "" >> "$OUT"

# Top-level important files
for f in package.json package-lock.json yarn.lock vite.config.* README.md .env.local .env; do
  if [ -f "$f" ]; then
    if [[ "$f" =~ ^\.env && "$INCLUDE_SECRETS" = false ]]; then
      echo "## $f (skipped — secrets not included by default)" >> "$OUT"
      echo "" >> "$OUT"
    else
      echo "## $f" >> "$OUT"
      echo '```' >> "$OUT"
      sed -n '1,400p' "$f" >> "$OUT" || true
      echo '```' >> "$OUT"
      echo "" >> "$OUT"
    fi
  fi
done

# package.json dependencies summary
if [ -f package.json ]; then
  echo "## Dependencies (top-level from package.json)" >> "$OUT"
  echo '```json' >> "$OUT"
  jq '.dependencies, .devDependencies' package.json 2>/dev/null || cat package.json | sed -n '1,200p'
  echo '```' >> "$OUT"
  echo "" >> "$OUT"
fi

# Node / npm versions if available
echo "## Environment" >> "$OUT"
echo '```' >> "$OUT"
node -v 2>/dev/null || true
npm -v 2>/dev/null || true
yarn -v 2>/dev/null || true
echo '```' >> "$OUT"
echo "" >> "$OUT"

# Add src and admin file contents
for dir in src; do
  if [ -d "$dir" ]; then
    echo "## Source files: $dir/**" >> "$OUT"
    find "$dir" -not -path "*/node_modules/*" -not -path "*/dist/*" -not -path "*/.cache/*" -type f | sort | while read -r file; do
      # Skip dotfiles unless include-secrets
      if [[ "$(basename "$file")" =~ ^\.(env|env.local|env.production)$ ]] && [ "$INCLUDE_SECRETS" = false ]; then
        echo "### $file (skipped - secret)" >> "$OUT"
        echo "" >> "$OUT"
        continue
      fi
      echo "### $file" >> "$OUT"
      ext="${file##*.}"
      lang="text"
      case "$ext" in
        js|jsx) lang="jsx" ;;
        ts|tsx) lang="tsx" ;;
        json) lang="json" ;;
        css) lang="css" ;;
        html) lang="html" ;;
        md) lang="markdown" ;;
      esac
      echo "```$lang" >> "$OUT"
      sed -n '1,400p' "$file" >> "$OUT" || true
      echo '```' >> "$OUT"
      echo "" >> "$OUT"
    done
  fi
done

# admin directory
for dir in src/admin src/components; do
  if [ -d "$dir" ]; then
    echo "## Files in $dir" >> "$OUT"
    find "$dir" -type f | sort | sed 's|^\./||' >> "$OUT"
    echo "" >> "$OUT"
  fi
done

echo "## How to use" >> "$OUT"
echo "" >> "$OUT"
echo "1. Open project_snapshot.md and copy/paste it into your target AI." >> "$OUT"
echo "2. If you need secrets (.env) included, re-run with --include-secrets." >> "$OUT"
echo "" >> "$OUT"

echo "Wrote snapshot to: $OUT"