import React, { Component } from 'react';
import ReactDom from "react-dom";

class Block extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        };

        // this.path = this.path.bind(this); //傳遞子物件
    }

    渲染前執行
    componentWillMount() {
    }


    render() {
        return (
            <div>
                <div style={{padding:'20%'}}>
                    <h2>Block</h2>
                    <h3>請重新登入</h3>
                    <a href="/"><button type="button" class="btn btn-primary" onClick={() => { }}>重新登入</button></a>
                </div>
                
            </div>
        );
    }
}

export default Block;
