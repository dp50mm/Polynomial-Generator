import React, { Component } from 'react';
import './App.css';
import polynomial from './polynomial'
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries} from 'react-vis';
import _ from 'lodash';
import html2canvas from 'html2canvas';
import Canvas2Image from './Canvas2Image'
import computedStyleToInlineStyle from 'computed-style-to-inline-style'
let polynomials = [];

polynomials.push(polynomial([10]))
polynomials.push(polynomial([0, 1]))
polynomials.push(polynomial([0, -1]))
polynomials.push(polynomial([0, 0, 2]))
polynomials.push(polynomial([1, -1, -2]))
polynomials.push(polynomial([1, -1, -2, -0.2]))
polynomials.push(polynomial([5, 2, 3, 2]))
polynomials.push(polynomial([1,-2,3,-4,5]))
polynomials.push(polynomial([-1,-1,0,0,0,1]))
polynomials.push(polynomial([-8, -6, 3, 1]))
polynomials.push(polynomial([7, -1, -13, 1, 1]))
polynomials.push(polynomial([64, 10, -27, -11, 3, 1]))
polynomials.push(polynomial([-80, -26, 145, 28, -26, -2, 1]))

let min = -200;
let max = 200;
let increment = 0.02;
let range = max - min;

class App extends Component {
  renderPlots() {
    console.log('render plots');
    computedStyleToInlineStyle(document.body, {
      recursive: true,
      properties: ["font-size",
      'font-family',
      'color',
      'stroke',
      'stroke-width',
      'opacity',
      'fill',
      'stroke-linecap',
      "text-decoration"
    ]
    });
    polynomials.forEach((f, i) => {
      let container = document.querySelector(`#poly-plot-${i}`)

      html2canvas(document.querySelector(`#poly-plot-${i}`)).then(canvas => {
        console.log(canvas);
        var imageData = canvas.toDataURL()
        var tmpLink = document.createElement('a')
        tmpLink.download = `poly-plot-${i}.png`
        tmpLink.href = imageData
        document.body.appendChild(tmpLink)
        tmpLink.click()
        document.body.removeChild(tmpLink)

    });
    })
  }
  render() {
    return (
      <div className="App">
        <h1>Polynomial</h1>
        <button onClick={this.renderPlots.bind(this)}>render</button>
        <p>f(x)= a0 + a1 * x + a2 * x^2 + ... + an * x^n</p>
        <hr />
        <div className='plots'>
        {polynomials.map((f, i) => {
          let data = _.range(range).map((val) => {
            return {
              x: (val+min)*increment,
              y: f.calculate((val+min)*increment)
            }
          })
          console.log(data);
          return (
            <div id={`poly-plot-${i}`} className='math-plot'>
              <div className='description'>
                <p>{f.description()}</p>
              </div>
              <XYPlot
                width={1000}
                height={1000}>


                <HorizontalGridLines />
                <VerticalGridLines />
                <XAxis />
                <YAxis />
                <LineSeries
                  data={data}
                />
              </XYPlot>
            </div>
          )
        })}
        </div>
      </div>
    );
  }
}

export default App;
