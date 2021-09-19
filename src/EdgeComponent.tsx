import { Button, Card, Form, Input } from 'antd';
import { FunctionComponent, useEffect, useState } from 'react';
import './App.css';
import { GraphDef, isNodeExist } from './utility';

interface EdgeComponentProps {
    graphState: GraphDef;
    onEdgeAdd: (source: string, destination: string) => void;
    onEdgeRemove: (source: string, indexToRemove: number) => void;
}

const EdgeComponent: FunctionComponent<EdgeComponentProps> = (props) => {
    const { graphState, onEdgeAdd, onEdgeRemove } = props;
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [errorState, setErrorState] = useState('');

    useEffect(() => {
        setErrorState('');
    }, [graphState]);

    const addEdge = (source: string, destination: string): void => {
        if (isNodeExist(graphState, source) && isNodeExist(graphState, destination)) {
            onEdgeAdd(source, destination);
        } else {
            setErrorState(`Node doesn't exist.`);
        }
    }

    const removeEdge = (source: string, destination: string): void => {
        if (isNodeExist(graphState, source) && isNodeExist(graphState, destination)) {
            const indexToRemove = graphState[source].indexOf(destination);
            if (indexToRemove !== -1) {
                onEdgeRemove(source, indexToRemove);
            }
        } else {
            setErrorState(`Node doesn't exist.`);
        }
    }

    return <div className="edges-wrapper">
        <Card title="EDGES" >
            <Form
                name="basic">
                <Form.Item
                    label="Source"
                    name="source">
                    <Input
                        data-testid="edge-source"
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                        type="text"
                    />
                </Form.Item>
                <Form.Item
                    label="Destination"
                    name="destination">
                    <Input
                        data-testid="edge-destination"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        type="text"
                    />
                </Form.Item>
            </Form>
            <div className="edges-actions-wrapper">
                <Button
                    type="primary"
                    onClick={() => addEdge(source, destination)}>
                    Add Edge
                </Button>
                <Button
                    type="ghost"
                    onClick={() => removeEdge(source, destination)}>
                    Remove Edge
                </Button>
            </div>
            <p className="error-message-text">{errorState}</p>
        </Card>
    </div>
}

export default EdgeComponent;
