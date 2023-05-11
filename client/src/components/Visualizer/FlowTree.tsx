import React, { useState, useEffect, useCallback } from 'react';
import ReactFlow, { Controls, Background, applyEdgeChanges, applyNodeChanges, MiniMap, NodeChange, EdgeChange } from 'reactflow';
import { parse, DocumentNode, FieldNode, SelectionNode, FieldDefinitionNode, OperationDefinitionNode } from 'graphql';


// type for NodeData
// data describes the content of the node
interface NodeData {
  id: string;
  data?: { label: string };
  position?: {
    x: number;
    y: number;
  };
  style: {};
}

// type for FlowElement
interface FlowElement extends NodeData {
  id: string;
  position?: Position;
  target: string;
  source: string;
}

interface Position {
  x: number;
  y: number;
}


// declares prop x on Position
interface PositionWithX extends Position {
  x: number;
}


// turns ast field to node
const getNode = (
  node: FieldNode | SelectionNode | OperationDefinitionNode,
  depth: number,
  siblingIndex: number,
  numSiblings: number,
  numNodes: number,
  parentPosition?: Position,
): NodeData => {
  const label = node.kind === 'Field' ? node.name.value : node.kind;
  const id = `${node.loc?.start}-${node.loc?.end}`;
  const parentX = parentPosition ? (parentPosition as PositionWithX).x : 0;
  const x = ((siblingIndex + 0.5) / numSiblings) * 500 + 100;
  return {
    id: id!,
    data: {label},
    position: {
      y: 100 + depth * 100,
      x: parentX + x - (numSiblings / 2) * 275,
    },
    style:  {
      width: 125, 
      height: 30, 
      fontSize: 18, 
      border: `none`, 
      borderRadius: 10, 
      boxShadow: `0px 0px 4px gray`,
      padding: `2px 0px 0px 0px`
    }
  };
};



// gets edge connection between parent/child nodes
// edge is the thing that visually connects the parent/child node together

const getEdge = (parent: FieldNode, child: SelectionNode): FlowElement => {
  const parentId = `${parent.loc?.start}-${parent.loc?.end}`;
  const childId = `${child.loc?.start}-${child.loc?.end}`;

  return {
    id: `${parentId}-${childId}`,
    source: parentId,
    target: childId,
    style: {},
  };
};

// recursively constructs a tree structure from GraphQL AST
const buildTree = (
  node: FieldNode | SelectionNode,
  nodes: NodeData[],
  edges: FlowElement[],
  depth = 0,
  siblingIndex = 0,
  numSiblings = 1,
  parentPosition?: Position
): void => {
  // gets the parent node and pushes it into the nodes array
  const parent = getNode(node, depth, siblingIndex, numSiblings, numSiblings, parentPosition);
  nodes.push(parent);

  console.log("Parent node: ", parent);
  // the selectionSet means that it has child nodes
  if (node.kind === 'Field' && node.selectionSet) {
    const numChildren = node.selectionSet.selections.length;
    // forEach childNode it will call getNode
    node.selectionSet.selections.forEach((childNode, i) => {
      const child = getNode(childNode, depth + 1, i, numChildren, numSiblings, parent.position);
      //pushes the child node and edge into the respective arrays
      edges.push(getEdge(node as FieldNode, childNode));
      buildTree(childNode, nodes, edges, depth + 1, i, numChildren, parent.position);
    });
  }
};


// takes the ast and returns nodes and edges as arrays for ReactFlow to render
const astToTree = (query: string): { nodes: NodeData[]; edges: FlowElement[] } => {
  // parses query to AST
  const ast: DocumentNode = parse(query);
  const operation = ast.definitions.find(
    def => def.kind === 'OperationDefinition' && def.selectionSet
  );
  if (!operation) {
    throw new Error('No operation definition found in query');
  }
  const selections = (operation as OperationDefinitionNode).selectionSet.selections;
  const nodes: NodeData[] = [];
  const edges: FlowElement[] = [];
  buildTree(selections[0], nodes, edges, 0);
  return { nodes, edges };
};


// render a tree graph from GraphQL AST
const FlowTree: React.FC<{query: string}> = ({query}) => {
  const [currentQuery, setCurrentQuery] = useState(query);

// update the state of nodes and edges when query changes
  useEffect(() => {
  // only update if the query is different from the currentQuery
  if (query !== currentQuery) {
    const { nodes: newNodes, edges: newEdges } = astToTree(query);
    setNodes(newNodes);
    setEdges(newEdges);
    setCurrentQuery(query);
  }
} , [query, currentQuery]);

  // console.log(query);
  const { nodes, edges } = astToTree(query);
  // console.log(nodes);

  // storing the initial values of the nodes and edges
  const [newNodes, setNodes] = useState(nodes);
  const [newEdges, setEdges] = useState(edges);

  // setNodes/setEdges updates the state of the component causing it to re-render
  const onNodesChange = useCallback( (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),[] );
  const onEdgesChange = useCallback( (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),[] );
  
  // console.log('ast: ', ast);
  const proOptions = { hideAttribution: true };
  
  return (
    <ReactFlow 
    nodes={newNodes} 
    edges={newEdges} 
    onNodesChange={onNodesChange}
    onEdgesChange={onEdgesChange}
    fitView
    proOptions={proOptions}
    style={{ height: 500, width: '100%', border: '3px solid lightGray', borderRadius: 10 }} >
          <Background />
          <Controls />  
          <MiniMap style={{height: 100, width: 100}}/>
    </ReactFlow>
  );
};


export default FlowTree;
