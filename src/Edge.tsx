import { Button, Card, Form, Input } from 'antd';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { isNodeExist } from './App';
import './App.css';
import { GraphDef } from './Graph';

interface EdgeComponentProps {
    graphState: GraphDef;
    onEdgeAdd: (source: string, destination: string) => void;
    onEdgeRemove: (source: string, destination: string) => void;
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
            onEdgeRemove(source, destination);
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
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                        type="text"
                    />
                </Form.Item>
                <Form.Item
                    label="Destination"
                    name="destination">
                    <Input
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
