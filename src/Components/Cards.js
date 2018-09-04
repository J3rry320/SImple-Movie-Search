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
this.Previous=this.Previous.bind(this)
this.Next=this.Next.bind(this)
  }
  createPages(number) {
    this.setState({ ele: [] ,items:[],nextCounter:10});
    for (let i = 1; i < number; i++) {
      this.setState(prev => ({
        ele: [...prev.ele, <a key={i} id={i} onClick={e=>this.props.callBack(this.props.term,e.target.id)}>{i}</a>]
      }));
    }

  }
  createList(data){
      data.map(ele=>{
          console.log(ele)
      })
  }

Previous(){
    console.log("Clicked")
    this.state.nextCounter==10?   alert("No More Pages") :  this.setState({nextCounter:this.state.nextCounter-10})

}
Next(){
    this.state.nextCounter>this.state.ele.length? alert("No More Pages"):this.setState({nextCounter:this.state.nextCounter+10})
}
  render() {
      if(!this.props.pages){
          return ("Type Bitch")
      }
    return (
<div>
<ul>

</ul>
  <div className="pagination">
    <a onClick={e=>this.Previous()}>&laquo;</a>
    {this.state.ele.slice(this.state.nextCounter-10,this.state.nextCounter)}
    <a onClick={e=>this.Next()}>&raquo;</a>
  </div>
</div>

    );
  }
  componentDidMount() {
    this.createPages(this.props.pages);


  }
  componentWillReceiveProps(props) {
     // console.log(props.data)
   //this.createList(props.data)

    //  console.log(this.state.ele.length=10)
    this.createPages(props.pages);

  }
}
