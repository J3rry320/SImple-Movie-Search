import React,{Component} from 'react';

import axios from 'axios';
import {uniqBy,sample} from 'lodash';
let arr=[];
let titleArray=[];
class Suggestion extends Component{
    constructor(props){
        super(props);
        this.state={
            itemsToReturn:null,
            genre:[]

        }
    }
    searchGenre(genre){





    if(genre.length!==0){

        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=b1ceec131e81ece0cacf2f641d01910a&sort_by=popularity.desc&page=1&with_genres=${genre.map(ele=>{
            return ele
        })}`).then(
            res=>{

           this.setState({itemsToReturn:res.data})
            // console.log(res.data)
            }
        ).catch(err=>{
            console.log(err);
        })
    }




     }
     passProperArgs(obj){

        for (let key in obj) {


            // check if the property/key is defined in the object itself, not in parent
            if (obj.hasOwnProperty(key)) {
                if(arr.length===6){
                    arr=[];

                    }

                if(obj[key]>5){
                    arr.push(key)

                }

            }
        }

     }
     countElements(arr) {
        var a = [], b = [],obj={}, prev;

        arr.sort();
        for ( var i = 0; i < arr.length; i++ ) {
            if ( arr[i] !== prev ) {
                a.push(arr[i]);
                b.push(1);
            } else {
                b[b.length-1]++;
            }
            prev = arr[i];
        }
        a.forEach((ele,ind)=>{
            obj[ele]=b[ind]

        })
        return obj;
    }
     render(){
         if(this.state.itemsToReturn!=null){
            this.state.itemsToReturn.results.forEach(ele=>{
            titleArray.push(ele.title)

            })
            console.log(uniqBy(titleArray))

         }
if(titleArray.length!==0){
    return(

       <h2 className="lead bg-black text-center white-text heading-container">Our Suggestion You Type <br/>{sample( titleArray)}</h2>
     )
}
else{
return (
    " "
)
}

     }
     componentDidMount(){
         this.passProperArgs(this.countElements(this.props.data))
     }
     componentWillReceiveProps(props){
        this.passProperArgs(this.countElements(props.data))

        this.searchGenre(uniqBy(arr))

     }
}
export default Suggestion


