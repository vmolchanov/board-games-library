<template>
  <div :class="getMainClasses">
    <div class="codenames-key__first-move top"/>
    <div class="codenames-key__first-move right"/>
    <div class="codenames-key__first-move bottom"/>
    <div class="codenames-key__first-move left"/>

    <div class="codenames-key__field">
      <div
        v-for="(cell, i) in getCells"
        :key="i"
        :class="getClassesByCellCharacter(cell)"
      />
    </div>
  </div>
</template>

<script lang="ts" src="./codenames-key.component.ts"/>

<style lang="scss" src="./codenames-key.style.scss" scoped/>
