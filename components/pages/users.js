import React, { Component } from 'react';
import ReactDom from "react-dom";
import Header from "../header";
import Sidebar1 from "../sidebar";
// const MysqlAPIURL = process.env.MysqlAPI,

class Users extends Component {

    constructor(props) {
        super(props);

        this.state = {
            default: [{
                a: '123',
                b: '456'
            }],
            users: [{ 
                "Company_Table_id": "", 
                "Company_Name": "",
                "Password": "", 
                "Company_Phone": "", 
                "Company_Address": "", 
                "Create_time": "", 
                "Active_Status": "", 
                "Deadline": "" }]
        };


    }

    渲染前執行
    componentWillMount() {
        this.get_users();
    }

    get_users() {
        const SqlApi_url = "http://127.0.0.1:3000/read"
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
                        <div class="row" >
                            <div class="col">
                                <div style={{
                                    width: '100%',
                                    padding: '1%',
                                    backgroundColor: '#fff'
                                }}>
                                    <div class="row" style={{ paddingLeft: 30, paddingRight: 30 }}>
                                        Home / Users
                                    </div>
                                </div>
                            </div>      
          
                        </div>

                        <div class="row" style={{
                            width: '80%',
                            padding: '1%',
                        }}>
                            <div class="col">
                                <input class="form-control" id="myInput" type="text" placeholder="Search.."></input>
                            </div>
                            <div class="col">
                                <button type="button" class="btn btn-success" >新增客戶資訊</button>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <div style={{
                                    width: '100%',
                                    
                                }}>
                                    <table class="table table-hover" style={{ width: '100%' }}>
                                        <thead>
                                            <tr>
                                                <th><input type="checkbox" value="" /></th>
                                                <th>Company Name</th>
                                                <th>Comapny Phone</th>
                                                <th>Comapny Address</th>
                                                <th>Active Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.users.map(function (object, i) {
                                                return (
                                                    <tr>
                                                        <td><input type="checkbox"  value=""/></td>
                                                        <td>{object.Company_Name}</td>
                                                        <td>{process.env.REACT_APP_SECRET_NAME}</td>
                                                        <td>{object.Company_Address}</td>
                                                        <td>{object.Active_Status}</td>
                                                    </tr>);
                                            })}
                                            {/* <tr>
                                            <td>{JSON.stringify(this.state.users)}</td>
                                            <td>Doe</td>
                                            <td>john@example.com</td>
                                        </tr> */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>                        
                        
                    </div>
                
                
                
                </div>
            </div>
        );
    }
}

export default Users;
