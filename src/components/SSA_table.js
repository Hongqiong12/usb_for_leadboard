
import { Card, Col, message, Row, Table, Radio, Tabs, Statistic } from 'antd';
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
        { rank: '1', model: 'Claude3.5-Sonnet2', url: 'https://www.anthropic.com/claude', RIRT1: '97.12', SIRT1: '95.15', RIST1: '66.91', SIST1: '67.01', RIRT2: '97.16', SIRT2: '96.86', RIST2: '79.70', SIST2: '67.68', RIRT3: '93.53', SIRT3: '94.60', RIST3: '71.82', SIST3: '65.94', Total_ASR: '82.79', ARR: '25.82' },
        { rank: '2', model: 'Gemini-1.5-Pro', url: 'https://deepmind.google/technologies/gemini/', RIRT1: '78.93', SIRT1: '68.52', RIST1: '39.26', SIST1: '27.84', RIRT2: '84.36', SIRT2: '75.29', RIST2: '50.49', SIST2: '34.58', RIRT3: '83.51', SIRT3: '67.88', RIST3: '57.06', SIST3: '43.57', Total_ASR: '59.27', ARR: '11.27' },
        { rank: '3', model: 'Gemini-2.0-Flash', url: 'https://deepmind.google/technologies/gemini/', RIRT1: '74.39', SIRT1: '59.70', RIST1: '17.78', SIST1: '20.94', RIRT2: '83.16', SIRT2: '77.32', RIST2: '35.52', SIST2: '23.60', RIRT3: '76.35', SIRT3: '64.52', RIST3: '35.83', SIST3: '25.41', Total_ASR: '49.54', ARR: '5.43' },
        { rank: '4', model: 'GPT-4o', url: 'https://openai.com/gpt-4', RIRT1: '84.15', SIRT1: '74.46', RIST1: '35.41', SIST1: '29.51', RIRT2: '87.16', SIRT2: '87.16', RIST2: '47.51', SIST2: '26.10', RIRT3: '77.04', SIRT3: '71.58', RIST3: '39.81', SIST3: '27.49', Total_ASR: '57.28', ARR: '6.81' },
        { rank: '5', model: 'Qwen-VL-Max', url: 'https://chat.qwen.ai/', RIRT1: '55.95', SIRT1: '50.63', RIST1: '13.30', SIST1: '11.76', RIRT2: '65.05', SIRT2: '65.48', RIST2: '24.79', SIST2: '14.94', RIRT3: '66.74', SIRT3: '58.24', RIST3: '30.57', SIST3: '21.19', Total_ASR: '39.89', ARR: '3.77' },
        { rank: '6', model: 'VILA-13B', url: 'https://huggingface.co/Efficient-Large-Model/VILA-13b', RIRT1: '8.80', SIRT1: '10.37', RIST1: '4.07', SIST1: '9.28', RIRT2: '9.22', SIRT2: '11.04', RIST2: '10.53', SIST2: '12.31', RIRT3: '14.94', SIRT3: '13.79', RIST3: '14.15', SIST3: '21.25', Total_ASR: '11.65', ARR: '22.34' },
        { rank: '7', model: 'VILA-7B', url: 'https://huggingface.co/Efficient-Large-Model/VILA-7b', RIRT1: '7.75', SIRT1: '13.97', RIST1: '4.81', SIST1: '8.25', RIRT2: '11.09', SIRT2: '12.58', RIST2: '8.76', SIST2: '10.09', RIRT3: '10.33', SIRT3: '11.28', RIST3: '9.08', SIST3: '15.50', Total_ASR: '10.29', ARR: '32.51' },
        { rank: '8', model: 'LLAVA-v1.5-13B', url: 'https://huggingface.co/liuhaotian/llava-v1.5-13b', RIRT1: '36.88', SIRT1: '30.40', RIST1: '9.26', SIST1: '5.76', RIRT2: '38.17', SIRT2: '37.67', RIST2: '11.98', SIST2: '11.28', RIRT3: '47.84', SIRT3: '38.14', RIST3: '18.81', SIST3: '23.67', Total_ASR: '25.82', ARR: '11.39' },
        { rank: '9', model: 'LLAVA-v1.5-7B', url: 'https://huggingface.co/liuhaotian/llava-v1.5-7b', RIRT1: '19.78', SIRT1: '18.89', RIST1: '13.06', SIST1: '12.95', RIRT2: '17.16', SIRT2: '19.74', RIST2: '12.32', SIST2: '14.28', RIRT3: '22.64', SIRT3: '18.91', RIST3: '15.19', SIST3: '19.54', Total_ASR: '17.04', ARR: '8.54' },
        { rank: '10', model: 'MiniCPM-V 2.6', url: 'https://huggingface.co/openbmb/MiniCPM-V', RIRT1: '21.05', SIRT1: '23.16', RIST1: '11.44', SIST1: '14.51', RIRT2: '27.40', SIRT2: '29.80', RIST2: '23.57', SIST2: '14.03', RIRT3: '36.99', SIRT3: '31.41', RIST3: '31.04', SIST3: '27.82', Total_ASR: '24.35', ARR: '6.43' },
        { rank: '11', model: 'InternVL2-40B', url: 'https://huggingface.co/OpenInternVL/InternVL2-40B', RIRT1: '61.15', SIRT1: '54.20', RIST1: '21.54', SIST1: '14.52', RIRT2: '71.25', SIRT2: '69.84', RIST2: '27.78', SIST2: '18.09', RIRT3: '73.19', SIRT3: '66.02', RIST3: '33.39', SIST3: '27.15', Total_ASR: '44.84', ARR: '11.76' },
        { rank: '12', model: 'InternVL2-8B', url: 'https://huggingface.co/OpenGVLab/InternVL2-8B', RIRT1: '40.85', SIRT1: '40.00', RIST1: '12.55', SIST1: '12.37', RIRT2: '55.24', SIRT2: '58.82', RIST2: '21.30', SIST2: '16.81', RIRT3: '60.69', SIRT3: '60.50', RIST3: '29.71', SIST3: '27.44', Total_ASR: '36.36', ARR: '11.97' },
        { rank: '13', model: 'Qwen2.5-VL-72B', url: 'https://huggingface.co/Qwen/Qwen2.5-VL-72B-Instruct', RIRT1: '68.90', SIRT1: '60.66', RIST1: '24.26', SIST1: '11.34', RIRT2: '74.83', SIRT2: '72.58', RIST2: '32.52', SIST2: '19.61', RIRT3: '74.18', SIRT3: '65.40', RIST3: '39.82', SIST3: '30.94', Total_ASR: '47.92', ARR: '1.43' },
        { rank: '14', model: 'Qwen2.5-VL-7B', url: 'https://huggingface.co/Qwen/Qwen2.5-VL-7B-Instruct', RIRT1: '30.04', SIRT1: '23.25', RIST1: '13.28', SIST1: '6.19', RIRT2: '41.41', SIRT2: '40.23', RIST2: '20.96', SIST2: '12.13', RIRT3: '47.47', SIRT3: '38.58', RIST3: '28.09', SIST3: '24.15', Total_ASR: '27.15', ARR: '4.73' },
        { rank: '15', model: 'Qwen2-VL-72B', url: 'https://huggingface.co/Qwen/Qwen2-VL-72B-Instruct', RIRT1: '60.56', SIRT1: '55.68', RIST1: '11.48', SIST1: '8.81', RIRT2: '65.90', SIRT2: '65.64', RIST2: '20.95', SIST2: '12.88', RIRT3: '64.27', SIRT3: '56.28', RIST3: '29.18', SIST3: '25.54', Total_ASR: '39.76', ARR: '1.87' },
        { rank: '16', model: 'Qwen2-VL-7B', url: 'https://huggingface.co/Qwen/Qwen2-VL-7B-Instruct', RIRT1: '58.45', SIRT1: '56.25', RIST1: '19.12', SIST1: '17.01', RIRT2: '69.01', SIRT2: '67.71', RIST2: '23.76', SIST2: '15.59', RIRT3: '65.05', SIRT3: '59.38', RIST3: '29.42', SIST3: '24.77', Total_ASR: '42.13', ARR: '6.27' },
        { rank: '17', model: 'GLM-4V-9B', url: 'https://huggingface.co/THUDM/GLM-4V-9B', RIRT1: '57.75', SIRT1: '44.69', RIST1: '23.16', SIST1: '15.03', RIRT2: '62.49', SIRT2: '63.29', RIST2: '24.56', SIST2: '21.26', RIRT3: '61.08', SIRT3: '54.81', RIST3: '29.84', SIST3: '30.18', Total_ASR: '40.68', ARR: '5.99' }
      ];

// USB-Hard 数据集
const hardcodedDataHard = [
  // Closed-source Commercial MLLMs
  { rank: '1', model: 'Claude35-Sonnet2', url: 'https://www.anthropic.com/claude', RIRT1: '91.78', SIRT1: '91.43', RIST1: '70.83', SIST1: '67.21', RIRT2: '95.60', SIRT2: '94.75', RIST2: '76.55', SIST2: '69.31', RIRT3: '90.12', SIRT3: '88.70', RIST3: '66.98', SIST3: '66.77', Total_ASR: '80.84', ARR: '25.82' },
  { rank: '2', model: 'Gemini-1.5-Pro', url: 'https://deepmind.google/technologies/gemini/', RIRT1: '58.90', SIRT1: '27.14', RIST1: '41.67', SIST1: '13.11', RIRT2: '51.87', SIRT2: '28.35', RIST2: '27.35', SIST2: '18.67', RIRT3: '67.79', SIRT3: '39.04', RIST3: '44.34', SIST3: '29.39', Total_ASR: '37.30', ARR: '11.27' },
  { rank: '3', model: 'Gemini-2.0-Flash', url: 'https://deepmind.google/technologies/gemini/', RIRT1: '41.10', SIRT1: '20.00', RIST1: '22.22', SIST1: '4.92', RIRT2: '53.19', SIRT2: '34.12', RIST2: '15.14', SIST2: '14.16', RIRT3: '56.44', SIRT3: '32.19', RIST3: '21.07', SIST3: '15.65', Total_ASR: '27.52', ARR: '5.43' },
  { rank: '4', model: 'GPT-4o', url: 'https://openai.com/gpt-4', RIRT1: '78.26', SIRT1: '63.08', RIST1: '31.43', SIST1: '28.33', RIRT2: '69.49', SIRT2: '57.57', RIST2: '35.15', SIST2: '22.99', RIRT3: '62.00', SIRT3: '30.32', RIST3: '32.59', SIST3: '19.23', Total_ASR: '44.20', ARR: '6.81' },
  { rank: '5', model: 'Qwen-VL-Max', url: 'https://chat.qwen.ai/', RIRT1: '21.43', SIRT1: '6.06', RIST1: '14.71', SIST1: '5.08', RIRT2: '22.25', SIRT2: '11.80', RIST2: '7.51', SIST2: '5.47', RIRT3: '41.55', SIRT3: '15.27', RIST3: '18.52', SIST3: '12.37', Total_ASR: '15.17', ARR: '3.77' },
  // Open-source MLLMs
  { rank: '6', model: 'VILA-13B', url: 'https://huggingface.co/Efficient-Large-Model/VILA-13b', RIRT1: '2.74', SIRT1: '2.86', RIST1: '8.33', SIST1: '6.56', RIRT2: '4.85', SIRT2: '3.16', RIST2: '6.82', SIST2: '7.30', RIRT3: '7.67', SIRT3: '2.74', RIST3: '11.95', SIST3: '14.70', Total_ASR: '6.64', ARR: '22.34' },
  { rank: '7', model: 'VILA-7B', url: 'https://huggingface.co/Efficient-Large-Model/VILA-7b', RIRT1: '5.48', SIRT1: '1.43', RIST1: '5.56', SIST1: '4.92', RIRT2: '5.27', SIRT2: '3.41', RIST2: '5.98', SIST2: '5.15', RIRT3: '4.91', SIRT3: '3.42', RIST3: '12.58', SIST3: '11.50', Total_ASR: '5.80', ARR: '32.51' },
  { rank: '8', model: 'LLAVA-v1.5-13B', url: 'https://huggingface.co/liuhaotian/llava-v1.5-13b', RIRT1: '5.48', SIRT1: '1.43', RIST1: '6.94', SIST1: '3.33', RIRT2: '10.18', SIRT2: '3.46', RIST2: '5.79', SIST2: '6.71', RIRT3: '21.36', SIRT3: '5.82', RIST3: '13.84', SIST3: '16.08', Total_ASR: '8.37', ARR: '11.39' },
  { rank: '9', model: 'LLAVA-v1.5-7B', url: 'https://huggingface.co/liuhaotian/llava-v1.5-7b', RIRT1: '10.96', SIRT1: '8.57', RIST1: '9.86', SIST1: '16.67', RIRT2: '9.47', SIRT2: '4.72', RIST2: '10.02', SIST2: '9.07', RIRT3: '14.11', SIRT3: '9.59', RIST3: '14.15', SIST3: '14.74', Total_ASR: '10.99', ARR: '8.54' },
  { rank: '10', model: 'MiniCPM-V 2.6', url: 'https://huggingface.co/openbmb/MiniCPM-V', RIRT1: '6.85', SIRT1: '1.43', RIST1: '9.72', SIST1: '6.56', RIRT2: '7.91', SIRT2: '2.10', RIST2: '10.02', SIST2: '5.16', RIRT3: '16.87', SIRT3: '6.51', RIST3: '19.18', SIST3: '18.21', Total_ASR: '9.21', ARR: '6.43' },
  { rank: '11', model: 'InternVL2-40B', url: 'https://huggingface.co/OpenInternVL/InternVL2-40B', RIRT1: '30.14', SIRT1: '9.09', RIST1: '15.94', SIST1: '5.36', RIRT2: '25.92', SIRT2: '11.02', RIST2: '8.22', SIST2: '8.28', RIRT3: '46.79', SIRT3: '21.05', RIST3: '21.64', SIST3: '18.67', Total_ASR: '18.51', ARR: '11.76' },
  { rank: '12', model: 'InternVL2-8B', url: 'https://huggingface.co/OpenGVLab/InternVL2-8B', RIRT1: '16.67', SIRT1: '1.45', RIST1: '12.68', SIST1: '1.64', RIRT2: '22.57', SIRT2: '11.78', RIST2: '9.51', SIST2: '8.80', RIRT3: '38.98', SIRT3: '20.98', RIST3: '20.90', SIST3: '20.66', Total_ASR: '15.55', ARR: '11.97' },
  { rank: '13', model: 'Qwen2.5-VL-72B', url: 'https://huggingface.co/Qwen/Qwen2.5-VL-72B-Instruct', RIRT1: '43.84', SIRT1: '10.14', RIST1: '22.22', SIST1: '8.20', RIRT2: '33.70', SIRT2: '13.91', RIST2: '14.44', SIST2: '11.59', RIRT3: '48.00', SIRT3: '18.97', RIST3: '29.25', SIST3: '15.06', Total_ASR: '22.44', ARR: '1.43' },
  { rank: '14', model: 'Qwen2.5-VL-7B', url: 'https://huggingface.co/Qwen/Qwen2.5-VL-7B-Instruct', RIRT1: '13.70', SIRT1: '2.90', RIST1: '18.06', SIST1: '3.39', RIRT2: '12.69', SIRT2: '4.24', RIST2: '7.48', SIST2: '6.22', RIRT3: '23.22', SIRT3: '8.25', RIST3: '18.41', SIST3: '16.29', Total_ASR: '11.24', ARR: '4.73' },
  { rank: '15', model: 'Qwen2-VL-72B', url: 'https://huggingface.co/Qwen/Qwen2-VL-72B-Instruct', RIRT1: '33.33', SIRT1: '7.14', RIST1: '8.33', SIST1: '4.92', RIRT2: '19.12', SIRT2: '8.95', RIST2: '7.46', SIST2: '6.91', RIRT3: '40.49', SIRT3: '13.70', RIST3: '18.24', SIST3: '14.74', Total_ASR: '15.28', ARR: '1.87' },
  { rank: '16', model: 'Qwen2-VL-7B', url: 'https://huggingface.co/Qwen/Qwen2-VL-7B-Instruct', RIRT1: '26.03', SIRT1: '15.94', RIST1: '12.50', SIST1: '11.48', RIRT2: '27.91', SIRT2: '11.81', RIST2: '7.46', SIST2: '7.51', RIRT3: '43.87', SIRT3: '23.63', RIST3: '17.92', SIST3: '16.29', Total_ASR: '18.53', ARR: '6.27' },
  { rank: '17', model: 'GLM-4V-9B', url: 'https://huggingface.co/THUDM/GLM-4V-9B', RIRT1: '35.62', SIRT1: '7.14', RIST1: '13.89', SIST1: '4.92', RIRT2: '19.60', SIRT2: '10.50', RIST2: '8.32', SIST2: '10.52', RIRT3: '37.85', SIRT3: '17.12', RIST3: '17.92', SIST3: '21.15', Total_ASR: '17.05', ARR: '5.99' }
];

const activityDetailColumns = (t, activeTab) => [
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
     title: 'Safety Rate (%)',
     align: 'center',
     children: [
       {
         title: 'National Safety',
         align: 'center',
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
         align: 'center',
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
         align: 'center',
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
         title: 'Total',
         dataIndex: 'Total_ASR',
         width: '4%',
         align: 'center',
         render: (text) => text ? RoundFloat(text) : '-',
         sorter: (a, b) => parseFloat(a.Total_ASR || 0) - parseFloat(b.Total_ASR || 0),
       },
     ],
   },
   {
     title: 'Refusal Rate (%)',
     dataIndex: 'ARR',
     width: '4%',
     align: 'center',
     render: (text) => text ? RoundFloat(text) : '-',
     sorter: (a, b) => parseFloat(a.ARR || 0) - parseFloat(b.ARR || 0),
   },
 ];

function SSATable() {
  const { t } = useTranslation();
  const [palette, setPalette] = useState('blue');
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
    <div className={`table-container scoreboard-light usb-theme--${palette}`}>
      {/* 页面头部区域 */}
      <div className="page-header">
        <h1 className="page-title">USB Safety Assessment</h1>
        <p className="page-subtitle">
          {t('ssa.subtitle')}
        </p>

        {/* 统计信息卡片 */}
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-number">{data.length}</div>
            <div className="stat-label">{t('ssa.stats.totalModels')}</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">2</div>
            <div className="stat-label">{t('ssa.stats.datasets')}</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">13</div>
            <div className="stat-label">{t('ssa.stats.testItems')}</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {data.length > 0 ? Math.round(data.reduce((acc, item) => acc + parseFloat(item.Total_ASR || 0), 0) / data.length) : 0}%
            </div>
            <div className="stat-label">{t('ssa.stats.avgSafetyRate')}</div>
          </div>
        </div>
      </div>

      <div className="toolbar-glass">
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="USB-Base" key="1">
            <div style={{color: '#64748b', fontSize: '14px', textAlign: 'center', marginBottom: '16px'}}>
              {t('dataset.base_desc')}
            </div>
          </TabPane>
          <TabPane tab="USB-Hard" key="2">
            <div style={{color: '#64748b', fontSize: '14px', textAlign: 'center', marginBottom: '16px'}}>
              {t('dataset.hard_desc')}
            </div>
          </TabPane>
        </Tabs>
      </div>

      <Table
        className="usb-table usb-table--pastel"
        columns={activityDetailColumns(t, activeTab)}
        dataSource={data}
        scroll={{ x: true }}
        pagination={false}
        loading={loading}
      />
    </div>
  );
}

export default SSATable;
