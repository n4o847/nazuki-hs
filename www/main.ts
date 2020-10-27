import { loadNazuki } from './nazuki';

(async () => {
  const nazuki = await loadNazuki();
  (document.getElementById('target') as HTMLTextAreaElement).value = await nazuki.generate(10);
})();
