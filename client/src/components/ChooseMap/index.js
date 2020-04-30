import React from 'react';
import "./style.css";
import Button from 'react-bootstrap/Button';

function ChooseMap(props) {

    return (
        <section>
        <Button variant="primary" size="lg" block onClick={() => props.setMapType("friends")} >Friends</Button>
        <Button variant="primary" size="lg" block onClick={() => props.setMapType("random")} >Random</Button>
        <Button variant="primary" size="lg" block onClick={() => props.setMapType("difficulty")} >Difficulty</Button>
        <Button variant="primary" size="lg" block onClick={() => props.setMapType("previous")} >Previous</Button>
        </section>
)
}
export default ChooseMap;