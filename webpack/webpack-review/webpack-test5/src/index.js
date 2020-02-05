// import React, { Component } from 'react';
// import ReactDom from 'react-dom';
import { add } from './a.js';
add();

// class App extends Component {
//     render () {
//         return (
//             <div>
//                 Hello React!!!!
//             </div>
//         );
//     }
// }

// ReactDom.render(<App />, document.getElementById('root'));

if (module.hot) {
    console.log('hot');
    module.hot.accept();
}