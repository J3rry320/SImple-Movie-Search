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

    }
    this.callback=this.callback.bind(this)
  }
  callback(term,page) {

this.setState({term:term})
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=b1ceec131e81ece0cacf2f641d01910a&query=${term}&page=${page}`)
      .then(res => {
   console.log(res.data)
        this.setState({
          data: res.data.results
        })
        this.setState({
          pages: res.data.total_pages
        })

      }).catch(err => {
        console.log(err)
      })
  }
  render() {
    return (
      <div>

     < Nav callback = {
        this.callback
      }
      / >
<Card data={this.state.data} term={this.state.term} callBack={this.callback} pages={this.state.pages}/>
      </div>

    )
  }
}

export default App;