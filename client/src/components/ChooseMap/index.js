import React from 'react';
import "./style.css";
import Button from 'react-bootstrap/Button';

function ChooseMap(props) {

    return (
        <section className="center-buttons">
            <div className="button-holder">
                <Button variant="primary" size="lg" block onClick={() => props.setMapType("friends")} >Friends</Button>
            </div>
            <div className="button-holder">
                <Button variant="primary" size="lg" block onClick={() => props.setMapType("random")} >Random</Button>
            </div>
            <div className="button-holder">
                <Button variant="primary" size="lg" block onClick={() => props.setMapType("difficulty")} >Difficulty</Button>
            </div>
            <div className="button-holder">
                <Button variant="primary" size="lg" block onClick={() => props.setMapType("previous")} >Previous</Button>
            </div>
        </section>
    )
}
export default ChooseMap;