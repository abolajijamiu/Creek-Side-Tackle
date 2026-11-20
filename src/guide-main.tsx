import { createRoot } from 'react-dom/client';
import { Guide } from './guide/Guide';
import './index.css';
import './sections.css';
import './guide/guide.css';

createRoot(document.getElementById('root')!).render(<Guide />);
