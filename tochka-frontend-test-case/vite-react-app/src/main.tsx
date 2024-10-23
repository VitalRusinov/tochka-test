import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

async function enableMocking() {
    if (process.env.NODE_ENV === "development") {
        const { worker } = await import("./mocks/browser");

        return worker.start();
    }
}

const rootElement = ReactDOM.createRoot(document.getElementById('root')!);

enableMocking().then(() => {
    rootElement.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    );
});
