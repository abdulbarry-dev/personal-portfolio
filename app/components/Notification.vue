<template>
  <section class="newsletter-section">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
        <!-- Left side - Heading -->
        <div class="flex-1 text-center lg:text-left lg:pr-8">
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Enjoy my content?<br>
            Stay updated with<br>
            my newsletter.
          </h1>
        </div>
        
        <!-- Right side - Form -->
        <div class="flex-1 max-w-md mx-auto lg:mx-0">
          <div class="flex flex-col space-y-4">
            <!-- Email Input and Button -->
            <div class="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                name="email" 
                id="email" 
                placeholder="Enter your email"
                class="flex-1 px-4 py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <button 
                type="submit"
                class="px-6 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200 whitespace-nowrap shadow-lg"
              >
                Notify me
              </button>
            </div>
            
            <!-- Privacy Policy Text -->
            <p class="text-gray-300 text-sm text-center sm:text-left">
              No spam, just useful updates. 
              <a href="#privacy-policy" class="text-white font-semibold hover:underline focus:underline transition-all duration-200">
                Read privacy policy.
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineOptions({
  name: 'NewsletterSubscription'
})
</script>

<style scoped>
.newsletter-section {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #3730a3 75%, #7c3aed 100%);
  min-height: 60vh;
  position: relative;
  overflow: hidden;
}

.newsletter-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.4) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.2) 0%, transparent 50%);
  pointer-events: none;
}

.newsletter-section::after {
  content: '';
  position: absolute;
  inset: 0;
  background: 
    linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.02) 50%, transparent 70%);
  pointer-events: none;
}

/* Mobile First Responsive Design */
@media (max-width: 640px) {
  .newsletter-section {
    min-height: 50vh;
  }
  
  .newsletter-section h1 {
    font-size: 2rem;
    line-height: 1.2;
  }
  
  .newsletter-section .flex-col.space-y-4 {
    gap: 1rem;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  .newsletter-section h1 {
    font-size: 2.5rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .newsletter-section h1 {
    font-size: 3rem;
  }
}

@media (min-width: 1025px) {
  .newsletter-section {
    min-height: 60vh;
  }
}

/* Enhanced focus states for accessibility */
.newsletter-section input:focus,
.newsletter-section button:focus {
  transform: translateY(-1px);
}

.newsletter-section button:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.25);
}

/* Animation for smooth transitions */
.newsletter-section * {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>