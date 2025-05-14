import { Col, Row } from 'antd';
import { t } from 'i18next';

const Description = (props) => {
  // const {t} = useTranslation();
  return (
    <>
      <Row
        align="middle"
        justify="center"
        style={{ margin: '50px auto', lineHeight: '1.2' }}
      >
        <Col>
          <span
            className="myFontColor myTitle"
            style={{ margin: '0 auto', textAlign: 'center' }}
          >
            {t('desc.intro')}
          </span>
          <span
            className="specialColor myTitle"
            style={{ margin: '0 auto', textAlign: 'center' }}
          >
            {' Chinese SafetyQA'}
          </span>
        </Col>
      </Row>
      <Row style={{
          maxWidth: '1000px',
          margin: '0 auto',
          justifyContent: 'center', // Ensure the Row content is centered
          textAlign: 'center', // Center text within the Col
        }}>
        <Col>
          <span className="myFontColor" style={{ margin: '0 auto' }}>
            {"安全事实问答能力评测集"}
          </span>
        </Col>
      </Row>
      <Row
        style={{
          maxWidth: '1000px',
          margin: '20px auto',
          justifyContent: 'center', // Ensure the Row content is centered
          textAlign: 'center', // Center text within the Col
        }}
        gutter={4}
      >
        <Col>
          <img src={process.env.PUBLIC_URL + "/pics/Ellipse BG.png"} alt="Ellipse" />
        </Col>
        <Col>
          <span className="myFontColor">
            {props.lastUpdateTime == null
              ? "最近更新于2024年12月12日"
              : t('desc.date', {
                  val: props.lastUpdateTime,
                  formatParams: {
                    val: { year: 'numeric', month: 'long', day: 'numeric' },
                  },
                })}
          </span>
        </Col>
      </Row>
    </>
  );
};

export default Description;
