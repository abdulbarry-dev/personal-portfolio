<template>
  <div class="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">

        <!-- Left side - Text Content -->
        <div class="space-y-6 sm:space-y-8 lg:pr-8 order-2 lg:order-1">
          <!-- Welcome Badge -->
          <div class="inline-flex items-center px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/50 dark:to-indigo-900/50 border border-blue-200 dark:border-blue-700 rounded-full text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-medium backdrop-blur-sm opacity-0 animate-fade-in-up" style="animation-delay: 50ms;">
            <span class="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            Available for new opportunities
          </div>
          
          <!-- Main Heading with Animation -->
          <div class="space-y-3 sm:space-y-4">
            <p class="text-sm sm:text-lg text-gray-600 dark:text-gray-400 font-medium tracking-wide uppercase opacity-0 animate-fade-in-up" style="animation-delay: 150ms;">
              Welcome to my digital space
            </p>
            
            <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
              <span class="block opacity-0 animate-fade-in-up" style="animation-delay: 200ms;">I'm</span>
              <span class="block text-blue-600 dark:text-blue-400 opacity-0 animate-fade-in-up gradient-name-text" style="animation-delay: 400ms;">
                Abdulbarry
              </span>
              <span class="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mt-2 opacity-0 animate-fade-in-up" style="animation-delay: 600ms;">
                Frontend Developer
              </span>
              <span class="block text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-600 dark:text-gray-400 font-normal mt-2 opacity-0 animate-fade-in-up" style="animation-delay: 800ms;">
                based in Tunisia 🇹🇳
              </span>
            </h1>
          </div>
          
          <!-- Tech Stack -->
          <div class="space-y-3 opacity-0 animate-fade-in-up" style="animation-delay: 1000ms;">
            <p class="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Tech Stack
            </p>
            <div class="flex flex-wrap items-center gap-2 sm:gap-4">
              <!-- Vue -->
              <div class="group flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-green-300 dark:hover:border-green-600 hover:shadow-md dark:hover:shadow-gray-900/50 transition-all duration-300">
                <Icon 
                  name="logos:vue" 
                  class="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-200"
                />
                <span class="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Vue.js</span>
              </div>
              
              <!-- Nuxt -->
              <div class="group flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-green-300 dark:hover:border-green-600 hover:shadow-md dark:hover:shadow-gray-900/50 transition-all duration-300">
                <Icon 
                  name="logos:nuxt-icon" 
                  class="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-200"
                />
                <span class="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Nuxt.js</span>
              </div>
              
              <!-- JavaScript -->
              <div class="group flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-yellow-300 dark:hover:border-yellow-600 hover:shadow-md dark:hover:shadow-gray-900/50 transition-all duration-300">
                <Icon 
                  name="logos:javascript" 
                  class="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-200"
                />
                <span class="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">JavaScript</span>
              </div>
              
              <!-- TypeScript -->
              <div class="group flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md dark:hover:shadow-gray-900/50 transition-all duration-300">
                <Icon 
                  name="logos:typescript-icon" 
                  class="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-200"
                />
                <span class="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">TypeScript</span>
              </div>
            </div>
          </div>
          
          <!-- Enhanced Description -->
          <div class="space-y-4 opacity-0 animate-fade-in-up" style="animation-delay: 1200ms;">
            <div class="prose prose-base sm:prose-lg dark:prose-invert max-w-none">
              <p class="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                I'm passionate about <strong class="text-gray-900 dark:text-white">crafting meaningful digital experiences</strong> 
                and currently work as a <strong class="text-blue-600 dark:text-blue-400">freelance web developer</strong>, 
                helping individuals and businesses build <em>fast, modern, and impactful</em> web platforms.
              </p>
            </div>
          </div>
          
          <!-- Enhanced Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 opacity-0 animate-fade-in-up" style="animation-delay: 1400ms;">
            <NuxtLink 
              to="/blog"
              class="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-white dark:to-gray-100 text-white dark:text-gray-900 font-semibold rounded-xl hover:from-gray-800 hover:to-gray-700 dark:hover:from-gray-100 dark:hover:to-gray-200 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              <Icon 
                name="heroicons:document-text" 
                class="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:rotate-3 transition-transform duration-200"
              />
              <span>Read the blog</span>
              <Icon 
                name="heroicons:arrow-right" 
                class="w-3 h-3 sm:w-4 sm:h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200"
              />
            </NuxtLink>
            
            <a 
              :href="resumeUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transform hover:scale-105 active:scale-95 transition-all duration-200 text-sm sm:text-base"
            >
              <Icon 
                name="heroicons:document-arrow-down" 
                class="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:rotate-3 transition-transform duration-200"
              />
              <span>View Resume</span>
              <Icon 
                name="heroicons:arrow-top-right-on-square" 
                class="w-3 h-3 sm:w-4 sm:h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200"
              />
            </a>
          </div>
        </div>
        
        <!-- Right side - Enhanced Profile Image (Mobile Responsive) -->
        <div class="flex justify-center order-1 lg:order-2 lg:justify-end opacity-0 animate-fade-in-up mb-6 lg:mb-0" style="animation-delay: 100ms;">
          <div class="relative">
            <!-- Main Profile Container - Responsive sizing -->
            <div class="relative w-64 h-64 xs:w-72 xs:h-72 sm:w-80 sm:h-80 md:w-88 md:h-88 lg:w-96 lg:h-96">
              <!-- Profile Image -->
              <div class="w-full h-full overflow-hidden shadow-xl sm:shadow-2xl dark:shadow-gray-900/50 profile-image-container relative z-10">
                <img 
                  src="./../assets/images/backgrounds/profile-picture.jpeg" 
                  alt="Abdulbarry - Frontend Developer" 
                  class="w-full h-full object-cover"
                  style="image-rendering: -webkit-optimize-contrast;"
                />
                <!-- Overlay for better text contrast if needed -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <!-- Decorative Background Elements -->
              <div class="absolute inset-0 -z-10">
                <!-- Animated Gradient Background -->
                <div class="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-500/20 to-pink-500/20 dark:from-blue-600/30 dark:via-purple-700/30 dark:to-pink-600/30 rounded-3xl blur-2xl sm:blur-3xl animate-pulse-slower"></div>
              </div>
              
              <!-- Floating Tech Icons - Responsive positioning and sizing -->
              <div class="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg flex items-center justify-center animate-float-slow z-20 border border-gray-200 dark:border-gray-700">
                <Icon name="logos:vue" class="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div class="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg flex items-center justify-center animate-float-slower z-20 border border-gray-200 dark:border-gray-700">
                <Icon name="logos:javascript" class="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div class="absolute top-1/2 -right-6 sm:-right-8 w-8 h-8 sm:w-10 sm:h-10 bg-white dark:bg-gray-800 rounded-md sm:rounded-lg shadow-md sm:shadow-lg flex items-center justify-center animate-float z-20 border border-gray-200 dark:border-gray-700">
                <Icon name="logos:nuxt-icon" class="w-4 h-4 sm:w-5 sm:h-5" />
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
  name: 'HomeView'
})
</script>

<style scoped>
/* Custom breakpoint for extra small screens */
@media (min-width: 475px) {
  .xs\:w-72 {
    width: 18rem;
  }
  .xs\:h-72 {
    height: 18rem;
  }
}

/* Custom size for medium-large screens */
@media (min-width: 768px) {
  .md\:w-88 {
    width: 22rem;
  }
  .md\:h-88 {
    height: 22rem;
  }
}

/* Fade in up animation */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

/* FIXED: Simple gradient name text without hover issues */
.gradient-name-text {
  color: #2563eb; /* blue-600 for light mode */
  position: relative;
  transition: all 0.3s ease;
}

.dark .gradient-name-text {
  color: #60a5fa; /* blue-400 for dark mode */
}

/* Safe hover effect - just change color, no gradient */
.gradient-name-text:hover {
  color: #7c3aed; /* purple-600 for light mode */
  transform: scale(1.02);
}

.dark .gradient-name-text:hover {
  color: #a78bfa; /* purple-400 for dark mode */
  transform: scale(1.02);
}

/* Enhanced morphing border animation - More subtle on mobile */
.profile-image-container {
  animation: morphing-border 15s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
}

@keyframes morphing-border {
  0% {
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  }
  25% {
    border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%;
  }
  50% {
    border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%;
  }
  75% {
    border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%;
  }
  100% {
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  }
}

/* Floating animations for tech icons - Reduced motion on mobile */
@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-8px) rotate(3deg);
  }
}

@keyframes float-slow {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-12px) rotate(-3deg);
  }
}

@keyframes float-slower {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-6px) rotate(2deg);
  }
}

@media (min-width: 640px) {
  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-10px) rotate(5deg);
    }
  }

  @keyframes float-slow {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-15px) rotate(-5deg);
    }
  }

  @keyframes float-slower {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-8px) rotate(3deg);
    }
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 4s ease-in-out infinite;
}

.animate-float-slower {
  animation: float-slower 5s ease-in-out infinite;
}

/* Pulse animation for background elements */
@keyframes pulse-slower {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.5;
  }
}

.animate-pulse-slower {
  animation: pulse-slower 8s ease-in-out infinite;
}

/* Enhanced shadows and hover effects - Responsive */
.profile-image-container {
  box-shadow: 
    0 20px 40px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (min-width: 640px) {
  .profile-image-container {
    box-shadow: 
      0 25px 50px -12px rgba(0, 0, 0, 0.25),
      0 0 0 1px rgba(255, 255, 255, 0.1);
  }
}

.profile-image-container:hover {
  transform: scale(1.02);
  animation-duration: 20s;
}

@media (min-width: 640px) {
  .profile-image-container:hover {
    box-shadow: 
      0 35px 60px -12px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(255, 255, 255, 0.2);
  }
}

.dark .profile-image-container {
  box-shadow: 
    0 20px 40px -12px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.05);
}

@media (min-width: 640px) {
  .dark .profile-image-container {
    box-shadow: 
      0 25px 50px -12px rgba(0, 0, 0, 0.5),
      0 0 0 1px rgba(255, 255, 255, 0.05);
  }
}

.dark .profile-image-container:hover {
  box-shadow: 
    0 35px 60px -12px rgba(0, 0, 0, 0.6),
    0 0 0 1px rgba(255, 255, 255, 0.1);
}

/* Prose styling for better text formatting */
.prose strong {
  font-weight: 600;
}

.prose em {
  font-style: italic;
  color: inherit;
}

/* Reduce motion for users who prefer it */
@media (prefers-reduced-motion: reduce) {
  .profile-image-container {
    animation: none;
  }
  
  .animate-float,
  .animate-float-slow,
  .animate-float-slower,
  .animate-pulse-slower {
    animation: none;
  }
  
  .animate-fade-in-up {
    opacity: 1;
    transform: none;
  }
  
  .gradient-name-text {
    animation: none;
    transform: none;
  }
}
</style>