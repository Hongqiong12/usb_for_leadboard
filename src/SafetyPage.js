// SafetyPage.js
import { Image, Layout } from 'antd';
import React from 'react';
import MyFooter from './components/footer';
// import MyHeader from './components/header';
import ScrollTopButton from './components/scrollTopButton';
import MyTable from './components/table1';
import Description from './Description1';
import { useEffect } from 'react';
import './index.css';

const { Content } = Layout;

const SafetyPage = () => {
  useEffect(() => {
    document.title = 'Chinese SafetyQA';
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
      {/* <MyHeader /> */}
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

export default SafetyPage;
