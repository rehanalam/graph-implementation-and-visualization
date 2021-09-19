
import { FunctionComponent, useReducer } from 'react';
import './App.css';
import EdgeComponent from './EdgeComponent';
import { graphInitialValue } from './utility';
import { graphReducer, ON_EDGE_ADD, ON_EDGE_REMOVE, ON_NODE_ADD, ON_NODE_REMOVE } from './GraphReducer';
import NodeComponent from './NodeComponent';
import GraphVisualization from './GraphVisualizationComponent';

/**
 * Main application component which renders node, edges and visualization component.
 */
const App: FunctionComponent = () => {
  const [graphState, dispatch] = useReducer(graphReducer, graphInitialValue);

  const onNodeAdd = (node: string): void => {
    dispatch({
      type: ON_NODE_ADD,
      payload: { node }
    });
  }

  const onNodeRemove = (node: string): void => {
    dispatch({
      type: ON_NODE_REMOVE,
      payload: { node }
    })
  }

  const onEdgeAdd = (source: string, destination: string): void => {
    dispatch({
      type: ON_EDGE_ADD,
      payload: {
        source,
        destination
      }
    })
  }

  const onEdgeRemove = (source: string, indexToRemove: number): void => {
    dispatch({
      type: ON_EDGE_REMOVE,
      payload: {
        source,
        indexToRemove
      }
    })
  }

  return <div className="app-wrapper">
    <div className="graph-wrapper">
      <NodeComponent
        graphState={graphState}
        onNodeAdd={onNodeAdd}
        onNodeRemove={onNodeRemove}
      />
      <EdgeComponent
        graphState={graphState}
        onEdgeAdd={onEdgeAdd}
        onEdgeRemove={onEdgeRemove}
      />
    </div>
    <GraphVisualization graphState={graphState} />
  </div>
}

export default App;
