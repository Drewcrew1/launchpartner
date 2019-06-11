import React from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';


import {connect} from 'react-redux';
import {registerUser} from '../../actions/authActions';
import TextFieldgroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';



class Register extends React.Component{

    //merge 6
    constructor(){
        super();
        this.state= {
          name: '',
          email: '',
          password: '',
          password2: '',
            description: '',
            image: '',
            file: '',
          errors: {}

        };

    }
    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
    }
    componentWillReceiveProps(nextProps) {
    if(nextProps.errors){
        this.setState({errors: nextProps.erros});
    }

    }


    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    upload = (e) => {

        var formData = new FormData();
        let image = e.target.files[0];
        formData.append("image", image);
        console.log(image);
        axios.post('api/users/image',formData
        ).then((res) => {
            console.log('done',res);
        }).catch((err) => {
            console.log(err);
        });


    }

    onSubmit = (e) => {
        e.preventDefault();

        let newuser = {
            name: this.state.name,
            email:this.state.email,
            password:this.state.password,
            password2:this.state.password2,
            description:this.state.description,
            image: this.state.email,
            file: this.state.file
        }

        this.props.registerUser(newuser,this.props.history);
    }


    render(){
        const {errors} = this.state;


        return(
            <div className="register">
            <div className="container">
            <div className="row">
            <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
        <p className="lead text-center">Create your People Space Account</p>
        <form onSubmit={this.onSubmit}>
    <TextFieldgroup
        placeholder='Name'
        name='name'
        value={this.state.name}
        onChange={this.onChange}
        error={errors.name}
        />
        <TextAreaFieldGroup
        placeholder="Description"
        name="description"
        value={this.state.description}
        onChange={this.onChange}

        info="Tell us a little about yourself"
            />
        <TextFieldgroup
        placeholder='Email'
        name='email'
        type='email'
        value={this.state.email}
        onChange={this.onChange}
        error={errors.email}

        />
            <TextFieldgroup
        placeholder='Password'
        name='password'
        type='password'
        value={this.state.password}
        onChange={this.onChange}
        error={errors.password}
        />
        <TextFieldgroup
        placeholder='Confirm Password'
        name='password2'
        type='password'
        value={this.state.password2}
        onChange={this.onChange}
        error={errors.password2}
        />
            <input type="file" name="file" onChange={this.upload} />
            <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
            </div>
            </div>
            </div>
            </div>
    );
    }
}



const mapStateToProps = (state) => ({
            auth:state.auth,
            errors: state.errors
            });

export default connect(mapStateToProps, {registerUser})(withRouter(Register));