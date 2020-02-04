// import '@babel/polyfill';
function counter () {
    const arr = [
        new Promise(() => {}),
        new Promise(() => {})
    ];
    arr.map((item) => {
        console.log('item>>>', item);
    });
    console.log('counter....ddd....')
}

import React, { Component } from 'react';
import ReactDom from 'react-dom';

class App extends Component {
    render () {
        return (
            <div>
                Hello React!!!!
            </div>
        );
    }
}

ReactDom.render(<App />, document.getElementById('root'));
export default counter;