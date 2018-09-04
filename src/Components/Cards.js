import React, { Component } from "react";

export default class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      ele: [],
      activePage: 15,
      nextCounter:10
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  createPages(number) {
    this.setState({ ele: [] ,items:[]});
    for (let i = 1; i < number; i++) {
      this.setState(prev => ({
        ele: [...prev.ele, <a key={i} id={i} onClick={e=>console.log(e.target.id)}>{i}</a>]
      }));
    }

  }
  displayPages(){
    for(let j=0;j<10;j++){
        console.log(this.state.ele[j])
        this.setState(prev=>({
            items:[...prev.items,this.state.ele[j]]
        }))
    }
  }
  createNewPages = index => {};
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }

  render() {
      if(!this.props.pages){
          return ("Type Bitch")
      }
    return (
      <div class="pagination">
        <a onClick={e=>this.setState({nextCounter:this.state.nextCounter-10})}>&laquo;</a>
        {this.state.ele.slice(this.state.nextCounter-10,this.state.nextCounter)}
        <a onClick={e=>this.setState({nextCounter:this.state.nextCounter+10})}>&raquo;</a>
      </div>
    );
  }
  componentDidMount() {
    this.createPages(this.props.pages);


  }
  componentWillReceiveProps(props) {

    //  console.log(this.state.ele.length=10)
    this.createPages(props.pages);

  }
}
