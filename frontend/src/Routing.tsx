import { Route, Routes } from 'react-router-dom';
import { Home } from './components/pages/Home/Home';
import { AuthPage } from './components/pages/auth/AuthPage';
import { PrivateRoute } from './components/Provider/PrivateRoute';
import { NavBar } from './components/global/navbar/NavBar';
import { CreateMedicalHistoryController } from './components/pages/medical history/form/create/CreateMedicalHistoryController';
import { EditMedicalHistoryController } from './components/pages/medical history/form/edit/EditMedicalHistoryController';
import { MedicalHistory } from './components/pages/medical history/MedicalHistory';
import { MedicalHistoryPage } from './components/pages/medical history/medical history page/MedicalHistoryPage';

export const Routing: React.FC = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route element={<NavBar />}>
          <Route path="/" element={<Home />} />
          <Route path="medical-history" element={<MedicalHistory />} />
          <Route path="medical-history/:id" element={<MedicalHistoryPage />} />
          <Route
            path="medical-history/create"
            element={<CreateMedicalHistoryController />}
          />
          <Route
            path="medical-history/:id/update"
            element={<EditMedicalHistoryController />}
          />
        </Route>
      </Route>

      <Route path="login" element={<AuthPage />} />
    </Routes>
  );
};
