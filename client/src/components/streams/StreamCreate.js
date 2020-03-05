import React from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamCreate extends React.Component {

    onSubmit = (formValues) => { // passes values entered through the fields when submitted
        this.props.createStream(formValues);
    }

    render() { // component passes redux-form props to helper method for each input. additional props, like label, get automatically passed through renderInput as redux-form props
        return (
            <div>
                <h3>Create a Stream</h3>
                <StreamForm onSubmit={this.onSubmit} />
            </div>
        );
    }
}

export default connect(null, { createStream })(StreamCreate);