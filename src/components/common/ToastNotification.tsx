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
          theme: {
            primary: 'green',
            secondary: 'black',
          },
          style: {
            background: '#22c55e', // Tailwind green-500
            color: '#fff',
          },
        },
        error: {
          duration: 4000,
          theme: {
            primary: 'red',
            secondary: 'black',
          },
          style: {
            background: '#ef4444', // Tailwind red-500
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
