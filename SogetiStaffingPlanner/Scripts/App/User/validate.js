let validate = {
    validateName: function (val, that) {
        try {
            if (val.length || val) { that.errors.name = ''; }
            else {
                that.errors.name = 'Name required';
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