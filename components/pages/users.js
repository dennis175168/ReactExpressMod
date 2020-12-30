import React, { Component } from 'react';
import ReactDom from "react-dom";
import Header from "../header";
import Sidebar1 from "../sidebar";
import SearchBar from 'react-js-search';
import AddUserForm from './UserComponents/adduser';
import ScrollArea from 'react-scrollbar';
import DB_API from '../../public/paramaters';
import Block from "./block";
import Moment from 'moment';
import Switch from "react-switch";

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [{ 
                "Company_Table_id": "", 
                "Company_Name": "",
                "Password": "", 
                "Tax_ID": "",
                "Company_Phone": "", 
                "Company_Address": "", 
                "Create_time": "", 
                "Active_Status": "", 
                "Deadline": "" }],
            select_user:0,
            itemsCount: 40
        };
        this.delete_user = this.delete_user.bind(this); //傳遞子物件
    }

    渲染前執行
    componentWillMount() {
        this.get_users();
        // this.updateSearch();
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

    select_user(id){
        // alert(id)
        this.setState({ select_user: id })
    }

    updateSearch() {
        // alert()
        
        var keyword = document.getElementById("keyword").value;
        console.log(keyword.toLowerCase());
        // console.log(this.state.users.filter(users => users['Company_Phone'].includes(keyword)));      
        if (this.state.users.filter(users => users['Company_Name'].includes(keyword)).length == 0){
            this.get_users();
        }else{
            this.setState({ users: this.state.users.filter( users => users['Company_Name'].includes(keyword)) });
        }
        // console.log(this.state.users);
        // console.log(this.state.users.length);
        // console.log(keyword);
        if (document.getElementById("keyword").value.length == 0){
            this.get_users();
        }
        
        // this.state.users.filter(users => users['Company_Name'].includes(keyword)).map(filtered_users => (
        //     this.setState({ users: filtered_users })
        // ))      
    };

    delete_user(id , company_name){
        if (confirm("確定刪除公司 " + company_name +" 使用資格？")) {
            const SqlApi_url = DB_API + "/remove";
            fetch(SqlApi_url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    "table": "company_table",
                    "id": id,
                    "col": "Company_Table_id"
                }),//data,
            }).then((res) => {
                console.log(JSON.stringify(res));
                this.get_users();
                // return res.json();
            })
                .then((res) => {
                    console.log(JSON.stringify(res));
                });
            this.get_users();
        } else {

        }
    };

    insert_member() {
        var name = document.getElementById("name").value;
        var pwd = document.getElementById("pwd").value;
        var phone = document.getElementById("phone").value;
        var address = document.getElementById("address").value;
        var tax_id = document.getElementById("tax_id").value;
        var win1_mail = document.getElementById("win1_mail").value;
        var win2_mail = document.getElementById("win2_mail").value;
        var win3_mail = document.getElementById("win3_mail").value;
        if (confirm("確定新增公司 " + name + " 帳戶資訊？")) {
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
                                "tax_id": tax_id,
                                "company_win1": win1_mail,
                                "company_win2": win2_mail,
                                "company_win3": win3_mail
                            }]
                    }
                ),
            }).then((res) => {
                console.log(JSON.stringify(res.json()));
                this.get_users();
                // return res.json();
            }).then((res) => {
                console.log(JSON.stringify(res));
            });
            this.get_users();
        // window.location.reload(false);
        };
        
    };

    update_user(){
        // alert("1231231")
        if ( confirm("確定更新資料？") ) {
            // var permission = 'off';
            // if (document.getElementById("permission").value == "啟用") {
            //     var permission = 'on';
            // }
            var id = this.state.users[this.state.select_user].Company_Table_id;
            var name = document.getElementById("edit_name").value;
            var phone = document.getElementById("edit_phone").value;
            var address = document.getElementById("edit_address").value;
            var tax_id = document.getElementById("edit_tax_id").value;
            var win1_mail = document.getElementById("edit_win1_mail").value;
            var win2_mail = document.getElementById("edit_win2_mail").value;
            var win3_mail = document.getElementById("edit_win3_mail").value;
            var deadline = document.getElementById("edit_deadline").value;
            const SqlApi_url = DB_API + "/update";
            fetch(SqlApi_url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(
                    {
                        "table": "company_table",
                        "id": id,
                        "col_id": "company_table_id",
                        "form": [
                            {
                                "col": "Company_Name",
                                "value": name
                            },
                            {
                                "col": "Tax_ID",
                                "value": tax_id
                            },
                            {
                                "col": "Company_Phone",
                                "value": phone
                            },
                            {
                                "col": "Company_Address",
                                "value": address
                            },
                            {
                                "col": "Company_Window1",
                                "value": win1_mail
                            },
                            {
                                "col": "Company_Window2",
                                "value": win2_mail
                            },
                            {
                                "col": "Company_Window3",
                                "value": win3_mail
                            },
                            {
                                "col":"Deadline",
                                "value": deadline
                            }

                        ]
                    }
                ),
            }).then((res) => {
                console.log(JSON.stringify(res.json()));
                this.get_users();
                // return res.json();
            }).then((res) => {
                console.log(JSON.stringify(res));
            });
            this.get_users();
        } else {
            // alert("aa")
        }

    };

    update_user_status( company_name , id , status){
        if(status == 'on'){
            var new_status = 'off'
        }else{
            var new_status = 'on'
        }
        if (confirm("確定更新 " + company_name + " 啟用狀態為？" + new_status)) {
            const SqlApi_url = DB_API + "/update";
            fetch(SqlApi_url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(
                    {
                        "table": "company_table",
                        "id": id,
                        "col_id": "company_table_id",
                        "form": [
                            {
                                "col": "Active_Status",
                                "value": new_status
                            }
                        ]
                    }
                ),
            }).then((res) => {
                console.log(JSON.stringify(res.json()));
                this.get_users();
                // return res.json();
            }).then((res) => {
                console.log(JSON.stringify(res));
            });
            this.get_users();
        } else {

        }
    }

    status_display(input){
        if(input == "on"){
            // return "啟用"
            return true
        }else{
            // return "停權"
            return false
        }
    };


    render() {
        var aa = window.innerHeight/3*2;
        Moment.locale('en');
        return (
            <div>
                { localStorage.getItem('user_id') == null ?
                    <Block /> :
                    <div style={{
                        backgroundColor: '#E4E5E7',
                    }}>
                        <Header />
                        <div class="row mx-auto" >
                            <div class="col-lg-2" style={{ padding: 0 }} >
                                <Sidebar1 />
                            </div>

                            <div class="col-lg-10" style={{ padding: 0 }}>
                                {/* .col */}
                                <div class="row" style={{ margin: '0px' }}>
                                    <div class="col" style={{
                                        width: '100%',
                                        backgroundColor: '#fff',
                                        padding: '0px'
                                    }}>
                                        <div style={{ paddingLeft: 30, padding: '1%' }}>
                                            <b>Home / Users</b>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mx-auto" style={{
                                    width: '100%',
                                    padding: '10px 30px 10px 30px',
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}>
                                    <div class="col-sm">
                                        <input class="form-control" id="myInput" type="text" placeholder="搜尋公司名稱.." onKeyUp={() => this.updateSearch()} id="keyword" name="keyword"></input>
                                    </div>
                                    <div class="col-sm">
                                        <button type="button" class="btn btn-success" data-toggle="modal" data-target="#myModal" data-backdrop="false" >新增</button>
                                        {/* <button style={{ margin: '10px' }} type="button" class="btn btn-danger" onClick={() => this.delete_user()} >刪除客戶</button> */}
                                    </div>
                                </div>

                                <div class="row mx-auto" style={{
                                    wwidth: '100%',
                                    padding: '10px 30px 10px 30px',
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}>
                                    <div class="col-sm">
                                        <div style={{
                                            width: '100%',
                                            //marginRight: 'auto',
                                            //marginTop: '20px',
                                            // backgroundColor: 'white',
                                            boxShadow: '#254C58 1px 0px',
                                            // border: '#3C7D91 5px double',
                                            //padding: '10px 10px 10px 10px',
                                            overflowY: 'scroll',
                                            maxHeight: window.innerHeight/4*3
                                        }}>
                                            {/* <label>
                                                <span>Switch with default style</span>
                                                
                                            </label> */}
                                            <table style={{}} class="table table-hover" style={{ width: '100%' }}>
                                                <thead>
                                                    <tr>
                                                        {/* <th><h6><input type="checkbox" value="" /></h6></th> */}
                                                        <th></th>
                                                        <th>公司名稱</th>
                                                        <th>統一編號</th>
                                                        <th>公司電話</th>
                                                        <th>公司地址</th>
                                                        <th>使用期限</th>
                                                        <th>帳號狀態</th>
                                                        <th></th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {
                                                        this.state.users.map((object, i) => {
                                                            // console.log(i);
                                                            return (
                                                                <tr>
                                                                    <td>
                                                                        <button type="button" class="btn btn-success" data-toggle="modal" data-target="#Modal_Edit" data-backdrop="false" onClick={() => this.select_user(i)}>
                                                                            <span class="glyphicon glyphicon-pencil"></span>
                                                                        </button>
                                                                    </td>
                                                                    <td>{object.Company_Name}</td>
                                                                    <td>{object.Tax_ID}</td>
                                                                    <td>{object.Company_Phone}</td>
                                                                    <td>{object.Company_Address}</td>
                                                                    <td>
                                                                        {object.Active_Status == 'on' ? Moment(object.Deadline).format('YYYY-MM-DD') : "尚未啟用"}
                                                                    </td>
                                                                    <td>
                                                                        <Switch onChange={() => this.update_user_status(object.Company_Name, object.Company_Table_id, object.Active_Status)} checked={this.status_display(object.Active_Status)} /></td>
                                                                    <td>
                                                                        <button type="button" data-toggle="modal" data-target="#Modal_ResetPWD" data-backdrop="true"class="btn btn-danger" onClick={() => {  }}>重設密碼</button>
                                                                    </td>
                                                                    <td>
                                                                        <button type="button" class="btn btn-danger" onClick={() => { this.delete_user(object.Company_Table_id, object.Company_Name) }}>
                                                                            <span class="glyphicon glyphicon-trash"></span>
                                                                        </button>
                                                                    </td>
                                                                </tr>);
                                                        })
                                                    }

                                                </tbody>
                                            </table>


                                        </div>
                                    </div>
                                </div>
                            </div>



                        </div>


                        {/* <!-- The Modal --> */}
                        <div class="modal fade" id="myModal">
                            <div class="modal-dialog modal-dialog-centered modal-lg" >
                                <div class="modal-content" style={{ width: '300%' }}>
                                    <div class="modal-header">
                                        <h2>新增使用者</h2>
                                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                    </div>
                                    <div class="modal-body" >
                                        <div style={{ paddingLeft: '20%', paddingRight: '20%', paddingTop: '2%', paddingBottom: '2%' }}>
                                            <div class="form-group">
                                                <label for="email">公司名稱:</label>
                                                <input type="text" class="form-control" id="name" placeholder="輸入管理員名稱" name="name" ></input>
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

                                            <button data-dismiss="modal" type="button" class="btn btn-success" onClick={() => { this.insert_member(); }}>送出</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="modal fade" id="Modal_Edit">
                            <div class="modal-dialog modal-dialog-centered modal-lg" >
                                <div class="modal-content" style={{ width: '300%' }}>
                                    <div class="modal-header">
                                        <h2>更新使用者</h2>
                                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                    </div>
                                    <div class="modal-body" >
                                        <div style={{ paddingLeft: '20%', paddingRight: '20%', paddingTop: '2%', paddingBottom: '2%' }}>
                                            {(this.state.selected_user)}
                                            <div class="form-group">
                                                <label for="email">公司名稱:</label>
                                                <input type="text" class="form-control" id="edit_name" placeholder="輸入管理員名稱" name="edit_name" defaultValue={this.state.users[this.state.select_user].Company_Name}></input>
                                            </div>
                                            <div class="form-group">
                                                <label for="email">公司地址:</label>
                                                <input type="text" class="form-control" id="edit_address" placeholder="輸入公司地址" name="edit_address" defaultValue={this.state.users[this.state.select_user].Company_Address}></input>
                                            </div>
                                            <div class="form-group">
                                                <label for="email">公司電話號碼:</label>
                                                <input type="text" class="form-control" id="edit_phone" placeholder="輸入公司地址" name="edit_phone" defaultValue={this.state.users[this.state.select_user].Company_Phone}></input>
                                            </div>
                                            <div class="form-group">
                                                <label for="email">公司統一編號:</label>
                                                <input type="text" class="form-control" id="edit_tax_id" placeholder="輸入公司統一編號" name="edit_edit_tax_id" defaultValue={this.state.users[this.state.select_user].Tax_ID}></input>
                                            </div>
                                            <div class="form-group">
                                                <label for="email">公司聯絡窗口一:</label>
                                                <input type="email" class="form-control" id="edit_win1_mail" placeholder="輸入公司窗口一聯絡郵件" name="edit_win1_mail" defaultValue={this.state.users[this.state.select_user].Company_Window1}></input>
                                            </div>
                                            <div class="form-group">
                                                <label for="email">公司聯絡窗口二:</label>
                                                <input type="email" class="form-control" id="edit_win2_mail" placeholder="輸入公司窗口二聯絡郵件" name="edit_win2_mail" defaultValue={this.state.users[this.state.select_user].Company_Window2}></input>
                                            </div>
                                            <div class="form-group">
                                                <label for="email">公司聯絡窗口三:</label>
                                                <input type="email" class="form-control" id="edit_win3_mail" placeholder="輸入公司窗口三聯絡郵件" name="edit_win3_mail" defaultValue={this.state.users[this.state.select_user].Company_Window3}></input>
                                            </div>
                                            <div class="form-group">
                                                <label >使用期限</label>
                                                <input type="date" name="edit_deadline" id="edit_deadline" max="3000-12-31" min="1000-01-01" class="form-control" defaultValue={this.state.users[this.state.select_user].Deadline}/>
                                            </div>
                                            
                                            {/* <div class="form-group">
                                                <label for="email">服務啟用狀態:</label>
                                                <select class="form-control" id="permission" name="permission">
                                                    <option>啟用</option>
                                                    <option>停權</option>
                                                </select>
                                            </div> */}

                                            <button data-dismiss="modal" type="button" class="btn btn-success" onClick={() => { this.update_user(); }}>更新</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="modal fade" id="Modal_ResetPWD">
                            <div class="modal-dialog modal-dialog-centered modal-lg" >
                                <div class="modal-content" style={{ width: '300%' }}>
                                    <div class="modal-header">
                                        <h2>重設使用者密碼</h2>
                                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                    </div>
                                    <div class="modal-body" >
                                        <div style={{paddingLeft:'20%',paddingRight:'20%' , paddingTop:'2%' ,paddingBottom:'2%'}}>
                                            {(this.state.selected_user)}
                                            <div class="form-group">
                                                <label for="email">新密碼:</label>
                                                <input type="password" class="form-control" id="edit_pwd" placeholder="新密碼" name="edit_pwd" defaultValue="" ></input>
                                            </div>

                                            <div class="form-group">
                                                <label for="email">確認密碼:</label>
                                                <input type="password" class="form-control" id="edit_confirm_pwd" placeholder="確認密碼" name="edit_confirm_pwd" defaultValue="" ></input>
                                            </div>

                                            <button data-dismiss="modal" type="button" class="btn btn-success" onClick={() => { this.update_user(); }}>更新</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                }
            </div>
        );
    }
}

export default Users;
