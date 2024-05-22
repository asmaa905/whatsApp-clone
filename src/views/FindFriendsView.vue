<template>
    <div id="FindFriends" class="pt-[100px] overflow-auto fixed h-[100vh] w-full">
        <div v-for="(user, index) in userStore.allUsers" :key="index">
            <div v-if="user.sub !== userStore.sub"  @click="createNewChat(user)" class="flex w-full p-4 items-center cursor-pointer">
            <img class="rounded-full mr-4 w-12" :src="user.picture||''" />
            <div class="w-full">
                <div class="flex justify-between items-center">
                    <div class="text-[15px] text-gray-600"> {{ user.firstName||'' }} {{ user.lastName||'' }}</div>
                </div>
                <div class="flex items-center">
                    <div class="text-[15px] text-gray-500">Hi, I'm using WhatsApp!</div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useUserStore } from '../store/user-store';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const {sub, userDataForChat,chats  } = storeToRefs(userStore);

const createNewChat = (user) => {
    if(userDataForChat.value.filter((user)=>user.id ))
    userDataForChat.value = [];
    userDataForChat.value.push({
        id:'',
        sub1: sub.value,
        sub2: user.sub,
        picture: user.picture,
        firstName: user.firstName,
    })
}
</script>
<style scoped></style>
