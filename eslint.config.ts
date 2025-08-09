import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // your custom flat configs go here, for example:
   {
     files: ['**/*.ts', '**/*.tsx'],
     rules: {
       'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn', // No console in production
     }
   }
)
