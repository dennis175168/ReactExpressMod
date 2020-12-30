import React, { Component } from 'react';
import ReactDom from "react-dom";
import { json } from 'body-parser';
import DB_API from '../public/paramaters';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            default: [{
                a: '123',
                b: '456'
            }],
            admin: [{
                "Admin_User_Table_id":"",
                "Admin_Name": "",
                "Admin_Email" : ""
            }]
        };

    }

    渲染前執行
    componentWillMount() {
        // this.varify();
    }

    varify(user_name,pwd) {

        const SqlApi_url = DB_API + "/login_admin";


        fetch(SqlApi_url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "table": "admin_user_table",
                "form":
                    [{
                        "username": user_name,
                        "pwd": pwd
                    }]
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                this.setState({ admin: res });
                if (this.state.admin.length > 0){
                    
                    localStorage.setItem('user_id', this.state.admin[0].Admin_User_Table_id);
                    localStorage.setItem('user_name', this.state.admin[0].Admin_Name);
                    localStorage.setItem('user_mail', this.state.admin[0].Admin_Email);
                    localStorage.setItem('Global_Admin', this.state.admin[0].Global_Admin);
                    // console.log(sessionStorage.getItem('user'));
                    window.location.href = '/#/home';

                }else{
                    alert(" 帳號密碼錯誤!! ")}
            });
    }


    render() {
        return (
            <div style={{ padding : '5%'}}>
                <div class="container h-100">
                    <div class="row h-100 justify-content-center align-items-center">
                    <form >
                        <div class="form-group">
                            <label for="formGroupExampleInput">帳號</label>
                                <input type="text" class="form-control" id="input_name" placeholder="管理員名稱" />
                        </div>
                        <div class="form-group">
                                <label for="formGroupExampleInput2">密碼</label>
                                <input type="password" class="form-control" id="input_pwd" placeholder="密碼" />
                        </div>
                        <button type="button" class="btn btn-primary" style={{width:'100%'}} onClick={()=>{
                                this.varify(document.getElementById("input_name").value, document.getElementById("input_pwd").value)
                            }}>
                            登入
                        </button>
                        {/* {JSON.stringify(this.state.users)} */}
                    </form> 
                </div>
                </div>
            </div>
        );
    }
}

export default Login;
