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
      pages: null
    }
    this.callback=this.callback.bind(this)
  }
  callback(term) {

    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=b1ceec131e81ece0cacf2f641d01910a&query=${term}`)
      .then(res => {
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
<Card data={this.state.data} pages={this.state.pages}/>
      </div>

    )
  }
}

export default App;