import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Accueil from "./components/Accueil";
import FormulaireSouscription from "./components/FormulaireSouscription";
import FormulaireSimulation from "./components/FormulaireSimulation";

const App = () => {
    return (
      <SubscriptionProvider>
        <Router>
            <div className="container-fluid min-h-screen">
               
                <Routes>
                    <Route path="/" element={<Accueil />} />
                    <Route path="/simulation" element={<FormulaireSimulation />} />
                    <Route path="/souscription" element={<FormulaireSouscription />} />
                </Routes>
            </div>
        </Router>
      </SubscriptionProvider>
    );
};

export default App;
