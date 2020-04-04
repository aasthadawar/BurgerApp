import React, { Component } from 'react';
import Aux from '../Auxs/Auxs';
import Modal from '../../Components/UI/Modal/Modal';



const WithErrorHandler=(WrappedComponent,axios)=>{
    return class extends Component{
        state={
            error:null
        }
        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(req=>{
                this.setState({error:null});
                return req;
            })
            this.resInterceptor= axios.interceptors.response.use(res=>res,err=>{
                this.setState({error:err});
            })
        }

        componentWillUnmount(){
            console.log('will unmount',this.resInterceptor,this.reqInterceptor)
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler=()=>{
            this.setState({error:null});
        }

       render(){
           
           return(
            <Aux>
            <Modal modalClosed={this.errorConfirmedHandler}
            show={this.state.error}>
                {this.state.error ? this.state.error.message : null }
            </Modal>
            <WrappedComponent {...this.props}/>
            </Aux>
           );
       }
    }
}

export default WithErrorHandler;