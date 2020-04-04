import React, { Component } from "react";
import Button from "../../../Components/UI/Button/Button";
import styles from '../ContactData/ContactData.module.css';
import axios from '../../../axios-orders/axios-orders';
import Spinner from "../../../Components/UI/Spinner/Spinner";

class ContactData extends Component{
    state={
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:''
        },
        loading:false
    }

    orderHandler=(event)=>{
        event.preventDefault();
        //console.log('ingredients',this.props.ingredients);
        this.setState({Loading:true})
        const order={
            ingredients:this.props.ingredients,
            price:this.props.price,
            customer:{
                name:'aastha',
                aadress:{
                    street:'vikaspuri',
                    pincode:110018
                },
                email:'test@gmail.com'
            },
            deliveryMethod:'fastest'
        }
        axios.post('/orders.json',order)
        .then(response=>{
            this.setState({Loading:false,});
            this.props.history.push('/');
        })
        .catch(error=>{
            this.setState({Loading:false,})
        })
    }

    render(){
        let form = (<form>
            <input type="text" name="name" placeholder="your name"/>
            <input type="email" name="email" placeholder="your email"/>
            <input type="text" name="street" placeholder="your street"/>
            <input type="text" name="postal" placeholder="your postal code"/>
            <Button  
            clicked={this.orderHandler}
            btnType="Success">ORDER</Button>
        </form>);
        if(this.state.loading){
            form = <Spinner/>
        }
        return(
           <div className={styles.ContactData}>
               <h4>enter your contact ContactData</h4>
               {form}
           </div> 
        );
    }
}

export default ContactData;