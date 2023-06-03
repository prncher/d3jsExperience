import React from 'react'
import { SVGContainerProps } from './dataTypes';
import './SVGContainer.css'

const SVGContainer = React.forwardRef((props: SVGContainerProps,
    ref: React.ForwardedRef<any>) => (
    <div className='svgContainer' id={props.name} ref={ref} />
));

export { SVGContainer }