import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Notes from "./pages/Notes";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Router>
      <Route path="/" Component={Dashboard} />
      <Route path="/profile" Component={Profile} />
      <Route path="/notes" Component={Notes} />
      <Route path="/settings" Component={Settings} />
    </Router>
  );
}

export default App;
