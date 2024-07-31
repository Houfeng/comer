import { Div, renderer } from 'comer-dom';

renderer.render(new Div(), document.getElementById('root'));

console.log('renderer', renderer);