import React from 'react';
import "./style.css";
import Button from 'react-bootstrap/Button';

function friendsMaps(props) {

    return (
        <section className="center-buttons">
            <div className="button-holder">
            {props.friendsList.map((item, index) => (
                    
                    <div>
                    <Button variant="success" id={item.friend_id}
                    onClick={() => {
                            props.getMapByFriend_id(item.friend_id);
                        }} 
                        >{item.friend_name}</Button>
                    </div>
                ))}
            </div>
        </section>
    )
}
export default friendsMaps;