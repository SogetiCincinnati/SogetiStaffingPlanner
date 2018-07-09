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
            if (this.states.updateState) {
                console.log('update called.')      
                this.updateUser();
            } else if (this.states.addState) {
                console.log('add called');
                this.addUser(data);
            } else {
                console.log('Something unexpected happened.');
            }
        },
        cancel: function () {
            this.states.addState = false;
            this.states.updateState = false;
            this.formData = {};
            window.scrollTo(0, 0);
        },
        edit: function (user) {
            this.formData = {};
            this.states.addState = true;
            this.states.updateState = true;
            this.formData.userId = user.UserId;
            this.formData.name = user.FullName;
            this.formData.permission = user.PermissionRoleId;
            this.formData.role = user.ViewRoleId;
            console.log(this.formData);
            window.scrollTo(0, 100);
        },
        updateUser: function () {
            $.ajax({
                type: "POST",
                url: "EditUser",
                dataType: "json",
                data: JSON.stringify(this.formData),
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                    //Receives message from backend for you to do what you want with it
                    console.log('POST request success');
                    this.states.addState = false;
                    this.states.updateState = false;
                    $.ajax({
                        async: false,
                        cache: false,
                        type: "GET",
                        url: "GetUsers",
                        contentType: "application/json;charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            this.users = data;
                        }.bind(this)
                    });
                }.bind(this),
                error: function (e) {
                    console.log(e, "Error adding data! Please try again.");
                }
            });
        },
        addUser: function (data) {
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
                    $.ajax({
                        async: false,
                        cache: false,
                        type: "GET",
                        url: "GetUsers",
                        contentType: "application/json;charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            alert("User added!");
                            this.formData = {};
                            this.users = data;
                            this.states.addState = false;
                        }.bind(this)
                    });
                    console.log(response);
                    console.log("On Submit Called");
                }.bind(this)
            });
        }
        
    },
    created() {
        $.ajax({
            async: false,
            cache: false,
            type: "GET",
            url: "GetUsers",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                this.users = data;
            }.bind(this)
        });
    }
    
});