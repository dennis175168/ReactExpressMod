import React, { Component } from 'react';
import ReactDom from "react-dom";
import Header from "./header";
import Sidebar1 from "./sidebar";

import DB_API from '../public/paramaters';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            default: [{
                a: '123',
                b: '456'
            }],
            users: [],
            files: []
        };


    }

    

    渲染前執行
    componentWillMount() {
       // window.removeEventListener('resize', this.updateWindowDimensions);
       this.get_users();
       this.get_files();
    }

    get_users() {
        const SqlApi_url = DB_API + "/read";
        const data = new FormData();
        data.append('table', 'company_table')

        fetch(SqlApi_url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "table": "company_table" }),//data,
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                this.setState({ users: res });
            });
    };

    get_files() {
        const SqlApi_url = DB_API + "/read";
        const data = new FormData();
        data.append('table', 'company_table')

        fetch(SqlApi_url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "table": "image_table" }),//data,
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                this.setState({ files: res });
            });
    };


    render() {
        return (
            <div style={{
                backgroundColor:'#E4E5E7',
            }}>
                <Header />
                <div class="row mx-auto" >
                    <div class="col-lg-2" style={{padding:0}} >
                        <Sidebar1 />
                    </div>

                    <div class="col-lg-10" style={{ padding: 0}} >
                        {/* .col */}
                        <div class="row" style={{ margin: '0px' }}>
                            <div class="col" style={{
                                width: '100%',
                                backgroundColor: '#fff',
                                padding: '0px'
                            }}>
                                <div style={{ paddingLeft: 30, padding: '1%' }}>
                                    <b>Home / Dashboard</b>
                                </div>
                            </div>
                        </div>
                        <div class="row" style={{
                            width: '100%',
                            padding: '2%',
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",

                        }} >
                            <div class="col" style={{
                                backgroundColor: '#fff',
                                padding: '10px',
                                margin: '10px'
                            }}>
                                <h2> Hi , {localStorage.getItem('user_name')} </h2>
                            </div>
                        </div>
                        <div class="row" style={{
                            width: '100%',
                            padding: '2%',
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            
                        }} >
                            <div class="col" style={{
                                width: '34%',
                                height: '80px',
                                backgroundColor: '#fff',
                                padding: '10px',
                                margin:'10px'
                            }}>
                                <h2>{this.state.users.length}</h2>
                                <div><h3> 位使用帳戶 </h3></div>
                            </div>

                            <div class="col" style={{
                                width: '33%',
                                height: '80px',
                                backgroundColor: '#fff',
                                padding: '10px',
                                margin: '10px'
                            }}>
                                <h2>{this.state.files.length}</h2>
                                <div><h3> 識別檔案數量 </h3></div>
                            </div>

                            <div class="col" style={{
                                width: '34%',
                                height: '80px',
                                backgroundColor: '#fff',
                                padding: '10px',
                                margin: '10px'
                            }}>
                                <h2>5</h2>
                                <div><h3> 管理員數量 </h3></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
