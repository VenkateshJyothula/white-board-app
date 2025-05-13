import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Canvas from './pages/Canvas';
import Profile from './pages/Profile';
import Register from './pages/Register';

// Login action to handle form submission
// export const handleLoginAction = async ({ request }) => {
//   // Get form data from the request
//   const formData = await request.formData();
//   const email = formData.get('email');
//   const password = formData.get('password');
//   try {
//     const response = await fetch('https://backend-li1v.onrender.com/api/users/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       localStorage.setItem("TOKEN", data.token);
//       return { success: true, message: "Login successful" };
//     } else {
//       return { success: false, message: data.message || "Invalid credentials" };
//     }
//   } catch (error) {
//     return { success: false, message: "An error occurred during login" };
//   }
// };

// Router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/canvas/:id',
    element: <Canvas />,
  },
  {
    path:'/register',
    element:<Register/>
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
