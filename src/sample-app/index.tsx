import React from 'react';
import ReactDom from 'react-dom';
import { Loader } from './loader';

const node = document.getElementById('main');

ReactDom.render(<Loader />, node);
