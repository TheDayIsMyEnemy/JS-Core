function attachEvents(){
    let url = 'https://baas.kinvey.com/appdata/kid_H1lo8juqG/biggestCatches';
    let base64auth = btoa('fisher:f');
    let authHeaders = {'Authorization':'Basic ' + base64auth,
                        'Content-type': 'application/json'};
    
    function request(method, catchId,data) {
        return $.ajax({
            method: method,
            url: url+ catchId,
            headers: authHeaders,
            data: JSON.stringify(data)
        });
    }

   $('.load').on('click', loadAllCatches);
   $('.add').on('click', addCatch);

   function loadAllCatches() {
       request('GET','').then(displayAllCatches).catch(displayError);
   }

   function addCatch() {
       let element = $(this).parent();
       let data = getCatchObj(element);
       clearInputFields(element);
       request('POST','',data).then(loadAllCatches).catch(displayError);
   }

    function updateCatch() {
        let element = $(this).parent();
        let catchId = '/' + element.attr('data-id');
        let data = getCatchObj(element);
        request('PUT',catchId,data).then(loadAllCatches).catch(displayError);
    }

    function deleteCatch() {
        let element = $(this).parent();
        let catchId = '/' + element.attr('data-id');
        let data = getCatchObj(element);
        element.remove();
        request('DELETE',catchId,data).then(loadAllCatches).catch(displayError);
   }

   function displayAllCatches(data) {
       $('#catches').empty();
        for(let c of data){
            let div = $('<div>').addClass('catch').attr('data-id', c._id)
                .append($('<label>Angler</label>'))
                .append($(`<input type="text" class="angler" value="${c.angler}"/>`))
                .append($(`<label>Weight</label>`))
                .append($(`<input type="number" class="weight" value="${c.weight}"/>`))
                .append($(`<label>Species</label>`))
                .append($(`<input type="text" class="species" value="${c.species}"/>`))
                .append($(`<label>Location</label>`))
                .append($(`<input type="text" class="location" value="${c.location}"/>`))
                .append($(`<label>Bait</label>`))
                .append($(`<input type="text" class="bait" value="${c.bait}"/>`))
                .append($(`<label>Capture Time</label>`))
                .append($(`<input type="number" class="captureTime" value="${c.captureTime}"/>`))
                .append($('<button class="update">Update</button>').click(updateCatch))
                .append($('<button class="delete">Delete</button>').click(deleteCatch));
            $('#catches').append(div);
        }
   }

   function displayError(err) {
       console.log(err);
   }

    function getCatchObj(element) {
        return {
            angler: element.find('.angler').val(),
            weight: Number(element.find('.weight').val()),
            species: element.find('.species').val(),
            location: element.find('.location').val(),
            bait: element.find('.bait').val(),
            captureTime: Number(element.find('.captureTime').val())
        }
    }

    function clearInputFields(form) {
        form.find('.angler').val('');
        form.find('.weight').val('');
        form.find('.species').val('');
        form.find('.location').val('');
        form.find('.bait').val('');
        form.find('.captureTime').val('');
    }
}