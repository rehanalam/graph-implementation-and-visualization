import { InputLink, InputNode } from "@nivo/network";

export interface GraphDef {
  [key: string]: Array<string>;
}

export interface ChartDataInterface {
  nodes: InputNode[];
  links: InputLink[];
}

export interface pageRankDef {
  [key: string]: number;
}

export let graphInitialValue: GraphDef = {
  A: [],
  B: ["A", "C", "D", "F", "G"],
  C: [],
  D: [],
  F: [],
  G: [],
  H: [],
};

/***
 *
 * getPageRanking determine the relative rank of nodes.
 * TODO: Do not support the damping factor for Page Rank calculation.
 * TODO: Do not support the tolerance value for Page Rank calculation.
 * @param {GraphDef} graph
 *
 ***/

export let getPageRanking = function (graph: GraphDef): pageRankDef {
  const nodes = Object.keys(graph);
  const nodeLength = nodes.length;

  if (nodeLength < 1) {
    return {};
  }

  const probability = 1 / nodeLength;
  let nodeProbability = nodes.reduce<pageRankDef>((acc, key): pageRankDef => {
    let edgesLength = graph[key].length;
    if (edgesLength > 0) {
      acc[key] = probability / edgesLength;
    } else {
      acc[key] = probability;
    }
    return acc;
  }, {});

  let pageRanking: pageRankDef = {};
  nodes.forEach((key) => {
    const edgesLength = graph[key].length;
    let sum = 0;
    if (edgesLength) {
      sum = graph[key].reduce((acc, cv) => {
        return acc + nodeProbability[cv];
      }, 0);
    } else {
      sum = nodeProbability[key];
    }
    pageRanking[key] = sum;
  });
  console.log(pageRanking);
  return pageRanking;
};

/***
 *
 * getChartData transforms graph into data supported by @nivo/network chart.
 * @param {GraphDef} graph
 *
 ***/
export let getChartData = (graph: GraphDef) => {
  let nodes = Object.keys(graph).map((n) => {
    return {
      id: n,
      radius: 5,
      depth: 1,
      color: "rgb(97, 205, 187)",
    };
  });

  let links: any = [];
  Object.keys(graph).forEach((n) => {
    graph[n].forEach((edge) => {
      links.push({
        source: n,
        target: edge,
        distance: 500,
      });
    });
  });
  console.log({ nodes, links });
  return { nodes, links };
};

export const isNodeExist = (graphStat: GraphDef, node: string) => {
  return !!graphStat.hasOwnProperty(node);
};


export const removeEdge = (state: GraphDef, source: string, indexToRemove: number) => {
  return {
    ...state,
    [source]: [
      ...state[source].slice(0, indexToRemove),
      ...state[source].slice(indexToRemove + 1),
    ],
  };
};