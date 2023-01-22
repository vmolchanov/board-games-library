<template>
  <h2 v-if="isMoveOfMe">Ваш ход</h2>
  <h2 v-else-if="isMoveOfCaptain">Ход капитана</h2>
  <h2 v-else-if="isMoveOfMyTeam">Ходит ваша команда</h2>
  <h2 v-else>Ход соперника</h2>
</template>

<script lang="ts" src="./codenames-title.component.ts"/>

<style scoped>

</style>
