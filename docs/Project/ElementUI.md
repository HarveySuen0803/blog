# Table

# Pagination

# Form

# Dialog

# Upload

# Form Validation

# Message

# CategoryList

```js
data() {
    return {
        // Validation Rule
        rules: {
            tmName: [
                {required: true, message: 'Please input Brand Name', trigger: 'blur'},
                {min: 2, max: 50, message: 'Length should be 2 to 50', trigger: 'blur'}
            ],
            logoUrl: [
                {required: true, message: 'Please upload Brand Logo', trigger: 'change'}
            ],
        }
    }
}
```

```js
confirmForm() {
    this.$refs["trademarkForm"].validate((valid) => {
        if (valid) {
            this.dialogFormVisible = false;

            if (this.newTrademark.id) {
                this.updateTrademark();
            } else {
                this.addTrademark();
            }
        } else {
            this.$message.error("Please complete the form");
        }
if (valid) {
    if (this.newTrademark.id) {
        this.updateTrademark();
    } else {
        this.addTrademark();
    }
} else {
    this.$message.error("Please complete the form");
                }
    });
},
```
