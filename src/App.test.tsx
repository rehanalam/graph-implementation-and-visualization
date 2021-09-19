import React from 'react';
import { render, screen } from '@testing-library/react';
import { getChartData, getPageRanking } from './utility';
import GraphVisualization from './GraphVisualizationComponent';

describe("getChartData Function", () => {
  test("it should return valid nodes and links to render network chart", () => {
    const input = {
      A: [],
      B: ["A", "C"],
      C: ["A"],
      D: []
    };

    const output = {
      "nodes": [
        {
          "id": "A",
          "radius": 5,
          "depth": 1,
          "color": "rgb(97, 205, 187)"
        },
        {
          "id": "B",
          "radius": 5,
          "depth": 1,
          "color": "rgb(97, 205, 187)"
        },
        {
          "id": "C",
          "radius": 5,
          "depth": 1,
          "color": "rgb(97, 205, 187)"
        },
        {
          "id": "D",
          "radius": 5,
          "depth": 1,
          "color": "rgb(97, 205, 187)"
        }
      ],
      "links": [
        {
          "source": "B",
          "target": "A",
          "distance": 500
        },
        {
          "source": "B",
          "target": "C",
          "distance": 500
        },
        {
          "source": "C",
          "target": "A",
          "distance": 500
        }
      ]
    };

    expect(getChartData(input)).toEqual(output);

  });
});

describe("getPageRanking Function", () => {
  test("it should return object with key as nodes and value as page rank", () => {
    const input = {
      A: [],
      B: ["A", "C"],
      C: ["A"],
      D: []
    };

    const output = {
      "A": 0.25,
      "B": 0.5,
      "C": 0.25,
      "D": 0.25
    }

    expect(getPageRanking(input)).toEqual(output);

  });
});

describe('GraphVisualization', () => {
  test('GraphVisualization renders both nodes and page rank card', () => {
    const graphState = {
      A: [],
      B: ["A", "C"],
      C: ["A"],
      D: []
    };
    render(<GraphVisualization graphState={graphState} />);

    screen.getByTestId('page-rank-visualization');
    screen.getByTestId('nodes-visualization');
  });
});