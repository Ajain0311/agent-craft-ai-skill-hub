import { Toaster } from 'react-hot-toast';

export function ToastNotification() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Define default options for specific toast types
        className: 'font-sans text-sm',
        duration: 3000,
        style: {
          background: '#333',
          color: '#fff',
        },
        success: {
          duration: 3000,
          style: {
            background: '#22c55e',
            color: '#fff',
          },
        },
        error: {
          duration: 4000,
          style: {
            background: '#ef4444',
            color: '#fff',
          },
        },
        loading: {
          duration: Infinity, // Keep loading toasts open until dismissed
          style: {
            background: '#3b82f6', // Tailwind blue-500
            color: '#fff',
          },
        },
      }}
    />
  );
}
