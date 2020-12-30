import React from "react";
import ReactDom from "react-dom";
import { HashRouter, Route, Switch} from "react-router-dom";
import Login from "./login";
import Home from "./home";
import Admin from "./pages/admin";
import Users from "./pages/users";
import Files from "./pages/files";


class App extends React.Component{


    get_permission(){
        var session = sessionStorage.setItem('user_id', this.state.admin[0].Admin_User_Table_id);
    }
    render(){


        return (
            <div  className="app">
                
                {/* 設定路徑 */}

                {/* {sessionStorage.getItem('user_id') == null ? 
                    a:d 
                    } */}
                <HashRouter>
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route path="/home" component={Home} />
                        <Route path="/users" component={Users} />
                        <Route path="/files" component={Files} />
                        <Route path="/admin" component={Admin} />
                    </Switch>
                </HashRouter>

            </div>
        );
    }
}

if(module.hot){
    module.hot.accept();
}

ReactDom.render(
    <App />,
    document.getElementById('content')
);