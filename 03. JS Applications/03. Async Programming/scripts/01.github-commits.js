function loadCommits() {
    let list = $('#commits');
    let username = $('#username');
    let repo = $('#repo');
    let url = `https://api.github.com/repos/${username.val()}/${repo.val()}/commits`;
    list.empty();
    username.val('');
    repo.val('');

    $.ajax({
        method: 'GET',
        url: url
    }).then(displayCommits).catch(displayError);

    function displayCommits(data) {
        for (let e of data) {
            list.append($(`<li>${e.commit.author.name}: ${e.commit.message}</li>`));
        }
    }

    function displayError(err) {
        list.append($(`<li>Error: ${err.status} (${err.statusText})</li>`));
    }
}