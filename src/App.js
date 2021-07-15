import React, { useEffect, useState } from "react";
import "./App.css";
import "../node_modules/react-vis/dist/style.css";
import { Link, Route, Switch, withRouter } from "react-router-dom";
import { KeyboardArrowRight, KeyboardArrowLeft } from "@material-ui/icons";
import ConsommationPage from "./Global/Pages/Consommation";
import ProductionPage from "./Global/Pages/Production";

function App(props) {
  const [routeIndex, setRouteIndex] = useState({
    index: 0,
    title: "",
  });

  const setRouteInfo = (location) => {
    switch (location.pathname) {
      case "/":
        setRouteIndex({
          index: 0,
          title: "La consommation d'électricité en Tunisie",
        });
        break;
      case "/production":
        setRouteIndex({
          index: 1,
          title: "La production d'électricité par type d'equipment",
        });
        break;
    }
  };

  useEffect(() => {
    setRouteInfo(props.location);
    props.history.listen((location, action) => {
      setRouteInfo(location);
    });
  }, []);
  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          className="appHeaderPres"
          style={{ width: "100%", marginLeft: "3em" }}
        >
          <img
            src="https://www.steg.com.tn/fr/institutionnel/logo_steg.png"
            width="35px"
            alt="logo-steg"
          />
          <h2 id="appHeaderText">{routeIndex.title}</h2>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {routeIndex.index !== 0 && (
            <Link to="/" style={{ color: "white" }}>
              <KeyboardArrowLeft style={{ fontSize: 35, margin: 35 }} />
            </Link>
          )}

          {routeIndex.index !== 1 && (
            <Link to="/production" style={{ color: "white" }}>
              <KeyboardArrowRight
                style={{ fontSize: 35, margin: 35, marginRight: 50 }}
              />
            </Link>
          )}
        </div>
      </div>
      <Switch>
        <Route path="/production" component={ProductionPage} indx={1} />
        <Route path="/" component={ConsommationPage} indx={0} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
