import $, { post } from 'jquery';


$.ajaxSetup({
    headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
})

export var getTasks = function (successCB, errorCB) {
    var request = {
        type: 'GET',
        url: 'api/tasks?api_key=1',
        success: successCB,
        error: errorCB
    }
    $.ajax(request);
}

export var postTask = function (content, successCB, errorCB) {
    var request = {
        type: 'POST',
        url: 'api/tasks?api_key=1',
        data: {
            task: {
                content: content
            }
        },
        success: successCB,
        error: errorCB
    }

    $.ajax(request);
};

export var deleteTask = function (itemId, successCB, errorCB) {
    var request = {
        type: 'DELETE',
        url: 'api/tasks/' + itemId + '?api_key=1',
        success: successCB,
        error: errorCB
    }
    $.ajax(request);
}

export var setTask = function (itemId, checkedStatus, successCB, errorCB) {
    var request = {
        type: 'PUT',
        url: 'api/tasks/' + itemId + "/mark_" + checkedStatus + '?api_key=1',
        success: successCB,
        error: errorCB
    }
    $.ajax(request);
}

getTasks()