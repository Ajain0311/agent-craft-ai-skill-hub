import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout'; // Assuming this exists from previous tasks
import { ToastNotification } from './components/common/ToastNotification';

// Assuming these pages exist from previous tasks
import { HomePage } from './pages/HomePage';
import { SkillsListPage } from './pages/SkillsListPage';
import { SkillDetailPage } from './pages/SkillDetailPage';
import { CreateSkillPage } from './pages/CreateSkillPage';
import { EditSkillPage } from './pages/EditSkillPage';
import { UserProfilePage } from './pages/UserProfilePage';

function App() {
  return (
    <Router>
      <ToastNotification /> {/* Render the toast notification component here */}
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/skills" element={<SkillsListPage />} />
          <Route path="/skills/new" element={<CreateSkillPage />} />
          <Route path="/skills/:id" element={<SkillDetailPage />} />
          <Route path="/skills/:id/edit" element={<EditSkillPage />} />
          <Route path="/profile/:userId" element={<UserProfilePage />} />
          {/* Add other routes as needed */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
