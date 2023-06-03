import React from "react"
import * as d3 from 'd3'
import { DataVisualizerProps } from "./dataTypes"
import { SVGContainer } from "./SVGContainer"
import './styles.css'
import { renderBar, renderPie } from "./d3Utils"

const DataVisualizer = (props: DataVisualizerProps) => {
    const { data, total } = props
    const barRef = React.createRef()
    const pieRef = React.createRef()

    React.useEffect(() => {
        const colors = data && data.length ?
            d3.quantize(s => d3.interpolateSpectral(s / 0.6), data.length) :
            []
        const percent = (count: number) => Math.round(count / total * 100)
        renderPie(colors, data, percent)
        renderBar(colors, data, percent)
        return () => {
            let svgs = d3.selectAll("div#piechart")
            svgs.selectChildren().remove()
            svgs = d3.selectAll("div#barchart")
            svgs.selectChildren().remove()
        }
    }, [data, total])
    return <div className='chartContainer'>
        <SVGContainer name="barchart" ref={barRef} />
        <SVGContainer name="piechart" ref={pieRef} />
    </div>
}

export { DataVisualizer }