import React,{Component} from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';
import Stars from './stars';
import lang from './language.json'
class Detail extends Component{
constructor(data){
    super(data);
    this.state={
        itemToRender:null
    }
    this.getMovieData=this.getMovieData.bind(this)
}
getMovieData(id){

    axios.get(`https://api.themoviedb.org/3/movie/${id}?&api_key=b1ceec131e81ece0cacf2f641d01910a&append_to_response=credits`).then(
        res=>{

         let data=res.data;
         console.log(data);
        let language_id=data.spoken_languages.map(element=>{
            return " "+lang[element.iso_639_1].nativeName+" "
        })
      let   budget=data.budget===0?"NA":"$"+data.budget/1000000+"M"
        let revenue=data.revenue===0?"NA":"$"+Math.round(data.revenue/1000000)+"M"
         let country_id=data.production_countries.map(element=>{

            return     <span data-id={element.iso_3166_1} onClick={e=>{console.log(e.currentTarget.dataset.id)}} className="left-span "> <span className={`text-desc  pl-3 flag-icon flag-icon-${element.iso_3166_1.toLowerCase()}`}></span></span>
        })
        let show=data.homepage?"d-block":"d-none"
let show_tag=data.tagline?"d-block":"d-none"
         this.setState({itemToRender:
         <div className="bg-div" style={{backgroundImage:`url(http://image.tmdb.org/t/p/original/${data.backdrop_path})`}}>

<span className="left-span">
<span className="left-span">
<h1 className="movie-header">{data.title}</h1>
</span>

<span className="left-span">

<h4 className="text-left">
({data.release_date.substring(0,4)})
</h4>
</span>

</span>



<h5 className={`text-left ${show_tag}`}>"{data.tagline}"</h5>
<Stars color={data.starColor}  total={data.avgRating}/>
<br className={show}/><br className={show}/>
<a className={` alert-link ${show}`} href={data.homepage}>{data.homepage}</a>
<p className="text-justify lead pt-2">{data.Description}</p>


<div className={`hello`}>

<span className="text-desc left-span pt-2">


 <i className="fas fa-calendar-alt "></i>{data.date}
</span>
<br/>
<span className="text-desc left-span pt-2">


 <i className="far fa-clock "></i>{Math.round(data.runtime/60)}h{data.runtime%60}m
</span>


<br/>



<span className="left-span text-desc pt-2 pl-2">
{country_id}
</span>


</div>
<div className={`hello`}>


<span className="text-desc left-span ">


 <i className="fas fa-money-bill-alt "></i>
{budget}
</span>
<br/>
<span className="text-desc left-span pt-2">


 <i className="far fa-money-bill-alt "></i>
{revenue}
</span>
<br/>
<span className="text-desc left-span ">


<i className="far fa-smile "></i>
 {data.genre}
</span>

<br/>
<span className="text-desc left-span">
<i className="fas fa-language "></i>
{language_id}
</span>




         </div></div>})

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
componentWillReceivedata(props){
    this.getMovieData(props.data)
}

}

export default Detail;