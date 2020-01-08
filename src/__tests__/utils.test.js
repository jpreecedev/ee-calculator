const utils = require("../utils");

describe("Utils tests", () => {
  it("should multiply two numbers", () => {
    const first = 5;
    const second = 6;
    const operator = "*";

    expect(utils.calculate(first, second, operator)).toEqual(30);
  });

  it("should subtract two numbers", () => {
    const first = 7;
    const second = 6;
    const operator = "-";

    expect(utils.calculate(first, second, operator)).toEqual(1);
  });

  it("should add two numbers", () => {
    const first = 5;
    const second = 6;
    const operator = "+";

    expect(utils.calculate(first, second, operator)).toEqual(11);
  });

  it("should divide two numbers", () => {
    const first = 12;
    const second = 6;
    const operator = "/";

    expect(utils.calculate(first, second, operator)).toEqual(2);
  });
});
