// SSA_Page.js
import { Image, Layout } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MyFooter from './components/footer';
import ScrollTopButton from './components/scrollTopButton';
import MyTable from './components/SSA_table';
import Description from './SSA_Description';
import './index.css';

console.log('[LOG] src/SSA_Page.js 文件开始解析');

const { Content } = Layout;

const SSAPage = () => {
  console.log('[LOG] SSAPage 组件开始渲染');
  useEffect(() => {
    document.title = 'Beyond Safe Answer';
  }, []);

  return (
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
      <Content className="container">
        <Description />
      </Content>
      <MyTable />
      <MyFooter />
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
  );
};

export default SSAPage;