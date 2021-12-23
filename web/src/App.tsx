import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import SideBar from "./components/SideBar";
import Dashboard from "./pages/Dashboard";
import ListDevices from "./pages/ListDevices";
import Details from "./pages/Details";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GroupDetail from "./pages/GroupDetail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageNotFound from "./pages/errors/404";
//window.id = 1;

function App() {
  const styles = {
    contentDiv: {
      display: "flex",
    },
    contentMargin: {
      marginLeft: "10px",
      width: "100%",
    },
  };

  return (
    <Router>
      <div style={styles.contentDiv}>
        <SideBar></SideBar>
        <div style={styles.contentMargin}>
          <Switch>
            <Route path="/Details/:id" component={Details}></Route>
            <Route path="/group/:id" component={GroupDetail}></Route>
            <Route exact path="/">
              <ListDevices />
            </Route>
            <Route path="/">
              <PageNotFound />
            </Route>
          </Switch>
        </div>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
