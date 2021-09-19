import { GraphDef } from "./Graph";

interface ActionDef {
  type: string;
  payload: {
    [key: string]: string;
  };
}

export const ON_NODE_ADD = "ON_NODE_ADD";
export const ON_NODE_REMOVE = "ON_NODE_REMOVE";
export const ON_EDGE_ADD = "ON_EDGE_ADD";
export const ON_EDGE_REMOVE = "ON_EDGE_REMOVE";

export const graphReducer = (state: GraphDef, action: ActionDef) => {
  let removeEdge = (source: string, destination: string) => {
    const index = state[source].indexOf(destination);
    if (index !== -1) {
      state[source].splice(index, 1);
    }
    return { ...state };
  };

  switch (action.type) {
    // Adds node in graph
    case ON_NODE_ADD: {
      state[action.payload.node] = [];
      return { ...state };
      break;
    }

    // Removes node from graph
    case ON_NODE_REMOVE: {
      delete state[action.payload.node];

      Object.keys(state).forEach((key) => {
        if (state[key].indexOf(action.payload.node) !== -1) {
          removeEdge(key, action.payload.node);
        }
      });
      return { ...state };
      break;
    }

    // Adds edge from graph
    case ON_EDGE_ADD: {
      state[action.payload.source].push(action.payload.destination);
      return { ...state };
      break;
    }

    // Removes edge from graph
    case ON_EDGE_REMOVE: {
      return removeEdge(action.payload.source, action.payload.destination);
      break;
    }

    default:
      return state;
  }
};
