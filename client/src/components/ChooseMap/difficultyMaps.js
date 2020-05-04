import React from 'react';
import "./style.css";
import Button from 'react-bootstrap/Button';

function DifficultyMap(props) {



    return (
        <section className="center-buttons">
            <div className="button-holder">
                <Button variant="success" size="lg" block onClick={() => props.getDifficultyMap("Adventurer")} >Adventurer</Button>
            </div>
            <div className="button-holder">
                <Button variant="warning" size="lg" block onClick={() => props.getDifficultyMap("Legend")} >Legend</Button>
            </div>
            <div className="button-holder">
                <Button variant="danger" size="lg" block onClick={() => props.getDifficultyMap("Myth")} >Myth</Button>
            </div>
            
        </section>
    )
}
export default DifficultyMap;