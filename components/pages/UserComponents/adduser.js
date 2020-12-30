import React, { Component } from 'react';
import ReactDom from "react-dom";
import DB_API from '../../../public/paramaters';

class AddUserForm extends Component {

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

    insert_member() {
        var name = document.getElementById("name").value;
        var pwd = document.getElementById("pwd").value;
        var phone = document.getElementById("phone").value;
        var address = document.getElementById("address").value;
        var tax_id = document.getElementById("tax_id").value;
        var win1_mail = document.getElementById("win1_mail").value;
        var win2_mail = document.getElementById("win2_mail").value;
        var win3_mail = document.getElementById("win3_mail").value;
        const SqlApi_url = DB_API + "/create_member";

        fetch(SqlApi_url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json' 
            },
            body: JSON.stringify(
                {
                    "table": "company_table",
                    "form":
                        [{
                            "username": name,
                            "pwd": pwd,
                            "phone": phone,
                            "address": address,
                            "tax_id": tax_id
                        }]
                }
            ),
        }).then((res) => {
            console.log(JSON.stringify(res.json()));
            // return res.json();
        }).then((res) => {
            console.log(JSON.stringify(res));
        });
        // window.location.reload(false);
    }


    render() {
        return (
            <div>
                <div class="form-group">
                    <label for="email">公司名稱:</label>
                    <input type="text" class="form-control" id="name" placeholder="輸入管理員名稱" name="name"></input>
                </div>
                <div class="form-group">
                    <label for="email">公司地址:</label>
                    <input type="text" class="form-control" id="address" placeholder="輸入公司地址" name="address"></input>
                </div>
                <div class="form-group">
                    <label for="email">公司電話號碼:</label>
                    <input type="text" class="form-control" id="phone" placeholder="輸入公司地址" name="phone"></input>
                </div>
                <div class="form-group">
                    <label for="email">公司統一編號:</label>
                    <input type="text" class="form-control" id="tax_id" placeholder="輸入公司統一編號" name="tax_id"></input>
                </div>
                <div class="form-group">
                    <label for="email">密碼:</label>
                    <input type="password" class="form-control" id="pwd" placeholder="輸入帳號密碼" name="pwd"></input>
                </div>
                <div class="form-group">
                    <label for="email">公司聯絡窗口一:</label>
                    <input type="email" class="form-control" id="win1_mail" placeholder="輸入公司窗口一聯絡郵件" name="win1_mail"></input>
                </div>
                <div class="form-group">
                    <label for="email">公司聯絡窗口二:</label>
                    <input type="email" class="form-control" id="win2_mail" placeholder="輸入公司窗口二聯絡郵件" name="win2_mail"></input>
                </div>
                <div class="form-group">
                    <label for="email">公司聯絡窗口三:</label>
                    <input type="email" class="form-control" id="win3_mail" placeholder="輸入公司窗口三聯絡郵件" name="win3_mail"></input>
                </div>
                
                <button type="button" class="btn btn-success" onClick={() => { this.insert_member();  }}>送出</button>
            </div>
            
        );
    }
}

export default AddUserForm;
