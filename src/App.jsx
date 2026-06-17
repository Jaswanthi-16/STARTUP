import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AppRoutes from './routes';

// Main App component
function App() {
  return (
    // Wrap the entire application in BrowserRouter to enable routing
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
        {/* Render Sidebar on the left */}
        <Sidebar />
        {/* Main content container where routes are rendered, offset by sidebar width */}
        <main className="flex-1 ml-64 p-8">
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
