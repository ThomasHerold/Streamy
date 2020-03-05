import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleStream, editStream } from '../../actions';
import StreamForm from './StreamForm';
import _ from 'lodash';

class StreamEdit extends React.Component {
    componentDidMount() {
        this.props.fetchSingleStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues);
    } 

    render() {
        console.log(this.props);
        if (!this.props.stream) {
            return <div>Loading...</div>
        }

        // initialValues will match to the name of the Field specified on the StreamForm prop. In this case, passing the streams object that we fetched will contain a title and description, which will match with the Field component names
        // This works because we are technically passing props to ReduxForm, which then gets passed to StreamForm. ReduxForm does these actions behind the scenes
        return ( 
            <div>
               <h3>Edit a Stream</h3> 
               <StreamForm initialValues={ _.pick(this.props.stream, 'title', 'description') } onSubmit={this.onSubmit} />
            </div>
        );  
    }
}

const mapStateToProps = (state, ownProps) => { // ownProps is a reference to props passed through the component
    return { stream: state.streams[ownProps.match.params.id] }
};  

export default connect(mapStateToProps, { fetchSingleStream, editStream })(StreamEdit);