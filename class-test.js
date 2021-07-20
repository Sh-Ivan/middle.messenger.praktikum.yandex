class TestClass {
  constructor() {
    this.context = {
      a: 1,
    };
  }

  show() {
    console.log(this.context);
  }
}

const example = new TestClass();
example.show();
