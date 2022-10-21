import './requests.js'

import {
    deleteTask,
    getTasks,
    postTask,
    setTask
} from "./requests.js";

import $ from 'jquery';

$(document).on('turbolinks:load', function () {
    let filterState = 'filter-all';

    $("#filter-btns").on("click", "button", function () {
        filterState = this.id;
        $(this).addClass("selected");
        $(this).siblings().removeClass("selected");
        renderAllTasks();
    });

    const filterByCompletion = function (response) {
        switch (filterState) {
            case "filter-active":
                return response.tasks
                    .filter((task) => task.completed == false)
            // .forEach((task) => renderTask(task));
            // break;
            case "filter-completed":
                return response.tasks
                    .filter((task) => task.completed == true)
            // .forEach((task) => renderTask(task));
            // break;
            case "filter-all":
            default:
                return response.tasks
            // response.tasks.forEach((task) => renderTask(task));
            // break;
        }
    }

    const renderTask = function (task) {
        $("#tasks").append(
            "<div class='row row-cols-auto align-items-center py-2'>" +
            "<div class='flex-grow-1 item'>" +
            "<input data-id='" +
            task.id +
            "' type='checkbox' class='check-item me-3' " +
            (task.completed ? "checked" : "") +
            "/>" +
            "<span data-id='" +
            task.id +
            "' class='item-name'>" +
            task.content +
            "</span>" +
            "</div>" +
            "<button data-id='" +
            task.id +
            "' class='btn btn-danger remove'>delete</button>" +
            "</div>"
        );
    }

    const renderAllTasks = function () {
        $("#tasks").empty(); // clear the list
        getTasks(function (res) {
            filterByCompletion(res).map(task => renderTask(task));
        })
    };

    renderAllTasks()

    $("#add-item").on("submit", function (e) {
        e.preventDefault();
        postTask($(".input-entry").val(), (data) => renderAllTasks(data), () => console.log('error'))
        $(".input-entry").val("");
    });

    $(document).on("click", ".remove", function () {
        // Note: Had an issue targetting dynamic elements after added. Solution was to target the parent element that holds the added items, and then to select the correct element as an argument.
        var itemId = $(this).prev().find(".item-name").data("id");
        deleteTask(itemId, (data => renderAllTasks(data)), () => console.log('error'));
    });

    $(document).on("change", ".check-item", function () {
        setTask($(this).data('id'), (this.checked ? "complete" : "active"), (data => renderAllTasks(data)), () => console.log('error'))
    })
})
