import React, {
  Component
} from 'react';
import Nav from './Components/Navbar'
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      pages: null
    }
    this.callback=this.callback.bind(this)
  }
  callback(term) {

    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=b1ceec131e81ece0cacf2f641d01910a&query=${term}&page=2`)
      .then(res => {
        this.setState({
          data: res.data.results
        })
        this.setState({
          pages: res.data.total_pages
        })
        console.log(res)
        console.log(this.state.data,this.state.pages)
      }).catch(err => {
        console.log(err)
      })
  }
  render() {
    return ( <
      Nav callback = {
        this.callback
      }
      / >
    )
  }
}

export default App;