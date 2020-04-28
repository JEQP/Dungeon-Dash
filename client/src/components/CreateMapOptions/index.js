import React from 'react';
import "./style.css";


function CreateMapOptions(props) {

    return (
        <section className="features-grid">
            <div className="square pitWallsNone" onClick={() => props.setSelectedFeature("pitWallsNone")}></div>
            <div className="square pitWallLeft" onClick={() => props.setSelectedFeature("pitWallLeft")}></div>
            <div className="square pitWallLeftTop" onClick={() => props.setSelectedFeature("pitWallLeftTop")}></div>
            <div className="square pitWallTop" onClick={() => props.setSelectedFeature("pitWallTop")}></div>
            <div className="square wallLeft" onClick={() => props.setSelectedFeature("wallLeft")}></div>
            <div className="square wallLeftTop" onClick={() => props.setSelectedFeature("wallLeftTop")}></div>
            <div className="square wallTop" onClick={() => props.setSelectedFeature("wallTop")}></div>
            <div className="square monster" onClick={() => props.setSelectedFeature("monster")}></div>
        </section>
    )
}

export default CreateMapOptions;