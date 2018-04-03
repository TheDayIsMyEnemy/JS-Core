function attachCreateAdEvent() {
    $('#buttonCreateAd').on('click', createAd);
}

function attachEditAdEvent() {
    $('#buttonEditAd').on('click', editAd);
}

function attachRegisterEvent() {
    $('#buttonRegisterUser').on('click', registerUser);
}

function attachLoginEvent() {
    $('#buttonLoginUser').on('click', loginUser);
}

function attachEventsToLinks() {
    $('#linkHome').on('click', showHomeView);

    if(sessionStorage.getItem('authToken') != null){
        $('#linkLogout').on('click', logoutUser);
        $('#linkCreateAd').on('click', showCreateAdView);
        $('#linkListAds').on('click', listAds);
    }
    else{
        $('#linkRegister').on('click', showRegisterView);
        $('#linkLogin').on('click', showLoginView);
    }
}