<template>
  <form action="#" class="codenames-tip-form" @submit.prevent="onFormSubmit">
    <codenames-input
      v-model="tip"
      ref="tipInputRef"
      class="codenames-tip-form__input codenames-tip-form__tip"
      label="Подсказка"
    />
    <codenames-input
      v-model="count"
      ref="countInputRef"
      class="codenames-tip-form__input codenames-tip-form__count"
      label="Кол-во"
      type="number"
    />
    <div class="codenames-tip-form__button-wrapper">
      <button class="codenames-tip-form__button">Отправить</button>
    </div>
  </form>
</template>

<script lang="ts" src="./tip-form.component.ts"/>

<style lang="scss" src="./tip-form.style.scss" scoped/>
