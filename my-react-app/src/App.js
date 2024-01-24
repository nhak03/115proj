

import React, { useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom'; // npm install react-router-dom
import TerminalForm from './TerminalForm';
import MultipleChoiceForm from './MultipleChoiceForm';

function App() {
  const [showHello, setShowHello] = useState(false);

  return (
    <BrowserRouter>
      <div>
        <button onClick={() => setShowHello(true)}>Say Hello</button>
        {showHello && <p>Hello!</p>}

        <Routes>
          <Route path="/" element={<TerminalForm/>} />
          <Route path="/foo" element={<MultipleChoiceForm/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;