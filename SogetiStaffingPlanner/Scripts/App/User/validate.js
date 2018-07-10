let validate = {
    validateName: function (val, that) {
        try {
            if (val.length || val) { that.errors.name = ''; }
            else {
                function isBlank(str) {
                    return (!str || /^\s*$/.test(str));
                }
                if (isBlank(that.formData.name)) {
                    that.errors.name = 'Name required.';
                }
                that.errors.name = ' Name required';
            }
            if (!that.states.updateState) {
                for (let i = 0; i < that.users.length; i++) {
                    if (that.formData.name == that.users[i].FullName) {
                        that.errors.name = 'User already exists.';
                    }
                }
            } else {
                for (let i = 0; i < that.users.length; i++) {
                    if (that.formData.name == that.users[i].FullName && that.formData.prevName != that.users[i].FullName) {
                        that.errors.name = 'User already exists.';
                    }
                }
            }      
        } catch (e) { };
    },
    validatePermission: function (val, that) {
        if (val) {
            that.errors.permission = '';
        }
    },
    validateRole: function (val, that) {
        if (val) {
            that.errors.role = '';
        }
    },
    checkForm: function (that) {
        if (that.states.updateState) {
            console.log('updated');
        }
        function isBlank(str) {
            return (!str || /^\s*$/.test(str));
        }
        if (isBlank(that.formData.name)) {
            that.errors.name = 'Name required.';
        }
      
        for (let i = 0; i < that.users.length; i++) {     
            if (that.formData.name == that.users[i].FullName) {
                if (that.formData.name == that.formData.prevName) {
                    return;
                }
                that.errors.name = 'User already exists.';
            }
        }
        if (!that.formData.name) {
            that.errors.name = 'Name required.';
        } 
        if (!that.formData.permission) {
            that.errors.permission = 'Permission required.';
        }
        if (!that.formData.role) {
            that.errors.role = 'Role required.';
        }
    }
}