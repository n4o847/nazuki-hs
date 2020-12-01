import React, { useEffect, useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Nazuki } from '../pkg/types';

export default function App () {
  const [nazuki, setNazuki] = useState<Nazuki>();
  const [source, setSource] = useState('scan\nscan\nadd\nprint');
  const [assembling, setAssembling] = useState(false);
  const [result, setResult] = useState('');
  const [input, setInput] = useState('');
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [alerts, setAlerts] = useState<string[]>([]);

  const addAlert = (alert: string) => {
    setAlerts((alerts) => [...alerts, alert]);
  };

  useEffect(() => {
    (async () => {
      const { loadNazuki } = await import('../pkg');
      const nazuki = await loadNazuki();
      setNazuki(nazuki);
      const result = await nazuki.assemble(source);
      setResult(result);
    })().catch((err) => {
      addAlert(String(err));
    });
  }, []);

  const assemble = () => {
    if (!nazuki) return;
    setAssembling(true);
    nazuki.assemble(source).then((result) => {
      setResult(result);
      setAssembling(false);
    }).catch((error) => {
      addAlert(String(error));
      setAssembling(false);
    });
  };

  const run = () => {
    if (!nazuki) return;
    setRunning(true);
    nazuki.run(result, input).then((output) => {
      setOutput(output);
      setRunning(false);
    }).catch((error) => {
      setError(String(error));
      setRunning(false);
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
          <Form.Group>
            <Form.Control
              as="textarea"
              className="text-monospace"
              style={{ wordBreak: 'break-all' }}
              rows={5}
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Button variant="primary" onClick={assemble}>{assembling ? 'Assembling...' : 'Assemble'}</Button>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              readOnly
              className="text-monospace"
              style={{ wordBreak: 'break-all' }}
              rows={5}
              value={result}
            />
            <p>{result.length}</p>
          </Form.Group>
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
            <Button variant="primary" onClick={run}>{running ? 'Running...' : 'Run'}</Button>
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
