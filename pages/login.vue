<script setup lang="ts">
import { ref, reactive } from "vue";

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});

const showPassword = ref(true);

const changeCheckbox = () => {
  showPassword.value = !showPassword.value;
};

const remember = useRememberMe();
const isCheckedRememberMe = computed(() => {
  return remember.rememberMe;
});
const rememberMe = () => {
  remember.$patch({
    rememberMe: !isCheckedRememberMe.value,
  });
};

const credentials = reactive({
  email: "",
  password: "",
});

const { signIn } = useAuth();
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-3 h-screen">
    <p class="text-2xl">Login</p>
    <div class="bg-gray-300 px-6 py-4 rounded-md">
      <form
        @submit.prevent="
          signIn('credentials', { ...credentials, callbackUrl: '/' })
        "
      >
        <div class="flex flex-col gap-3">
          <div class="flex flex-col gap-1">
            <label for="email">Email</label>
            <input
              type="text"
              placeholder="Email"
              class="px-2 py-1"
              v-model="credentials.email"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="password">Password</label>
            <input
              v-model="credentials.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Password"
              class="px-2 py-1 relative"
            />
          </div>
        </div>
        <div class="flex mt-1 gap-1 items-center cursor-pointer">
          <input
            type="checkbox"
            v-model="showPassword"
            @input="changeCheckbox"
            class="cursor-pointer"
          />
          <label
            @click.prevent="changeCheckbox"
            for="password-viewer"
            class="cursor-pointer"
            >{{ showPassword ? "Hide Password" : "Show Password" }}</label
          >
        </div>
        <div class="flex mt-1 gap-1 items-center cursor-pointer">
          <input
            type="checkbox"
            v-model="isCheckedRememberMe"
            @input="rememberMe"
            class="cursor-pointer"
          />
          <label
            @click.prevent="rememberMe"
            for="remember-me"
            class="cursor-pointer"
            >Remember Me</label
          >
        </div>
        <ButtonComponent
          class="w-full mt-3"
          type="primary"
          :disabled="!credentials.email.length || !credentials.password.length"
          >Login</ButtonComponent
        >
      </form>
    </div>
  </div>
</template>
