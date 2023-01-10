<template>
  <div class="codenames" v-if="isFieldShown">
    <header>
      <div class="logo">Codenames</div>
    </header>

    <div class="container">
      <div class="header">
        <h2 v-if="isMoveOfMe">Ваш ход</h2>
        <h2 v-else-if="isMoveOfCaptain">Ход капитана</h2>
        <h2 v-else-if="isMoveOfMyTeam">Ходит ваша команда</h2>
        <h2 v-else>Ход соперника</h2>
      </div>

      <div class="content">
        <tip-form
          v-if="state.move === state.currentPlayer.role && isMeCaptain"
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

  .card.killer {
    background-color: #00000055;
  }

  .content {
    height: 60px;
  }
</style>
