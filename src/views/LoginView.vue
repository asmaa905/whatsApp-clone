<template>
    <div class="w-full">
      <div class="bg-teal-600 z-[-1] w-full h-[255px] fixed top-0"></div>
      <div class="bg-[#191919 z-[-1] w-full h-[100vh-255px] fixed bottom-0"></div>
      <div class="max-w-xl mx-auto">
        <div class="mt-10 flex items-center w-full">
            <img width="40" src="/faviconnew.ico" alt="">
            <div class="font-semiboldtext-gray-100 ml-6">WHATSAPP WEB</div>
        </div>
        <div class="bg-white z-10 p24 m-6 mt-10">
            <div class="text-center text-4xl text-gray-700 font-light pb-10">WhatsApp Clone</div> 
            <div class="w-full flex justify-center bg-[#191919] p-3 rounded-md">
                <GoogleLogin :callback="callback"/>
            </div> 

        </div>
      </div>
    </div>
</template>
<script setup>
import { useUserStore } from '../store/user-store';
import { useRouter } from 'vue-router';
const router = useRouter();
const userStore = useUserStore();

 const callback = async (response) =>{
  console.log(response)
    await userStore.getUserDatailsFromGoogle(response);
    setTimeout(() => {
      router.push('/'),
      200
    })
 }
</script>
<style scoped></style>