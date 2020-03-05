import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header';
import history from '../history'; // we are now in charge of the history object


// Router passes history object as props to all components. StreamEdit will show a page specific to the id of the stream selected as specified by the param :id
// History object will allow us to check how the Router matched to that page by checking the this.props.match object passed by the history object. Any params used will be one additional layer below
// Switch forces Router to pick only one path after it has found a path
const App = () => {
    return (
        <div className="ui container">
            <Router history={history}> 
            <div>
              <Header/>
               <Switch>
                <Route path="/" exact component={StreamList}/>
                <Route path="/streams/new" exact component={StreamCreate}/>
                <Route path="/streams/edit/:id" exact component={StreamEdit}/> 
                <Route path="/streams/delete/:id" exact component={StreamDelete}/>
                <Route path="/streams/:id" exact component={StreamShow}/>
               </Switch>
            </div>
            </Router>
        </div>
    );
};

export default App;