import React,{Component} from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';
class Detail extends Component{
constructor(props){
    super(props);
    this.state={
        itemToRender:null
    }
    this.getMovieData=this.getMovieData.bind(this)
}
getMovieData(id){

    axios.get(`https://api.themoviedb.org/3/movie/${id}?&api_key=b1ceec131e81ece0cacf2f641d01910a&append_to_response=credits`).then(
        res=>{
         let data=res.data;
         this.setState({itemToRender: <div className="bg-div" style={{backgroundImage:`url(http://image.tmdb.org/t/p/original/${data.backdrop_path})`}}>
         <div className="details">
         <h3 className="movie-header">
           {data.title}
           </h3>
           <span className="left-span">

           </span>
<p className="lead">
{data.overview}
</p>

         </div>


         </div>})

        }
    )

}
render(){
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
    return(
        <div>
{ this.state.itemToRender}
        </div>

    )
}
componentDidMount(){
    this.getMovieData(this.props.data)
}
componentWillReceiveProps(props){
    this.getMovieData(props.data)
}

}

export default Detail;