new Vue({
    el: '#User',
    data: {
        users: '',
        states: {
            addState: false,
            updateState: false,
        },
        formData: {
            name: '',
            permission: '',
            role: '',
        },
        errors: {
            name: null,
            permission: null,
            role: null,
        }
    },
    methods: {
        add: function () {
            this.states.addState = true;
            window.scrollTo(0, 100);
        },
        onSubmit: function () {

        },
        cancel: function () {
            this.states.addState = false;
        }
    },
    created: function () {
        $.ajax({
            async: false,
            cache: false,
            type: "GET",
            url: "GetUsers",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                this.users = data;
                console.log(this.users);
            }.bind(this)
        });
    }
    
});