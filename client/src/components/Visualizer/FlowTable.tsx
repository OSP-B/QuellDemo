import React, { useState, useEffect, useRef } from 'react';
import { parse, DocumentNode, SelectionSetNode, OperationDefinitionNode } from 'graphql';
import MonacoEditor from '@monaco-editor/react';
import styles from './Visualizer.modules.css';

interface Props {
  query: string;
}

const FlowTable: React.FC<Props> = ({ query }) => {
  const [queryOperations, setQueryOperations] = useState<string[]>([]);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    const operation = parseQuery(query);
    if (operation) {
      const operationOrder = generateOperationOrder(operation);
      setQueryOperations(operationOrder);
    }
  }, [query]);

  const parseQuery = (query: string): SelectionSetNode | OperationDefinitionNode | undefined => {
    const ast: DocumentNode = parse(query);

    if (ast.definitions.length === 1) {
        const definition = ast.definitions[0];
        if (definition.kind === 'OperationDefinition') {
          return definition.selectionSet;
        } else if (definition.kind === 'FragmentDefinition') {
          return definition.selectionSet;
        }
      }
    
    return undefined;
  };

  const generateOperationOrder = (operation: SelectionSetNode | OperationDefinitionNode, parentName = ''): string[] => {
    const operationOrder: string[] = [];
    if (!operation) {
      return operationOrder;
    }
    operation.selections.forEach((selection: { name: { value: any; }; selectionSet: OperationDefinitionNode | SelectionSetNode; }) => {
      if ('name' in selection) {
        const fieldName = parentName ? `${parentName}.${selection.name.value}` : selection.name.value;
        operationOrder.push(fieldName);
        if ('selectionSet' in selection) {
          const nestedSelections = generateOperationOrder(selection.selectionSet, fieldName);
          operationOrder.push(...nestedSelections);
        }
      }
    });

    return operationOrder;
  };

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleEditorChange = (value: string, event: any) => {
    // do nothing since we want the editor to be read-only
  };

  return (
    <div>
      <MonacoEditor
        value={queryOperations.join('\n')}
        language="graphql"
        height={200}
        options={{
          readOnly: true,
          wordWrap: 'on',
          wrappingIndent: 'indent',
          autoIndent: 'keep',
          formatOnPaste: true,
          formatOnType: true,
          minimap: {
            enabled: false,
          },
          lineNumbers: 'off',
        }}
      />
    </div>
  );
};

export default FlowTable;
