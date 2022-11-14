import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import TaskForm from "./pages/TaskForm";
import Home from "./pages/Home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task">
          <Route index element={<TaskForm />} />
          <Route path=":id" element={<TaskForm />} />
        </Route>
      </Routes>
      <ToastContainer autoClose={2000} />
    </BrowserRouter>
  );
}

export default App;
