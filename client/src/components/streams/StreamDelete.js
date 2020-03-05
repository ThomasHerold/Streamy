import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { deleteStream, fetchSingleStream } from '../../actions';
import { Link } from 'react-router-dom';

class StreamDelete extends React.Component {

    componentDidMount() {
        this.props.fetchSingleStream(this.props.match.params.id);
    }

    renderContent() {
        if (!this.props.stream) {
            return 'Are you sure you want to delete this stream?'
        } 

        return `Are you sure you want to delete the stream with title: ${this.props.stream.title}`   
    }

    // onClick handler as an arrow function allows us to pass a reference to a function with a parameter that will be used later. If we just did this.props.deleteStream(id), then it invoke the function immediately
    renderActions() {
        const id = this.props.match.params.id;
        return (
        <React.Fragment>
            <button onClick={() => this.props.deleteStream(id)} className="ui button negative">Delete</button> 
            <Link to="/" className="ui button">Cancel</Link>
        </React.Fragment>
    );
} // React.Fragment allows a variable to hold multiple lines of JSX not wrapped in a div. Shorthand is <> </> as opening and closing tags

    render() {
    return (
            <Modal 
                title="Delete Stream"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/')}
            />
     );
   }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
};

export default connect(mapStateToProps, { fetchSingleStream, deleteStream })(StreamDelete);