import React from 'react';



class ProfileItem extends React.Component{
    render(){

        const {profile} = this.props;
        let imageCont;
if(profile.image){
    imageCont = (
        <img alt={profile.name} height="55" width="55" src={`http://launchpartner.s3.amazonaws.com/${profile.image}`} />
);
}else{
    imageCont = "No Image";
}
        return(
            <div className='card card-body bg-light mb-3'>
                <div className='row'>
                    <div className='col-2'>
                        <p>{imageCont}</p>
                    </div>
                    <div className='col-lg-6 col-md-4 col-8'>
                        <h3>{profile.name}</h3>
                       <p>{profile.description}</p>
                    </div>
                    <div className='col-md-4 d-none d-md-block'>

                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileItem;