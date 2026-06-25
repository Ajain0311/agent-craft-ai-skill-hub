import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ToastNotification } from './components/common/ToastNotification';
import { HomePage } from './pages/HomePage';
import { SkillsListPage } from './pages/SkillsListPage';
import { SkillDetailPage } from './pages/SkillDetailPage';
import { NewSkillPage } from './pages/NewSkillPage';
import EditSkillPage from './pages/EditSkillPage';

function App() {
  return (
    <Router>
      <ToastNotification />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/skills" element={<SkillsListPage />} />
          <Route path="/skills/new" element={<NewSkillPage />} />
          <Route path="/skills/:id" element={<SkillDetailPage />} />
          <Route path="/skills/:skillId/edit" element={<EditSkillPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
