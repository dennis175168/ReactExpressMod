import React, { Component } from 'react';
import ReactDom from "react-dom";

class AddAdminForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    渲染前執行
    componentWillMount() {
        // this.insert_admin();
    }

    insert_admin() {
        var name = document.getElementById("name").value;
        var mail = document.getElementById("email").value;
        var pwd = document.getElementById("pwd").value;
        const SqlApi_url = "http://127.0.0.1:3000/create_admin";

        fetch(SqlApi_url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    "table": "admin_user_table",
                    "form":
                        [{
                            "username": name,
                            "pwd": mail,
                            "mail": pwd
                        }]
                }
            ),//data,
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                alert(JSON.stringify(res));
                // this.setState({ users: res });
            });
    }


    render() {
        return (
            <div>
                <h2>新增使用者</h2>
                <div class="form-group">
                    <label for="email">管理員名稱:</label>
                    <input type="text" class="form-control" id="name" placeholder="輸入管理員名稱" name="name"></input>
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" class="form-control" id="email" placeholder="Enter email" name="email"></input>
                </div>
                <div class="form-group">
                    <label for="email">密碼:</label>
                    <input type="password" class="form-control" id="pwd" placeholder="輸入預設密碼" name="pwd"></input>
                </div>
                <button type="button" class="btn btn-danger" onClick={() => { this.insert_admin() }}>送出</button>
            </div>
        );
    }
}

export default AddAdminForm;
