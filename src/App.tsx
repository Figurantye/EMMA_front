import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Auth/Login';
import MainLayout from './layout/MainLayout';
import Dashboard from './components/Dashboard';
import Employees from './components/Employees';
import { useAuth } from './context/AuthContext';
import EmployeeDetails from './components/EmployeeDetails';
import { useState } from 'react';
import EmployeeModal from './components/modals/EmployeeModal';
import GoogleCallback from './layout/GoogleCallback';
import Register from './Auth/Register';
import DepartmentDetails from './components/DepartmentDetails';
import Departments from './components/Department';
import AuthorizedEmails from './components/AuthorizedEmails';
import Unauthorized from './components/Unauthorized'
import ChecklistTemplateForm from './components/ChecklistTemplates/ChecklistTemplateForm';
import ChecklistTemplateList from './components/ChecklistTemplates/ChecklistTemplateList';
import LoadingScreen from './components/LoadingScreen';

const App = () => {
  const { isAuthenticated, loading, user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  if (loading) return <LoadingScreen component='EMMA' />;

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/google/callback" element={<GoogleCallback />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route
          path="/employees"
          element={
            isAuthenticated ? (
              <MainLayout>
                <Employees onAdd={() => setShowModal(true)} />
              </MainLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/employees/:id"
          element={
            isAuthenticated ? (
              <MainLayout>
                <EmployeeDetails />
              </MainLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/departments"
          element={
            isAuthenticated ? (
              <MainLayout>
                <Departments onAdd={() => setShowModal(true)} />
              </MainLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/departments/:id"
          element={
            isAuthenticated ? (
              <MainLayout>
                <DepartmentDetails />
              </MainLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/admin/emails"
          element={
            isAuthenticated && user?.role === 'admin' ? (
              <MainLayout>
                <AuthorizedEmails />
              </MainLayout>
            ) : (
              <Navigate to="/unauthorized" replace />
            )
          }
        />
        <Route
          path="/checklist-templates"
          element={
            isAuthenticated ? (
              <MainLayout>
                <ChecklistTemplateList />
              </MainLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/checklist-templates/new"
          element={
            isAuthenticated ? (
              <MainLayout>
                <ChecklistTemplateForm />
              </MainLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/checklist-templates/:id/edit"
          element={
            isAuthenticated ? (
              <MainLayout>
                <ChecklistTemplateForm />
              </MainLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <MainLayout>
                <Dashboard />
              </MainLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>

      <EmployeeModal visible={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default App;
