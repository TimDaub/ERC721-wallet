import React from "react";
import { connect } from "react-redux";
import { fetchChallenge, signChallenge} from "../actions/index"

class ChallengeList extends React.Component {
  componentDidMount() {
  }

  handleClick = () => {
    this.props.dispatch(fetchChallenge())
  }

  render() {
    const { error, loading, address } = this.props;
    
    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Logging in...</div>;
    }

    if (address) {
      return (
        <div>Logged in</div>
      )
    } else {
      return (
          <a href="#" onClick={this.handleClick}>Login</a>
      );
    }

  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    address: state.items,
    loading: state.loading,
    error: state.error
  }
};

export default connect(mapStateToProps)(ChallengeList);
