import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { NotificationProvider } from './contexts/NotificationContext';
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/layout/AdminLayout';
import DashboardLayout from './components/layout/DashboardLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ConsultasComEspecialistasPage from './pages/ConsultasComEspecialistasPage';
import ExamesEDiagnosticosPage from './pages/ExamesEDiagnosticosPage';
import MedicosPage from './pages/MedicosPage';
import TelemedicinaPage from './pages/TelemedicinaPage';
import AgendamentoPage from './pages/AgendamentoPage';
import EventosPage from './pages/EventosPage';
import NovidadesPage from './pages/NovidadesPage';
import EmpresasPage from './pages/EmpresasPage';
import MinhaContaPage from './pages/MinhaContaPage';
import ProdutosPage from './pages/ProdutosPage';

// Programas
import CheckupExecutivoPage from './pages/programas/CheckupExecutivoPage';
import SaudeHomemPage from './pages/programas/SaudeHomemPage';
import SaudeInfantilPage from './pages/programas/SaudeInfantilPage';
import SaudeMulherPage from './pages/programas/SaudeMulherPage';
import MedicinaPreventivaPage from './pages/programas/MedicinaPreventivaPage';
import DoencasRarasPage from './pages/programas/DoencasRarasPage';
import MedicinaGeriatricaPage from './pages/programas/MedicinaGeriatricaPage';
import MedicinaEsportivaPage from './pages/programas/MedicinaEsportivaPage';
import SaudeOcupacionalPage from './pages/programas/SaudeOcupacionalPage';
import ConveniosMedicosPage from './pages/programas/ConveniosMedicosPage';

import AdminDashboard from './pages/admin/AdminDashboard';
import DashboardPage from './pages/DashboardPage';
import MedicosAdmin from './pages/admin/MedicosAdmin';
import PacientesAdmin from './pages/admin/PacientesAdmin';
import EditHistoryPage from './pages/admin/EditHistoryPage';
import RelatoriosAdmin from './pages/admin/RelatoriosAdmin';
import SettingsAdmin from './pages/admin/SettingsAdmin';
import ProfilePage from './pages/patient/ProfilePage';
import HistoryPage from './pages/patient/HistoryPage';
import PaymentMethodsPage from './pages/patient/PaymentMethodsPage';
import InvoicesPage from './pages/patient/InvoicesPage';
import CareersPage from './pages/CareersPage';
import SocialResponsibilityPage from './pages/SocialResponsibilityPage';
import CorporateGovernancePage from './pages/CorporateGovernancePage';
import InvestorRelationsPage from './pages/InvestorRelationsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import TermsOfUsePage from './pages/TermsOfUsePage';
import LegalNotesPage from './pages/LegalNotesPage';

function App() {
  return (
    <Router>
      <NotificationProvider>
        <AuthProvider>
          <DataProvider>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="sobre" element={<AboutPage />} />
                <Route path="contato" element={<ContactPage />} />
                <Route path="consultas" element={<ConsultasComEspecialistasPage />} />
                <Route path="exames" element={<ExamesEDiagnosticosPage />} />
                <Route path="medicos" element={<MedicosPage />} />
                <Route path="telemedicina" element={<TelemedicinaPage />} />
                <Route path="agendamento" element={<AgendamentoPage />} />
                <Route path="eventos" element={<EventosPage />} />
                <Route path="novidades" element={<NovidadesPage />} />
                <Route path="empresas" element={<EmpresasPage />} />
                <Route path="minha-conta" element={<MinhaContaPage />} />
                <Route path="produtos" element={<ProdutosPage />} />

                {/* Rotas dos Programas */}
                <Route path="programas/check-up-executivo" element={<CheckupExecutivoPage />} />
                <Route path="programas/saude-do-homem" element={<SaudeHomemPage />} />
                <Route path="programas/saude-infantil" element={<SaudeInfantilPage />} />
                <Route path="programas/saude-da-mulher" element={<SaudeMulherPage />} />
                <Route path="programas/medicina-preventiva" element={<MedicinaPreventivaPage />} />
                <Route path="programas/doencas-raras" element={<DoencasRarasPage />} />
                <Route path="programas/medicina-geriatrica" element={<MedicinaGeriatricaPage />} />
                <Route path="programas/medicina-esportiva" element={<MedicinaEsportivaPage />} />
                <Route path="programas/saude-ocupacional" element={<SaudeOcupacionalPage />} />
                <Route path="programas/convenios-medicos" element={<ConveniosMedicosPage />} />
                <Route path="trabalhe-conosco" element={<CareersPage />} />
                <Route path="responsabilidade-social" element={<SocialResponsibilityPage />} />
                <Route path="governanca-corporativa" element={<CorporateGovernancePage />} />
                <Route path="relacionamento-investidores" element={<InvestorRelationsPage />} />
                <Route path="politica-privacidade" element={<PrivacyPolicyPage />} />
                <Route path="politica-cookies" element={<CookiePolicyPage />} />
                <Route path="termos-uso" element={<TermsOfUsePage />} />
                <Route path="notas-legais" element={<LegalNotesPage />} />
                
              </Route>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="medicos" element={<MedicosAdmin />} />
                <Route path="pacientes" element={<PacientesAdmin />} />
                <Route path="pacientes/historico/:pacienteId" element={<EditHistoryPage />} />
                <Route path="relatorios" element={<RelatoriosAdmin />} />
                <Route path="settings" element={<SettingsAdmin />} />
              </Route>
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="history" element={<HistoryPage />} />
                <Route path="payment-methods" element={<PaymentMethodsPage />} />
                <Route path="invoices" element={<InvoicesPage />} />
              </Route>
            </Routes>
          </DataProvider>
        </AuthProvider>
      </NotificationProvider>
    </Router>
  );
}

export default App;
