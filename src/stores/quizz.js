import { defineStore } from "pinia";
import { list, remove } from "wild-wild-path";
import { useOptionsStore } from "@/stores/options";
import allWords from "@/json/words.json";

export const useQuizzStore = defineStore("quizz", {
  state: () => {
    return {
      currentQuestion: "",
      questions: [],
      words: [],
    };
  },

  getters: {
    correct_answers: (state) =>
      state.currentQuestion
        ? state.currentQuestion.question.correct_answers
        : [],

    furigana: (state) => state.currentQuestion.furigana,

    type: (state) => state.currentQuestion.type,

    instructions: (state) =>
      state.currentQuestion ? state.currentQuestion.question.instructions : [],

    meanings: (state) =>
      state.currentQuestion ? state.currentQuestion.meanings.join(", ") : "",

    word: (state) => state.currentQuestion.word,
  },

  actions: {
    addQuestion(word) {
      this.questions.push(word);
    },

    applyAdjectivesOptions(words) {
      const optionsStore = useOptionsStore();
      const wwpOptions = { mutate: true };

      if (!optionsStore.options.adjectives.types.i) {
        remove(words, "i-adjectives", wwpOptions);
      }

      if (!optionsStore.options.adjectives.types.na) {
        remove(words, "na-adjectives", wwpOptions);
      }

      if (!optionsStore.options.adjectives.tenses.present) {
        remove(words, "*.*.conjugations.Present_Affirmative_Plain", wwpOptions);
        remove(
          words,
          "*.*.conjugations.Present_Affirmative_Polite",
          wwpOptions
        );
        remove(words, "*.*.conjugations.Present_Negative_Plain", wwpOptions);
        remove(words, "*.*.conjugations.Present_Negative_Polite", wwpOptions);
      }

      if (!optionsStore.options.adjectives.tenses.past) {
        remove(words, "*.*.conjugations.Past_Affirmative_Plain", wwpOptions);
        remove(words, "*.*.conjugations.Past_Affirmative_Polite", wwpOptions);
        remove(words, "*.*.conjugations.Past_Negative_Plain", wwpOptions);
        remove(words, "*.*.conjugations.Past_Negative_Polite", wwpOptions);
      }

      if (!optionsStore.options.adjectives.positive.affirmative) {
        remove(words, "*.*.conjugations.Present_Affirmative_Plain", wwpOptions);
        remove(
          words,
          "*.*.conjugations.Present_Affirmative_Polite",
          wwpOptions
        );
        remove(words, "*.*.conjugations.Past_Affirmative_Plain", wwpOptions);
        remove(words, "*.*.conjugations.Past_Affirmative_Polite", wwpOptions);
      }

      if (!optionsStore.options.adjectives.positive.negative) {
        remove(words, "*.*.conjugations.Present_Negative_Plain", wwpOptions);
        remove(words, "*.*.conjugations.Present_Negative_Polite", wwpOptions);
        remove(words, "*.*.conjugations.Past_Negative_Plain", wwpOptions);
        remove(words, "*.*.conjugations.Past_Negative_Polite", wwpOptions);
      }

      if (!optionsStore.options.adjectives.forms.plain) {
        remove(words, "*.*.conjugations.Present_Affirmative_Plain", wwpOptions);
        remove(words, "*.*.conjugations.Present_Negative_Plain", wwpOptions);
        remove(words, "*.*.conjugations.Past_Affirmative_Plain", wwpOptions);
        remove(words, "*.*.conjugations.Past_Negative_Plain", wwpOptions);
      }

      if (!optionsStore.options.adjectives.forms.polite) {
        remove(
          words,
          "*.*.conjugations.Present_Affirmative_Polite",
          wwpOptions
        );
        remove(words, "*.*.conjugations.Present_Negative_Polite", wwpOptions);
        remove(words, "*.*.conjugations.Past_Affirmative_Polite", wwpOptions);
        remove(words, "*.*.conjugations.Past_Negative_Polite", wwpOptions);
      }
    },

    applyOptions(words) {
      this.applyAdjectivesOptions(words);

      return list(words, "*.*");
    },

    selectRandomQuestion() {
      const otherQuestions = [...this.questions];

      otherQuestions.splice(otherQuestions.indexOf(this.currentQuestion), 1);

      this.currentQuestion =
        otherQuestions[Math.floor(Math.random() * otherQuestions.length)];
    },

    getCurrentQuestion() {
      return this.currentQuestion;
    },

    getRandomProperty(obj) {
      const keys = Object.keys(obj);

      return keys[Math.floor(Math.random() * keys.length)];
    },

    initQuizz() {
      this.$reset();

      this.words = this.applyOptions(JSON.parse(JSON.stringify(allWords)));

      for (let index = 0; index < 5; index++) {
        this.loadQuestion();
      }

      this.selectRandomQuestion();
    },

    loadQuestion() {
      const newWord = this.words[Math.floor(Math.random() * this.words.length)];
      const form = this.getRandomProperty(newWord.conjugations);

      newWord.question = {
        correct_answers: list(newWord.conjugations, `${form}.*`),
        instructions: form.split("_"),
      };

      this.addQuestion(newWord);
    },

    removeQuestion(question) {
      this.questions.splice(this.questions.indexOf(question), 1);
      this.loadQuestion();
    },
  },
});
