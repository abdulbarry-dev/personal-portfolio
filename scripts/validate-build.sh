#!/bin/bash

# Build validation script for static site deployment
echo "🔍 Validating static site build environment..."

# Check Node.js and npm versions
echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"

# Check if critical files exist for static site
CRITICAL_FILES=(
  "nuxt.config.ts"
  "package.json"
  "app/app.vue"
  "app/schemas/contact.ts"
  "app/schemas/newsletter.ts"
  "app/composables/useContactForm.ts"
  "app/composables/useNewsletter.ts"
  "app/composables/useGithubRepos.ts"
  "app/plugins/supabase.client.ts"
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

# Validate environment variable configuration
echo "� Checking environment variable configuration..."
if grep -q "NUXT_PUBLIC_SUPABASE_URL" nuxt.config.ts; then
  echo "✅ Supabase URL configuration found"
else
  echo "❌ Missing Supabase URL configuration"
  exit 1
fi

if grep -q "NUXT_PUBLIC_SUPABASE_ANON_KEY" nuxt.config.ts; then
  echo "✅ Supabase key configuration found" 
else
  echo "❌ Missing Supabase key configuration"
  exit 1
fi

# Check TypeScript compilation
echo "🔧 Checking TypeScript compilation..."
npx tsc --noEmit --skipLibCheck || {
  echo "❌ TypeScript compilation failed"
  exit 1
}

# Validate static site build
echo "🏗️ Testing static site generation..."
npm run generate || {
  echo "❌ Static site generation failed"
  exit 1
}

echo "✅ All validations passed! Static site build should succeed on GitHub Pages."
