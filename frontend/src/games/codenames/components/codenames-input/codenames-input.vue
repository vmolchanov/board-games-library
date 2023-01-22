<template>
  <div class="codenames-input">
    <label :for="id" class="codenames-input__label" v-text="label"/>
    <input
      :id="id"
      ref="tipInputRef"
      class="codenames-input__input"
      :type="type"
      :value="value"
      @input="onInput"
    >
  </div>
</template>

<script lang="ts" src="./codenames-input.component.ts"/>

<style lang="scss" src="./codenames-input.style.scss" scoped/>
