<template>
  <form action="#" @submit.prevent="onFormSubmit">
    <input ref="tipInputRef" v-model="tip" type="text">
    <input ref="countInputRef" v-model="count" type="text">
    <button>Отправить</button>
  </form>
</template>

<script lang="ts" src="./tip-form.component.ts"/>
