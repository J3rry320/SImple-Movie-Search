import React,{Component} from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';
import Stars from './stars';
import lang from './language.json';
import Cast from './cast';
let likeCounter=Math.round(Math.random()*1500);
let dislikeCounter=Math.round(Math.random()*700);

class Detail extends Component{
constructor(data){
    super(data);
    this.state={
        itemToRender:null,
        error:null,


    }
    this.getMovieData=this.getMovieData.bind(this)
}
likeIncrease(event){
    let value=parseInt(event.target.nextSibling.textContent);



    if(value>likeCounter){
        event.target.nextSibling.textContent=value-1
        event.target.className="far like-button fa-thumbs-up"
    }
    else{
        if(event.target.parentElement.nextSibling.children[0].className.substring(0,3)==="fas"){
            event.target.parentElement.nextSibling.children[0].className="far like-button fa-thumbs-up"
            event.target.parentElement.nextSibling.children[1].textContent-=1;
        }
        event.target.nextSibling.textContent=value+1
        event.target.className="fas like-button fa-thumbs-up"

    }


}
likeDecrease(event){
    let value=parseInt(event.target.nextSibling.textContent);

if(value>dislikeCounter){
    event.target.nextSibling.textContent=value-1;
        event.target.className="far like-button fa-thumbs-down";
}
else{
    event.target.nextSibling.textContent=value+1;

    if(event.target.parentElement.previousSibling.children[0].className.substring(0,3)==="fas"){
        event.target.parentElement.previousSibling.children[0].className="far like-button fa-thumbs-up"
        event.target.parentElement.previousSibling.children[1].textContent-=1;
    }

    event.target.className="fas like-button fa-thumbs-down";

}
   console.log( )
}
getMovieData(id){

    axios.get(`https://api.themoviedb.org/3/movie/${id}?&api_key=b1ceec131e81ece0cacf2f641d01910a&append_to_response=credits`).then(
        res=>{
this.setState({error:null})
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
<div className="details">


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



<h5 className={` movie-tag ${show_tag}`}>"{data.tagline}"</h5>
<br/>
<span className="text-desc left-span padding-left">
<span className="left-span  padding-left" >
<i className="far like-button fa-thumbs-up" onClick={e=>{this.likeIncrease(e)}}></i>
<strong>{likeCounter}</strong>
</span>
<span className="left-span like-button ">
<i onClick={e=>{this.likeDecrease(e)}} className="far fa-thumbs-down"></i>
<strong>{dislikeCounter}</strong>
</span>
</span>



<br/>
<Stars total={data.vote_average}/>
<br className={show}/><br className={show}/>
<a className={`white-text  ${show}`} href={data.homepage}>{data.homepage}</a>
<p className= "lead">{data.overview}</p>

<div className="wrapper">
<div className={`left-col`}>

<span className="text-desc left-span pt-2">


 <i className="fas fa-calendar-alt padding-left"></i>{data.release_date}
</span>
<br/>
<span className="text-desc left-span pt-2">


 <i className="far fa-clock padding-left"></i>{Math.round(data.runtime/60)}h{data.runtime%60}m
</span>


<br/>



<span className="left-span text-desc pt-2 padding-left">
{country_id}
</span>
<br/>
<span className="text-desc left-span pt-2">
<i className="fas fa-language padding-left"></i>
{language_id}
</span>


</div>
<div className={`right-col`}>


<span className="text-desc left-span pt-2">


 <i className="fas fa-money-bill-alt padding-left"></i>
{budget}
</span>
<br/>
<span className="text-desc left-span pt-2">


 <i className="far fa-money-bill-alt padding-left"></i>
{revenue}
</span>
<br/>
<span className="text-desc left-span pt-2">


<i className="far fa-smile padding-left"></i>
 {data.genres.map(ele=>{
     return ele.name+" "
 })}
</span>

<br/>
<span className="text-desc pt-2 left-span">
<i className="padding-left fas fa-film"></i>
{data.status}
</span>




      </div>
      </div>
      <center>
          <h3>
              The Cast
          </h3>
      <Cast data={data.credits}/>
      </center>

      </div>
      </div>})

        }
    ).catch(error=>{
        this.setState({itemToRender:null})
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx


        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }

        this.setState({error:error.response.status+" "+error.response.data.status_message});

    })

}
render(){

    if(this.state.error){
        this.props.callback(this.state.error)
        return(
<h2 className="danger">{this.state.error}</h2>
        )

    }
    else{
        return(
            <div>
    { this.state.itemToRender}
            </div>

        )
    }

}
componentDidMount(){
    this.getMovieData(this.props.data)
}

componentWillReceiveProps(props){

    console.log(props.data)
    this.getMovieData(props.data)
}

}

export default Detail;