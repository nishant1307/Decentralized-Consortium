import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Link } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
export default function Landing(props) {
    const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

    return (
        <div className="body">
            <Header headerStyle="bg-wrap" />
            <div className="section full-screen">
                <div className="wrapper">
                    <div className="columns column w-row">
                        <div className="w-col w-col-12">
                            <br/><br/>
                            <img src={require("../../WA/images/new/arc.png")} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    );
}
