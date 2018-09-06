import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'

import { fetchChallenge } from '../actions/index'

class Login extends React.Component {
  handleLogin = () => {
    const { dispatch } = this.props
    dispatch(fetchChallenge())
  }

  render() {
    const { address, loading } = this.props
    return (
      <div>
        {address && (
          <div>
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
          </div>
        )}
        {!address && loading && (
          <div>Open Metamask</div>
        )}
        {!address && !loading && (
          <Typography variant="body2" color="inherit">
            <a onClick={this.handleLogin}>Login</a>
          </Typography>
        )}
      </div>
    )
  }
}

Login.propTypes = {
  address: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.object,
  dispatch: PropTypes.func
}

const mapStateToProps = state => {
  return {
    address: state.items,
    loading: state.loading,
    error: state.error
    // TODO: Handle error
  }
}

export default connect(mapStateToProps)(Login)
