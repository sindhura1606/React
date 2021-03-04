import React, { useState } from 'react';
import Dropdown from './Dropdown';
import Convert from './Convert';

const options = [
  {
    label: 'Afrikaans',
    value: 'af',
  },
  {
    label: 'Arabic',
    value: 'ar',
  },
  {
    label: 'Hindi',
    value: 'hi',
  },
];

//Translate will basically take a text input from user
//lets user choose a language from the dropdown.
//we are reusing the same dropdown component by passing a differnt list of options.
//convert component should convert the given text to selected language.

const Translate = () => {
    const [language, setLanguage] = useState(options[0]);
    const [text, setText] = useState('');
  
    return (
      <div>
        <div className="ui form">
          <div className="field">
            <label>Enter Text</label>
            <input value={text} onChange={(e) => setText(e.target.value)} />
          </div>
        </div>
        <Dropdown
          label="Select a Language"
          selected={language}
          onSelectedChange={setLanguage}
          options={options}
        />
        <hr />
        <h3 className="ui header">Output</h3>
        <Convert text={text} language={language} />
      </div>
    );
  };
  
  export default Translate;
