import React from 'react';
import "./style.css";
import Button from 'react-bootstrap/Button';

function PreviousMap(props) {



    return (
        <section className="center-buttons">
            <div className="button-holder">
                {props.dungeonList.map((item, index) => (
                    
                    <div>
                    <Button variant="success" id={item.id}
                    onClick={() => {
                            props.getMapById(item.id);
                        }} 
                        >{item.title}</Button>
                    </div>
                ))}




                {/* this.state.dungeonList.map((item, index) => (
                                <Button variant="danger" className="dungeonList" id={item._id}
                                    // onClick={() => {
                                    //     this.setState({ dungeonListCreator: item.friend_id });
                                    // }} 
                                    >{item.title}</Button>
                            )) */}



               </div>
            
        </section>
    )
}
export default PreviousMap;