import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {withRouter, Link} from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {createProfile, getCurrentProfile} from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';
class EditProfile extends React.Component {
    constructor(props){
        super(props);
        this.state = {

            name: '',
            description: '',
            image: '',
            errors: {}
        }

    }
    componentDidMount(){
        this.props.getCurrentProfile();
    }
    //branch 8 merge
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
        if(nextProps.profile.profile){
            const profile = nextProps.profile.profile;

            profile.name = !isEmpty(profile.name) ? profile.name : '';
            profile.description = !isEmpty(profile.description) ? profile.description : '';
            profile.image = !isEmpty(profile.image) ? profile.image : '';


            this.setState({
                name: profile.name,
                image: profile.image,
                description: profile.description
            });
        }

    }
    onSubmit = (e) => {
        e.preventDefault();
        const profileData = {
            name: this.state.name,
            image: this.state.image,
            description: this.state.description
        }
        this.props.createProfile(profileData,this.props.history);
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    upload = (e) => {

        let formData = new FormData();
        let image = e.target.files[0];
        formData.append("image", image);
        let lowerName = image.name.toLowerCase();
        this.setState({image: lowerName});
        axios.post('api/users/image',formData
        ).then((res) => {
            console.log('done',res);
        }).catch((err) => {
            console.log(err);
        });

    }
    render(){


        return(
            <div className='create-profile'>
            <div className='container'>
            <div className='row'>
            <div className='col-md-8 m-auto'>
                <Link to="/dashboard" className="btn btn-light">
                    Go Back
                </Link>
            <h1 className='display-4 text-center'>Edit Your Profile</h1>

        <small className='d-block pb-3'>* = required fields</small>

        <form onSubmit={this.onSubmit}>
    <TextFieldGroup
        placeholder="Name"
        name="name"
        value={this.state.name}
        onChange={this.onChange}

        info="Name"
            />


            <TextAreaFieldGroup
        placeholder="Description"
        name="description"
        value={this.state.description}
        onChange={this.onChange}

        info="Tell us a little about yourself"
            />
            <input type="file" name="file" onChange={this.upload} />
            <div className='mb-3'>

        </div>

    <input type="submit" value="Submit" className='btn btn-info btn-block mt-4' />
            </form>
            </div>
            </div>
            </div>
            </div>
    )
    }
}
const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps,{createProfile, getCurrentProfile})(withRouter(EditProfile));