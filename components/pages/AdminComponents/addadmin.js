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
        if (document.getElementById("permission").value = "最大管理員"){
            var permission = "Yes";
        }else{
            var permission = "No";
        }
        const SqlApi_url = "http://52.197.219.242:3000/create_admin";

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
                            "mail": pwd,
                            "global":permission
                        }]
                }
            ),//data,
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                alert(JSON.stringify(res));
                window.location.href = '/#/admin';
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
                <div class="form-group">
                    <label for="sel1">管理員權限:</label>
                    <select class="form-control" id="permission" name="permission">
                        <option>最大管理員</option>
                        <option>一般管理員</option>
                    </select>
                </div>
                <button type="button" class="btn btn-success" onClick={() => { this.insert_admin() }}>送出</button>
            </div>
            
        );
    }
}

export default AddAdminForm;
