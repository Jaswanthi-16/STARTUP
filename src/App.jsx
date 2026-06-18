import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AppRoutes from './routes';

// Main App component
function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-white transition-colors duration-200">
        <Sidebar />
        <main className="flex-1 w-full pt-16 pb-16 md:pt-0 md:pb-0 md:ml-20 lg:ml-64 p-4 md:p-6 lg:p-8 transition-all duration-300">
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
