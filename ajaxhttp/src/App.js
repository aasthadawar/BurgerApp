import React,{Component} from 'react';
import Layout from '../src/hoc/Layout/Layout';
import BurgerBuilder from '../src/Containers/BurgerBuilder/BurgerBuilder';


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
        <BurgerBuilder/> 
      </Layout>
    );
  }
}

export default App;
