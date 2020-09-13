import React, { Component } from 'react';
import ReactDom from "react-dom";
import { json } from 'body-parser';

class Login extends Component {

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
                "Deadline": ""
            }]
        };

    }

    渲染前執行
    componentWillMount() {
        // this.varify();
    }

    varify(user_name,pwd) {
        const SqlApi_url = "http://127.0.0.1:3000/login"


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
                this.setState({ users: res });
                if (this.state.users.length>0){
                    window.location.href = '/#/home';
                }else{alert("Wrong User!!")}
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
                                <input type="text" class="form-control" id="input_name" placeholder="ＭPower" />
                        </div>
                        <div class="form-group">
                                <label for="formGroupExampleInput2">密碼</label>
                                <input type="password" class="form-control" id="input_pwd" placeholder="" />
                        </div>
                            <button type="button" class="btn btn-primary" onClick={()=>{
                                this.varify(document.getElementById("input_name").value, document.getElementById("input_pwd").value)
                            }}>登入</button>
                        {/* {JSON.stringify(this.state.users)} */}
                    </form> 
                </div>
                </div>
            </div>
        );
    }
}

export default Login;
