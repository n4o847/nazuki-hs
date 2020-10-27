import React, { useEffect, useState } from 'react';
import { loadNazuki } from './nazuki';

export default function App () {
  const [result, setResult] = useState('');

  useEffect(() => {
    (async () => {
      const nazuki = await loadNazuki();
      setResult(await nazuki.generate(10));
    })();
  }, []);

  return (
    <div>
      <h1>Nazuki</h1>
      <textarea
        readOnly
        style={{ boxSizing: 'border-box', width: '100%', height: '10rem' }}
        value={result}
      />
      <div>{result.length}</div>
    </div>
  );
}
