import React from 'react';
import "./style.css";
import Button from 'react-bootstrap/Button';

function friendsDungeons(props) {

    return (
        // Display a list of dungeons of a friend
        <section className="center-buttons">
            <div className="button-holder">
                
            {props.dungeonList.map((item, index) => (
                    
                    <div>
                    <Button className="button-holder" variant="success" id={item._id}
                    onClick={() => {
                            props.getMapById(item._id);
                            console.log("friend's dungeons: ", item._id);
                        }} 
                        >{item.title}</Button>
                    </div>
                ))}
            </div>
        </section>
    )
}
export default friendsDungeons;