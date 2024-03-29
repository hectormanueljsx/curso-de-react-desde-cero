import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import confetti from 'canvas-confetti';

import { type Question } from '../types.d';

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
  reset: () => void;
}

const API_URL = 'http://localhost:5173/';

export const useQuestionsStore = create<State>()(
  devtools(
    persist(
      (set, get) => {
        return {
          loading: false,
          questions: [],
          currentQuestion: 0,
          fetchQuestions: async (limit: number) => {
            const res = await fetch(`${API_URL}/data.json`);
            const json = await res.json();

            const questions = json.sort(() => Math.random() - 0.5).slice(0, limit);
            set({ questions }, false, 'FETCH_QUESTIONS');
          },
          selectAnswer: (questionId: number, answerIndex: number) => {
            const { questions } = get();
            // Usar el structuredClone para clonar el objeto
            const newQuestions = structuredClone(questions);
            // Encontramos el índice de la pregunta
            const questionIndex = newQuestions.findIndex((q: { id: number }) => q.id === questionId);
            // Obtenemos la información de la pregunta
            const questionInfo = newQuestions[questionIndex];
            // Averiguamos si el usuario ha seleccionado la respuesta correcta
            const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex;

            if (isCorrectUserAnswer) confetti();

            // Cambiar esta información en la copia de la pregunta
            newQuestions[questionIndex] = {
              ...questionInfo,
              isCorrectUserAnswer,
              userSelectedAnswer: answerIndex,
            };
            // Actualizamos el estado
            set({ questions: newQuestions }, false, 'SELECT_ANSWER');
          },
          goNextQuestion: () => {
            const { currentQuestion, questions } = get();
            const nextQuestion = currentQuestion + 1;

            if (nextQuestion < questions.length) {
              set({ currentQuestion: nextQuestion }, false, 'GO_NEXT_QUESTION');
            }
          },
          goPreviousQuestion: () => {
            const { currentQuestion } = get();
            const previousQuestion = currentQuestion - 1;

            if (previousQuestion >= 0) {
              set({ currentQuestion: previousQuestion }, false, 'GO_PREVIOUS_QUESTION');
            }
          },
          reset: () => {
            set({ currentQuestion: 0, questions: [] }, false, 'RESET');
          },
        };
      },
      {
        name: 'questions',
      },
    ),
  ),
);
