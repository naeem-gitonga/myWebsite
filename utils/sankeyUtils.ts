/**
 * Utilities for building Sankey diagram data
 */

import type { AnalyticsRow } from './chartDataTransformers';

export type SankeyNode = {
  name: string;
};

export type SankeyLink = {
  source: number;
  target: number;
  value: number;
};

export type SankeyData = {
  nodes: SankeyNode[];
  links: SankeyLink[];
};

/**
 * Build Sankey data showing: Source → Page → Event
 */
export function buildSankeyData(data: AnalyticsRow[]): SankeyData {
  const sankeySources = Array.from(new Set(data.map((r) => r.fromwebsite)));
  const sankeyPages = Array.from(new Set(data.map((r) => r.page)));
  const sankeyEvents = Array.from(new Set(data.map((r) => r.eventtype)));

  const sankeyNodes: SankeyNode[] = [
    ...sankeySources.map((name) => ({ name: `Source: ${name}` })),
    ...sankeyPages.map((name) => ({ name: `Page: ${name}` })),
    ...sankeyEvents.map((name) => ({ name: `Event: ${name}` })),
  ];

  const sankeyLinks: SankeyLink[] = [];
  const flowMap = new Map<string, number>();

  // Count flows
  data.forEach((row) => {
    const sourceNode = `Source: ${row.fromwebsite}`;
    const pageNode = `Page: ${row.page}`;
    const eventNode = `Event: ${row.eventtype}`;

    const sourcePageKey = `${sourceNode}→${pageNode}`;
    const pageEventKey = `${pageNode}→${eventNode}`;

    flowMap.set(sourcePageKey, (flowMap.get(sourcePageKey) || 0) + 1);
    flowMap.set(pageEventKey, (flowMap.get(pageEventKey) || 0) + 1);
  });

  // Create source→page links
  sankeySources.forEach((source) => {
    sankeyPages.forEach((page) => {
      const key = `Source: ${source}→Page: ${page}`;
      const count = flowMap.get(key);
      if (count) {
        const sourceIdx = sankeyNodes.findIndex((n) => n.name === `Source: ${source}`);
        const targetIdx = sankeyNodes.findIndex((n) => n.name === `Page: ${page}`);
        sankeyLinks.push({ source: sourceIdx, target: targetIdx, value: count });
      }
    });
  });

  // Create page→event links
  sankeyPages.forEach((page) => {
    sankeyEvents.forEach((event) => {
      const key = `Page: ${page}→Event: ${event}`;
      const count = flowMap.get(key);
      if (count) {
        const sourceIdx = sankeyNodes.findIndex((n) => n.name === `Page: ${page}`);
        const targetIdx = sankeyNodes.findIndex((n) => n.name === `Event: ${event}`);
        sankeyLinks.push({ source: sourceIdx, target: targetIdx, value: count });
      }
    });
  });

  return { nodes: sankeyNodes, links: sankeyLinks };
}
