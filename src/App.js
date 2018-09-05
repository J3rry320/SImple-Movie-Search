import React, {
  Component
} from 'react';
import Nav from './Components/Navbar'
import './App.css';
import axios from 'axios'
import Card from './Components/Cards'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      pages: null,
      term:null,
      error:null

    }
    this.callback=this.callback.bind(this)
    this.callWithPages=this.callWithPages.bind(this)
  }

  callWithPages(page){
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=b1ceec131e81ece0cacf2f641d01910a&query=${this.state.term}&page=${page}&append_to_response=credits`)
    .then(res => {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0;
 console.log(res.data)
      this.setState({
        data: res.data.results
      })


    }).catch((error) => {


    console.warn(error.config);
    })
   }

  callback(term) {

this.setState({term:term})
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=b1ceec131e81ece0cacf2f641d01910a&query=${term}`)
      .then(res => {
        this.setState({error:null})
   console.log(res.data)
        this.setState({
          data: res.data.results
        })
        this.setState({
          pages: res.data.total_pages
        })

      }).catch(error => {
console.log(error)
if (error.response) {
  // The request was made and the server responded with a status code
  // that falls out of the range of 2xx
this.setState({error:+error.response.status.toString()+" "+error.response.data.errors[0]+" "})

} else if (error.request) {
  // The request was made but no response was received
  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
  // http.ClientRequest in node.js
  console.log(error.request);
} else {
  // Something happened in setting up the request that triggered an Error
  console.log('Error', error.message);
}


  //this.setState({error:error.response.data.status_message+error.response.status})

      })
  }
  render() {

    return (
      <div>

     < Nav callback = {
        this.callback
      }
      / >
<Card data={this.state.data} error={this.state.error} term={this.state.term} callBack={this.callWithPages} pages={this.state.pages}/>
      </div>

    )
  }
}

export default App;