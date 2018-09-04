
import React, { Component } from 'react'
import PropTypes from 'prop-types'
export default class Navbar extends Component{
    constructor(props){
        super(props);
        this.state={
            term:""
        }

    }
    render(){
        return(
            <nav>

<div style={{float:"left"}}>
<h2>The Movie DB</h2>
</div>
<div style={{float:"right"}}>

                <input onChange={e=>this.setState({term:e.target.value})} placeholder="Enter The Name of the movie" type="text" className="input-in-nav" />

          <button onClick={e=>this.props.callback(this.state.term)} className="btn btn-info">Search</button>

                </div>




            </nav>
        )
    }
}