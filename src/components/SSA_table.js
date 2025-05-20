
import { Card, Col, message, Row, Table, Radio, Tabs } from 'antd';
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

const { TabPane } = Tabs;

// USB-Base 数据集
const hardcodedDataBase = [
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

// USB-Hard 数据集
const hardcodedDataHard = [
  { rank: '1', model: 'Claude35-sonnet2', url: 'https://www.anthropic.com/claude', RIRT1: '8.11', SIRT1: '8.57', RIST1: '29.33', SIST1: '31.75', RIRT2: '4.18', SIRT2: '5.04', RIST2: '23.11', SIST2: '29.45', RIRT3: '10.09', SIRT3: '11.00', RIST3: '32.72', SIST3: '33.54', Total_ASR: '18.31', ARR: '25.82' },
  { rank: '2', model: 'GPT-4o', url: 'https://openai.com/gpt-4', RIRT1: '22.86', SIRT1: '36.92', RIST1: '68.49', SIST1: '72.58', RIRT2: '31.00', SIRT2: '41.46', RIST2: '65.27', SIST2: '77.49', RIRT3: '37.75', SIRT3: '69.12', RIST3: '67.39', SIST3: '80.63', Total_ASR: '58.01', ARR: '6.81' },
  { rank: '3', model: 'Gemini-1.5-pro', url: 'https://deepmind.google/technologies/gemini/', RIRT1: '40.54', SIRT1: '72.86', RIST1: '60.00', SIST1: '85.71', RIRT2: '50.00', SIRT2: '71.70', RIST2: '72.95', SIST2: '81.39', RIRT3: '32.22', SIRT3: '60.33', RIST3: '55.56', SIST3: '70.57', Total_ASR: '63.07', ARR: '11.27' },
  { rank: '4', model: 'Gemini-2.0-flash', url: 'https://deepmind.google/technologies/gemini/', RIRT1: '59.46', SIRT1: '80.00', RIST1: '78.67', SIST1: '93.65', RIRT2: '48.61', SIRT2: '65.95', RIST2: '84.87', SIST2: '85.89', RIRT3: '43.47', SIRT3: '67.33', RIST3: '78.40', SIST3: '84.49', Total_ASR: '70.71', ARR: '5.43' },
  { rank: '5', model: 'Qwen2.5-VL-72B', url: 'https://huggingface.co/Qwen/Qwen2.5-VL-72B-Instruct', RIRT1: '56.76', SIRT1: '89.86', RIST1: '76.00', SIST1: '92.06', RIRT2: '68.26', SIRT2: '85.82', RIST2: '86.16', SIST2: '88.75', RIRT3: '52.13', SIRT3: '80.20', RIST3: '70.37', SIST3: '85.08', Total_ASR: '77.85', ARR: '1.43' },
  { rank: '6', model: 'InternVL2-40B', url: 'https://huggingface.co/OpenInternVL/InternVL2-40B', RIRT1: '68.92', SIRT1: '90.91', RIST1: '83.33', SIST1: '93.10', RIRT2: '75.73', SIRT2: '89.39', RIST2: '92.11', SIST2: '91.92', RIRT3: '53.02', SIRT3: '79.11', RIST3: '78.14', SIST3: '81.19', Total_ASR: '81.43', ARR: '11.76' },
  { rank: '7', model: 'Qwen2-VL-7B', url: 'https://huggingface.co/Qwen/Qwen2-VL-7B-Instruct', RIRT1: '72.97', SIRT1: '84.06', RIST1: '86.67', SIST1: '88.89', RIRT2: '73.51', SIRT2: '88.25', RIST2: '92.84', SIST2: '92.81', RIRT3: '56.23', SIRT3: '76.33', RIST3: '81.48', SIST3: '83.86', Total_ASR: '81.84', ARR: '6.27' },
  { rank: '8', model: 'InternVL2-8B', url: 'https://huggingface.co/OpenGVLab/InternVL2-8B', RIRT1: '83.56', SIRT1: '98.55', RIST1: '86.11', SIST1: '98.41', RIRT2: '78.53', SIRT2: '89.00', RIST2: '90.68', SIST2: '90.93', RIRT3: '61.39', SIRT3: '79.25', RIST3: '78.23', SIST3: '79.22', Total_ASR: '82.76', ARR: '11.97' },
  { rank: '9', model: 'GLM-4V-9B', url: 'https://huggingface.co/THUDM/GLM-4V-9B', RIRT1: '64.86', SIRT1: '92.86', RIST1: '85.33', SIST1: '95.24', RIRT2: '81.40', SIRT2: '89.93', RIST2: '92.02', SIST2: '89.37', RIRT3: '62.20', SIRT3: '83.00', RIST3: '81.79', SIST3: '79.05', Total_ASR: '83.42', ARR: '5.99' },
  { rank: '10', model: 'Qwen-VL-max', url: 'https://chat.qwen.ai/', RIRT1: '78.87', SIRT1: '93.34', RIST1: '85.71', SIST1: '95.08', RIRT2: '79.45', SIRT2: '88.97', RIST2: '92.79', SIST2: '94.58', RIRT3: '58.39', SIRT3: '84.70', RIST3: '81.19', SIST3: '87.71', Total_ASR: '84.77', ARR: '3.77' },
  { rank: '11', model: 'Qwen2-VL-72B', url: 'https://huggingface.co/Qwen/Qwen2-VL-72B-Instruct', RIRT1: '67.12', SIRT1: '92.86', RIST1: '92.00', SIST1: '95.24', RIRT2: '81.67', SIRT2: '91.50', RIST2: '92.84', SIST2: '93.21', RIRT3: '59.57', SIRT3: '86.00', RIST3: '81.79', SIST3: '85.40', Total_ASR: '85.10', ARR: '1.87' },
  { rank: '12', model: 'Qwen2.5-VL-7B', url: 'https://huggingface.co/Qwen/Qwen2.5-VL-7B-Instruct', RIRT1: '86.49', SIRT1: '97.10', RIST1: '82.67', SIST1: '96.72', RIRT2: '88.28', SIRT2: '95.87', RIST2: '92.83', SIST2: '94.07', RIRT3: '76.99', SIRT3: '91.64', RIST3: '81.00', SIST3: '83.86', Total_ASR: '88.96', ARR: '4.73' },
  { rank: '13', model: 'LLAVA-v1.5-7B', url: 'https://huggingface.co/liuhaotian/llava-v1.5-7b', RIRT1: '89.19', SIRT1: '91.43', RIST1: '90.54', SIST1: '83.87', RIRT2: '90.42', SIRT2: '94.96', RIST2: '89.78', SIST2: '91.36', RIRT3: '86.02', SIRT3: '90.67', RIST3: '85.49', SIST3: '85.40', Total_ASR: '89.57', ARR: '8.54' },
  { rank: '14', model: 'MiniCPM-V 2.6', url: 'https://huggingface.co/openbmb/MiniCPM-V', RIRT1: '93.24', SIRT1: '98.57', RIST1: '90.67', SIST1: '93.65', RIRT2: '92.83', SIRT2: '98.08', RIST2: '90.18', SIST2: '94.67', RIRT3: '83.28', SIRT3: '93.33', RIST3: '80.25', SIST3: '81.96', Total_ASR: '90.40', ARR: '6.43' },
  { rank: '15', model: 'LLAVA-v1.5-13B', url: 'https://huggingface.co/liuhaotian/llava-v1.5-13b', RIRT1: '94.59', SIRT1: '98.57', RIST1: '93.33', SIST1: '96.77', RIRT2: '90.38', SIRT2: '96.84', RIST2: '94.44', SIST2: '93.03', RIRT3: '78.53', SIRT3: '94.00', RIST3: '85.49', SIST3: '84.03', Total_ASR: '90.75', ARR: '11.39' },
  { rank: '16', model: 'VILA-13B', url: 'https://huggingface.co/Efficient-Large-Model/VILA-13b', RIRT1: '97.30', SIRT1: '97.14', RIST1: '92.00', SIST1: '92.06', RIRT2: '95.41', SIRT2: '97.12', RIST2: '93.46', SIST2: '93.05', RIRT3: '92.40', SIRT3: '96.67', RIST3: '87.96', SIST3: '85.44', Total_ASR: '93.15', ARR: '22.34' },
  { rank: '17', model: 'VILA-7B', url: 'https://huggingface.co/Efficient-Large-Model/VILA-7b', RIRT1: '94.59', SIRT1: '98.57', RIST1: '94.67', SIST1: '95.24', RIRT2: '95.02', SIRT2: '96.64', RIST2: '94.26', SIST2: '94.89', RIRT3: '95.14', SIRT3: '96.33', RIST3: '87.35', SIST3: '88.61', Total_ASR: '93.97', ARR: '32.51' }
];

const activityDetailColumns = (t) => [
   {
       title: t('rank'),
       dataIndex: 'rank',
       width: '6%',
       align: 'center',
       render: Trophy,
       fixed: 'left',
     },
    {
       title: t('company'),
       dataIndex: 'model',
       width: '9%',
       align: 'center',
       render: (text, record) => (
         <a href={record.url} target="_blank" rel="noreferrer">{text}</a>
       ),
     },
   {
     title: 'National Safety',
     children: [
       {
         title: 'RIRT',
         dataIndex: 'RIRT1',
         width: '4%',
         align: 'center',
         render: (text) => text ? RoundFloat(text) : '-',
         sorter: (a, b) => parseFloat(a.RIRT1 || 0) - parseFloat(b.RIRT1 || 0),
       },
       {
         title: 'SIRT',
         dataIndex: 'SIRT1',
         width: '4%',
         align: 'center',
         render: (text) => text ? RoundFloat(text) : '-',
         sorter: (a, b) => parseFloat(a.SIRT1 || 0) - parseFloat(b.SIRT1 || 0),
       },
       {
         title: 'RIST',
         dataIndex: 'RIST1',
         width: '4%',
         align: 'center',
         render: (text) => text ? RoundFloat(text) : '-',
         sorter: (a, b) => parseFloat(a.RIST1 || 0) - parseFloat(b.RIST1 || 0),
       },
       {
         title: 'SIST',
         dataIndex: 'SIST1',
         width: '4%',
         align: 'center',
         render: (text) => text ? RoundFloat(text) : '-',
         sorter: (a, b) => parseFloat(a.SIST1 || 0) - parseFloat(b.SIST1 || 0),
       },
     ],
   },
   {
     title: 'Public Safety',
     children: [
       {
         title: 'RIRT',
         dataIndex: 'RIRT2',
         width: '4%',
         align: 'center',
         render: (text) => text ? RoundFloat(text) : '-',
         sorter: (a, b) => parseFloat(a.RIRT2 || 0) - parseFloat(b.RIRT2 || 0),
       },
       {
         title: 'SIRT',
         dataIndex: 'SIRT2',
         width: '4%',
         align: 'center',
         render: (text) => text ? RoundFloat(text) : '-',
         sorter: (a, b) => parseFloat(a.SIRT2 || 0) - parseFloat(b.SIRT2 || 0),
       },
       {
         title: 'RIST',
         dataIndex: 'RIST2',
         width: '4%',
         align: 'center',
         render: (text) => text ? RoundFloat(text) : '-',
         sorter: (a, b) => parseFloat(a.RIST2 || 0) - parseFloat(b.RIST2 || 0),
       },
       {
         title: 'SIST',
         dataIndex: 'SIST2',
         width: '4%',
         align: 'center',
         render: (text) => text ? RoundFloat(text) : '-',
         sorter: (a, b) => parseFloat(a.SIST2 || 0) - parseFloat(b.SIST2 || 0),
       },
     ],
   },
   {
     title: 'Ethical Safety',
     children: [
       {
         title: 'RIRT',
         dataIndex: 'RIRT3',
         width: '4%',
         align: 'center',
         render: (text) => text ? RoundFloat(text) : '-',
         sorter: (a, b) => parseFloat(a.RIRT3 || 0) - parseFloat(b.RIRT3 || 0),
       },
       {
         title: 'SIRT',
         dataIndex: 'SIRT3',
         width: '4%',
         align: 'center',
         render: (text) => text ? RoundFloat(text) : '-',
         sorter: (a, b) => parseFloat(a.SIRT3 || 0) - parseFloat(b.SIRT3 || 0),
       },
       {
         title: 'RIST',
         dataIndex: 'RIST3',
         width: '4%',
         align: 'center',
         render: (text) => text ? RoundFloat(text) : '-',
         sorter: (a, b) => parseFloat(a.RIST3 || 0) - parseFloat(b.RIST3 || 0),
       },
       {
         title: 'SIST',
         dataIndex: 'SIST3',
         width: '4%',
         align: 'center',
         render: (text) => text ? RoundFloat(text) : '-',
         sorter: (a, b) => parseFloat(a.SIST3 || 0) - parseFloat(b.SIST3 || 0),
       },
     ],
   },
   {
     title: 'Total (ASR)',
     dataIndex: 'Total_ASR',
     width: '4%',
     align: 'center',
     render: (text) => text ? RoundFloat(text) : '-',
     sorter: (a, b) => parseFloat(a.Total_ASR || 0) - parseFloat(b.Total_ASR || 0),
   },
   {
     title: 'ARR',
     dataIndex: 'ARR',
     width: '4%',
     align: 'center',
     render: (text) => text ? RoundFloat(text) : '-',
     sorter: (a, b) => parseFloat(a.ARR || 0) - parseFloat(b.ARR || 0),
   },
 ];

function SSATable() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('1');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedData = activeTab === '1' ? hardcodedDataBase : hardcodedDataHard;
        const processedData = fetchedData.map(item => ({
          ...item,
          RIRT1: parseFloat(item.RIRT1),
          SIRT1: parseFloat(item.SIRT1),
          RIST1: parseFloat(item.RIST1),
          SIST1: parseFloat(item.SIST1),
          RIRT2: parseFloat(item.RIRT2),
          SIRT2: parseFloat(item.SIRT2),
          RIST2: parseFloat(item.RIST2),
          SIST2: parseFloat(item.SIST2),
          RIRT3: parseFloat(item.RIRT3),
          SIRT3: parseFloat(item.SIRT3),
          RIST3: parseFloat(item.RIST3),
          SIST3: parseFloat(item.SIST3),
          Total_ASR: parseFloat(item.Total_ASR),
          ARR: parseFloat(item.ARR),
        }));
        setData(processedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  return (
    <div className="table-container">
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="USB-Base" key="1">
          <div style={{ marginBottom: '16px' }}>{t('dataset.base_desc')}</div>
        </TabPane>
        <TabPane tab="USB-Hard" key="2">
          <div style={{ marginBottom: '16px' }}>{t('dataset.hard_desc')}</div>
        </TabPane>
      </Tabs>

      <Table
        columns={activityDetailColumns(t)}
        dataSource={data}
        scroll={{ x: true }}
        pagination={false}
        loading={loading}
      />
    </div>
  );
}

export default SSATable;
