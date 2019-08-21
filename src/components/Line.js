import React from 'react'
import {Dot} from "./Dot";

export class Line extends React.Component {
    render() {
        const {dots} = this.props;
        return (
            <div className="line">
                {dots.map(function (item) {
                    return <Dot key={item.index} dot={item}/>
                })}
            </div>
        )
    }
}