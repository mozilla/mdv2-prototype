import React, { Component } from 'react';

export class ViewChanger extends Component {
  render() {
    return (
      <ul className='nav nav-tabs view-changer'>
        <li className='nav-item'>
          <a className='nav-link summary active' href='#'>Summary</a>
        </li>
        <li className='nav-item'>
          <a className='nav-link distribution' href='#'>Distribution</a>
        </li>
        <li className='nav-item'>
          <a className='nav-link comparison' href='#'>Comparison</a>
        </li>
        <li className='nav-item'>
          <a className='nav-link evolution' href='#'>Evolution</a>
        </li>
      </ul>
    )
  }
}
