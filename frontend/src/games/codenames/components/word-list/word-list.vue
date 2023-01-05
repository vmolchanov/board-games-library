<template>
  <ul>
    <li
      v-for="(word, i) in sessionWords"
      :key="i"
      @click="onWordClick(word)"
    >
      {{word.word.value}}
    </li>
  </ul>
</template>

<script lang="ts" src="./word-list.component.ts"/>
