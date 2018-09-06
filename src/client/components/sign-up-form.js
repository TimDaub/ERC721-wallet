import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { submitSignUp } from '../submit.js'

import {
  RadioGroup,
  TextField,
} from 'redux-form-material-ui'
import PasswordField from 'material-ui-password-field'

// validation functions
const required = value => (value == null ? 'Required' : undefined)
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined

class SignUpForm extends Component {
  saveRef = ref => (this.ref = ref)

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props

    return (
      <form onSubmit={handleSubmit(submitSignUp)}>
        <div>
          <Field name="title" component={RadioGroup}>
            <FormControlLabel
              value="mrs"
              control={<Radio />}
              label="Mrs"
            />
            <FormControlLabel
              value="mr"
              control={<Radio />}
              label="Mr"
            />
            <FormControlLabel
              value="ms"
              control={<Radio />}
              label="Ms"
            />
          </Field>
        </div>
        <div>
          <Field
            name="name"
            component={TextField}
            placeholder="Full Name"
            label="Full Name"
            validate={required}
            ref={this.saveRef}
            withRef
          />
        </div>
        <div>
          <Field
            name="email"
            component={TextField}
            placeholder="Email"
            label="Email"
            validate={[required, email]}
          />
        </div>
        <div>
          <PasswordField
            name="password"
            component={TextField}
            placeholder="Password"
            label="Password"
            validate={required}
          />
        </div>
        <div>
          <button type="submit" disabled={submitting}>
            Submit
          </button>
          <button
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
          >
            Clear
          </button>
        </div>
      </form>
    )
  }
}

SignUpForm.propTypes = {
  handleSubmit: PropTypes.func
}

const selector = formValueSelector('signup')

SignUpForm = connect(state => ({
  numPizzas: selector(state, 'pizzas')
  // how does this work?
}))(SignUpForm)

SignUpForm = reduxForm({
  form: 'signup',
})(SignUpForm)

export default SignUpForm
