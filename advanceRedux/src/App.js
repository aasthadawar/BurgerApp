import React,{Component} from 'react';
import Layout from '../src/hoc/Layout/Layout';
import BurgerBuilder from '../src/Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Containers/Checkout/Checkout';
import {Route,Switch} from 'react-router-dom';
import Orders from './Containers/Orders/Orders';


class App extends Component{
  /*state={
    show:true
  }
  componentDidMount(){
      setTimeout(()=>{
        this.setState({show:false})
      },5000)
      {this.state.show? <BurgerBuilder/> : null} // in return below layout
  }*/
  render(){
    return(
      <Layout>
        <Switch>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Orders}/>
        </Switch>
      </Layout>
    );
  }
}

export default App;
