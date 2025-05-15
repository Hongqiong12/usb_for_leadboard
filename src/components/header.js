import { MenuOutlined } from '@ant-design/icons';
import { Dropdown, Menu, message } from 'antd';
import 'antd/dist/antd.css';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../util/i18n';
import Dashboard from './Dashboard';
import Dictionary from './Dictionary';
import './header.css';
import QA from './QA';

const MyHeader = () => {
  const { t } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  
  const redirectToGitHub = () => {
    const path = window.location.pathname;
    const repoUrl = path.includes('safety')
      ? 'https://anonymous.4open.science/r/USB-SafeBench-4EE3'
      : 'https://anonymous.4open.science/r/USB-SafeBench-4EE3';
    window.open(repoUrl, '_blank');
  };

  const redirectToweb = () => {
    window.open('TODO:Gitpage', '_blank');
  };
  
  const changeLanguage = () => {
    let lan;
    if (language == 'zh') {
      lan = 'en';
      message.info('switched to English');
    } else {
      lan = 'zh';
      message.info('切换为中文');
    }
    i18n.changeLanguage(lan);
    setLanguage(lan);
  };
  
  const MyMenu = () => {
    return (
      <Menu style={{ background: 'rgba(255,255,255,0)' }} mode="horizontal">
        <Menu.Item key="dashboard">
          <Dashboard type="word" />
        </Menu.Item>
        {/* <Menu.Item key="glossary">
          <Dictionary type="word" />
        </Menu.Item> */}
        <Menu.Item key="QA">
          <QA type="word" />
        </Menu.Item>
        {<Menu.Item key="translate">
          <a href="javascript:" onClick={changeLanguage}>
            中/En
          </a>
        </Menu.Item> }
        <Menu.Item key="translate">
          <a href="javascript:" onClick={redirectToGitHub}>
            GitHub
          </a>
        </Menu.Item>
      </Menu>
    );
  };
  
  return (
    <div className="header">
      <div className="header-content">
        <div className="header-logo">
          {/* 删除的logo图片 */}
        </div>
        <div className="header-pc">
          {/* <img
            style={{ height: '48px', width: '48px', cursor: 'pointer' }}
            onClick={changeLanguage}
            src="/pics/translation.png"
            alt={t('loading')}
          /> */}
          <img
            alt="Q&A"
            style={{
              height: '48px',
              width: '48px',
              cursor: 'pointer',
              borderRadius: '50%',
              border: '2px solid #CFCAFA',
              mixBlendMode: 'multiply',
            }}
            onClick={redirectToGitHub}
            src={process.env.PUBLIC_URL + "/pics/GitHub.png"}
          />
          <Dashboard />
          <Dictionary />
          <QA />
        </div>
        <div className="header-phone">
          <Dropdown overlay={MyMenu} className="">
            <MenuOutlined style={{ fontSize: '1rem' }} />
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default MyHeader;
