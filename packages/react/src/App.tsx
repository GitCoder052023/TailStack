import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { MainLayout } from '@/components/layout/main-layout';
import { HomePage } from '@/pages/home';
import { WeatherPage } from '@/pages/weather';
import { DocsPage } from '@/pages/docs';
import { DocsOverview } from '@/pages/docs/overview';
import { GettingStartedPage } from '@/pages/docs/getting-started';
import { ArchitecturePage } from '@/pages/docs/architecture';
import { FrontendPage } from '@/pages/docs/frontend';
import { BackendPage } from '@/pages/docs/backend';
import { NotFoundPage } from '@/pages/not-found';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="/docs" element={<DocsPage />}>
            <Route index element={<DocsOverview />} />
            <Route path="getting-started" element={<GettingStartedPage />} />
            <Route path="architecture" element={<ArchitecturePage />} />
            <Route path="frontend" element={<FrontendPage />} />
            <Route path="backend" element={<BackendPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;
