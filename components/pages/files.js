import React, { Component } from 'react';
import ReactDom from "react-dom";
import Header from "../header";
import Sidebar1 from "../sidebar";
import ScrollArea from 'react-scrollbar';
import DB_API from '../../public/paramaters';
import Block from "./block";
import Moment from 'moment';
var tableExport = require('table-export');

class Files extends Component {

    constructor(props) {
        super(props);

        this.state = {
            company:[],
            files: [{
                Company_Name:'DennisCompany',
                Origin_Image_Link:'https://acvevev.jpg',
                Recognized_Image_Link:'https://acvevev123.jpg',
                Create_time:'2020/09/10',
                Deadline:'2020/09/30'
            }]
        };
        this.delete_file = this.delete_file.bind(this); //傳遞子物件


    }

    //渲染前執行
    componentWillMount() {
        this.get_files();
        this.get_company();
    }

    get_files() {
        const SqlApi_url = DB_API +"/read_multi_table";
        fetch(SqlApi_url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    "form":
                        [{
                            "table1": "company_table",
                            "table2": "image_table",
                            "table1_key": "Company_Table_id",
                            "table2_key": "Company_Table_id"
                        }]
                }
            ),//data,
        }).then((res) => {
            return res.json();
        }).then((res) => {
            this.setState({ files: res });
        });
    };

    get_company() {
        const SqlApi_url = DB_API + "/read";
        fetch(SqlApi_url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    "table": "company_table"
                }
            ),//data,
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                this.setState({ company: res });
            });
    };

    delete_file(id, file_name) {
        if (confirm("確定刪除檔案 " + file_name + "？")) {
            const SqlApi_url = DB_API + "/remove";
            fetch(SqlApi_url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    "table": "image_table",
                    "id": id,
                    "col": "Image_Table_id"
                }),//data,
            }).then((res) => {
                console.log(JSON.stringify(res));
                this.get_files();
                // return res.json();
            }).then((res) => {
                    console.log(JSON.stringify(res));
            });
            this.get_files();
        } else {

        }
    };

    updateSearch() {
        // alert("selected : " + document.getElementById("user_comapny").onselect)
        // this.get_files();
        var seleted_company_name = document.getElementById("user_comapny").value;
        console.log(this.state.files);
        console.log(this.state.files.length);
        console.log(seleted_company_name);
        if(seleted_company_name == "所有檔案"){
            this.get_files()
        }else{
            let P = new Promise((resolve, reject) => {
                const SqlApi_url = DB_API +"/read_multi_table";
                fetch(SqlApi_url, {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(
                        {
                            "form":
                                [{
                                    "table1": "company_table",
                                    "table2": "image_table",
                                    "table1_key": "Company_Table_id",
                                    "table2_key": "Company_Table_id"
                                }]
                        }
                    ),//data,
                }).then((res) => {
                    return res.json();
                }).then((res) => {
                    this.setState({ files: res.filter(files => files['Company_Name'].includes(document.getElementById("user_comapny").value)) });
                });
                console.log('new success');
                resolve('8888');
            })
        }
        // P.then(
        //     () => { 
        //         this.setState({ 
        //             // files: this.state.files.filter(files => files['Company_Name'].includes(document.getElementById("user_comapny").value))
        //         });
        //         console.log(this.state.files.length);
                
        //     } 
        //     //this.setState({ files: this.state.files.filter(files => files['Company_Name'].includes(document.getElementById("user_comapny").value)) })
        // )
    };

    updateSearch_keywords(){
        var keyword = document.getElementById("keyword").value;
        console.log(keyword.toLowerCase());
        // console.log(this.state.users.filter(users => users['Company_Phone'].includes(keyword)));      
        if (this.state.files.filter(files => files['File_Name'].includes(keyword)).length == 0) {
            this.get_files();
        } else {
            this.setState({ files: this.state.files.filter(files => files['File_Name'].includes(keyword)) });
        }
        // console.log(this.state.users);
        // console.log(this.state.users.length);
        // console.log(keyword);
        if (document.getElementById("keyword").value.length == 0) {
            this.get_files();
        }
    }

    render() {
        Moment.locale('en');
        return (
            <div>
                { localStorage.getItem('user_id') == null ? 
                    <Block/> :
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
                                            <b>Home / Files</b>
                                        </div>
                                    </div>
                                </div>


                                <div class="row" style={{
                                    width: '100%',
                                    padding: '10px 30px 10px 30px',
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}>
                                    <div class="col-sm" >
                                        <div class="form-group" style={{
                                            margin: '10px',
                                            width: '100%'
                                        }} >
                                            <label for="sel1">選擇客戶公司:</label>
                                            {/* <input class="form-control" id="myInput" type="text" placeholder="搜尋公司名稱" onChange={() => this.updateSearch()} id="keyword" name="keyword"></input> */}
                                            <select class="form-control" id="user_comapny" name="user_comapny" onChange = {() =>{
                                                this.updateSearch()
                                            }}>
                                                <option>所有檔案</option>
                                                {this.state.company.map(function (object, i) {
                                                    return (
                                                        <option>{object.Company_Name}</option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div class='col-sm'>
                                        <button style={{ margin: '10px' }} type="button" class="btn btn-success" onClick={()=>this.get_files()}>清除公司篩選</button>
                                    </div>
                                </div>

                                <div class="row" style={{
                                    width: '100%',
                                    padding: '0px 30px 10px 30px',
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}>
                                    <div class="col-sm" >
                                        <input style={{ margin: '10px', width: '100%' }} class="form-control" id="myInput" type="text" placeholder="搜尋檔案名稱" onKeyUp={() => this.updateSearch_keywords()} id="keyword" name="keyword"></input>
                                    </div>
                                    <div class='col-sm'>
                                        <button style={{ margin: '10px' }} type="button" class="btn btn-success" onClick={() => { 
                                            
                                            confirm("確定匯出資料？") ?
                                            tableExport('table1', 'mpower'+Date.now(), 'xls'):
                                            console("")

                                        }}>匯出成 Excel</button>
                                    </div>
                                </div>

                                <div class="row" style={{
                                    width: '100%',
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
                                            maxHeight: window.innerHeight / 5 * 3
                                        }}>
                                            <table id='table1' style={{ width:'100%', margin: '10％' }} class="table table-hover" style={{ width: '100%' }}>
                                                <thead>
                                                    <tr>
                                                        {/* <th><input type="checkbox" value="" /></th> */}
                                                        <th>公司名稱</th>
                                                        <th>檔案名稱</th>
                                                        <th>原始圖片</th>
                                                        <th>識別結果圖片</th>
                                                        <th>下載到期日</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.files.map((object, i) => {
                                                        return (
                                                            <tr >
                                                                {/* <td ><input type="checkbox" value="" /></td> */}
                                                                <td >{object.Company_Name}</td>
                                                                <td >{object.File_Name}</td>
                                                                <td ><a href={object.Origin_Image_Link}>link</a></td>
                                                                <td ><a href={object.Recognized_Image_Link}>link</a></td>
                                                                <td >{Moment(object.Deadline).format('YYYY-MM-DD')}</td>
                                                                <td >
                                                                    <button type="button" class="btn btn-danger" onClick={() => { this.delete_file(object.Image_Table_id, object.File_Name) }}>
                                                                        <span class="glyphicon glyphicon-trash"></span>
                                                                    </button>
                                                                </td>
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
                }
            </div>
            
        );
    }
}

export default Files;
