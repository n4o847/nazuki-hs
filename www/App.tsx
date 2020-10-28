import React, { useEffect, useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';

export default function App () {
  const [result, setResult] = useState('');
  const [errors, setErrors] = useState<any[]>([]);

  const addError = (error: any) => {
    setErrors((errors) => [...errors, error]);
  };

  useEffect(() => {
    (async () => {
      const { loadNazuki } = await import('./nazuki');
      const nazuki = await loadNazuki();
      setResult(await nazuki.generate(10));
    })().catch((err) => {
      addError(`${err}`);
    });
  }, []);

  return (
    <>
      <Jumbotron>
        <h1>Nazuki</h1>
        <p>[WIP] Compiler Infrastructure for Brainfuck</p>
      </Jumbotron>
      <Container>
        <div>
          {errors.map((error, idx) => (
            <Alert key={idx} variant="danger">{error}</Alert>
          ))}
        </div>
        <Form.Control
          as="textarea"
          readOnly
          className="text-monospace"
          style={{ wordBreak: 'break-all', height: '10rem' }}
          value={result}
        />
        <p>{result.length}</p>
      </Container>
    </>
  );
}
