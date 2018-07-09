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
            let data = {};
            data.fullName = this.formData.name;
            data.active = true;
            data.lastModifiedUserId = 1;
            data.viewRoleId = 1;
            data.permissionRoleId = 1;
            data.lastModified = new Date();
            $.ajax({
                async: false,
                cache: false,
                type: "POST",
                url: "AddUser",
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (response) {
                   // this.users = data;
                  //  console.log(this.users);
                    console.log(response);
                    console.log("On Submit Called");
                }.bind(this)
            });

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