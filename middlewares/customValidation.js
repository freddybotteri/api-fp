class validate {
    constructor(fieldToValidate, pass) {
        this.actualValue = fieldToValidate;
        this.passed = pass;
    }

    minLength(lgt) {
        if (this.actualValue.length < lgt.min) {
            this.passed = false;
        }
        return this;
    }

    maxLength(lgt) {
        if (this.actualValue.length > lgt.max) {
            this.passed = false;
        }
        return this;
    }

    shapeType() {
        if (this.actualValue.toString() === 'normal' || this.actualValue.toString() === 'personage') {
            this.passed = true;
        } else {
            this.passed = false;
        }
        return this;
    }

    sourceType() {
        if (this.actualValue.toString() === 'youtube' || this.actualValue.toString() === 'rtve') {
            this.passed = true;
        } else {
            this.passed = false;
        }
        return this;
    }

    required() {
        if (this.actualValue.length <= 0) {
            this.passed = false;
        }
        return this;
    }

    extension() {
        const extension = this.actualValue.split('.').pop();
        if (
            extension === 'jpg' ||
            extension === 'png' ||
            extension === 'jpeg'
        ) {
            this.passed = true;
        } else {
            this.passed = false;
        }
        return this;
    }
}

module.exports = { validate };
