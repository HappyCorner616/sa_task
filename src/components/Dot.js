import React from 'react';

export class Dot extends React.Component {
    render() {
        const {alive} = this.props.dot;
        return (
            <div className={alive ? 'blackDot' : 'whiteDot'}></div>
        )
    }
}