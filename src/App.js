import "./App.css";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import { getUserAuth } from "./actions";
import { connect } from "react-redux";
function App(props) {
  useEffect(() => {
    props.getUserAuth();
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/home">
            <Header />
            <Home />
          </Route>
          <Route exact path="/aboutus">
            About us
          </Route>
          <Route>Error</Route>
        </Switch>
      </Router>
    </div>
  );
}
const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => ({
  getUserAuth: () => dispatch(getUserAuth()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
/*


 



*/
// Video Left from 6:55:16s
