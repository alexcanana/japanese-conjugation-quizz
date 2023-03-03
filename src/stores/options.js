import { defineStore } from "pinia";
import { useQuizzStore } from "@/stores/quizz";

const defaultOptions = {
  ui: {
    show_furigana: true,
    show_emojis: true,
    show_correct_answers: true,
    show_word_type: true,
    show_meanings: true,
  },

  adjectives: {
    types: { i: true, na: true, exceptions: true },
    tenses: { present: true, past: true },
    positive: { affirmative: true, negative: true },
    forms: { plain: true, polite: true },
  },
};

export const useOptionsStore = defineStore("options", {
  state: () => {
    return {
      options: defaultOptions,
    };
  },

  actions: {
    applyOptions(optionsForm) {
      const quizz = useQuizzStore();

      this.options = { ...optionsForm };

      quizz.initQuizz();
    },
  },
});
