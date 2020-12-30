import React, { Component } from 'react';


class Sidebar1 extends Component {

    constructor(props) {
        super(props);

        this.state = { width: 0, height: 0 };
        this.state = {
            fin_hh: window.innerHeight};
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.state = {
            default: [{
                coll:false
            }],
            coll: false,
            data: []
        };
    }

    渲染前執行
    componentWillMount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
        // if (window.innerHeight < 1000) {
        //     this.setState({ fin_hh: "" });
        //     alert('123')
        // } else {
        //     this.setState({ fin_hh: window.innerHeight });
        // }
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
        //alert(window.innerHeight);
        if (window.innerWidth >= 1000) {
            this.setState({ fin_hh: window.innerHeight });
            
            // this.setState({ fin_hh: "" });
        }
        else {
            this.setState({ fin_hh: '' });
            // this.setState({ fin_hh: window.innerHeight });
        }
    }
    co(a){
        // alert('12');
        // var a = this.state.coll;
        alert(!a);
        this.setState({ coll: !a});
    }

    render() {
        

        return (
            <div>
                <div style={{
                    width:'100%',
                    backgroundColor:'#252B2E',
                    height: this.state.fin_hh, //window.height
                    padding :20,
                    color:'#fff'
                }}>
                    <ul class="nav flex-column" >
                        {/* <li class="nav-item">
                            <a class="nav-link" href="#/home">{this.state.width}</a>
                        </li> */}
                        <li class="nav-item">
                            <a class="nav-link" href="#/home" style={{ color: '#fff', paddingBottom:'10px' }}><span class="glyphicon glyphicon-th"></span> 儀表板</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#/users" style={{ color: '#fff', paddingBottom: '10px'}}><span class="glyphicon glyphicon-user"></span> 客戶管理</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#/files" style={{ color: '#fff', paddingBottom: '10px'}}><span class="glyphicon glyphicon-file"></span> 系統文件管理</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link " href="#/admin" style={{ color: '#fff', paddingBottom: '10px'}}><span class="glyphicon glyphicon-cog"></span> 系統管理人員</a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sidebar1;
