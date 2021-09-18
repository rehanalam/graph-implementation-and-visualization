import { InputLink, InputNode } from "@nivo/network";

export interface GraphDef {
  [key: string]: Array<string>;
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

export interface ChartDataInterface {
  nodes: InputNode[];
  links: InputLink[];
}

export let graph = (function () {
  let nodeList: GraphDef = graphInitialValue;

  let isNodeExist = (node: string) => {
    return !!nodeList.hasOwnProperty(node);
  };

  let addNode = (node: string) => {
    if (isNodeExist(node)) {
      alert(`Node already exist.`);
    } else {
      nodeList[node] = [];
    }
  };

  let removedNode = (node: string) => {
    if (isNodeExist(node)) {
      delete nodeList[node];

      Object.keys(nodeList).forEach((k) => {
        if (nodeList[k].indexOf(node) === 1) {
          removeEdge(k, node);
        }
      });
    } else {
      alert(`Node doesn't exist.`);
    }
  };

  let addEdge = (source: string, destination: string) => {
    if (isNodeExist(source)) {
      nodeList[source].push(destination);
    } else {
      alert(`Source node ${source} doesn't exist.`);
    }
  };

  let removeEdge = (source: string, destination: string) => {
    const index = nodeList[source].indexOf(destination);
    if (index !== -1) {
      nodeList[source].splice(index, 1);
    } else {
      alert(`Edge doesn't exist in entered source.`);
    }
  };

  let getChartData = () => {
    let nodes = Object.keys(nodeList).map((n) => {
      return {
        id: n,
        radius: 5,
        depth: 1,
        color: "rgb(97, 205, 187)",
      };
    });

    let links: any = [];
    Object.keys(nodeList).forEach((n) => {
      nodeList[n].forEach((edge) => {
        links.push({
          source: n,
          target: edge,
          distance: 500,
        });
      });
    });
    return { nodes, links };
  };

  let getGraph = () => nodeList;

  return {
    addNode,
    removedNode,
    addEdge,
    removeEdge,
    getGraph,
    getChartData,
  };
})();

export interface pageRankDef {
  [key: string]: number;
}

export let getPageRanking = function (graph: GraphDef): pageRankDef {
  const nodes = Object.keys(graph);
  const nodeLength = nodes.length;

  if (nodeLength < 1) {
    return {};
  }

  const probability = 1 / nodeLength;
  let nodeProbability = nodes.reduce<pageRankDef>(
    (acc, key): pageRankDef => {
      let edgesLength = graph[key].length;
      if (edgesLength > 0) {
        acc[key] = probability / edgesLength;
      } else {
        acc[key] = probability;
      }
      return acc;
    },
    {}
  );

  let pageRanking: pageRankDef = {};
  nodes.forEach((key) => {
    let edgesLength = graph[key].length;
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

  return pageRanking;
};

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
  return { nodes, links };
};
