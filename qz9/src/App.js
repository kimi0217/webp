import React from 'react';
import './App.css';

import Hello_cgu from './hello_cgu';

function changeText(event) {
    event.target.innerText=event.target.innerText+'被點了';
}

function App() {
    return (
        <div className="App">
            <Hello_cgu/>

            <div id='but'>
                <button onClick={changeText}>第1個按鍵</button>
                <button onClick={changeText}>第2個按鍵</button>
                <button onClick={changeText}>第3個按鍵</button>
                <button onClick={changeText}>第4個按鍵</button>
                <button onClick={changeText}>第5個按鍵</button>
                <button onClick={changeText}>第6個按鍵</button>
                <button onClick={changeText}>第7個按鍵</button>
                <button onClick={changeText}>第8個按鍵</button>
                <button onClick={changeText}>第9個按鍵</button>
                <button onClick={changeText}>第10個按鍵</button>
            </div>
        </div>
    );
}

export default App;