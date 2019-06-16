import React, { Component } from "react"; 
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup.js';
import {loginUser} from '../../actions/authAction';
class Login extends Component {
    constructor(){
        super();
        this.state={
            email: '',
            password:'',
            errors:{}
        }
     this.onChange=this.onChange.bind(this);   
     this.onSubmit=this.onSubmit.bind(this);   
    }
    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }
    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuthenticated){
            console.log('i m in true');
            this.props.history.push('/dashboard');
        }
        if(nextProps.errors){
            console.log('i m in errors');
            this.setState({
                errors: nextProps.errors
            })
        }
    }
    onSubmit=(e)=>{
        e.preventDefault();
        const userData={
            email:this.state.email,
            password: this.state.password,
        }
        this.props.loginUser(userData);
    }
  render() {
      const {errors}=this.state;
      
    return (
       <div className="login">
        <div className="container">
        <div className="row">
            <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <p className="lead text-center">Sign in to your DevHub account</p>
            <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                 placeholder="Email Address"
                 name="email"
                 type="email"
                 value={this.state.email}
                 onChange={this.onChange}
                 errors={errors.email}
                 />
                
                <TextFieldGroup
                 placeholder="Password"
                 name="password"
                 type="password"
                 value={this.state.password}
                 onChange={this.onChange}
                 errors={errors.password}
                 />
                <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
            </div>
        </div>
        </div>
    </div>
    );
  }
}
Login.propTypes={
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}
const mapStateToProps=(state)=>({
    auth:state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{loginUser})(Login);