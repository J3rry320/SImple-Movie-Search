
import React, { Component } from 'react'

export default class Navbar extends Component{
    constructor(props){
        super(props);
        this.state={
            term:""
        }

    }
    buttonClick(){
        this.props.callback(this.state.term,1);
        this.setState({term:""})
    }
    render(){
        return(
            <nav className="wrapper">


<div className="nav-brand">
<h3>The Movie DB</h3>
</div>



<div className="search-box-wrap wrap mt-3">
   <div className="search">
      <input value={this.state.term} onChange={e=>this.setState({term:e.target.value})}  type="text" className="searchTerm" placeholder="Type Movie Name"/>
      <button onClick={e=>this.buttonClick()} type="button" className="searchButton">
        <i className="fas fa-search"></i>
     </button>
   </div>
</div>

            </nav>
        )
    }
}