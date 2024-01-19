import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TabProvider } from 'providers/TabProvider/TabProvider';

ReactDOM.render(
    <React.StrictMode>
        <TabProvider>
            <App />
        </TabProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
