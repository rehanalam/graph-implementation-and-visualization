
import { useReducer } from 'react';
import './App.css';
import EdgeComponent from './Edge';
import { GraphDef, graphInitialValue } from './Graph';
import { graphReducer, ON_EDGE_ADD, ON_EDGE_REMOVE, ON_NODE_ADD, ON_NODE_REMOVE } from './GraphReducer';
import NodeComponent from './Node';
import GraphVisualization from './GraphVisualization';

export const isNodeExist = (graphStat: GraphDef, node: string) => {
  return !!graphStat.hasOwnProperty(node);
};

function App() {
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

  const onEdgeRemove = (source: string, destination: string): void => {
    dispatch({
      type: ON_EDGE_REMOVE,
      payload: {
        source,
        destination
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
