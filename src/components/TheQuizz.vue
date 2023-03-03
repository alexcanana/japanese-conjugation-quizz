<script setup>
import { onMounted, provide, reactive } from "vue";

import QuizzAnswerInput from "./QuizzAnswerInput.vue";
import QuizzInstructions from "./QuizzInstructions.vue";
import QuizzOptionsModal from "./QuizzOptionsModal.vue";
import QuizzQuestion from "./QuizzQuestion.vue";
import QuizzResult from "./QuizzResult.vue";
import QuizzScore from "./QuizzScore.vue";

import { useOptionsStore } from "../stores/options";
import { useQuizzStore } from "../stores/quizz";

const quizzStore = useQuizzStore();
const optionsStore = useOptionsStore();

provide("optionsStore", optionsStore);

const state = reactive({
  score: 0,
  answer: "",
  replied: false,
  isAnswerCorrect: false,
});

optionsStore.$subscribe((mutation, state) => {
  state.answer = "false";
  state.replied = false;
  state.isAnswerCorrect = false;
  localStorage.setItem("options", JSON.stringify(state));
});

onMounted(() => quizzStore.initQuizz());

function isAnswerCorrect(answer) {
  return quizzStore.correct_answers.includes(answer);
}

function handleWrongAnswer() {
  state.isAnswerCorrect = false;
  resetScore();
}

function handleCorrectAnswer() {
  state.isAnswerCorrect = true;
  updateScore();
  quizzStore.removeQuestion(quizzStore.currentQuestion);
}

function checkAnswer(answer) {
  state.answer = answer;
  state.replied = true;

  isAnswerCorrect(answer) ? handleCorrectAnswer() : handleWrongAnswer();
}

function loadQuestion() {
  state.replied = false;
  state.isAnswerCorrect = false;

  quizzStore.selectRandomQuestion();
}

function resetScore() {
  state.score = 0;
}

function updateScore() {
  ++state.score;
}
</script>

<template>
  <main
    class="flex flex-col h-full justify-between p-4 md:p-6 text-gray-200 w-full"
    @click="state.replied && loadQuestion()"
  >
    <header>
      <QuizzScore :score="state.score" />
    </header>

    <div
      class="flex flex-col gap-2 md:gap-12 grow md:mt-16 md:m-auto max-w-full md:w-2/5 py-4 md:py-6"
    >
      <QuizzQuestion
        :furigana="quizzStore.furigana"
        :type="quizzStore.type"
        :meanings="quizzStore.meanings"
      />

      <QuizzInstructions :instructions="quizzStore.instructions" />

      <QuizzResult
        v-if="state.replied"
        :answer="state.answer"
        :correct-answers="quizzStore.correct_answers"
        :is-answer-correct="state.isAnswerCorrect"
      />

      <QuizzAnswerInput
        v-if="!state.replied"
        @submit-answer="checkAnswer"
        @focus-on-input="loadQuestion"
      />

      <p
        v-if="state.replied"
        class="font-semibold mt-2 mx-auto text-jade-500 md:text-xl tracking-wide"
      >
        Tap to continue
      </p>
    </div>

    <footer class="flex justify-end">
      <QuizzOptionsModal />
    </footer>
  </main>
</template>
