import React, { Component } from 'react';
import ReactDom from "react-dom";

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        };

        // this.path = this.path.bind(this); //傳遞子物件
        // this.Listfile = this.Listfile.bind(this); //傳遞子物件
    }

    渲染前執行
    componentWillMount() {
    }


    render() {
        return (
            <div>
                <nav class= "navbar navbar-expand-sm bg-dark navbar-dark " >
                    {/* <!-- Brand --> */}
                        <a class="navbar-brand" href="#">MPower 識別系統</a>
                    
                    {/* <!-- Links --> */}
                    {/* ml-auto 將登出靠右對齊 */}
                    <ul class="navbar-nav ml-auto">  
                        <li class="nav-item nav-right" style={{ float: 'right' }}>dennis</li>
                        <li class="nav-item nav-right" style={{float: 'right'}}><a class="nav-link" href="#">登出</a></li>
                        {/* <!-- Dropdown --> */}
                        {/* <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                                Dropdown link
                            </a>
                            <div class="dropdown-menu">
                            <a class="dropdown-item" href="#">Link 1</a>
                            <a class="dropdown-item" href="#">Link 2</a>
                            <a class="dropdown-item" href="#">Link 3</a>
                        </div>
                        </li> */}
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Header;
