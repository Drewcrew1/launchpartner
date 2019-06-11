import React from 'react';
import {connect} from 'react-redux';
import Spinner from '../common/Spinner';
import {Link} from 'react-router-dom';
import {getCurrentProfile} from '../../actions/profileActions';



 class Dashboard extends React.Component {
     //branch 10 merge10
     componentDidMount(){
         this.props.getCurrentProfile();
     }

    render(){

         const {user} = this.props.auth;
         const {profile,loading} = this.props.profile;

         let dashboardContent;
         if(profile === null || loading){
             dashboardContent = <Spinner />;
         }else{
             if(Object.keys(profile).length > 0){
                 dashboardContent = <div>
             <p className='lead text-muted'>Welcome {profile.name}</p>
                     <p>Email: {profile.email}</p>
                     <p>Bio: {profile.description}</p>
                     <div style={{width: '15vw', height: '15vh'}}>
                 <img alt={profile.name} src={`http://launchpartner.s3.amazonaws.com/${profile.image}`} />
                     </div>

                 </div>
             }else {
                 dashboardContent = (
                   <div>
                        <p className='lead text-muted'>Welcome {user.name}</p>
                     <p>There may have been an error, please try to sign up agian.</p>
                     <Link to='/register' className='btn btn-lg btn-info'>Register </Link>
                   </div>
                 );
             }

         }
        return(
            <div className='dashboard'>
            <div className='container'>
            <div className='row'>
            <div className='col-md-12'>
            <h1 className='display-4'>Dashboard</h1>
        {dashboardContent}
        </div>
            </div>
            </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
     profile: state.profile,
         auth: state.auth
});
export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);