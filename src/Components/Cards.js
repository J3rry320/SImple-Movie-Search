import React, { Component } from "react";
import Details from './Details'
export default class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      ele: [],
     data:null,
      nextCounter:10
    };
this.Previous=this.Previous.bind(this)
this.Next=this.Next.bind(this)
  }
  createPages(number) {
    this.setState({ ele: [] ,items:[],nextCounter:10});
    for (let i = 1; i < number; i++) {
      this.setState(prev => ({
        ele: [...prev.ele, <a key={i} id={i} onClick={e=>this.props.callBack(e.target.id)}>{i}</a>]
      }));
    }

  }
  createList(data){
    this.setState({items:[],data:null})
//Add Content To The List Emtied it in the upper line
        data.map((ele,ind)=>{
            this.setState(prev=>({
                items:[...prev.items,<li key={ele.id} className="list-style wrapper">
                    <img className={"image"} src={"http://image.tmdb.org/t/p/w185_and_h278_bestv2//"+ele.poster_path}/>
<div className="list-content">
<h3 className="text-justify padding-top">{ele.title}</h3>
                <h4>{ele.release_date}</h4>
                <button data-id={ind} onClick={e=>this.setState ({data:data[e.currentTarget.dataset.id]})  } className="btn-info">Learn More</button>
</div>


                </li>]
            }))
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
<div className="wrapper">
<ul className="list">
 {this.state.data===null?"Click On Your Favorite Movies":"Currently Viewing "+this.state.data.title }
{this.state.items}
</ul>
<div className="content">
<Details data={this.state.data}/>
</div>
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
  componentDidUpdate(){

  }
  componentWillReceiveProps(props) {

     // console.log(props.data)
   //this.createList(props.data)
if(props.pages===this.props.pages){
    console.log("same")
}
else{
    this.createPages(props.pages);

}
if(props.data!=null){
    this.createList(props.data)
}


    //  console.log(this.state.ele.length=10)


  }
}
