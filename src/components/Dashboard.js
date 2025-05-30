import { CloseCircleOutlined } from '@ant-design/icons';
import { Col, Modal, Row, Space } from 'antd';
import { t } from 'i18next';
import { useState } from 'react';
import BoardCard from './boardcard';
import './modal.css';

const Dashboard = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const redirectToweb = () => {
    const isSafety = window.location.pathname.toLowerCase().includes('safety');
    const url = isSafety
      ? 'TODO:Gitpage'
      : 'TODO:Gitpage';
    window.open(url, '_blank');
  };

  return (
    <>
      {props.type == 'word' ? (
        <div style={{ width: '100%' }} onClick={showModal}>
          {t('InsightBoard')}
        </div>
      ) : (
        <img
          style={{ height: '48px', cursor: 'pointer' }}
          onClick={redirectToweb}
          src={process.env.PUBLIC_URL + "/pics/Board.png"}
        />
      )}
      <Modal
        title={t('InsightBoard')}
        width={'100%'}
        closable={false}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        bodyStyle={{ backgroundColor: 'rgba(0,0,0,0)' }}
        footer={[
          <CloseCircleOutlined
            style={{ fontSize: '30px' }}
            onClick={handleOk}
          />,
        ]}
        style={{ margin: '0px auto', backgroundColor: 'rgba(0,0,0,0)' }}
        maskStyle={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
      >
        <Row
          style={{ marginBottom: '20px' }}
          justify="center"
          gutter={[16, 16]}
        >
          <Col>
            <Space
              direction="vertical"
              size={'large'}
              style={{ width: '100%' }}
            >
              <BoardCard
                boardtitle={'GitHubGlobalIncreaseBoard'}
                boardUrl={'https://dataease.x-lab.info/link/CRLbP3OO'}
              />
            </Space>
          </Col>
          <Col>
            <Space
              direction="vertical"
              size={'large'}
              style={{ width: '100%' }}
            >
              <BoardCard
                boardtitle={'OSSSupplyChainEcoBoard'}
                boardUrl={'https://dataease.x-lab.info/link/CKqVvwi2'}
              />
            </Space>
          </Col>
        </Row>
        <Row
          style={{ marginBottom: '20px' }}
          justify="center"
          gutter={[16, 16]}
        >
          <Col>
            <Space
              direction="vertical"
              size={'large'}
              style={{ width: '100%' }}
            >
              <BoardCard
                boardtitle={'OSTechnologyAndLanguageBoard'}
                boardUrl={'https://dataease.x-lab.info/link/r6dUprs6'}
              />
            </Space>
          </Col>
          <Col>
            <Space
              direction="vertical"
              size={'large'}
              style={{ width: '100%' }}
            >
              <BoardCard
                boardtitle={'OSDbDomainInsightBoard'}
                boardUrl={'https://dataease.x-lab.info/link/4DbsV9Wb'}
              />
            </Space>
          </Col>
        </Row>
        <Row
          style={{ marginBottom: '20px' }}
          justify="center"
          gutter={[16, 16]}
        >
          <Col>
            <Space
              direction="vertical"
              size={'large'}
              style={{ width: '100%' }}
            >
              <BoardCard
                boardtitle={'GlobalBusinessOSInsightBoard'}
                boardUrl={'https://dataease.x-lab.info/link/vALpLgn8'}
              />
            </Space>
          </Col>
          <Col>
            <Space
              direction="vertical"
              size={'large'}
              style={{ width: '100%' }}
            >
              <BoardCard
                boardtitle={'MuLanOSCommunityInsightBoard'}
                boardUrl={'https://dataease.x-lab.info/link/uzKtBF1Z'}
              />
            </Space>
          </Col>
        </Row>
        <Row
          style={{ marginBottom: '20px' }}
          justify="center"
          gutter={[16, 16]}
        >
          <Col>
            <Space
              direction="vertical"
              size={'large'}
              style={{ width: '100%' }}
            >
              <BoardCard
                boardtitle={'OSProjectInsightBoard'}
                boardUrl={
                  'https://dataease.x-lab.info/link/dqMbZrBk?attachParams=eyJvcmdfbmFtZSI6ImRhdGFlYXNlIiwicmVwb19uYW1lIjoiZGF0YWVhc2UiLCJ0X21vbnRoIjoiMjAyMy0wMi0wMSJ9'
                }
              />
            </Space>
          </Col>
          <Col>
            <Space
              direction="vertical"
              size={'large'}
              style={{ width: '100%' }}
            >
              <BoardCard
                boardtitle={'DeveloperContributionBoard'}
                boardUrl={'https://dataease.x-lab.info/link/94WJEiRl'}
              />
            </Space>
          </Col>
        </Row>
        <Row
          style={{ marginBottom: '20px' }}
          justify="center"
          gutter={[16, 16]}
        >
          <Col>
            <Space
              direction="vertical"
              size={'large'}
              style={{ width: '100%' }}
            >
              <BoardCard
                boardtitle={'XSOSIInsightBoard'}
                boardUrl={'https://dataease.x-lab.info/link/E1OQKVBz'}
              />
            </Space>
          </Col>
          <Col>
            <Space
              direction="vertical"
              size={'large'}
              style={{ width: '100%' }}
            >
              <BoardCard
                boardtitle={'OSPOInsightBoard'}
                boardUrl={'https://dataease.x-lab.info/link/N1fjcnVD'}
              />
            </Space>
          </Col>
        </Row>
      </Modal>
    </>
  );
};
export default Dashboard;
