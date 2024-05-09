import './App.css';
import Sidebar from './Components/Sidebar';
import { Chat } from './Components/Chat';
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Home from './Components/Home';

function App() {

  const router = createBrowserRouter([
    { path: "/", element: <Sidebar /> , errorElement: <Home />, children: [
      { index: true, element: <Home /> },
      { path: ":contactId", element: <Chat /> }
    ]}
  ])

  return (
    <div className="App">
      {/* <Sidebar />
      <Chat /> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
