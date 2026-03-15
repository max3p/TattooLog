import { Routes, Route } from 'react-router-dom';
import { SearchPage } from '@/pages/search-page';
import { AccountPage } from '@/pages/account-page';
import { SessionWizardPage } from '@/pages/session-wizard-page';
import { SessionDetailPage } from '@/pages/session-detail-page';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/account/:id" element={<AccountPage />} />
      <Route path="/account/:id/sessions/new" element={<SessionWizardPage />} />
      <Route path="/account/:id/sessions/:sessionId" element={<SessionDetailPage />} />
      <Route path="/account/:id/sessions/:sessionId/edit" element={<SessionWizardPage />} />
    </Routes>
  );
}

export default App;
