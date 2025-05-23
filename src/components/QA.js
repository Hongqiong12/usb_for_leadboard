import { CloseCircleOutlined } from '@ant-design/icons';
import { Card, Col, Modal, Row, Space } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './modal.css';
const QA = (props) => {
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
      {props.type === 'word' ? (
        <div style={{ width: '100%' }} onClick={showModal}>
          QA
        </div>
      ) : (
        <img
          alt="Q&A"
          style={{ height: '48px', width: '48px', cursor: 'pointer' }}
          onClick={showModal}
          src={process.env.PUBLIC_URL + "/pics/Q&A.png"}
        />
      )}

      <Modal
        title="Q&A"
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
              /<Card>
                <h2>{t('Question.Q2')}</h2>
                {t('Answer.A2')}
              </Card>
              {/* <Card>
                <h2>{t('Question.Q3')}</h2>
                {t('Answer.A3')}
              </Card> */}
            </Space>
          </Col>
        </Row>
      </Modal>
    </>
  );
};
export default QA;
