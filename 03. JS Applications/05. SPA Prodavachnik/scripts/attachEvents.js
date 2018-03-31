function attachEvents() {
    $('#linkRegister').on('click', showRegisterView);
    $('#linkLogin').on('click', showLoginView);
    $('#linkHome').on('click', showHomeView);
    $('#linkCreateAd').on('click', showCreateAdView);
    $('#linkListAds').on('click', listAds);


    $('#buttonRegisterUser').on('click', registerUser);
    $('#buttonLoginUser').on('click', loginUser);
    $('#linkLogout').on('click', logoutUser);
    $('#buttonCreateAd').on('click', createAd);
    $('#buttonEditAd').on('click', editAd);

    $("#infoBox, #errorBox").on('click', function() {
        $(this).fadeOut()
    })

    $(document).on({
        ajaxStart: function() { $("#loadingBox").show() },
        ajaxStop: function() { $("#loadingBox").hide() }
    })

}