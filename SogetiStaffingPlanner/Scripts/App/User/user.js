﻿new Vue({
    el: '#User',
    data: {
        users: '',
        dropDowns: {
            roles: '',
            permissions: ''
        },
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
    computed: {
        computeName() {
            return this.formData.name;
        },
        computePermission() {
            return this.formData.permission;
        },
        computeRole() {
            return this.formData.role;
        }
    },
    watch: {
        computeName: function (val) { validate.validateName(val, this); },
        computePermission: function (val) { validate.validatePermission(val, this); },
        computeRole: function (val) { validate.validateRole(val, this); }
    },
    methods: {
        add: function () {
            this.states.addState = true;
            window.scrollTo(0, 100);
        },
        onSubmit: function () {      
            if (this.states.updateState) {
                console.log('update called.')      
                this.updateUser();
            } else if (this.states.addState) {
                console.log('add called');
                this.addUser();
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
            let data = {};
            data.name = this.formData.name;
            data.permission = this.formData.permission;
            data.userId = this.formData.userId;
            data.role = this.formData.role;
            data.active = true;
            data.lastModifiedUserId = 1;
            data.viewRoleId = 1;
            data.permissionRoleId = 1;
            data.lastModified = new Date();
            requests.editUser(this, data);
        },
        addUser: function () {
            let data = {};
            data.fullName = this.formData.name;
            data.active = true;
            data.lastModifiedUserId = 1;
            data.viewRoleId = 1;
            data.permissionRoleId = 1;
            data.lastModified = new Date();
            requests.addUser(this, data);
        }    
    },
    created() {
        requests.fetchUsers(this);
        requests.getUnitList(this);
    }
});