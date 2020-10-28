import React, { useEffect, useState } from 'react';

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
    <div>
      <h1>Nazuki</h1>
      <div>
        {errors.map((error) => (
          <p>{error}</p>
        ))}
      </div>
      <textarea
        readOnly
        style={{ boxSizing: 'border-box', width: '100%', height: '10rem' }}
        value={result}
      />
      <div>{result.length}</div>
    </div>
  );
}
