import React, { useEffect, useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import * as nazuki from './features/playground/lib/nazuki';

const defaultScriptSource = `\
a = scan()
b = scan()
print(a + b)
`;

const defaultAssemblySource = `\
scan
scan
add
print
`;

const defaultInput = `\
10 20
`;

export default function App() {
  const [mode, setMode] = useState<'script' | 'assembly'>('script');
  const [scriptSource, setScriptSource] = useState(defaultScriptSource);
  const [assemblySource, setAssemblySource] = useState(defaultAssemblySource);
  const [compiling, setCompiling] = useState(false);
  const [assembling, setAssembling] = useState(false);
  const [banner, setBanner] = useState('');
  const [addBanner, setAddBanner] = useState(true);
  const [result, setResult] = useState('');
  const [input, setInput] = useState(defaultInput);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const result = await nazuki.compile({ source: scriptSource });
      if (result.status === 'success') {
        setResult(result.output);
      } else {
        setAlerts([result.message]);
      }
      const banner = await nazuki.createBanner({ source: scriptSource });
      setBanner(banner.output);
    })().catch((error) => {
      setAlerts([String(error)]);
    });
  }, []);

  const compile = async () => {
    setCompiling(true);
    await nazuki.compile({ source: scriptSource }).then((result) => {
      if (result.status === 'success') {
        setResult(result.output);
        setAlerts([]);
      } else {
        setAlerts([result.message]);
      }
    }).catch((error) => {
      setAlerts([String(error)]);
    });
    const banner = await nazuki.createBanner({ source: scriptSource });
    setBanner(banner.output);
    setCompiling(false);
  };

  const assemble = async () => {
    setAssembling(true);
    await nazuki.assemble({ source: assemblySource }).then((result) => {
      if (result.status === 'success') {
        setResult(result.output);
        setAlerts([]);
      } else {
        setAlerts([result.message]);
      }
    }).catch((error) => {
      setAlerts([String(error)]);
    });
    const banner = await nazuki.createBanner({ source: assemblySource });
    setBanner(banner.output);
    setAssembling(false);
  };

  const run = async () => {
    setRunning(true);
    await nazuki.run({ program: result, input }).then((result) => {
      if (result.status === 'success') {
        setOutput(result.output);
        setError('');
      } else {
        setOutput('');
        setError(result.message);
      }
    }).catch((error) => {
      setOutput('');
      setError(String(error));
    });
    setRunning(false);
  };

  const target = addBanner ? banner + '\n' + result : result;

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
                {
                  mode === 'script' ? (
                    <Form.Control
                      as="textarea"
                      className="text-monospace"
                      style={{ wordBreak: 'break-all' }}
                      rows={10}
                      spellCheck={false}
                      value={scriptSource}
                      onChange={(e) => setScriptSource(e.target.value)}
                    />
                  ) : (
                    <Form.Control
                      as="textarea"
                      className="text-monospace"
                      style={{ wordBreak: 'break-all' }}
                      rows={10}
                      spellCheck={false}
                      value={assemblySource}
                      onChange={(e) => setAssemblySource(e.target.value)}
                    />
                  )
                }
              </Form.Group>
              <Form.Group>
                <ToggleButtonGroup
                  type="radio"
                  name="mode"
                  className="mr-2"
                  onChange={(mode) => setMode(mode)}
                  defaultValue={mode}
                >
                  <ToggleButton value="script" variant="secondary">Script</ToggleButton>
                  <ToggleButton value="assembly" variant="secondary">Assembly</ToggleButton>
                </ToggleButtonGroup>
                {
                  mode === 'script' ? (
                    <Button variant="primary" onClick={compile}>{compiling ? 'Compiling...' : 'Compile'}</Button>
                  ) : (
                    <Button variant="primary" onClick={assemble}>{assembling ? 'Assembling...' : 'Assemble'}</Button>
                  )
                }
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
                  value={target}
                />
                <p>{target.length}</p>
                <Form.Check
                  type="checkbox"
                  id="add-banner"
                  label="Banner"
                  checked={addBanner}
                  onChange={() => setAddBanner((addBanner) => !addBanner)}
                />
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
