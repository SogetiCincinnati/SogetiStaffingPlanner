let validate = {
    validateName: function (val, that) {
        console.log(that.users);
        try {
            if (val.length || val) { that.errors.name = ''; }
            else {
                that.errors.name = 'Name required';
            }
        } catch (e) { };
    },
    validatePermission: function (val, that) {
        console.log(val);
    },
    validateRole: function (val, that) {
        console.log(val);
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