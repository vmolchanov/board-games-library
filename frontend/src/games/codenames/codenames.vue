<template>
  <div class="codenames" v-if="isFieldShown">
    <button
      v-if="isMeCaptain"
      class="codenames__key-button"
      @click="onKeyButtonClick"
    >
      Ключ
    </button>

    <div v-if="isKeyShown" class="codenames__key">
      <div class="codenames__key-inner">
        <codenames-key :encoded-key="key"/>
      </div>
    </div>

    <header>
      <div class="logo">Codenames</div>
    </header>

    <div class="container">
      <div class="header">
        <codenames-title :move="state.move" :role="state.currentPlayer.role"/>
      </div>

      <div class="content">
        <tip-form
          v-if="isShowTipForm"
          :count-of-not-opened-words="getCountOfNotOpenedWords"
          @submit="onTipFormSubmit"
        />
        <p>{{state.tip}}</p>
      </div>

      <div class="cards">
        <div
          v-for="(fieldState) in getSortedFieldStateByPosition"
          :key="fieldState.position"
          :class="getWordClasses(fieldState.state)"
          @click="onWordClick(fieldState.word)"
        >
          {{fieldState.word.value}}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./codenames.component.ts"/>

<style lang="scss" src="./codenames.style.scss" scoped/>
