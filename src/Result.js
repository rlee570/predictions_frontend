import React, {Component} from "react";
import axios from "axios";

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }
  async componentDidMount() {
    try {
      const result = await axios.get("http://localhost:8000/api/user/1");
      this.setState({ data: result.data });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { data } = this.state;
    console.log("data", data);
    return (
      <div>
        <p>
          Name: {data.first_name} {data.last_name}
        </p>
        <p>Points:{data.points}</p>
      </div>
    );
  }
}

export default Result;
