import './App.css';
import Sidebar from './Components/Sidebar';
import { Chat } from './Components/Chat';
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Home from './Components/Home';

function App() {

  // using routing to navigation, sidebar in main component and chat will be based on dynamic id
  const router = createBrowserRouter([
    { path: "/", element: <Sidebar /> , errorElement: <Home />, children: [
      { index: true, element: <Home /> },
      { path: ":contactId", element: <Chat /> }
    ]}
  ])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
