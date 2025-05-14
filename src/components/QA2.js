import { CloseCircleOutlined } from '@ant-design/icons';
import { Card, Col, Modal, Row, Space } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './modal.css';
const QAmiss = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { t } = useTranslation();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // 添加域名检查函数
  const checkIsSafety = () => {
    return window.location.pathname.includes('safety');
  };

  return (
    <>
      <span
        onClick={showModal}
        style={{
          color: '#FFCC19',
          fontSize: '18px',
          cursor: 'pointer',
        }}
      >
        {t('tip')}
      </span>
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ flex: 1, textAlign: 'center' }}>Q&A</span>
            <CloseCircleOutlined
              style={{ fontSize: '30px', cursor: 'pointer' }}
              onClick={handleOk}
            />
          </div>
        }
        width={'100%'}
        closable={false}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        bodyStyle={{ backgroundColor: 'rgba(0,0,0,0)' }}
        footer={null}
        style={{ margin: '0px auto', backgroundColor: 'rgba(0,0,0,0)' }}
        maskStyle={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
      >
        <Row justify="center">
          <Col xs={20} sm={16} md={12} lg={10} xl={10}>
            <Space
              direction="vertical"
              size={'large'}
              style={{ width: '100%' }}
            >
              <Card>
                <h2>{t('Question.Q1')}</h2>
                {t(checkIsSafety() ? 'Answer.A1.safety' : 'Answer.A1.simple')}
              </Card>
              {/* <Card><h2>{t('Question.Q2')}</h2>{t('Answer.A2')}</Card> */}
              <Card>
                <h2>{t('Question.Q2')}</h2>
                {t('Answer.A2')}
              </Card>
            </Space>
          </Col>
        </Row>
      </Modal>
    </>
  );
};
export default QAmiss;
