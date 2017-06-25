var userDiv = document.getElementById('user-div');

var myTracks = [];

function onSignIn(googleUser){
    var profile = googleUser.getBasicProfile();

    verifyUser(profile, function (user){
        localStorage.setItem('user-id', user['token_id']);


        makeHTTPRequest('/user/tracks?userId=' + user['token_id'], 'POST', function (responseText){
            myTracks = JSON.parse(responseText);
            userDiv.innerHTML = getUserTemplate(user);
        })
    });
}

function verifyUser(profile, callback){
    var userId = profile.getId();

    makeHTTPRequest('/user/verify?tokenId=' + userId,'POST', function (responseText){
        var response = JSON.parse(responseText);
            if(!response.user){
                var user = { 
                    token_id : userId,
                    full_name : profile.getName(),
                    given_name : profile.getGivenName(), 
                    family_name : profile.getFamilyName(), 
                    image_url : profile.getImageUrl(),
                    email : profile.getEmail() 
                };

                makeHTTPRequest('/user/register?tokenId=' + user.token_id
                    + '&fullName=' + user.full_name + '&givenName=' + user.given_name 
                    + '&familyName=' + user.family_name + '&imageURL=' + user.image_url 
                    + '&email=' + user.email, 'POST', function (responseText){
                        response = JSON.parse(responseText);
                        callback(user);
                });
            }
            else{
                callback(response.user);
            }
    }, function (error){
        console.log('error al verificar usuario', error);
    })
}