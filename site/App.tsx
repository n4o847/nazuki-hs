import React, { useEffect, useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Nazuki } from '../pkg/types';

const defaultSource = `
scan
scan
add
print
`.slice(1);

const defaultInput = `
10 20
`.slice(1);

export default function App () {
  const [nazuki, setNazuki] = useState<Nazuki>();
  const [source, setSource] = useState(defaultSource);
  const [assembling, setAssembling] = useState(false);
  const [result, setResult] = useState('');
  const [input, setInput] = useState(defaultInput);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const { loadNazuki } = await import('../pkg');
      const nazuki = await loadNazuki();
      setNazuki(nazuki);
      const result = await nazuki.assemble(source);
      setResult(result);
    })().catch((err) => {
      setAlerts([String(err)]);
    });
  }, []);

  const assemble = () => {
    if (!nazuki) return;
    setAssembling(true);
    nazuki.assemble(source).then((result) => {
      setResult(result);
      setAlerts([]);
      setAssembling(false);
    }).catch((error) => {
      setAlerts([String(error)]);
      setAssembling(false);
    });
  };

  const run = () => {
    if (!nazuki) return;
    setRunning(true);
    nazuki.run(result, input).then((output) => {
      setOutput(output);
      setError('');
      setRunning(false);
    }).catch((error) => {
      setOutput('');
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
            <Alert key={idx} variant="danger">
              <pre className="m-0" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                {alert}
              </pre>
            </Alert>
          ))}
        </div>
        <Form>
          <Row>
            <Col>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  className="text-monospace"
                  style={{ wordBreak: 'break-all' }}
                  rows={10}
                  spellCheck={false}
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Button variant="primary" onClick={assemble}>{assembling ? 'Assembling...' : 'Assemble'}</Button>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  readOnly
                  className="text-monospace"
                  style={{ wordBreak: 'break-all' }}
                  rows={10}
                  spellCheck={false}
                  value={result}
                />
                <p>{result.length}</p>
              </Form.Group>
            </Col>
          </Row>
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
              spellCheck={false}
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
              spellCheck={false}
              value={error}
            />
          </Form.Group>
        </Form>
      </Container>
    </>
  );
}
