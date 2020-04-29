import React from 'react';
import "./style.css";
import Button from 'react-bootstrap/Button';

function ChooseMap(props) {

    return (
        <section>
        <Button variant="primary" size="lg" block onClick={() => props.setMatType("friends")} >Friends</Button>
        <Button variant="primary" size="lg" block onClick={() => props.setMatType("random")} >Random</Button>
        <Button variant="primary" size="lg" block onClick={() => props.setMatType("difficulty")} >Difficulty</Button>
        <Button variant="primary" size="lg" block onClick={() => props.setMatType("previous")} >Previous</Button>
        </section>
)
}
export default ChooseMap;