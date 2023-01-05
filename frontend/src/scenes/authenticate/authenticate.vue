<template>
  <p v-if="isAuthenticateError">
    Ошибка аутентификации. Пожалуйста, попробуйте еще раз
  </p>
  <p v-else>
    Входим в систему, пожалуйста, подождите...
  </p>
</template>

<script lang="ts" src="./authenticate.component.ts"/>
