import React from "react";
import ReactDom from "react-dom";
import Header from "./header"

class App extends React.Component{
    render(){
        return (
            <div  className="app">
                <Header />
            React DEMO APP
            
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