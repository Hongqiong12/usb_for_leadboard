import { Card, Col, message, Row, Table } from 'antd';
import 'antd/dist/antd.css';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import expandObject from '../util/expandObject';
import QAmiss from './QA2';
import TablePanel from './TablePanel';
import MyAvatar from './avatar';
import PointRender from './changeNumber';
import Trophy from './rankTrophy';
import RoundFloat from './resolveFloat';
import './table.css';

const fetchCSVData = async () => {
    const response = await fetch(process.env.PUBLIC_URL + '/model_safety.csv');
    const text = await response.text();
    const rows = text.split('\n').slice(1); // 去掉标题行
    return rows.map(row => {
      const [rank, model, url, overall, first, second, third, fourth, fifth, sixth, senventh] = row.split(',');
      return { rank, model, url, overall, first, second, third, fourth, fifth, sixth, senventh};
    });
};


const activityColumns = (object, t_month) => [
  {
    title: t('rank'),
    dataIndex: 'rank',
    width: '5%',
    align: 'center',
    render: Trophy,
    fixed: 'left',
  },
  {
    title: t('model'),
    dataIndex: 'model',
    align: 'center',
    width: '20%',
    render: (text, row) => (
      <a
        href={row.url} // 使用 first 字段作为超链接 URL
        target="_blank"
        rel="noreferrer"
      >
        {text} // 显示的文本是 model
      </a>
    ),
  },
  {
    title: t('insight_board'),
    dataIndex: 'source',
    align: 'center',
    width: '10%',
    render: function (text, row, index) {
      return dashboard(text, index, t_month, object);
    },
  },
  {
    title: t('activity'),
    dataIndex: 'overall',
    align: 'right',
    width: '20%',
  },
  {
    title: 'first',
    dataIndex: 'first',
    width: '10%',
    align: 'left',
  },
];
const activityDetailColumns = (object, t_month) => [
  {
    title: t('rank'),
    dataIndex: 'rank',
    width: '5%',
    align: 'center',
    render: Trophy,
    fixed: 'left',
  },
  {
    title: t('model'),
    dataIndex: 'model',
    align: 'center',
    width: '15%',
    render: (text, row) => (
      <a
        href={row.url} // 使用 first 字段作为超链接 URL
        target="_blank"
        rel="noreferrer"
      >
        {text}
      </a>
    ),
  },
  {
    title: 'overall',
    dataIndex: 'overall',
    width: '10%',
    align: 'center',
    render: (text) => text ? RoundFloat(text) : '-',
    sorter: (a, b) => parseFloat(a.first || 0) - parseFloat(b.first || 0),
  },
  {
    title: '谣言错误',
    dataIndex: 'first',
    align: 'center',
    width: '10%',
    render: (text) => text ? RoundFloat(text) : '-',
    sorter: (a, b) => parseFloat(a.overall || 0) - parseFloat(b.overall || 0),
  },
  {
    title: '违法违规',
    dataIndex: 'second',
    width: '10%',
    align: 'center',
    render: (text) => text ? RoundFloat(text) : '-',
    sorter: (a, b) => parseFloat(a.first || 0) - parseFloat(b.first || 0),
  },
  {
    title: '身心健康',
    dataIndex: 'third',
    width: '10%',
    align: 'center',
    render: (text) => text ? RoundFloat(text) : '-',
    sorter: (a, b) => parseFloat(a.second || 0) - parseFloat(b.second || 0),
  },
  {
    title: '辱骂仇恨',
    dataIndex: 'fourth',
    width: '10%',
    align: 'center',
    render: (text) => text ? RoundFloat(text) : '-',
    sorter: (a, b) => parseFloat(a.third || 0) - parseFloat(b.third || 0),
  },
  {
    title: '偏见歧视',
    dataIndex: 'fifth',
    width: '10%',
    align: 'center',
    render: (text) => text ? RoundFloat(text) : '-',
    sorter: (a, b) => parseFloat(a.fourth || 0) - parseFloat(b.fourth || 0),
  },
  {
    title: '伦理道德',
    dataIndex: 'sixth',
    width: '10%',
    align: 'center',
    render: (text) => text ? RoundFloat(text) : '-',
    sorter: (a, b) => parseFloat(a.fifth || 0) - parseFloat(b.fifth || 0),
  },
  {
    title: '安全理论知识',
    dataIndex: 'senventh',
    width: '10%',
    align: 'center',
    render: (text) => text ? RoundFloat(text) : '-',
    sorter: (a, b) => parseFloat(a.sixth || 0) - parseFloat(b.sixth || 0),
  },
];
const open_rankColumns = (object, t_month) => [
  {
    title: t('rank'),
    dataIndex: 'rank',
    width: '5%',
    render: Trophy,
    align: 'center',
    fixed: 'left',
  },
  ...(object == 'actor'
    ? [
        {
          title: t('avatar'),
          dataIndex: 'id',
          width: '5%',
          align: 'center',
          render: MyAvatar,
          fixed: 'left',
        },
      ]
    : []),
  {
    title: t(object),
    dataIndex: 'name',
    width: '20%',
    align: 'center',
    render: function (text) {
      if (object !== 'company') {
        return (
          <a
            href={'https://github.com/' + text}
            target="_blank"
            rel="noreferrer"
          >
            {text}
          </a>
        );
      } else {
        return text;
      }
    },
  },
  {
    title: t('insight_board'),
    dataIndex: 'name',
    align: 'center',
    width: '10%',
    render: function (text, row, index) {
      return dashboard(text, index, t_month, object);
    },
  },
  {
    title: t('influence'),
    dataIndex: 'value',
    width: '20%',
    align: 'right',
    render: (text, row, index) => {
      return RoundFloat(text);
    },
  },
  {
    title: '',
    dataIndex: 'valueDelta',
    width: '10%',
    align: 'left',
    render: (text, row, index) => {
      text = RoundFloat(text);
      return PointRender(text, row, index);
    },
  },
];
const solveDate = (year, month) => {
  if (year === null && month === null) {
    return 'not found';
  }
  if (month === null) {
    return year + '年';
  }
  return year + '年' + (month + 1) + '月';
};

function dashboard(text, index, t_month, object) {
  if (text.includes('huggingface')) {
    let [org_name, repo_name] = text.split('/');
    const t_month_copy = t_month + ' ' + '00:00:00';
    let params = {
      org_name,
      repo_name,
      t_month_copy,
      t_month,
    };
    return (
      <a
        href={
            text
        }
        target="_blank"
        rel="noreferrer"
      >
        <img
          alt="dashboard"
          src="/pics/dashboard.png"
          style={{ height: '20px', width: '20px' }}
        />
      </a>
    );
  } else {
    let params = {
      communityName: text,
    };
    let jsonString = JSON.stringify(params);
    return (
      <a
        href={
            text
        }
        target="_blank"
        rel="noreferrer"
      >
        <img
          alt="dashboard"
          src="/pics/dashboard1.png"
          style={{ height: '20px', width: '20px' }}
        />
      </a>
    );
  }
}

function DateTitle(props) {
  return <h1>{solveDate(props.year, props.month)}</h1>;
}

function MyTable(props) {
  const [state, setState] = useState({
    object: 'company',
    index: 'activity',
    region: 'chinese',
    showDetail: true,
    hasDetail: true,
    data: [],
    showSize: 25,
    loading: true,
    url: '', // base + index + object + region + yearmonth + .json
    base: 'https://oss.x-lab.info/open_leaderboard/',
    year: null, // 字符串格式
    month: null, // 整数格式，0表示1月，1表示2月..., null for year type time
    type: 'month',
    search: null,
  });

  // 请求一次数据更新表格。如果还没读取好配置文件则不请求数据。
//   useEffect(() => {
//     if (props.year == null && props.month == null) {
//       console.log('the first loading');
//       return;
//     }
//     updateDate({
//       year: String(props.year),
//       month: props.month,
//     });
//   }, [props]);
    useEffect(() => {
        const loadData = async () => {
            const csvData = await fetchCSVData(); // 或 fetchJSONLData
            setState((prevState) => ({
                ...prevState,
                data: csvData, // 数据源
                columns: activityDetailColumns(csvData), // 设置动态表格列
                loading: false,
            }));

        };

        loadData();
    }, []);

    useEffect(() => {
    }, [state.data]);  // 只在 data 更新时打印日志

  const expandData = () => {
    setState({
      ...state,
      showSize: state.showSize + 25,
    });
  };
  const updateDate = (newstate) => {
    // 先获取原先的表格属性
    let {
      base,
      object,
      index,
      region,
      month,
      year,
      columns,
      showDetail,
      hasDetail,
      type,
      search,
    } = state;
    // 然后把表格改为加载中的状态
    setState({ ...state, ...newstate, loading: true });
    // 如果 newstate 有对应的属性，则进行更新
    if (newstate.hasOwnProperty('object')) object = newstate.object;
    if (newstate.hasOwnProperty('index')) index = newstate.index;
    if (newstate.hasOwnProperty('region')) region = newstate.region;
    if (newstate.hasOwnProperty('month')) month = newstate.month;
    if (newstate.hasOwnProperty('year')) year = newstate.year;
    if (newstate.hasOwnProperty('showDetail')) showDetail = newstate.showDetail;
    if (newstate.hasOwnProperty('type')) type = newstate.type;
    if (newstate.hasOwnProperty('search')) search = newstate.search;

    //获取数据大屏的't_month'参数
    let myyear = newstate.year == null ? state.year : newstate.year;
    let mymonth = newstate.month == null ? state.month : newstate.month;

    mymonth = ('' + (1 + mymonth)).padStart(2, '0');
    let t_month = `${myyear}-${mymonth}-01`;

    // 根据 index 和 showDetail 改变表格的 columns 格式
    if (index == 'activity') {
      columns = activityColumns(object, t_month);
      hasDetail = true;
    }
    if (index == 'activity' && showDetail == true) {
      columns = activityDetailColumns(object, t_month);
      hasDetail = true;
    }
    if (index == 'open_rank') {
      columns = open_rankColumns(object, t_month);
      hasDetail = false;
      showDetail = false;
    }
    // 如果是年份数据，则把 month 置为 null。
    // TODO：待验证，如果从年份数据切换到月份数据，似乎会自动回到原来 month 值？
    if (type == 'year') {
      month = null;
    }
    // 以当前的属性构造请求 url
    let url = base + index + '/' + object + '/' + region + '/';
    if (month === null) {
      url += year + '.json';
    } else {
      url += year + (1 + month) + '.json';
    }
    // fetch 异步请求
    fetch(url)
      .then((res) => {
        // Todo：最好的情况是在日期选择器中，只显示可以查询的日期，
        if (res.status == 404) {
          message.warning(t('no_result'));
          return '';
        }
        return res.json();
      })
      .then((data) => {
        data = data.data;
        let dataSource = [];
        // 预处理数据，对新上榜单数据进行特殊标记处理
        data.map((obj) => {
          obj = expandObject(obj);
          if (obj.rankDelta == 0 && obj.value == obj.valueDelta) {
            obj.rankDelta = -10000000;
            obj.valueDelta = 0;
          }
          dataSource.push(obj);
        });

        //搜索特定数据
        let queryData;
        if (search) {
          queryData = dataSource.filter((dataSource) => {
            let reg = new RegExp(search.trim(), 'i');
            return reg.test(dataSource.name);
          });
          if (queryData.length == 0) {
            message.warning(t('no_result'));
          } else {
            dataSource = queryData;
          }
        }

        // 更新属性和表格数据
        setState({
          ...state,
          ...newstate,
          loading: false,
          columns: columns,
          showDetail: showDetail,
          hasDetail: hasDetail,
          data: dataSource,
        });
      })
      .catch((err) => {
        console.log('hi!' + err);
        setState({
          ...state,
          ...newstate,
          loading: false,
          columns: columns,
          data: [],
        });
      });
  };
  const {
    object,
    index,
    region,
    data,
    columns,
    loading,
    showSize,
    showDetail,
    hasDetail,
    month,
    year,
    type,
  } = state;
  return (
    <div className="table">
      <div className="table-content">
        <Card
          style={{
            width: '100%',
            background: '#FFFFFF',
            boxShadow: '0px 15px 20px 15px #F7F7FF',
          }}
        >
          <TablePanel
            type={type}
            setState={updateDate}
            object={object}
            index={index}
            region={region}
            hasDetail={hasDetail}
            showDetail={showDetail}
            month={month}
            year={year}
          />
          <Table
            // Todo
            // scroll={{ x: 1500, y: 300 }}
            columns={columns}
            rowKey={(record) => record.rank}
            dataSource={data.slice(0, Math.min(showSize, data.length))}
            pagination={false}
            loading={loading}
            scroll={{ x: 'max-content' }}
          />
          <Row style={{ marginTop: '10px' }}>
            <Col span={12}>
              <Row justify="start">
                <Col>
                  {showSize < data.length ? (
                    <a
                      style={{
                        color: '#FFCC19',
                        fontSize: '18px',
                      }}
                      onClick={expandData}
                    >
                      {t('showMore') + '>>'}
                    </a>
                  ) : (
                    <span
                      style={{
                        color: 'gray',
                        fontSize: '18px',
                      }}
                    >
                      {t('noMore')}
                    </span>
                  )}
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row justify="end">
                <Col>
                  <QAmiss />
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
}

export default MyTable;
