import React from 'react';
import {Line} from "./Line";

const WIDTH = 50;
const HEIGHT = 50;

export class Field extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            lvl: 0,
            lines: this.init()
        };

        this.start = this.start.bind(this);
        this.update = this.update.bind(this);
        this.start();
    }

    init(){
        let lines = [];
        let index = 0;
        for(let i = 0; i < HEIGHT; i++){
         let dots = [];
         for(let j = 0; j < WIDTH; j++){
             const alive = Math.random() > 0.5;
             dots[j] = {index: index, alive: alive};
             index++;
         }
         lines[i] = dots;
        }
        return lines;
    }

    init_1(){
        let lines = [];
        let index = 0;
        for(let i = 0; i < HEIGHT; i++){
            let dots = [];
            for(let j = 0; j < WIDTH; j++){
                let alive = false;
                if((i === 10 && j ===9)
                || (i === 10 && j ===10)
                || (i === 10 && j ===11)){
                    alive = true;
                }
                dots[j] = {index: index, alive: alive};
                index++;
            }
            lines[i] = dots;
        }
        return lines;
    }

    start(){
        setInterval(this.update, 1000);
    }

    update(){
        const {lines, lvl} = this.state;
        for(let i = 0; i < HEIGHT; i++){
            let line = lines[i];
            for(let j = 0; j < WIDTH; j++){
                let dot = line[j]; //current dot
                let minY = i > 0 ? i-1 : i;
                let maxY = i < HEIGHT-1 ? i+1 : i;
                let minX = j > 0 ? j-1 : j;
                let maxX = j < WIDTH-1 ? j+1 : j;
                let countNeighbours = 0; // count of alive neighbours
                for(let ni = minY; ni <= maxY; ni++){
                    for(let nj = minX; nj <= maxX; nj++){
                        if(ni === i && nj === j) continue; // address of current dot
                        let neighbour = lines[ni][nj];
                        const {index, prevAlive, alive} = neighbour;
                        // if neighbour already  was changed take the previous state else take current state
                        if((dot.index > index && prevAlive) || (dot.index < index && alive)) countNeighbours++;
                    }
                }
                dot.prevAlive = dot.alive;
                if(countNeighbours < 2){
                    dot.alive = false;
                }else if(countNeighbours === 3){
                    dot.alive = true;
                }else if(countNeighbours > 3){
                    dot.alive = false;
                }
            }
        }
        this.setState({lines: lines, lvl: lvl+1});
    }

    render() {
        const {lines, lvl} = this.state;
        return(
            <div>
                {lines.map(function (item, index) {
                    return <Line key={index} dots={item}/>
                })}
                <p>{lvl}</p>
            </div>
        )
    }
}