import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import WebFont from 'webfontloader';

//==================== Web Font Loader

/**
  * For some reason russian text won't get font styles when using this method unlike when using ccs file method. 
*/

WebFont.load({
    google: {
      families: ['Raleway:300,400,700', 'sans-serif'],
      subsets: ['cyrillic-ext']
    }
  });

//==================== Root Element

ReactDOM.render(<App />, document.getElementById('root'));


serviceWorker.unregister();