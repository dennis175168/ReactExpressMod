import React, { Component } from 'react';
import ReactDom from "react-dom";
import Header from "../header";
import Sidebar1 from "../sidebar";

class Files extends Component {

    constructor(props) {
        super(props);

        this.state = {
            default: [{
                a: '123',
                b: '456'
            }],
            data: []
        };


    }

    渲染前執行
    componentWillMount() {
        
    }


    render() {
        return (
            <div style={{
                backgroundColor: '#E4E5E7',
            }}>
                <Header />
                <div class="row" >
                    <div class="col-lg-2" style={{ padding: 0 }} >
                        <Sidebar1 />
                    </div>

                    <div class="col-lg-10" style={{ padding: 0 }}>
                        {/* .col */}
                        <div style={{
                            width: '100%',
                            padding: '1%',
                            backgroundColor: '#fff'
                        }}>
                            <div class="row" style={{ paddingLeft: 30 }}>
                                Home / Files
                            </div>
                        </div>
                        <div style={{
                            width: '80%',
                            padding: '1%',
                        }}>
                            <div class="list-group">
                                <a href="#" class="list-group-item list-group-item-action">First item</a>
                                <a href="#" class="list-group-item list-group-item-action">Second item</a>
                                <a href="#" class="list-group-item list-group-item-action">Third item</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Files;
