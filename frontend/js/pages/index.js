import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Trip from './trip';
import Details from './details';
import { withRouter } from 'react-router-dom';
const Pages = (props) => {
  const {trips} =props;
  /* I am adding routing so the user can easily switch between different views*/
  return (
    <Switch>
        <Route exact path="/" render={() => <Trip trips={trips}/>} />
        <Route path="/trip/:id" render={(props) => <Details trips={trips} {...props}/>}/>
    </Switch>
  );
};
// WithRouter enables the Routing. Without it the Details component will not be rendered
export default withRouter(Pages);