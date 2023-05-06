import { useEffect } from 'react';
import { Button, Col, Container, Row, Stack } from 'react-bootstrap';

import { LanguageSelector } from './components/LanguageSelector';
import { TextArea } from './components/TextArea';
import { ArrowsExchangeIcon, CopyIcon, VolumeIcon } from './components/Icons';
import { useStore } from './hooks/useStore';
import { useDebounce } from './hooks/useDebounce';
import { translate } from './services/translate';
import { SectionType } from './types.d';
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from './constants';

export const App = () => {
  const {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  } = useStore();

  const debouncedFromText = useDebounce(fromText, 500);

  useEffect(() => {
    if (debouncedFromText === '') return;

    translate({ fromLanguage, toLanguage, text: debouncedFromText })
      .then(result => {
        if (result == null) return;
        setResult(result);
      })
      .catch(() => {
        setResult('Error');
      });
  }, [debouncedFromText, fromLanguage, toLanguage]);

  const handleClipboard = () => {
    window.navigator.clipboard.writeText(result).catch(() => {});
  };

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result);
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage];
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  };

  return (
    <Container fluid>
      <h1 style={{ textAlign: 'center', marginBottom: '32px' }}>Google Translate Clone</h1>

      <Row>
        <Col style={{ width: '302px' }}>
          <Stack gap={2}>
            <LanguageSelector type={SectionType.From} value={fromLanguage} onChange={setFromLanguage} />
            <TextArea type={SectionType.From} value={fromText} onChange={setFromText} />
          </Stack>
        </Col>

        <Col xs='auto'>
          <Button onClick={interchangeLanguages} variant='link' disabled={fromLanguage === AUTO_LANGUAGE}>
            <ArrowsExchangeIcon />
          </Button>
        </Col>

        <Col style={{ width: '302px' }}>
          <Stack gap={2}>
            <LanguageSelector type={SectionType.To} value={toLanguage} onChange={setToLanguage} />
            <div style={{ position: 'relative' }}>
              <TextArea loading={loading} type={SectionType.To} value={result} onChange={setResult} />

              <div style={{ position: 'absolute', left: 0, bottom: 0, display: 'flex' }}>
                <Button variant='link' onClick={handleClipboard}>
                  <CopyIcon />
                </Button>
                <Button variant='link' onClick={handleSpeak}>
                  <VolumeIcon />
                </Button>
              </div>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};
