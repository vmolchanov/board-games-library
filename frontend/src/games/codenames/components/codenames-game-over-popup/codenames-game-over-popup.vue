<template>
  <div class="codenames-game-over-popup">
    <div class="codenames-game-over-popup__overlay"></div>
    <div class="codenames-game-over-popup__inner">
      <h2 class="codenames-game-over-popup__header">Игра окончена</h2>
      <p class="codenames-game-over-popup__content">Победили {{getWinner}}</p>
    </div>
  </div>
</template>

<script lang="ts" src="./codenames-game-over-popup.component.ts"/>

<style lang="scss" src="./codenames-game-over-popup.style.scss" scoped/>
