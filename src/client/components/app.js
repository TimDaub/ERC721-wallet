import React from "react";
import { connect } from "react-redux";
import { fetchChallenge } from "../actions/index"

class ChallengeList extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchChallenge());
  }

  render() {
    const { error, loading, challenge } = this.props;
    
    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <ul>
        {challenge.value}
      </ul>
    );
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    challenge: state.items,
    loading: state.loading,
    error: state.error
  }
};

export default connect(mapStateToProps)(ChallengeList);
