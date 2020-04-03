import React,{Component} from 'react';
import Layout from '../src/hoc/Layout/Layout';
import BurgerBuilder from '../src/Containers/BurgerBuilder/BurgerBuilder';


class App extends Component{
  render(){
    return(
      <Layout>
        <BurgerBuilder/>
      </Layout>
    );
  }
}

export default App;
