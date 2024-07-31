/**
 * Copyright (c) 2022-present Houfeng
 * @homepage https://github.com/Houfeng/obec
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { Renderer } from 'comer';
import { DOMAdapter } from 'comer-dom';

const renderer = new Renderer(new DOMAdapter());

console.log('renderer', renderer);
