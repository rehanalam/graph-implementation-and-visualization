import { GraphDef, removeEdge } from "./utility";

interface ActionDef {
  type: string;
  payload: {
    [key: string]: any;
  };
}

export const ON_NODE_ADD = "ON_NODE_ADD";
export const ON_NODE_REMOVE = "ON_NODE_REMOVE";
export const ON_EDGE_ADD = "ON_EDGE_ADD";
export const ON_EDGE_REMOVE = "ON_EDGE_REMOVE";

/***
 * This component renders network chart to visualize nodes
 * and shows page page ranking.
 * @param {GraphDef} graphState
 ***/

export const graphReducer = (state: GraphDef, action: ActionDef) => {
  switch (action.type) {
    // Adds node in graph
    case ON_NODE_ADD: {
      return { ...state, [action.payload.node]: [] };
      break;
    }

    // Removes node from graph
    case ON_NODE_REMOVE: {
      let newState = { ...state };
      delete newState[action.payload.node];

      // remove edges of current removing nodes
      Object.keys(newState).forEach((key) => {
        const indexToRemove = newState[key].indexOf(action.payload.node);
        if (indexToRemove !== -1) {
          newState = removeEdge(newState, key, indexToRemove);
        }
      });
      return newState;
      break;
    }

    // Adds edge from graph
    case ON_EDGE_ADD: {
      return {
        ...state,
        [action.payload.source]: [
          ...state[action.payload.source],
          action.payload.destination,
        ],
      };
      break;
    }

    // Removes edge from graph
    case ON_EDGE_REMOVE: {
      return removeEdge(
        state,
        action.payload.source,
        action.payload.indexToRemove
      );
      break;
    }

    default:
      return state;
  }
};
