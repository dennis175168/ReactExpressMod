import React, { Component } from 'react';
import ReactDom from "react-dom";
import Header from "../header";
import Sidebar1 from "../sidebar";
import AddAdminForm from "./AdminComponents/addadmin";
import DB_API from '../../public/paramaters';
import Block from "./block"

class Admin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            admin: [{
                    Admin_Name: 'Dennis',
                    Global_Admin:'Yes'
                }],
            filteredAdmin: [{
                Admin_Name: '',
                Global_Admin: ''
            }],
            selected_admin_id: 0,
            selected_admin: {
                Admin_User_Table_id : "",
                Global_Admin : "",
                Admin_Name : "",
                Admin_Email : "",
                Password : "",
            }
        };

        //this.Select_admin = this.Select_admin.bind(this);
    }

    渲染前執行
    componentWillMount() {
        this.get_admin();
    }



    get_admin() {
        const SqlApi_url = DB_API + "/read";

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

    selected_admin( id , name , email, global_admin , password ){
        // console.log("tes");
        // alert("123");
        this.setState({ 
            selected_admin: {
                Admin_User_Table_id: id,
                Global_Admin: global_admin ,
                Admin_Name: name,
                Admin_Email: email,
                Password: password,
            } 
        });
    };

    selected_admin_reset() {
        // console.log("tes");
        // alert("123");
        this.setState({
            selected_admin: {
                Admin_User_Table_id: "",
                Global_Admin: "",
                Admin_Name: "",
                Admin_Email: "",
                Password: "",
            }
        });
    };
    reset_pwd(pwd , confirm_pwd , id){
        console.log(pwd +  confirm_pwd);
        console.log(id);
        if(pwd == confirm_pwd){
            const SqlApi_url = DB_API + "/reset_pwd";


            fetch(SqlApi_url, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        "table": "admin_user_table",
                        "form":
                            [{
                                "key_column": "Admin_User_Table_id",
                                "pwd": pwd,
                                "id": id
                            }]
                    }
                ),//data,
            }).then((res) => {
                console.log(JSON.stringify(res));
            });
        }else{
            alert("密碼不相符")
        }

        
    };

    update_admin(){
        var id = this.state.selected_admin.Admin_User_Table_id;
        var Admin_Name = document.getElementById("admin_name").value;
        var Admin_Email = document.getElementById("admin_email").value;

        console.log(id);
        console.log(Admin_Name);

        if (confirm("確定更新管理者資訊？")) {
            const SqlApi_url = DB_API + "/update";
            fetch(SqlApi_url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(
                    {
                        "table": "admin_user_table",
                        "id": id,
                        "col_id": "Admin_User_Table_id",
                        "form": [
                            {
                                "col": "Admin_Name",
                                "value": Admin_Name
                            },
                            {
                                "col": "Admin_Email",
                                "value": Admin_Email
                            }
                        ]
                    }
                ),
            }).then((res) => {
                console.log(JSON.stringify(res));
                this.get_admin();
                this.selected_admin_reset();
            });
        }else{

        }
    }


    render() {
        return (
            <div>
                { localStorage.getItem('user_id') == null ? 
                    <Block/> :
                    // <Block/> 
                    <div style={{ backgroundColor: '#E4E5E7' }}>
                        <Header />
                        <div class="row mx-auto" >
                            <div class="col-lg-2" style={{ padding: 0 }} >
                                <Sidebar1 />
                            </div>

                            <div class="col-lg-10" style={{ padding: 0 }}>
                                <div class="row" style={{margin:'0px'}}>
                                    <div class="col" style={{
                                        width: '100%',
                                        backgroundColor: '#fff',
                                        padding: '0px'
                                    }}>
                                        <div style={{ paddingLeft: 30 , padding:'1%'}}>
                                            <b>Home / Admin</b>
                                        </div>
                                    </div>
                                </div>




                                {/* 全域管理員 */}
                                <div class="row mx-auto" style={{
                                    width: '100%',
                                    padding: '30px',
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    margin: '0px'
                                }}>
                                    {this.state.admin.filter(admin => admin['Global_Admin'].includes('Yes')).map((object, i) => {
                                        return (
                                            <div class="col-sm" >
                                                <div style={{ backgroundColor: '#252C2E', padding: '15px', paddingLeft: '25px', color: '#fff' ,  borderRadius: '10px 10px 0px 0px'}}>
                                                    全域管理員
                                                </div>
                                                <div style={{ backgroundColor: '#FFFFFF', padding: '3%' , borderRadius: '0px 0px 10px 10px'}}>
                                                    <ul class="list-group list-group-flush">
                                                        <li class="list-group-item">管理員名稱 : {object.Admin_Name}</li>
                                                        <li class="list-group-item">管理員郵件 : {object.Admin_Email}</li>
                                                        {/* <li class="list-group-item">是否為全域管理員 : {object.Global_Admin}</li> */}
                                                    </ul>
                                                    {/* <div class="d-flex flex-row-reverse ">

                                                        <button style={{ marginTop: '2%', marginLeft: '2%', marginRight: '2%' }} type="button" class="btn btn-success" data-toggle="modal" data-target="#myModal" data-backdrop="false" onClick={
                                                            () => { this.selected_admin(object.Admin_User_Table_id, object.Admin_Name, object.Admin_Email, object.Global_Admin, object.Password) }}>
                                                            編輯管理者
                                                        </button>

                                                        <button style={{ marginTop: '2%', marginLeft: '2%', marginRight: '2%' }} type="button" class="btn btn-danger" data-toggle="modal" data-target="#Reset_Pwd" data-backdrop="false" onClick={
                                                            () => { this.selected_admin(object.Admin_User_Table_id, object.Admin_Name, object.Admin_Email, object.Global_Admin, object.Password) }}>
                                                            重設密碼
                                                        </button>
                                                    </div> */}
                                                    {localStorage.getItem('Global_Admin') == "Yes" ?
                                                        (
                                                            <div class="d-flex flex-row-reverse ">
                                                                <button style={{ marginTop: '2%', marginLeft: '2%', marginRight: '2%' }} type="button" class="btn btn-danger" data-toggle="modal" data-target="#Reset_Pwd" data-backdrop="false" onClick={
                                                                    () => { this.selected_admin(object.Admin_User_Table_id, object.Admin_Name, object.Admin_Email, object.Global_Admin, object.Password) }}>
                                                                    重設密碼
                                                                    </button>
                                                                <button style={{ marginTop: '2%', marginLeft: '2%', marginRight: '2%' }} type="button" class="btn btn-success" data-toggle="modal" data-target="#myModal" data-backdrop="false" onClick={
                                                                    () => { this.selected_admin(object.Admin_User_Table_id, object.Admin_Name, object.Admin_Email, object.Global_Admin, object.Password) }}>
                                                                    編輯管理者
                                                                    </button>
                                                            </div>

                                                        ) :
                                                        localStorage.getItem('Global_Admin') == "No" && localStorage.getItem('user_id') == object.Admin_User_Table_id ?
                                                            (
                                                                <div class="d-flex flex-row-reverse ">
                                                                    <button style={{ marginTop: '2%', marginLeft: '2%', marginRight: '2%' }} type="button" class="btn btn-danger" data-toggle="modal" data-target="#Reset_Pwd" data-backdrop="false" onClick={
                                                                        () => { this.selected_admin(object.Admin_User_Table_id, object.Admin_Name, object.Admin_Email, object.Global_Admin, object.Password) }}>
                                                                        重設密碼
                                                                        </button>
                                                                    <button style={{ marginTop: '2%', marginLeft: '2%', marginRight: '2%' }} type="button" class="btn btn-success" data-toggle="modal" data-target="#myModal" data-backdrop="false" onClick={
                                                                        () => { this.selected_admin(object.Admin_User_Table_id, object.Admin_Name, object.Admin_Email, object.Global_Admin, object.Password) }}>
                                                                        編輯管理者
                                                                        </button>
                                                                </div>
                                                            ) : ("")
                                                    }

                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                {/* 一般管理員 */}
                                {/* <div class="row" style={{
                            width: '100%',
                            padding: '1%',
                        }}>
                            <h2 style={{ padding: '10px' }}>一般管理員</h2>
                        </div> */}
                                <div class="row" style={{
                                    width: '100%',
                                    padding: '30px',
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    margin: '0px'
                                }}>

                                    {this.state.admin.filter(admin => admin['Global_Admin'].includes('No')).map((object, i) => {
                                        return (
                                            <div class="col-sm" >
                                                <div style={{ backgroundColor: '#252C2E', padding: '15px', paddingLeft: '25px', color: '#fff', borderRadius: '10px 10px 0px 0px'}}>
                                                    一般管理員
                                                </div>

                                                <div style={{ backgroundColor: '#FFFFFF', padding: '3%', borderRadius: '0px 0px 10px 10px'}}>
                                                    <ul class="list-group list-group-flush">
                                                        <li class="list-group-item">管理員名稱 : {object.Admin_Name}</li>
                                                        <li class="list-group-item">管理員郵件 : {object.Admin_Email}</li>
                                                        {/* <li class="list-group-item">是否為全域管理員 : {object.Global_Admin}</li> */}
                                                    </ul>
                                                        {/* <button style={{ marginTop: '2%', marginLeft: '2%', marginRight: '2%' }} type="button" class="btn btn-success" data-toggle="modal" data-target="#myModal" data-backdrop="false" onClick={
                                                                () => { this.selected_admin(object.Admin_User_Table_id, object.Admin_Name, object.Admin_Email, object.Global_Admin, object.Password) }}>
                                                            編輯管理者
                                                        </button>

                                                        <button style={{ marginTop: '2%', marginLeft: '2%', marginRight: '2%' }} type="button" class="btn btn-danger" data-toggle="modal" data-target="#Reset_Pwd" data-backdrop="false" onClick={
                                                            () => { this.selected_admin(object.Admin_User_Table_id, object.Admin_Name, object.Admin_Email, object.Global_Admin, object.Password) }}>
                                                            重設密碼
                                                        </button> */}
                                                        {localStorage.getItem('Global_Admin') == "Yes" ?
                                                            (
                                                                <div class="d-flex flex-row-reverse ">
                                                                    <button style={{ marginTop: '2%', marginLeft: '2%', marginRight: '2%' }} type="button" class="btn btn-danger" data-toggle="modal" data-target="#Reset_Pwd" data-backdrop="false" onClick={
                                                                        () => { this.selected_admin(object.Admin_User_Table_id, object.Admin_Name, object.Admin_Email, object.Global_Admin, object.Password) }}>
                                                                        重設密碼
                                                                    </button>
                                                                    <button style={{ marginTop: '2%', marginLeft: '2%', marginRight: '2%' }} type="button" class="btn btn-success" data-toggle="modal" data-target="#myModal" data-backdrop="false" onClick={
                                                                        () => { this.selected_admin(object.Admin_User_Table_id, object.Admin_Name, object.Admin_Email, object.Global_Admin, object.Password) }}>
                                                                        編輯管理者
                                                                    </button>
                                                                </div>
                                                                
                                                            ) :
                                                            localStorage.getItem('Global_Admin') == "No" && localStorage.getItem('user_id') == object.Admin_User_Table_id?
                                                                (
                                                                    <div class="d-flex flex-row-reverse ">
                                                                        <button style={{ marginTop: '2%', marginLeft: '2%', marginRight: '2%' }} type="button" class="btn btn-danger" data-toggle="modal" data-target="#Reset_Pwd" data-backdrop="false" onClick={
                                                                            () => { this.selected_admin(object.Admin_User_Table_id, object.Admin_Name, object.Admin_Email, object.Global_Admin, object.Password) }}>
                                                                            重設密碼
                                                                        </button>
                                                                        <button style={{ marginTop: '2%', marginLeft: '2%', marginRight: '2%' }} type="button" class="btn btn-success" data-toggle="modal" data-target="#myModal" data-backdrop="false" onClick={
                                                                            () => { this.selected_admin(object.Admin_User_Table_id, object.Admin_Name, object.Admin_Email, object.Global_Admin, object.Password) }}>
                                                                            編輯管理者
                                                                        </button>
                                                                    </div>
                                                                ):("")   
                                                        }
                                                    {/* {localStorage.getItem('Global_Admin')} */}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>


                        {/* <!-- The Modal --> */}
                        <div class="modal fade" id="myModal">
                            <div class="modal-dialog modal-dialog-centered" >
                                <div class="modal-content" style={{ width: '300%' }}>
                                    <div class="modal-body" >
                                        <h2>編輯使用者</h2>
                                        <div class="form-group">
                                            <label for="email">管理員名稱:</label>
                                            <input type="text" class="form-control" id="admin_name" placeholder="輸入管理員名稱" name="admin_name" defaultValue={this.state.selected_admin.Admin_Name} ></input>
                                        </div>
                                        <div class="form-group">
                                            <label for="email">Email:</label>
                                            <input type="email" class="form-control" id="admin_email" placeholder="Enter email" name="admin_email" defaultValue={this.state.selected_admin.Admin_Email} ></input>
                                        </div>
                                        {/* <div class="form-group">
                                    <label for="email">密碼:</label>
                                    <input type="password" class="form-control" id="pwd" placeholder="輸入預設密碼" name="pwd" ></input>
                                </div>
                                <div class="form-group">
                                    <label for="sel1">管理員權限:</label>
                                    <select class="form-control" id="permission" name="permission">
                                        <option>最大管理員</option>
                                        <option>一般管理員</option>
                                    </select>
                                </div> */}
                                        <button data-dismiss="modal" type="button" class="btn btn-success" onClick={() => { this.update_admin() }}>送出</button>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* <!-- The Modal1 --> */}
                        <div class="modal fade" id="Reset_Pwd">
                            <div class="modal-dialog modal-dialog-centered" >
                                <div class="modal-content" style={{ width: '300%' }}>
                                    <div class="modal-body" >
                                        <h2>重設密碼</h2>
                                        <div class="form-group">
                                            <label for="email">密碼:</label>
                                            <input type="password" class="form-control" id="new_pwd" placeholder="輸入新密碼" name="new_pwd" ></input>
                                        </div>
                                        <div class="form-group">
                                            <label for="email">確認密碼:</label>
                                            <input type="password" class="form-control" id="confirm_pwd" placeholder="確認新密碼" name="confirm_pwd" ></input>
                                        </div>
                                        <button data-dismiss="modal" type="button" class="btn btn-success" onClick={() => {
                                            this.reset_pwd(
                                                document.getElementById("new_pwd").value,
                                                document.getElementById("confirm_pwd").value,
                                                (this.state.selected_admin.Admin_User_Table_id))
                                        }}>送出</button>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
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

export default Admin;
