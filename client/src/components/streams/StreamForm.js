import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
    renderInput({ input, label, meta }) { // you can destructure formProps to { input } so that the next line becomes {...input}. Line 9 takes formProps input properties and adds them as props to the input element

        const className=`field ${meta.touched && meta.error ? 'error' : '' }`; // conditional className tho add class 'error' where the ui form highlights the fields if the error condition is met

        return (    
            <div className={className}>
              <label>{label}</label>
              <input {...input} autoComplete="off" /> 
              { meta.touched && meta.error ? 
                <div className="ui error message">
                    <div className="header">{meta.error}</div> 
                </div>
              : null }
            </div>
        ); 
    }

    onSubmit = (formValues) => { // passes values entered through the fields when submitted
        this.props.onSubmit(formValues);
    }

    render() { // Field component passes redux-form props to helper method for each input. additional props, like label, get automatically passed through renderInput as redux-form props
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error"> 
                <Field name="title" component={this.renderInput} label="Enter Title" /> 
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <button className="ui button blue">Submit</button>
            </form>
        );
    }
}

// object keys for errors must match the component Field name. If the error object key matches the Field name, the errors object is passed to the renderInput function with redux-form props as the 'meta' parameter
const validate = (formValues) => {
    const errors = {};

    if (!formValues.title) {
        errors.title = 'You must enter a title!'
    }

    if(!formValues.description) {
        errors.description = 'You must enter a description!'
    }
    return errors;
};
 
export default reduxForm({
    form: 'streamForm',
    validate: validate // when the fields are filled out, validate keyword stores validate function that will listen on the input fields. Validation will occur when the validation logic is triggered
})(StreamForm);

