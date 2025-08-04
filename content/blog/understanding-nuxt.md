---
title: "Getting Started with Vue.js 3: A Complete Guide for Modern Web Development"
description: "Learn the fundamentals of Vue.js 3, including the Composition API, reactive state management, and building your first component. Perfect for developers transitioning from other frameworks."
date: "2024-08-04"
tags: ["Vue.js", "JavaScript", "Frontend", "Web Development", "Tutorial"]
image: "/images/blog/vue-guide.jpg"
author: "Abdelbari Guenichi"
readTime: "8 min read"
---

# Getting Started with Vue.js 3: A Complete Guide

Vue.js has become one of the most popular JavaScript frameworks for building user interfaces, and with the release of Vue 3, it's more powerful and flexible than ever. In this comprehensive guide, we'll explore the key features that make Vue 3 a fantastic choice for modern web development.

## Why Choose Vue.js 3?

Vue.js 3 brings several significant improvements over its predecessor:

- **Composition API**: A new way to organize component logic
- **Better TypeScript Support**: Enhanced type inference and integration
- **Improved Performance**: Smaller bundle size and faster rendering
- **Multiple Root Elements**: No more wrapper div requirements

### The Composition API Revolution

The Composition API is arguably the most significant change in Vue 3. It provides a more flexible way to organize component logic, especially beneficial for larger applications.

```javascript
import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const doubledCount = computed(() => count.value * 2)
    
    const increment = () => {
      count.value++
    }
    
    onMounted(() => {
      console.log('Component mounted!')
    })
    
    return {
      count,
      doubledCount,
      increment
    }
  }
}
```

## Building Your First Component

Let's create a simple counter component to demonstrate Vue 3's capabilities:

```vue
<template>
  <div class="counter">
    <h2>Counter: {{ count }}</h2>
    <p>Doubled: {{ doubledCount }}</p>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const doubledCount = computed(() => count.value * 2)

const increment = () => count.value++
const decrement = () => count.value--
</script>

<style scoped>
.counter {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
}

button {
  margin: 0 10px;
  padding: 8px 16px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #369870;
}
</style>
```

## Key Features to Explore

### 1. Reactive State Management

Vue 3's reactivity system is built on **Proxies**, making it more powerful and efficient:

```javascript
import { reactive, ref } from 'vue'

// Using ref for primitives
const count = ref(0)

// Using reactive for objects
const state = reactive({
  user: {
    name: 'John Doe',
    email: 'john@example.com'
  },
  todos: []
})
```

### 2. Lifecycle Hooks

Vue 3 provides composition-based lifecycle hooks:

- `onMounted()` - Component mounted
- `onUnmounted()` - Component unmounted
- `onUpdated()` - Component updated
- `onBeforeMount()` - Before mounting

### 3. Custom Composables

Create reusable logic with custom composables:

```javascript
// useCounter.js
import { ref } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue
  
  return {
    count,
    increment,
    decrement,
    reset
  }
}
```

## Performance Improvements

Vue 3 introduces several performance enhancements:

> **Tree-shaking Support**: Only include the features you use in your bundle
> 
> **Fragment Support**: Multiple root elements without wrapper divs
> 
> **Teleport**: Render components outside their parent tree

### Bundle Size Comparison

| Framework | Bundle Size | Performance |
|-----------|-------------|-------------|
| Vue 2     | ~34kb       | Good        |
| **Vue 3** | **~16kb**   | **Excellent** |
| React     | ~42kb       | Good        |
| Angular   | ~130kb      | Good        |

## Best Practices for Vue 3

1. **Use the Composition API** for complex logic
2. **Leverage TypeScript** for better development experience
3. **Create custom composables** for reusable logic
4. **Use `<script setup>`** for cleaner component syntax
5. **Implement proper error handling** with error boundaries

### Error Handling Example

```javascript
import { onErrorCaptured } from 'vue'

export default {
  setup() {
    onErrorCaptured((error, instance, info) => {
      console.error('Error captured:', error, info)
      // Send to error reporting service
      return false
    })
  }
}
```

## Integration with Modern Tools

Vue 3 works seamlessly with modern development tools:

- **Vite**: Lightning-fast build tool
- **Pinia**: Modern state management
- **Vue Router 4**: Enhanced routing
- **Nuxt 3**: Full-stack framework

### Quick Setup with Vite

```bash
npm create vue@latest my-vue-app
cd my-vue-app
npm install
npm run dev
```

## Advanced Patterns

### Provide/Inject for Dependency Injection

```javascript
// Parent component
import { provide } from 'vue'

export default {
  setup() {
    const theme = ref('dark')
    provide('theme', theme)
  }
}

// Child component
import { inject } from 'vue'

export default {
  setup() {
    const theme = inject('theme')
    return { theme }
  }
}
```

### Watchers and Computed Properties

```javascript
import { watch, watchEffect, computed } from 'vue'

export default {
  setup() {
    const firstName = ref('John')
    const lastName = ref('Doe')
    
    // Computed property
    const fullName = computed(() => 
      `${firstName.value} ${lastName.value}`
    )
    
    // Watcher
    watch(fullName, (newName, oldName) => {
      console.log(`Name changed from ${oldName} to ${newName}`)
    })
    
    // Immediate watcher
    watchEffect(() => {
      console.log(`Current name: ${fullName.value}`)
    })
    
    return { firstName, lastName, fullName }
  }
}
```

## Testing Vue 3 Components

Vue 3 components are highly testable. Here's a simple example using Vue Test Utils:

```javascript
import { mount } from '@vue/test-utils'
import Counter from './Counter.vue'

describe('Counter', () => {
  test('increments count when button is clicked', async () => {
    const wrapper = mount(Counter)
    
    expect(wrapper.text()).toContain('Counter: 0')
    
    await wrapper.find('button').trigger('click')
    
    expect(wrapper.text()).toContain('Counter: 1')
  })
})
```

## Migration from Vue 2

If you're coming from Vue 2, here are the key changes:

1. **Multiple root elements** are now allowed
2. **Composition API** is the recommended approach
3. **Global API changes** (createApp instead of new Vue)
4. **v-model changes** for custom components

## Conclusion

Vue.js 3 represents a significant step forward for the framework, offering improved performance, better TypeScript support, and more flexible component organization through the Composition API. Whether you're building a simple website or a complex application, Vue 3 provides the tools you need to create maintainable, performant applications.

The combination of familiar template syntax, powerful reactivity, and modern JavaScript features makes Vue 3 an excellent choice for developers of all skill levels. Start with the basics, experiment with the Composition API, and gradually explore the more advanced features as your applications grow in complexity.

---

*Ready to dive deeper? Check out the [official Vue 3 documentation](https://vuejs.org/) and start building your next project today!*