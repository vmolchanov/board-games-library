<template>
  <form action="#" @submit.prevent="onFormSubmit">
    <input v-model="tip" type="text">
    <input v-model="count" type="text">
    <button>Отправить</button>
  </form>
</template>

<script lang="ts" src="./tip-form.component.ts"/>