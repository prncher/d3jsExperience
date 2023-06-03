import React from "react"
import * as d3 from 'd3'
import { DataVisualizerProps, GenreData } from "./dataTypes"
import { SVGContainer } from "./SVGContainer"
import './styles.css'

const DataVisualizer = (props: DataVisualizerProps) => {
    const { data, total } = props
    const barRef = React.createRef()
    const pieRef = React.createRef()

    React.useEffect(() => {
        const colors = data && data.length ?
            d3.quantize(s => d3.interpolateSpectral(s / 0.6), data.length) :
            []

        const renderPie = () => {
            const children = d3.select("div#piechart").selectChildren()
            if (children.empty()) {
                const svg = d3.select("div#piechart")
                    .append("svg")
                    .attr("viewBox", "-400 -200 900 360")
                    .attr("width", '800px')
                    .attr("height", '500px')

                var ordScale = d3.scaleOrdinal<string>().range(colors);
                var pie = d3.pie<GenreData>().value(d => d.studentCount);
                var arc = svg.selectAll("arc").data(pie(data)).enter();

                const radius = 250
                var path = d3.arc<d3.PieArcDatum<GenreData>>()
                    .outerRadius(radius)
                    .innerRadius(0);

                arc.append("path").attr("d", path)
                    .attr("fill", d => ordScale(d.data.genre));

                var label = d3.arc<d3.PieArcDatum<GenreData>>()
                    .outerRadius(radius)
                    .innerRadius(0);

                arc.append("text")
                    .attr("transform", d => {
                        const [x, y] = label.centroid(d)
                        return "translate(" + [x, y + 20] + ")";
                    })
                    .text(d => d.data.genre)
                    .style('text-anchor', 'start')
                    .style('alignment-baseline', 'start')

                arc.append("text")
                    .attr("transform", d => "translate(" + label.centroid(d) + ")")
                    .text(d => `${d.data.studentCount} (${Math.round(d.data.studentCount / total * 100)}%)`)

                const title = "Favorite movie genres in a class"
                svg.selectAll("text b")
                    .data(title)
                    .enter()
                    .append("text")
                    .text(title)
                    .classed("title", true)
                    .attr("x", "-300")
                    .attr("y", "-270");
            }

        }

        const renderBar = () => {
            let div = d3.select("div#barchart")
            const children = div.selectChildren()
            if (children.empty()) {
                const svg = d3.select("div#barchart")
                    .append("svg")
                    .attr("viewBox", "-20 -80 400 260")
                    .attr("width", '800px')
                    .attr("height", '300px')

                const lines = [0, 20, 40, 60, 80, 100]
                svg.selectAll("line")
                    .data(lines)
                    .enter()
                    .append("line")
                    .classed("axis", d => d === 0)
                    .classed("line", true)
                    .attr("x1", "40px")
                    .attr("x2", "195px")
                    .attr("y1", d => 100 - d)
                    .attr("y2", d => 100 - d);

                svg.selectAll("line")
                    .data(data)
                    .enter()
                    .append("line")
                    .classed("axis", true)
                    .attr("x1", "40px")
                    .attr("x2", "40px")
                    .attr("y1", "100px")
                    .attr("y2", "-20px");

                svg
                    .selectAll("text")
                    .data(lines)
                    .enter()
                    .append("text")
                    .text(d => d + "%")
                    .attr("text-anchor", "end")
                    .attr("x", "25")
                    .attr("y", d => 105 - d)

                svg
                    .selectAll("rect")
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("width", "17")
                    .attr("height", d => d.studentCount)
                    .attr("x", (d, i) => 45 + (i * 22))
                    .attr("y", d => 100 - d.studentCount)
                    .classed("emphasize", d => d.studentCount > 60 ? true : false
                    )

                svg
                    .selectAll("text a")
                    .data(data)
                    .enter()
                    .append("text")
                    .classed("letters", true)
                    .text(d => d.genre[0])
                    .attr("text-anchor", "start")
                    .attr("y", "120")
                    .attr("x", (d, i) => 45 + (i * 22));


                const title = "Favorite movie genres in a class"
                svg.selectAll("text b")
                    .data(title)
                    .enter()
                    .append("text")
                    .text(title)
                    .classed("title", true)
                    .attr("x", "1%")
                    .attr("y", "-40");

                svg
                    .selectAll("text a")
                    .data(data)
                    .enter()
                    .append("text")
                    .classed("letters", true)
                    .text(d => d.genre[0])
                    .attr("text-anchor", "start")
                    .attr("y", (d, i) => 1 + (i * 20))
                    .attr("x", "250");
                svg
                    .selectAll("text a")
                    .data(data)
                    .enter()
                    .append("text")
                    .classed("letters", true)
                    .text(d => d.genre)
                    .style("fill", (d, i) => colors[i])
                    .attr("text-anchor", "start")
                    .attr("y", (d, i) => 1 + (i * 20))
                    .attr("x", "285");

            }
        }
        renderPie()
        renderBar()
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
