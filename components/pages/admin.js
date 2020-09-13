import React, { Component } from 'react';
import ReactDom from "react-dom";
import Header from "../header";
import Sidebar1 from "../sidebar";
import AddAdminForm from "./AdminComponents/addadmin";

class Admin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            admin: [{
                Admin_Name: '123'
            }]
        };


    }

    渲染前執行
    componentWillMount() {

        this.get_admin();
    }

    get_admin() {
        const SqlApi_url = "http://127.0.0.1:3000/read";

        fetch(SqlApi_url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    "table": "admin_user_table"
                }
            ),//data,
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                this.setState({ admin: res });
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
                        <div class="row">
                            <div class="col">
                                <div style={{
                                    width: '100%',
                                    padding: '1%',
                                    backgroundColor: '#fff'
                                }}>
                                    Home / Admin
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
                                <button type="button" class="btn btn-success" data-toggle="modal" data-target="#myModal" data-backdrop="false">
                                    新增管理者
                            </button>
                            </div>
                        </div>

                        <div class="row" style={{
                            width: '100%',
                            padding: '1%',
                        }}>
                            <div class="col">
                                <div class="list-group">
                                    {this.state.admin.map(function (object, i) {
                                        return (
                                            <a class="list-group-item list-group-item-action">{object.Admin_Name}</a>
                                        );
                                    })}
                                </div>
                            </div>

                            <div class="col">
                                <div >
                                    管理員 : Dennis Lee                                    
                                </div>
                                <div >
                                    Email : Dennis Lee
                                </div>
                                <div >
                                    全域管理員 : 是
                                </div>
                            </div>
                        </div>


                        
                
                    </div>
                </div>


                {/* <!-- The Modal --> */}
                <div class="modal fade" id="myModal">
                    <div class="modal-dialog modal-dialog-centered" >
                        <div class="modal-content" style={{ width: '300%' }}>
                            <div class="modal-body" >
                                <AddAdminForm />
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Admin;
