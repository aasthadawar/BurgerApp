import React, { Component } from 'react';
import Aux from '../Aux';
import styles from './Layout.module.css';
import ToolBar from '../../Components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';


class Layout extends Component{
    state={
        showSideDrawer:false
    }

    sideDrawerToggleHandler=()=>{
        this.setState((prevState)=>{
            return {showSideDrawer:!prevState.showSideDrawer}
        });
    }

    sideDrawerClosedHandler=()=>{
        this.setState({...this.state,showSideDrawer:false})
    }

    render(){
        return(
            <Aux>
                <ToolBar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer open={this.state.showSideDrawer}
                 closed={this.sideDrawerClosedHandler}/>
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
    
}
export  default Layout;