import * as React from 'react';
import styles from './tc.module.css';
import { DocumentCanvas } from './documentCanvas';
import { LeftSidebar } from './leftSidebar';
import { Button, Input, Switch } from 'antd';

type DataRowType = {
  manufacturer: string;
  name: string;
  ndc: string;
  price: string;
}

type InvoiceData = DataRowType[];

const Tab = () => {
  return <>
  </>
}

export default Tab; 