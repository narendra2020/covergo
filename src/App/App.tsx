
import React from 'react';

import WelcomeComponent from './components/welcome'
import InsuranceFormComponent from './components/insuranceform'
import InsuranceSummaryComponent from './components/insurancesummary'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


const App = () =>  {
    return (
        <Router>
            <Routes>
              <Route  path="/" element={<WelcomeComponent/>}/>
              <Route  path="/start" element={<InsuranceFormComponent/>}/>
              <Route  path="/summary" element={<InsuranceSummaryComponent/>}/>
            </Routes>
        </Router>
      );
}

export default App;
