import { Container, Stack, Typography } from '@mui/material';

import { JavaScriptLogo } from './components/JavaScriptLogo';
import { Start } from './components/Start';
import { Game } from './components/Game';
import { Results } from './components/Results';
import { useQuestionsData } from './hooks/useQuestionsData';
import { useQuestionsStore } from './store/questions';

export const App = () => {
  const questions = useQuestionsStore(state => state.questions);
  const { unanswered } = useQuestionsData();

  return (
    <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Container maxWidth='sm'>
        <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
          <JavaScriptLogo />
          <Typography variant='h2' component='h1'>
            JavaScript Quiz
          </Typography>
        </Stack>

        {questions.length === 0 && <Start />}
        {questions.length > 0 && unanswered > 0 && <Game />}
        {questions.length > 0 && unanswered === 0 && <Results />}
      </Container>
    </main>
  );
};
