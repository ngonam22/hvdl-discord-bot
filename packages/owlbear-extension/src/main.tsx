// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router";
import CustomRoute from './routes/config.tsx';
import { ConfigProvider } from 'antd';


createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#A31D1D'
        }
      }}
    >
      <BrowserRouter>
        <CustomRoute />
      </BrowserRouter>
    </ConfigProvider>

  // </StrictMode>
)
