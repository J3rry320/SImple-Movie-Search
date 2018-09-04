import React, { Component } from 'react'
export default class Cards extends Component{
    constructor(props){
        super(props);
        this.state={
items:[],
ele:[],
        }
    }
    createPages(number){
        for (let i = 1; i < number; i++) {
            this.setState(prev => ({
           ele: [
                ...prev.ele,

                  <a
                    data-id={i}
                    onClick={e => {
                      this.fetchNextPage(e.currentTarget.dataset.id);
                    }}
                    className="page-link text-dark"
                  >
                    {i}
                  </a>

              ]
            }));
        console.log(this.state.ele)
    }}
    render(){
        console.log(this.state.ele)
        return (
        <div className="pagination">
{this.state.ele}
Fucker
        </div>)
    }
    componentDidMount(){
        this.createPages(this.props.pages);
    }
    componentWillReceiveProps(props){
        console.log("Props",props,props.data,props.pages)
        this.createPages(props.pages);
    }
}