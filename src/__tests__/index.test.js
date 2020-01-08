const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

const {
  getByText,
  getByDisplayValue,
  queryAllByDisplayValue,
  getByPlaceholderText,
  fireEvent
} = require("@testing-library/dom");

require("../index.js");

jest.dontMock("fs");
jest.useFakeTimers();

describe("Index tests", () => {
  beforeEach(() => {
    jest.clearAllTimers();
    document.documentElement.innerHTML = html.toString();
    window.dispatchEvent(new Event("load"));
  });

  afterEach(() => {
    jest.resetModules();
  });

  it("should do nothing when clicking an element that is not a button", () => {
    fireEvent.click(getByText(document.body, "5"));

    fireEvent.click(document.querySelector("img"));

    getByDisplayValue(document.body, "5");
  });

  it("should set the display value to 6 from 0 when clicking button 6", () => {
    getByPlaceholderText(document.body, "0");

    fireEvent.click(getByText(document.body, "6"));

    getByDisplayValue(document.body, "6");
  });

  it("should set the display value to 54 from 0 when clicking button 5 then 4", () => {
    getByPlaceholderText(document.body, "0");

    fireEvent.click(getByText(document.body, "5"));
    fireEvent.click(getByText(document.body, "4"));

    getByDisplayValue(document.body, "54");
  });

  it("should not update the display value when clicking a button that does not have a numeric value", () => {
    getByPlaceholderText(document.body, "0");

    fireEvent.click(getByText(document.body, "/"));

    expect(queryAllByDisplayValue(document.body, "/")).toHaveLength(0);
  });

  it("should blink the display value when clicking on an operator", async () => {
    getByPlaceholderText(document.body, "0");

    fireEvent.click(getByText(document.body, "5"));
    fireEvent.click(getByText(document.body, "/"));

    expect(getByDisplayValue(document.body, "5").className).toContain("blink");

    jest.runAllTimers();

    expect(getByDisplayValue(document.body, "5").className).not.toContain(
      "blink"
    );
  });

  it("should multiple two numbers", async () => {
    getByPlaceholderText(document.body, "0");

    fireEvent.click(getByText(document.body, "5"));
    fireEvent.click(getByText(document.body, "*"));
    fireEvent.click(getByText(document.body, "6"));
    fireEvent.click(getByText(document.body, "="));

    getByDisplayValue(document.body, "30");
  });

  it("should subtract two numbers", async () => {
    getByPlaceholderText(document.body, "0");

    fireEvent.click(getByText(document.body, "7"));
    fireEvent.click(getByText(document.body, "-"));
    fireEvent.click(getByText(document.body, "6"));
    fireEvent.click(getByText(document.body, "="));

    getByDisplayValue(document.body, "1");
  });

  it("should add two numbers", async () => {
    getByPlaceholderText(document.body, "0");

    fireEvent.click(getByText(document.body, "5"));
    fireEvent.click(getByText(document.body, "+"));
    fireEvent.click(getByText(document.body, "6"));
    fireEvent.click(getByText(document.body, "="));

    getByDisplayValue(document.body, "11");
  });

  it("should add divide numbers", async () => {
    getByPlaceholderText(document.body, "0");

    fireEvent.click(getByText(document.body, "1"));
    fireEvent.click(getByText(document.body, "2"));
    fireEvent.click(getByText(document.body, "/"));
    fireEvent.click(getByText(document.body, "6"));
    fireEvent.click(getByText(document.body, "="));

    getByDisplayValue(document.body, "2");
  });
});
