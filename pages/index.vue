<script setup lang="ts">
import { ref } from "vue";

const catImage = ref<string>("");
const imgLoaded = ref<boolean>(false);
definePageMeta({
  middleware: "auth",
});
const { signOut } = useAuth();
type CatResponse = {
  height: number;
  id: string;
  url: string;
  width: number;
};

const effects = ref<string[]>(["fade", "slide-fade", "bounce"]);

const transitionName = ref<string>("fade");

const getCatImages = async () => {
  try {
    const response: CatResponse[] = await $fetch(
      "https://api.thecatapi.com/v1/images/search"
    );
    const img = new Image();
    img.src = response[0].url;
    img.onload = () => {
      transitionName.value =
        effects.value[Math.floor(Math.random() * effects.value.length)];
      catImage.value = response[0].url;
    };
  } catch (e) {
    console.error("Cat images could not be fetched");
  }
};

getCatImages();
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-3 h-screen">
    <transition :name="transitionName" mode="out-in">
      <div class="w-[600px] h-[600px]" :key="catImage">
        <nuxt-img
          v-if="catImage"
          :src="catImage"
          width="600"
          height="600"
          alt="Random Cat"
          class="w-full h-full object-cover"
        />
        <div
          v-else
          class="w-[600px] h-[600px] flex items-center justify-center"
        >
          <SpinnerComponent />
        </div>
      </div>
    </transition>

    <ButtonComponent type="primary" @click="getCatImages"
      >Change Cat</ButtonComponent
    ><ButtonComponent type="danger" @click="signOut">Logout</ButtonComponent>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>
