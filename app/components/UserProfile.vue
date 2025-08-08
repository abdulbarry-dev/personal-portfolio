<template>
  <div class="user-profile">
    <!-- Animated Background Shapes -->
    <div class="animated-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
      <div class="shape shape-4"></div>
      <div class="shape shape-5"></div>
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
                <img 
                  src="./../assets/images/backgrounds/profile-picture.jpeg" 
                  alt="Abdulbarry - Frontend Developer" 
                  class="profile-image"
                />
                <div class="profile-image-overlay"></div>
              </div>
              
              <!-- Decorative Background -->
              <div class="decorative-background">
                <div class="gradient-background"></div>
              </div>
              
              <!-- Floating Tech Icons -->
              <div class="floating-icon floating-icon-vue">
                <Icon name="logos:vue" />
              </div>
              <div class="floating-icon floating-icon-js">
                <Icon name="logos:javascript" />
              </div>
              <div class="floating-icon floating-icon-nuxt">
                <Icon name="logos:nuxt-icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const resumeUrl = "https://drive.google.com/file/d/1zkrPXhRKt2WevTkKMRDIOD_tel6tLvuc/view?usp=sharing"

defineOptions({
  name: 'UserProfile'
})
</script>

