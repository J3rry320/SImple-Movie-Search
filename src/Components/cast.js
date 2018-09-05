import React from 'react';
import ReactDOM from 'react-dom';
const Cast=(props)=>{

    let ele=[]
    props.data.cast.length=15;
    props.data.cast.forEach(element => {
        let characterName=element.character?element.character:"Not Available"
      let image=element.profile_path?"http://image.tmdb.org/t/p/original/"+element.profile_path:"https://www.toadandco.com/c.1311986/sca-dev-elbrus/img/no_image_available.jpeg"
    ele.push(
        <figure key={element.id}>

<img className=" img-fluid-cast"  src={image} alt={element.name}/>
<figcaption>
<h5 className="fantasy">{element.name} as {characterName}</h5>
</figcaption>
        </figure>


)

    });
return(
<ul className="list-unstyled mt-5 pt-5">
{ele}
</ul>
)
}
export default Cast