import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./App.scss";

import Router from "./router";

import Header from './components/layout/header/Header';
import Footer from './components/layout/footer/Footer';


function App() {
  return (
      <div className="App">
        <Header></Header>
        <Router></Router>
        <Footer></Footer>
      </div>
  );
}

export default App;
