import React, { DetailedReactHTMLElement } from 'react';
import ReactDOM from 'react-dom';

interface Props {
  className: string
}
const props: Props = { className: 'title' };
const el: DetailedReactHTMLElement<Props, HTMLHeadElement> = React.createElement<Props, HTMLHeadingElement>('h1', props, 'Hello Wold');
ReactDOM.render(el, document.getElementById('root'));