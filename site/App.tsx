import React, { useEffect, useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Nazuki } from './nazuki/types';

export default function App () {
  const [nazuki, setNazuki] = useState<Nazuki>();
  const [result, setResult] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [alerts, setAlerts] = useState<string[]>([]);

  const addAlert = (alert: string) => {
    setAlerts((alerts) => [...alerts, alert]);
  };

  useEffect(() => {
    (async () => {
      const { loadNazuki } = await import('./nazuki');
      const nazuki = await loadNazuki();
      setNazuki(nazuki);
      const result = await nazuki.generate(10);
      setResult(result);
    })().catch((err) => {
      addAlert(String(err));
    });
  }, []);

  const run = () => {
    if (!nazuki) return;
    nazuki.run(result, input).then((output) => {
      setOutput(String(output));
    }).catch((error) => {
      setError(String(error));
    });
  };

  return (
    <>
      <Jumbotron>
        <h1>Nazuki</h1>
        <p>[WIP] Compiler Infrastructure for Brainfuck</p>
      </Jumbotron>
      <Container>
        <div>
          {alerts.map((alert, idx) => (
            <Alert key={idx} variant="danger">{alert}</Alert>
          ))}
        </div>
        <Form>
          <Form.Control
            as="textarea"
            readOnly
            className="text-monospace"
            style={{ wordBreak: 'break-all' }}
            rows={5}
            value={result}
          />
          <p>{result.length}</p>
          <Form.Group>
            <Form.Label>Input</Form.Label>
            <Form.Control
              as="textarea"
              className="text-monospace"
              rows={5}
              spellCheck={false}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Button variant="primary" onClick={run}>Run</Button>
          </Form.Group>
          <Form.Group>
            <Form.Label>Output</Form.Label>
            <Form.Control
              as="textarea"
              readOnly
              className="text-monospace"
              rows={5}
              value={output}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Error</Form.Label>
            <Form.Control
              as="textarea"
              readOnly
              className="text-monospace"
              rows={5}
              value={error}
            />
          </Form.Group>
        </Form>
      </Container>
    </>
  );
}
