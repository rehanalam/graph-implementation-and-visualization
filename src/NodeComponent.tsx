import { Button, Card, Form, Input } from 'antd';
import { FunctionComponent, useEffect, useState } from 'react';
import './App.css';
import { GraphDef, isNodeExist } from './utility';

interface NodeComponentProps {
    graphState: GraphDef;
    onNodeAdd: (node: string) => void;
    onNodeRemove: (node: string) => void;
}

const NodeComponent: FunctionComponent<NodeComponentProps> = (props) => {
    const { graphState, onNodeAdd, onNodeRemove } = props;
    const [nodeName, setNodeName] = useState('');
    const [errorState, setErrorState] = useState('');

    useEffect(() => {
        setErrorState('');
    }, [graphState]);

    const addNode = (node: string): void => {
        if (isNodeExist(graphState, node)) {
            setErrorState('Node Already Exist');
        } else {
            onNodeAdd(node)
        }
    }

    const removeNode = (node: string): void => {
        if (isNodeExist(graphState, node)) {
            onNodeRemove(node)
        } else {
            setErrorState("Node doesn't exist.");
        }
    }

    return <div className="nodes-wrapper">
        <Card title="Nodes" >
            <Form
                name="basic">
                <Form.Item
                    label="Node Name"
                    name="node_name">
                    <Input
                        value={nodeName}
                        onChange={(e) => setNodeName(e.target.value)}
                        type="text"
                    />
                </Form.Item>
                <div className="nodes-actions-wrapper">
                    <Button
                        type="primary"
                        onClick={() => addNode(nodeName)}>
                        Add Node
                    </Button>
                    <Button
                        type="ghost"
                        onClick={() => removeNode(nodeName)}>
                        Remove Node
                    </Button>
                </div>
            </Form>
            <p className="error-message-text">{errorState}</p>
        </Card>
    </div>
}

export default NodeComponent;
