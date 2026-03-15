import { Routes, Route } from 'react-router-dom';
import { SearchPage } from '@/pages/search-page';
import { AccountPage } from '@/pages/account-page';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/account/:id" element={<AccountPage />} />
    </Routes>
  );
}

export default App;
