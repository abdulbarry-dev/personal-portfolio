#!/bin/bash

# Build validation script for GitHub Actions
echo "🔍 Validating build environment..."

# Check Node.js and npm versions
echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"

# Check if critical files exist
CRITICAL_FILES=(
  "nuxt.config.ts"
  "package.json"
  "app/schemas/contact.ts"
  "app/schemas/newsletter.ts"
  "app/composables/useContactForm.ts"
  "server/api/contact/send.post.ts"
  "server/api/newsletter/subscribe.post.ts"
)

echo "📁 Checking critical files..."
for file in "${CRITICAL_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ $file exists"
  else
    echo "❌ $file is missing"
    exit 1
  fi
done

# Validate import paths in server files
echo "🔗 Validating import paths..."
if grep -r "~/schemas" server/ 2>/dev/null; then
  echo "❌ Found problematic ~ imports in server files"
  grep -rn "~/schemas" server/
  exit 1
else
  echo "✅ No problematic ~ imports found in server files"
fi

if grep -r "~/services" server/ 2>/dev/null; then
  echo "❌ Found problematic ~ imports in server files"
  grep -rn "~/services" server/
  exit 1
else
  echo "✅ No problematic ~ imports found in server files"
fi

# Check TypeScript compilation
echo "🔧 Checking TypeScript compilation..."
npx tsc --noEmit --skipLibCheck || {
  echo "❌ TypeScript compilation failed"
  exit 1
}

echo "✅ All validations passed! Build should succeed."
