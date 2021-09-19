import { ResponsiveNetwork } from '@nivo/network';
import { Card } from 'antd';
import React, { FunctionComponent, useEffect, useState } from 'react';
import './App.css';
import { ChartDataInterface, getChartData, GraphDef, pageRankDef, getPageRanking } from './Graph';

interface GraphVisualizationCompProps {
    graphState: GraphDef;
}

const GraphVisualization: FunctionComponent<GraphVisualizationCompProps> = (props) => {
    const { graphState } = props;
    const [chartData, setChartData] = useState<ChartDataInterface>();
    const [pageRank, setPageRank] = useState<pageRankDef>();

    useEffect(() => {
        setChartData(getChartData(graphState));
        setPageRank(getPageRanking(graphState))
    }, [graphState])

    return <div className="visualization-wrapper">
        <Card className="nodes-visualization" title="Nodes Visualization">
            <div style={{ height: '300px' }}>
                {
                    chartData && <ResponsiveNetwork
                        nodes={chartData.nodes}
                        links={chartData.links}
                        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                        repulsivity={6}
                        iterations={60}
                        nodeColor={function (e) { return e.color }}
                        nodeBorderWidth={1}
                        nodeBorderColor={{ from: 'color', modifiers: [['darker', 0.8]] }}
                        linkThickness={function (e) { return 2 * (2 - e.source.depth) }}
                        motionStiffness={160}
                        motionDamping={12}
                    />
                }
            </div>
        </Card>
        <Card className="page-rank-visualization" title="Page Rank Visualization" >
            {
                pageRank && Object.keys(pageRank).map(r => {
                    return <p key={r}><strong>{r}:</strong> {pageRank[r]}</p>
                })
            }
        </Card>
    </div>
}

export default GraphVisualization;