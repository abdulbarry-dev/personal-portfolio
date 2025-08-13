<template>
  <div class="user-profile">
    <!-- Animated Background Shapes - Reduced for performance -->
    <div class="animated-shapes" aria-hidden="true">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>
    
    <div class="user-profile-container">
      <div class="user-profile-grid">
        
        <!-- Left side - Text Content -->
        <div class="user-profile-content">
          <!-- Welcome Badge -->
          <div class="welcome-badge">
            <span class="welcome-badge-dot"></span>
            Available for new opportunities
          </div>
          
          <!-- Main Heading -->
          <div class="main-heading-section">
            <p class="welcome-text">Welcome to my digital space</p>
            
            <h1 class="main-heading">
              <span class="heading-line">I'm</span>
              <span class="heading-line gradient-name-text">Abdulbarry</span>
              <span class="heading-line developer-title">Frontend Developer</span>
              <span class="heading-line location-text">based in Tunisia 🇹🇳</span>
            </h1>
          </div>
          
          <!-- Tech Stack -->
          <div class="tech-stack-section">
            <p class="tech-stack-title">Tech Stack</p>
            <div class="tech-stack-grid">
              <!-- Vue.js -->
              <div class="tech-item">
                <Icon name="logos:vue" class="tech-icon" />
                <span class="tech-label">Vue.js</span>
              </div>
              
              <!-- Nuxt.js -->
              <div class="tech-item">
                <Icon name="logos:nuxt-icon" class="tech-icon" />
                <span class="tech-label">Nuxt.js</span>
              </div>
              
              <!-- TypeScript -->
              <div class="tech-item">
                <Icon name="logos:typescript-icon" class="tech-icon" />
                <span class="tech-label">TypeScript</span>
              </div>
            </div>
          </div>
          
          <!-- Description -->
          <div class="description-section">
            <div class="description-prose">
              <p class="description-text">
                I'm passionate about <strong>crafting meaningful digital experiences</strong> 
                and currently work as a <strong class="highlight-blue">freelance web developer</strong>, 
                helping individuals and businesses build <em>fast, modern, and impactful</em> web platforms.
              </p>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="action-buttons">
            <NuxtLink to="/blog" class="btn-primary-action">
              <Icon name="heroicons:document-text" class="btn-icon-left" />
              <span>Read the blog</span>
              <Icon name="heroicons:arrow-right" class="btn-icon-right" />
            </NuxtLink>
            
            <a :href="resumeUrl" target="_blank" class="btn-secondary-action">
              <Icon name="heroicons:document-arrow-down" class="btn-icon-left" />
              <span>View Resume</span>
              <Icon name="heroicons:arrow-top-right-on-square" class="btn-icon-right" />
            </a>
          </div>
        </div>
        
        <!-- Right side - Profile Image -->
        <div class="profile-image-section">
          <div class="profile-image-wrapper">
            <div class="profile-image-container-wrapper">
              <!-- Profile Image -->
              <div class="profile-image-container">
                <NuxtImg
                  src="https://ucarecdn.com/110979a9-b932-4d48-a30d-989f1d2892b6/profilepicture.webp"
                  :alt="profileImageAlt"
                  class="profile-image"
                  loading="eager"
                  fetchpriority="high"
                  width="320"
                  height="320"
                  preset="profile"
                  sizes="(max-width: 320px) 160px, (max-width: 475px) 192px, (max-width: 640px) 256px, (max-width: 768px) 288px, (max-width: 1024px) 360px, (max-width: 1280px) 420px, 480px"
                  placeholder
                  style="object-position: center 20%;"
                />
                <div class="profile-image-overlay"></div>
              </div>
              
              <!-- Decorative Background -->
              <div class="decorative-background">
                <div class="gradient-background"></div>
              </div>
              
              <!-- Floating Tech Icons - Reduced for performance -->
              <div class="floating-icon floating-icon-vue" aria-hidden="true">
                <Icon name="logos:vue" />
              </div>
              <div class="floating-icon floating-icon-nuxt" aria-hidden="true">
                <Icon name="logos:nuxt-icon" />
              </div>
              <div class="floating-icon floating-icon-js" aria-hidden="true">
                <Icon name="logos:javascript" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSEO } from '../composables/useSEO';
// Enhanced SEO and structured data for the UserProfile component
const { setStructuredData } = useSEO()

// SEO and accessibility optimization
const profileImageAlt: string = 'Abdulbarry Guenichi - Frontend Developer specializing in Vue.js and Nuxt.js';

// External link optimization
const resumeUrl: string = 'https://drive.google.com/file/d/1zkrPXhRKt2WevTkKMRDIOD_tel6tLvuc/view?usp=sharing';

// Tech stack data
interface TechItem {
  name: string;
  icon: string;
  label: string;
}
const techStack: ReadonlyArray<TechItem> = [
  { name: 'Vue.js', icon: 'logos:vue', label: 'Vue.js' },
  { name: 'Nuxt.js', icon: 'logos:nuxt-icon', label: 'Nuxt.js' },
  { name: 'TypeScript', icon: 'logos:typescript-icon', label: 'TypeScript' }
];

// Profile info
const profileInfo = {
  name: 'Abdulbarry',
  title: 'Frontend Developer',
  location: 'Tunisia 🇹🇳',
  available: true
} as const;

// Main heading lines
const headingLines: ReadonlyArray<string> = [
  `I'm`,
  profileInfo.name,
  profileInfo.title,
  `based in ${profileInfo.location}`
];

// Add comprehensive structured data for the profile
onMounted(() => {
  // Person schema with professional details
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Abdulbarry Guenichi',
    givenName: 'Abdulbarry',
    familyName: 'Guenichi',
    jobTitle: 'Frontend Developer',
    description: 'Passionate Frontend Developer specializing in Vue.js, Nuxt.js, and TypeScript. Building fast, modern, and accessible web applications.',
    url: 'https://abdulbarry.dev',
    image: 'https://ucarecdn.com/110979a9-b932-4d48-a30d-989f1d2892b6/profilepicture.webp',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TN',
      addressRegion: 'Tunisia'
    },
    sameAs: [
      'https://github.com/abdulbarry-dev',
      'https://linkedin.com/in/abdulbarry-guenichi',
      'https://twitter.com/abdulbarry_dev'
    ],
    knowsAbout: [
      'Vue.js',
      'Nuxt.js',
      'TypeScript',
      'JavaScript',
      'Frontend Development',
      'Web Performance Optimization',
      'Responsive Web Design',
      'User Experience Design'
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Frontend Developer',
      occupationLocation: {
        '@type': 'Country',
        name: 'Tunisia'
      },
      skills: ['Vue.js', 'Nuxt.js', 'TypeScript', 'JavaScript', 'CSS3', 'HTML5']
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance'
    },
    seeks: {
      '@type': 'Demand',
      name: 'Frontend Development Projects',
      description: 'Available for Vue.js, Nuxt.js, and TypeScript projects'
    }
  }

  // Professional service schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Frontend Development Services',
    description: 'Professional Vue.js, Nuxt.js, and TypeScript development services',
    provider: {
      '@type': 'Person',
      name: 'Abdulbarry Guenichi'
    },
    areaServed: 'Worldwide',
    serviceType: 'Web Development',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Development Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Vue.js Development',
            description: 'Custom Vue.js application development'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Nuxt.js Development',
            description: 'Full-stack Nuxt.js application development'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'TypeScript Development',
            description: 'Type-safe JavaScript application development'
          }
        }
      ]
    }
  }

  setStructuredData([personSchema, serviceSchema])
})

// Performance: Critical resource hints and meta optimization
useHead({
  link: [
    { rel: 'preconnect', href: 'https://drive.google.com', crossorigin: '' },
    { rel: 'preconnect', href: 'https://ucarecdn.com', crossorigin: '' },
    { rel: 'dns-prefetch', href: 'https://ucarecdn.com' }
  ],
  meta: [
    { name: 'format-detection', content: 'telephone=no' }
  ]
});

defineOptions({
  name: 'UserProfile'
});
</script>

