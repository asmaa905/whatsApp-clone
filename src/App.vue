<template>
    <div id="app">
      <router-view></router-view>
    </div>
  </template>
  
  <script setup>
    import { onMounted } from 'vue';
    import { useUserStore } from './store/user-store';
    import { useRouter } from 'vue-router';
    const router = useRouter();
    const userStore = useUserStore();
    onMounted(() => {
      if(!userStore.sub) router.push('/login');
    })
  </script>
  
  <style>
  /* Styles */
  </style>