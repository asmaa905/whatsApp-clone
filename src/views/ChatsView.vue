<template>
<div id="messages"
 class="pt-1 z-0 overflow-auto fixed h-[calc(100vh-100px)] w-[420px]"
>
<div v-for="(chat, index) in chats" :key="index">
    <div @click="openChat(chat)">
        <MessageRowComponentVue :chat="chat"/>

    </div>

</div>
</div>
</template>
<script setup>
import { onMounted } from 'vue';

import MessageRowComponentVue from './MessageRowComponent.vue';
import { useUserStore } from '../store/user-store';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const {chats, userDataForChat  } = storeToRefs(userStore);

onMounted(async () => {
    if(userDataForChat.value.length) {
        await userStore.getChatById(userDataForChat.value[0].id)
    }
    console.log("chats",chats)
})
const openChat = async (chat) => {
    userDataForChat.value = [];
    userDataForChat.value.push({
        id: chat.id,
        sub1: chat.sub1,
        sub2: chat.sub2,
        picture: chat.user.picture,
        firstName: chat.user.firstName,
    })
    try {
        await userStore.getChatById(chat.id)
    } catch(error){
        console.log("errr",error)
    }
}
</script>
<style scoped>

</style>
