import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AppRoutes from './routes';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

// Main App component
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-slate-200/50 dark:bg-black/50 font-sans text-slate-900 dark:text-white transition-colors duration-200">
          <Toaster position="top-right" />
          {/* Centered fluid container for screens > 1440px */}
          <div className="flex mx-auto max-w-[1440px] min-h-screen bg-slate-50 dark:bg-slate-900 shadow-2xl relative">
            <Sidebar />
            <main className="flex-1 w-full min-w-0 pt-16 pb-16 md:pt-0 md:pb-0 p-4 md:p-6 lg:p-8 transition-all duration-300">
              <AppRoutes />
            </main>
          </div>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
