import React, { Component } from "react";
import Details from "./Details";
let className;
export default class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      ele: [],
      data: null,
      nextCounter: 10,
      title: ""
    };
    this.Previous = this.Previous.bind(this);
    this.checkError = this.checkError.bind(this);
    this.Next = this.Next.bind(this);
    this.updateDesc = this.updateDesc.bind(this);
  }
  createPages(number) {
    this.setState({ ele: [], items: [], nextCounter: 10 });
    for (let i = 1; i < number; i++) {
      this.setState(prev => ({
        ele: [
          ...prev.ele,
          <a key={i} id={i} className="list-style" onClick={e => this.props.callBack(e.target.id)}>
            {i}
          </a>
        ]
      }));
    }
  }
  updateDesc(e, data) {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
    this.setState({
      title: data[e.currentTarget.dataset.id].title,
      data: data[e.currentTarget.dataset.id].id
    });
  }
  createList(data) {
    this.setState({ items: [], data: null });
    //Add Content To The List Emtied it in the upper line
    data.map((ele, ind) => {
      let image = ele.poster_path
        ? "http://image.tmdb.org/t/p/w185_and_h278_bestv2//" + ele.poster_path
        : "https://www.toadandco.com/c.1311986/sca-dev-elbrus/img/no_image_available.jpeg";
      let height =
        image ===
        "https://www.toadandco.com/c.1311986/sca-dev-elbrus/img/no_image_available.jpeg"
          ? "img-fluid-poster"
          : " ";
      this.setState({ title: data[0].title, data: data[0].id });
      this.setState(prev => ({
        items: [
          ...prev.items,
          <li key={ele.id} className="list-style padding-list wrapper">
            <img className={`image ${height}`} src={image} />
            <div className="list-content">
              <h3 className="text-justify padding-top">{ele.title}</h3>
              <h4>{ele.release_date.substring(0, 4)}</h4>
              <button
                data-id={ind}
                onClick={e => this.updateDesc(e, data)}
                className="btn-info"
              >
                Learn More
              </button>
            </div>
          </li>
        ]
      }));
    });
  }

  Previous() {
    this.state.nextCounter == 10
      ? alert("No More Pages")
      : this.setState({ nextCounter: this.state.nextCounter - 10 });
  }
  Next() {
    this.state.nextCounter > this.state.ele.length
      ? alert("No More Pages")
      : this.setState({ nextCounter: this.state.nextCounter + 10 });
  }
  checkError(data) {
    if (data) {
      className = "d-none";
    }
  }
  render() {
    className = "";
    if (this.props.error) {
      return <h2 className="danger">{this.props.error}</h2>;
    }
    if (!this.props.pages) {
      return (
        <center>
          <h2 className="movie-tag">
            Type In The Box Above And Begin Searching For Your Favorite Movies
          </h2>
        </center>
      );
    }
    return (
      <div className="wrapper">
        <ul className={`list`}>
          <h3 className="lead bg-black white-text heading-container">
            {this.state.data === null
              ? "Type a Proper Movie Name"
              : "Currently Viewing - " + this.state.title}
          </h3>

          {this.state.items}
        </ul>
        <div className="content">
          <Details callback={this.checkError} data={this.state.data} />
        </div>
        <div className="pagination text-desc">
          <a className="list-style" onClick={e => this.Previous()}>
            <i className="fas fa-arrow-left" />
          </a>
          {this.state.ele.slice(
            this.state.nextCounter - 10,
            this.state.nextCounter
          )}
          <a className="list-style" onClick={e => this.Next()}>
            <i className="fas fa-arrow-right" />
          </a>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.createPages(this.props.pages);
  }

  componentWillReceiveProps(props) {
    // console.log(props.data)
    //this.createList(props.data)

    if (props.pages === this.props.pages) {
      // console.log("same")
    } else {
      this.createPages(props.pages);
    }
    if (props.data != null) {
      this.createList(props.data);
    }

    //  console.log(this.state.ele.length=10)
  }
}
