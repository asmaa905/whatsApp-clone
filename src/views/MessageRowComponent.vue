<template>
  <div class="">
    <div class="flex w-full px-4 py-3 items-center cursor-pointer">
      <img
        class="rounded-full mr-4 w-12"
        :src="chat.user.picture || ''"
      />
      <div class="w-full">
        <div class="flex justify-between items-center">
        <div class="text-[15px] text-gray-600">
            {{chat.user.firstName || ''}}
        </div>
        <div class="text-[12px] text-gray-600">
          {{formatDate(chat.messages[chat.messages.length -1].createdAt)|| ''}}
        </div>
        </div>
        <div class="flex items-center">
          <CheckAllIcon :size="18" :fillColor="tickColor(chat)" class="mr-1" />
          <div class="text-[15px] w-full text-gray-500 flex items-center justify-between">
            {{ lastChatMessage(chat) }}
          </div>
        </div> 
      </div>
    </div>
    <div class="border-b w-[calc(100%-80px)] float-right"></div>
  </div>
</template>
<script setup>
import CheckAllIcon from "vue-material-design-icons/CheckAll.vue";
import { useUserStore } from '../store/user-store';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { sub  } = storeToRefs(userStore);

import { toRefs } from 'vue';

const props = defineProps({chat: Object});
const { chat } = toRefs(props);
const formatDate = (timestamp) =>{
  //const timestamp = 1716174866856;
const date = new Date(timestamp);

const today = new Date(); // Get the current date

const isToday = date.getDate() === today.getDate() &&
  date.getMonth() === today.getMonth() &&
  date.getFullYear() === today.getFullYear();

const isYesterday = date.getDate() === today.getDate() - 1 &&
  date.getMonth() === today.getMonth() &&
  date.getFullYear() === today.getFullYear();

let formattedDateTime;

if (isToday) {
  formattedDateTime = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
} else if (isYesterday) {
  formattedDateTime = `Yesterday ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
} else {
  formattedDateTime = `${date.toDateString()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
}
console.log(formattedDateTime);

return formattedDateTime;
}
const lastChatMessage = (chat) => {
  return chat.messages[chat.messages.length - 1].message.length > 21 ?
  chat.messages[chat.messages.length - 1].message.substring(0, 20)+'...':chat.messages[chat.messages.length - 1].message;
}
const tickColor = (chat) => {
  let color = '';
  if(chat.sub1 === sub.value )
    color =chat.sub1HasViewd? '#7df9ff' :  '#b5b5b5';
  if(chat.sub2 === sub.value )
    color =chat.sub2HasViewd? '#7df9ff' :  '#b5b5b5';
}
</script>
