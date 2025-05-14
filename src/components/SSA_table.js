import { Card, Col, message, Row, Table } from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import expandObject from '../util/expandObject';
import QAmiss from './QA2';
import TablePanel from './TablePanel';
import MyAvatar from './avatar';
import PointRender from './changeNumber';
import Trophy from './rankTrophy';
import RoundFloat from './resolveFloat';
import './table.css';

// 硬编码数据集 - 从SSA_data.csv更新的真实数据
//const hardcodedData = [
//  { rank: '1', model: 'Deepseek-R1', url: 'https://huggingface.co/deepseek-ai/DeepSeek-R1', safe1: '94.63', safek: '88.85', think1: '37.98', thinkk: '16.2', fscore: '47.11', os1: '52.7', osk: '13.5', cs1: '20.78', csk: '4.33', ro1: '67.47', rok: '40.83' },
//  { rank: '2', model: 'Doubao-1.5-thinking-pro', url: 'https://github.com/ByteDance-Seed/Seed-Thinking-v1.5', safe1: '92.97', safek: '86.5', think1: '37.24', thinkk: '18.55', fscore: '46.22', os1: '60.6', osk: '19', cs1: '17.67', csk: '4.25', ro1: '68.6', rok: '47' },
//  { rank: '3', model: 'Qwen3-235B-A22B', url: 'https://huggingface.co/Qwen/Qwen3-235B-A22B', safe1: '97.52', safek: '93.3', think1: '35.25', thinkk: '12.45', fscore: '44.82', os1: '55.4', osk: '9', cs1: '16.47', csk: '2.17', ro1: '66.1', rok: '34.17' },
//  { rank: '4', model: 'Qwen3-32B', url: 'https://huggingface.co/Qwen/Qwen3-32B', safe1: '96.5', safek: '91.25', think1: '34.02', thinkk: '11.25', fscore: '43.51', os1: '57', osk: '12', cs1: '15.55', csk: '1.42', ro1: '63.3', rok: '30.67' },
//  { rank: '5', model: 'QwQ-32B', url: 'https://huggingface.co/Qwen/QwQ-32B', safe1: '93.54', safek: '85.1', think1: '33.38', thinkk: '11.4', fscore: '42.57', os1: '49.8', osk: '7.5', cs1: '17.12', csk: '2.58', ro1: '60.43', rok: '30.33' },
//  { rank: '6', model: 'GLM-Z1-AirX', url: 'https://www.bigmodel.cn/dev/api/Reasoning-models/glm-z1', safe1: '91.59', safek: '82.65', think1: '32.65', thinkk: '11.9', fscore: '41.65', os1: '53.3', osk: '13', cs1: '14.72', csk: '1.33', ro1: '61.63', rok: '32.67' },
//  { rank: '7', model: 'Qwen3-14B ', url: 'https://huggingface.co/Qwen/Qwen3-14B', safe1: '98.19', safek: '94.3', think1: '31.84', thinkk: '11.65', fscore: '41.54', os1: '57.6', osk: '13', cs1: '12.67', csk: '1.17', ro1: '61.6', rok: '32.17' },
//  { rank: '8', model: 'Qwen3-30B-A3B', url: 'https://huggingface.co/Qwen/Qwen3-30B-A3B', safe1: '98.27', safek: '95.15', think1: '30.84', thinkk: '11.4', fscore: '40.54', os1: '52', osk: '10', cs1: '11.38', csk: '0.83', ro1: '62.7', rok: '33' },
//  { rank: '9', model: 'Qwen3-8B', url: 'https://huggingface.co/Qwen/Qwen3-8B', safe1: '97.14', safek: '92.15', think1: '28.62', thinkk: '9.3', fscore: '38.19', os1: '56.4', osk: '11', cs1: '10.9', csk: '0.75', ro1: '54.8', rok: '25.83' },
//  { rank: '10', model: 'Kimi-K1.5', url: 'https://github.com/MoonshotAI/Kimi-k1.5', safe1: '78.68', safek: '64.7', think1: '28.82', thinkk: '9.75', fscore: '36.53', os1: '52', osk: '8', cs1: '12.77', csk: '1.33', ro1: '53.2', rok: '27.17' },
//  { rank: '11', model: 'Qwen3-4B', url: 'https://huggingface.co/Qwen/Qwen3-4B', safe1: '95.63', safek: '88.85', think1: '25.57', thinkk: '8.25', fscore: '34.91', os1: '53.1', osk: '10', cs1: '7.82', csk: '0.33', ro1: '51.9', rok: '23.5' },
//  { rank: '12', model: 'R1-Distill-Llama-70B', url: 'https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Llama-70B', safe1: '86.69', safek: '79.5', think1: '23.45', thinkk: '7.55', fscore: '31.93', os1: '49.6', osk: '12', cs1: '10.17', csk: '2.17', ro1: '41.3', rok: '16.83' },
//  { rank: '13', model: 'R1-Distill-Qwen-32B', url: 'https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-32B', safe1: '80.64', safek: '71.7', think1: '20.91', thinkk: '5.6', fscore: '28.76', os1: '46', osk: '10.5', cs1: '9.97', csk: '1.67', ro1: '34.43', rok: '11.83' },
//  { rank: '14', model: 'R1-Distill-Qwen-14B', url: 'https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-14B', safe1: '83.07', safek: '73.55', think1: '19.61', thinkk: '6.05', fscore: '27.57', os1: '45.2', osk: '8.5', cs1: '7.05', csk: '0.83', ro1: '36.2', rok: '15.67' },
//  { rank: '15', model: 'Qwen3-1.7B', url: 'https://huggingface.co/Qwen/Qwen3-1.7B', safe1: '79.87', safek: '62.85', think1: '15.37', thinkk: '2.95', fscore: '22.68', os1: '34', osk: '3', cs1: '4.12', csk: '0.08', ro1: '31.67', rok: '8.67' },
//  { rank: '16', model: 'R1-Distill-Llama-8B', url: 'https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Llama-8B', safe1: '71.5', safek: '58.6', think1: '14.73', thinkk: '3.9', fscore: '21.39', os1: '34.7', osk: '6.5', cs1: '4.77', csk: '0.42', ro1: '28', rok: '10' },
//  { rank: '17', model: 'R1-Distill-Qwen-7B', url: 'https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-7B', safe1: '66.64', safek: '52.05', think1: '8.72', thinkk: '1.2', fscore: '14.09', os1: '26.2', osk: '1', cs1: '2.7', csk: '0.17', ro1: '14.93', rok: '3.33' },
//  { rank: '18', model: 'Qwen3-0.6B', url: 'https://huggingface.co/Qwen/Qwen3-0.6B', safe1: '41.09', safek: '18.05', think1: '5.88', thinkk: '0.25', fscore: '9.3', os1: '25.1', osk: '2', cs1: '2.07', csk: '0', ro1: '7.1', rok: '0.17' },
//  { rank: '19', model: 'R1-Distill-Qwen-1.5B', url: 'https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B', safe1: '39.96', safek: '17.25', think1: '2.94', thinkk: '0.15', fscore: '5.44', os1: '14.6', osk: '1', cs1: '1', csk: '0', ro1: '2.93', rok: '0.17' },
//];

const hardcodedData = [
  { rank: '1', model: 'Claude35-sonnet2', url: 'https://www.anthropic.com/claude', RIRT1: '3.08', SIRT1: '4.53', RIST1: '32.62', SIST1: '32.35', RIRT2: '2.61', SIRT2: '2.95', RIST2: '20.53', SIST2: '31.95', RIRT3: '6.41', SIRT3: '5.24', RIST3: '28.13', SIST3: '34.11', Total_ASR: '15.57', ARR: '25.82' },
  { rank: '2', model: 'Gemini-1.5-pro', url: 'https://deepmind.google/technologies/gemini/', RIRT1: '21.43', SIRT1: '31.14', RIST1: '59.93', SIST1: '71.08', RIRT2: '16.25', SIRT2: '24.13', RIST2: '49.53', SIST2: '65.55', RIRT3: '16.24', SIRT3: '32.78', RIST3: '42.74', SIST3: '56.73', Total_ASR: '37.83', ARR: '11.27' },
  { rank: '3', model: 'GPT-4o', url: 'https://openai.com/gpt-4', RIRT1: '16.60', SIRT1: '24.90', RIST1: '65.53', SIST1: '72.02', RIRT2: '13.02', SIRT2: '12.45', RIST2: '52.71', SIST2: '74.04', RIRT3: '22.99', SIRT3: '28.35', RIST3: '60.23', SIST3: '72.44', Total_ASR: '40.93', ARR: '6.81' },
  { rank: '4', model: 'Gemini-2.0-flash', url: 'https://deepmind.google/technologies/gemini/', RIRT1: '25.75', SIRT1: '39.02', RIST1: '81.59', SIST1: '78.50', RIRT2: '16.75', SIRT2: '21.95', RIST2: '64.70', SIST2: '76.54', RIRT3: '23.38', SIRT3: '35.81', RIST3: '64.07', SIST3: '74.60', Total_ASR: '46.51', ARR: '5.43' },
  { rank: '5', model: 'Qwen2.5-VL-72B', url: 'https://huggingface.co/Qwen/Qwen2.5-VL-72B-Instruct', RIRT1: '30.64', SIRT1: '38.49', RIST1: '75.27', SIST1: '88.24', RIRT2: '25.47', SIRT2: '26.82', RIST2: '67.86', SIST2: '80.71', RIRT3: '25.31', SIRT3: '34.48', RIST3: '60.16', SIST3: '68.85', Total_ASR: '48.80', ARR: '1.43' },
  { rank: '6', model: 'InternVL2-40B', url: 'https://huggingface.co/OpenInternVL/InternVL2-40B', RIRT1: '38.70', SIRT1: '45.20', RIST1: '78.65', SIST1: '85.05', RIRT2: '29.15', SIRT2: '29.74', RIST2: '72.82', SIST2: '81.94', RIRT3: '26.42', SIRT3: '33.87', RIST3: '66.67', SIST3: '72.93', Total_ASR: '51.72', ARR: '11.76' },
  { rank: '7', model: 'Qwen2-VL-7B', url: 'https://huggingface.co/Qwen/Qwen2-VL-7B-Instruct', RIRT1: '41.28', SIRT1: '42.61', RIST1: '80.65', SIST1: '83.74', RIRT2: '31.39', SIRT2: '31.37', RIST2: '76.52', SIST2: '84.22', RIRT3: '34.92', SIRT3: '40.66', RIST3: '70.76', SIST3: '75.00', Total_ASR: '55.33', ARR: '6.27' },
  { rank: '8', model: 'GLM-4V-9B', url: 'https://huggingface.co/THUDM/GLM-4V-9B', RIRT1: '43.29', SIRT1: '55.48', RIST1: '77.06', SIST1: '84.73', RIRT2: '37.63', SIRT2: '35.50', RIST2: '76.19', SIST2: '78.84', RIRT3: '38.39', SIRT3: '45.71', RIST3: '70.04', SIST3: '69.60', Total_ASR: '56.73', ARR: '5.99' },
  { rank: '9', model: 'Qwen-VL-max', url: 'https://chat.qwen.ai/', RIRT1: '43.63', SIRT1: '49.00', RIST1: '86.13', SIST1: '88.70', RIRT2: '35.54', SIRT2: '34.52', RIST2: '75.45', SIST2: '85.41', RIRT3: '32.97', SIRT3: '41.95', RIST3: '69.20', SIST3: '78.78', Total_ASR: '56.87', ARR: '3.77' },
  { rank: '10', model: 'Qwen2-VL-72B', url: 'https://huggingface.co/Qwen/Qwen2-VL-72B-Instruct', RIRT1: '39.60', SIRT1: '43.49', RIST1: '87.73', SIST1: '91.63', RIRT2: '34.63', SIRT2: '33.96', RIST2: '79.30', SIST2: '87.31', RIRT3: '35.50', SIRT3: '44.47', RIST3: '70.34', SIST3: '74.27', Total_ASR: '57.54', ARR: '1.87' },
  { rank: '11', model: 'InternVL2-8B', url: 'https://huggingface.co/OpenGVLab/InternVL2-8B', RIRT1: '58.05', SIRT1: '57.79', RIST1: '87.36', SIST1: '87.25', RIRT2: '44.64', SIRT2: '40.50', RIST2: '79.13', SIST2: '82.88', RIRT3: '39.16', SIRT3: '39.48', RIST3: '70.09', SIST3: '72.19', Total_ASR: '59.73', ARR: '11.97' },
  { rank: '12', model: 'Qwen2.5-VL-7B', url: 'https://huggingface.co/Qwen/Qwen2.5-VL-7B-Instruct', RIRT1: '70.37', SIRT1: '75.86', RIST1: '86.69', SIST1: '94.09', RIRT2: '59.52', SIRT2: '59.15', RIST2: '79.35', SIST2: '88.15', RIRT3: '51.93', SIRT3: '61.62', RIST3: '71.88', SIST3: '75.73', Total_ASR: '69.76', ARR: '4.73' },
  { rank: '13', model: 'LLAVA-v1.5-13B', url: 'https://huggingface.co/liuhaotian/llava-v1.5-13b', RIRT1: '63.39', SIRT1: '69.18', RIST1: '90.97', SIST1: '94.53', RIRT2: '62.45', SIRT2: '62.25', RIST2: '88.28', SIST2: '88.77', RIRT3: '51.90', SIRT3: '61.97', RIST3: '81.01', SIST3: '76.41', Total_ASR: '72.72', ARR: '11.39' },
  { rank: '14', model: 'MiniCPM-V 2.6', url: 'https://huggingface.co/openbmb/MiniCPM-V', RIRT1: '78.60', SIRT1: '76.98', RIST1: '88.13', SIST1: '86.21', RIRT2: '73.75', SIRT2: '70.18', RIST2: '76.77', SIST2: '85.78', RIRT3: '62.55', SIRT3: '69.05', RIST3: '68.97', SIST3: '72.02', Total_ASR: '73.86', ARR: '6.43' },
  { rank: '15', model: 'LLAVA-v1.5-7B', url: 'https://huggingface.co/liuhaotian/llava-v1.5-7b', RIRT1: '80.48', SIRT1: '81.31', RIST1: '87.27', SIST1: '87.19', RIRT2: '82.76', SIRT2: '80.87', RIST2: '87.53', SIST2: '85.79', RIRT3: '77.46', SIRT3: '81.15', RIST3: '84.65', SIST3: '80.55', Total_ASR: '83.07', ARR: '8.54' },
  { rank: '16', model: 'VILA-13B', url: 'https://huggingface.co/Efficient-Large-Model/VILA-13b', RIRT1: '91.28', SIRT1: '89.62', RIST1: '95.67', SIST1: '90.69', RIRT2: '90.81', SIRT2: '89.27', RIST2: '89.75', SIST2: '87.92', RIRT3: '85.06', SIRT3: '86.21', RIST3: '85.57', SIST3: '78.59', Total_ASR: '87.79', ARR: '22.34' },
  { rank: '17', model: 'VILA-7B', url: 'https://huggingface.co/Efficient-Large-Model/VILA-7b', RIRT1: '92.28', SIRT1: '85.91', RIST1: '94.95', SIST1: '91.67', RIRT2: '89.05', SIRT2: '87.53', RIST2: '91.48', SIST2: '90.22', RIRT3: '89.78', SIRT3: '88.93', RIST3: '90.58', SIST3: '84.14', Total_ASR: '89.35', ARR: '32.51' }
];


// 找到表格列定义的部分，可能是 activityColumns, activityDetailColumns 或类似的变量
// 替换或添加新的列定义：

const ssaColumns = (t) => [
  {
    title: t('rank'),
    dataIndex: 'rank',
    width: '5%',
    align: 'center',
    render: Trophy, // 假设你想保留排名奖杯显示
    fixed: 'left',
  },
  {
    title: t('model'),
    dataIndex: 'model',
    width: '15%',
    align: 'center',
    render: (text, record) => (
      <a href={record.url} target="_blank" rel="noreferrer">
        {text}
      </a>
    ),
  },
  {
    title: 'Safe@1',
    dataIndex: 'safe1',
    width: '8%',
    align: 'center',
    render: (text) => text ? RoundFloat(text) : '-',
    sorter: (a, b) => parseFloat(a.safe1 || 0) - parseFloat(b.safe1 || 0),
  },
  {
    title: 'Safe@k',
    dataIndex: 'safek',
    width: '8%',
    align: 'center',
    render: (text) => text ? RoundFloat(text) : '-',
    sorter: (a, b) => parseFloat(a.safek || 0) - parseFloat(b.safek || 0),
  },
  {
    title: 'Think@1',
    dataIndex: 'think1',
    width: '8%',
    align: 'center',
    render: (text) => text ? RoundFloat(text) : '-',
    sorter: (a, b) => parseFloat(a.think1 || 0) - parseFloat(b.think1 || 0),
  },
  {
    title: 'Think@k',
    dataIndex: 'thinkk',
    width: '8%',
    align: 'center',
    render: (text) => text ? RoundFloat(text) : '-',
    sorter: (a, b) => parseFloat(a.thinkk || 0) - parseFloat(b.thinkk || 0),
  },
  {
    title: 'F-score',
    dataIndex: 'fscore',
    width: '8%',
    align: 'center',
    render: (text) => text ? RoundFloat(text) : '-',
    sorter: (a, b) => parseFloat(a.fscore || 0) - parseFloat(b.fscore || 0),
  },
  {
    title: 'OS@1',
    dataIndex: 'os1',
    width: '8%',
    align: 'center',
    render: (text) => text ? RoundFloat(text) : '-',
    sorter: (a, b) => parseFloat(a.os1 || 0) - parseFloat(b.os1 || 0),
  },
  {
    title: 'OS@k',
    dataIndex: 'osk',
    width: '8%',
    align: 'center',
    render: (text) => text ? RoundFloat(text) : '-',
    sorter: (a, b) => parseFloat(a.osk || 0) - parseFloat(b.osk || 0),
  },
  {
    title: 'CS@1',
    dataIndex: 'cs1',
    width: '8%',
    align: 'center',
    render: (text) => text ? RoundFloat(text) : '-',
    sorter: (a, b) => parseFloat(a.cs1 || 0) - parseFloat(b.cs1 || 0),
  },
  {
    title: 'CS@k',
    dataIndex: 'csk',
    width: '8%',
    align: 'center',
    render: (text) => text ? RoundFloat(text) : '-',
    sorter: (a, b) => parseFloat(a.csk || 0) - parseFloat(b.csk || 0),
  },
  {
    title: 'RO@1',
    dataIndex: 'ro1',
    width: '8%',
    align: 'center',
    render: (text) => text ? RoundFloat(text) : '-',
    sorter: (a, b) => parseFloat(a.ro1 || 0) - parseFloat(b.ro1 || 0),
  },
  {
    title: 'RO@k',
    dataIndex: 'rok',
    width: '8%',
    align: 'center',
    render: (text) => text ? RoundFloat(text) : '-',
    sorter: (a, b) => parseFloat(a.rok || 0) - parseFloat(b.rok || 0),
  },
];

// 找到表格列定义的部分，可能是 activityColumns, activityDetailColumns 或类似的变量
// 替换或添加新的列定义：

const ssaDetailColumns = (t) => [
  {
    title: t('rank'),
    dataIndex: 'rank',
    width: '5%',
    align: 'center',
    render: Trophy, // 假设你想保留排名奖杯显示
    fixed: 'left',
  },
  {
    title: t('model'),
    dataIndex: 'model',
    width: '15%',
    align: 'center',
    render: (text, record) => (
      <a href={record.url} target="_blank" rel="noreferrer">
        {text}
      </a>
    ),
  },
  {
    title: 'Safe@1',
    dataIndex: 'safe1',
    width: '8%',
    align: 'center',
    render: (text) => text ? RoundFloat(text) : '-',
    sorter: (a, b) => parseFloat(a.safe1 || 0) - parseFloat(b.safe1 || 0),
  },
  {
    title: 'Safe@k',
    dataIndex: 'safek',
    width: '8%',
    align: 'center',
    render: (text) => text ? RoundFloat(text) : '-',
    sorter: (a, b) => parseFloat(a.safek || 0) - parseFloat(b.safek || 0),
  },
  {
    title: 'Think@1',
    dataIndex: 'think1',
    width: '8%',
    align: 'center',
    render: (text) => text ? RoundFloat(text) : '-',
    sorter: (a, b) => parseFloat(a.think1 || 0) - parseFloat(b.think1 || 0),
  },
  {
    title: 'Think@k',
    dataIndex: 'thinkk',
    width: '8%',
    align: 'center',
    render: (text) => text ? RoundFloat(text) : '-',
    sorter: (a, b) => parseFloat(a.thinkk || 0) - parseFloat(b.thinkk || 0),
  },
  {
    title: 'F-score',
    dataIndex: 'fscore',
    width: '8%',
    align: 'center',
    render: (text) => text ? RoundFloat(text) : '-',
    sorter: (a, b) => parseFloat(a.fscore || 0) - parseFloat(b.fscore || 0),
  },
  {
    title: 'OS@1',
    dataIndex: 'os1',
    width: '8%',
    align: 'center',
    render: (text) => text ? RoundFloat(text) : '-',
    sorter: (a, b) => parseFloat(a.os1 || 0) - parseFloat(b.os1 || 0),
  },
  {
    title: 'OS@k',
    dataIndex: 'osk',
    width: '8%',
    align: 'center',
    render: (text) => text ? RoundFloat(text) : '-',
    sorter: (a, b) => parseFloat(a.osk || 0) - parseFloat(b.osk || 0),
  },
  {
    title: 'CS@1',
    dataIndex: 'cs1',
    width: '8%',
    align: 'center',
    render: (text) => text ? RoundFloat(text) : '-',
    sorter: (a, b) => parseFloat(a.cs1 || 0) - parseFloat(b.cs1 || 0),
  },
  {
    title: 'CS@k',
    dataIndex: 'csk',
    width: '8%',
    align: 'center',
    render: (text) => text ? RoundFloat(text) : '-',
    sorter: (a, b) => parseFloat(a.csk || 0) - parseFloat(b.csk || 0),
  },
  {
    title: 'RO@1',
    dataIndex: 'ro1',
    width: '8%',
    align: 'center',
    render: (text) => text ? RoundFloat(text) : '-',
    sorter: (a, b) => parseFloat(a.ro1 || 0) - parseFloat(b.ro1 || 0),
  },
  {
    title: 'RO@k',
    dataIndex: 'rok',
    width: '8%',
    align: 'center',
    render: (text) => text ? RoundFloat(text) : '-',
    sorter: (a, b) => parseFloat(a.rok || 0) - parseFloat(b.rok || 0),
  },
];

const open_rankColumns = (t, object, t_month) => [
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
          src={process.env.PUBLIC_URL + "/pics/dashboard.png"}
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
          src={process.env.PUBLIC_URL + "/pics/dashboard1.png"}
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
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [showSize, setShowSize] = useState(25);
  const { t } = useTranslation();
  
  useEffect(() => {
    console.log('[表格组件] 组件已挂载，使用硬编码数据');
    
    // 使用硬编码数据，不再尝试从CSV加载
    setDataSource(hardcodedData);
    setLoading(false);
    console.log(`[表格组件] 数据加载成功，共 ${hardcodedData.length} 条记录`);
    
  }, []);

  const expandData = () => {
    setShowSize(prevSize => prevSize + 25);
  };

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
          <Table
            columns={ssaColumns(t)}
            dataSource={dataSource.slice(0, Math.min(showSize, dataSource.length))}
            rowKey={(record) => record.model}
            pagination={false}
            loading={loading}
            scroll={{ x: 'max-content' }}
            rowClassName={(record, index) => (index % 2 === 0 ? 'table-even' : 'table-odd')}
          />
          
          <Row style={{ marginTop: '10px' }}>
            <Col span={12}>
              <Row justify="start">
                <Col>
                  {showSize < dataSource.length ? (
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
