let requests = {
    fetchUsers: function (that) {
        $.ajax({
            async: false,
            cache: false,
            type: "GET",
            url: "GetUsers",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                that.users = data;
            }.bind(that)
        });
    },
    addUser: function (that, data) {
        console.log(data);
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
                requests.fetchUsers(that);
                that.findSelected();
                that.scrollDown();
                requests.addMessage(that.formData.name, this);
                that.formData = {};
                that.states.addState = false;
            }.bind(that)
        });
    },
    editUser: function (that, data) {
        console.log('from requests: ',data);
        $.ajax({
                type: "POST",
                url: "EditUser",
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                    //Receives message from backend for you to do what you want with it
                    console.log('POST request success');
                    that.states.addState = false;
                    that.states.updateState = false;
                    requests.fetchUsers(that);
                    that.findSelected();
                    that.scrollDown();
                    requests.updateMessage(data.name, this);
                    that.formData = {};
                }.bind(that),
                error: function (e) {
                    console.log(e, "Error adding data! Please try again.");
                }
            });
    },
    getPermissions: function (that) {
        $.ajax({
            async: false,
            cache: false,
            type: "GET",
            url: "GetPermissionList",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                that.dropDowns.permissions = data;
            }.bind(that)
        });
    },
    getRoles: function (that) {
        $.ajax({
            async: false,
            cache: false,
            type: "GET",
            url: "GetRoleList",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                that.dropDowns.roles = data;
            }.bind(that)
        });
    },
    addMessage: function (message, that) {
        setTimeout(function () {
            that.message = '';
        }, 6000);
        that.message = `Added ${message}!`;
    },
    updateMessage: function (message, that) {
        setTimeout(function () {
            that.message = '';
        }, 6000);
        that.message = `Updated ${message}!`;
    }
}