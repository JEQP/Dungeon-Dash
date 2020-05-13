import React from 'react';
import "./style.css";
import Button from 'react-bootstrap/Button';

function PreviousMap(props) {

    return (
        <section className="center-buttons">
            <div className="button-holder">
                {props.dungeonList.map((item, index) => (

                    <div>
                        <Button className="button-holder" variant="success" id={item.id}
                            onClick={() => {
                                props.getMapById(item.id);
                            }}
                        >{item.title}</Button>
                    </div>
                ))}
            </div>
        </section>
    )
}
export default PreviousMap;