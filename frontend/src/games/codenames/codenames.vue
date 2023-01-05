<template>
  <div class="codenames">
    <header>
      <div class="logo">Codenames</div>
    </header>

    <div class="container">
      <div class="header">
        <h2>Ваш ход</h2>
      </div>

      <div class="content">
        <p>Кушац, 2 слова</p>
      </div>

      <div class="cards">
        <div
          v-for="(word, i) in words"
          :key="i"
          class="card"
          @click="onWordClick(word.value)"
        >
          {{word.value}}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./codenames.component.ts"/>

<style lang="scss" scoped>
  header {
    background-color: #060606;
    padding: 15px 20px;
  }

  .logo {
    color: white;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 1024px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    gap: 20px;
  }

  .card {
    width: 150px;
    height: 100px;
    border: 1px solid #000;
    text-align: center;
    line-height: 100px;
    border-radius: 5px;
  }

  .card.red {
    background-color: #ff000055;
  }

  .card.blue {
    background-color: #0000ff55;
  }

  .card.neutral {
    background-color: #ff880055;
  }
</style>
