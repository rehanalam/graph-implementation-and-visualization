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
    const [chartDataState, setChartDataState] = useState<ChartDataInterface>();
    const [pageRankState, setPageRankState] = useState<pageRankDef>();

    useEffect(() => {
        setChartDataState(getChartData(graphState));
        setPageRankState(getPageRanking(graphState))
    }, [graphState])

    return <div className="visualization-wrapper">
        <Card
            data-testid="nodes-visualization"
            className="nodes-visualization"
            title="Nodes Visualization">
            <div style={{ height: '300px' }}>
                {
                    chartDataState && <ResponsiveNetwork
                        nodes={chartDataState.nodes}
                        links={chartDataState.links}
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
        <Card
            data-testid="page-rank-visualization"
            className="page-rank-visualization"
            title="Page Ranking" >
            {
                pageRankState && Object.keys(pageRankState).map(r => {
                    return <p key={r}><strong>{r}:</strong> {pageRankState[r]}</p>
                })
            }
        </Card>
    </div>
}

export default GraphVisualization;