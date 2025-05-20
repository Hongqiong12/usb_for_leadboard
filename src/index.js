import { ConfigProvider, Image, Layout } from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import MyFooter from './components/footer';
import MyHeader from './components/header';
import ScrollTopButton from './components/scrollTopButton';
import Description from './Description';
import './index.css';
import SafetyPage from './SafetyPage';
import SSAPage from './SSA_Page';
import SSATable from './components/SSA_table';
// 确保i18n在应用初始化之前完成加载
import './util/i18n';

console.log('[LOG] src/index.js 启动');

const { Content } = Layout;

const META_URL = 'https://oss.x-lab.info/open_leaderboard/meta.json';

const App = () => {
  console.log('[LOG] App 组件开始渲染');
  const NODE_ENV = process.env.NODE_ENV;
  if (NODE_ENV !== 'development') {
    console.log = function () {};
  }
  let [lastUpdateTime, setLastUpdateTime] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    fetch(META_URL)
      .then((res) => res.json())
      .then((data) => {
        let date = new Date(data.lastUpdatedAt);
        setLastUpdateTime(date);
      })
      .catch(error => {
        console.log('获取元数据失败:', error);
        // 继续执行，不中断渲染
      });
  }, []);

  let year = null, monthIndex = null;
  if (lastUpdateTime) {
    const lastDataAvailableMonth = new Date(lastUpdateTime);
    lastDataAvailableMonth.setDate(0);
    year = lastDataAvailableMonth.getFullYear();
    monthIndex = lastDataAvailableMonth.getMonth();
  }

  return (
    <Router>
      <ConfigProvider>
        <Layout
          className="layout"
          style={{ backgroundColor: 'rgba(0,0,0,0)', minWidth: '320px' }}
        >
          <Image
            preview={false}
            style={{ zIndex: -1, position: 'absolute', top: 0 }}
            width={'100%'}
            src={process.env.PUBLIC_URL + "/pics/Header BG.png"}
          />
          <ScrollTopButton />
          <MyHeader />
          <Routes>
            <Route path="/safety" element={<SafetyPage />} />
            <Route path="/ssa" element={<SSAPage />} />
            <Route path="/" element={<>
              <Content className="container">
                <Description lastUpdateTime={lastUpdateTime} />
              </Content>
              {/* 假设保留 SSATable */}
              <SSATable />
              <MyFooter />
            </>} />
          </Routes>
          <Image
            style={{
              zIndex: -2,
              position: 'absolute',
              height: '2000px',
              bottom: '0px',
            }}
            preview={false}
            src={process.env.PUBLIC_URL + "/pics/Bubble BG.png"}
          />
        </Layout>
      </ConfigProvider>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
