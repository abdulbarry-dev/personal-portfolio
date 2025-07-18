<template>
  <div class="bg-white border-t border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        <!-- Left side - Text Content -->
        <div class="space-y-6">
          <!-- Welcome Text -->
          <p class="text-lg text-gray-600 font-medium">
            Welcome to my site,
          </p>
          
          <!-- Main Heading -->
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            I'm Abdulbarry, a<br>
            Frontend Developer<br>
            based in Tunisia.
          </h1>
          
          <!-- Tech Icons -->
          <div class="flex items-center space-x-6">
            <!-- Vue Icon -->
            <div class="flex items-center space-x-2 text-gray-600">
              <Icon 
                name="logos:vue" 
                class="w-8 h-8"
              />
              <span class="text-sm font-medium">Vue</span>
            </div>
            
            <!-- Nuxt Icon -->
            <div class="flex items-center space-x-2 text-gray-600">
              <Icon 
                name="logos:nuxt-icon" 
                class="w-8 h-8"
              />
              <span class="text-sm font-medium">Nuxt</span>
            </div>
          </div>
          
          <!-- Description -->
          <p class="text-lg text-gray-600 leading-relaxed max-w-lg">
            I'm passionate about creating meaningful digital experiences and currently serve as a senior web developer at 
            <span class="font-semibold text-gray-900">KEMIK.com</span> – Guatemala's leading e-commerce platform.
          </p>
          
          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4">
            <NuxtLink 
              to="/blog"
              class="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200 group"
            >
              <span>Read the blog</span>
              <Icon 
                name="heroicons:arrow-right" 
                class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200"
              />
            </NuxtLink>
            
            <NuxtLink 
              to="/resume"
              class="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 hover:text-gray-900 transition-colors duration-200 group"
            >
              <span>Resume</span>
              <Icon 
                name="heroicons:arrow-top-right-on-square" 
                class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200"
              />
            </NuxtLink>
          </div>
        </div>
        
        <!-- Right side - Profile Image -->
        <div class="flex justify-center lg:justify-end">
          <div class="relative">
            <div class="w-80 h-80 lg:w-96 lg:h-96 overflow-hidden shadow-2xl profile-image-container">
              <img 
                src="./../../assets/images/backgrounds/profile-picture.jpeg" 
                alt="Abdulbarry - Frontend Developer" 
                class="w-full h-full object-cover"
              />
            </div>
            <!-- Decorative elements -->
            <div class="absolute -top-4 -right-4 w-24 h-24 bg-blue-500 rounded-full opacity-20 animate-pulse-slow"></div>
            <div class="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-500 rounded-full opacity-10 animate-pulse-slower"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'HomeView'
})
</script>

<style scoped>
/* Ultra-smooth continuous border radius morphing animation */
.profile-image-container {
  animation: morphing-border 10s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite;
}

@keyframes morphing-border {
  0% {
    border-radius: 19% 81% 70% 30% / 34% 69% 31% 66%;
  }
  20% {
    border-radius: 19% 81% 43% 57% / 57% 69% 31% 43%;
  }
  40% {
    border-radius: 26% 74% 5% 95% / 59% 37% 63% 41%;
  }
  60% {
    border-radius: 35% 65% 89% 11% / 22% 78% 22% 78%;
  }
  80% {
    border-radius: 19% 81% 43% 57% / 57% 69% 31% 43%;
  }
  100% {
    border-radius: 19% 81% 70% 30% / 34% 69% 31% 66%;
  }
}

/* Pulse animations for decorative elements */
@keyframes pulse-slow {
  0%, 100% {
    transform: scale(1);
    opacity: 0.2;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.3;
  }
}

@keyframes pulse-slower {
  0%, 100% {
    transform: scale(1) rotate(0deg);
    opacity: 0.1;
  }
  50% {
    transform: scale(1.05) rotate(5deg);
    opacity: 0.15;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

.animate-pulse-slower {
  animation: pulse-slower 6s ease-in-out infinite;
}

/* Smooth hover effect that slows animation */
.profile-image-container:hover {
  animation-duration: 15s;
}

/* Enhanced shadow for the morphing effect */
.profile-image-container {
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.profile-image-container:hover {
  transform: scale(1.02);
  box-shadow: 
    0 35px 60px -12px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.15);
}

/* Add subtle floating animation to decorative elements */
@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(3deg);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite, float 8s ease-in-out infinite;
}

.animate-pulse-slower {
  animation: pulse-slower 6s ease-in-out infinite, float 12s ease-in-out infinite reverse;
}
</style>