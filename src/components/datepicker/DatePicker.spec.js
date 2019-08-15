import React from "react";
import DatePicker from "./DatePicker";
import { shallow } from "enzyme";
import { create } from "domain";
const createDate = (day, month, year) => ({ day, month, year });

const aDate = createDate(20, 2, 2021);
const anotherDate = createDate(26, 2, 2021);
const weeksValue = [[aDate], [anotherDate]];

const props = { weeks: weeksValue };
const setup = (anotherProps = {}) => {
  const newProps = {
    ...props,
    ...anotherProps
  };
  const wrapper = shallow(<DatePicker {...newProps} />);

  return {
    wrapper,
    instance: wrapper.instance(),
    weeks: wrapper.find(".date-picker__week"),
    getDate: date =>
      wrapper.find(`#date-${date.day}-${date.month}-${date.year}`),
    selectedDateElement: wrapper.find(".date--selected"),
    applyButton: wrapper.find(".apply-button")
  };
};
describe("DatePicker", () => {
  const { wrapper } = setup();
  it("smoke test", () => {
    expect(wrapper.exists()).toBe(true);
  });
  describe("basic render", () => {
    describe("when pass weeks", () => {
      const { weeks, getDate, applyButton } = setup();
      it("renders it", () => {
        expect(weeks).toHaveLength(2);
      });
      it("render the dates", () => {
        expect(getDate(aDate).text()).toEqual(aDate.day.toString());
        expect(getDate(anotherDate).text()).toEqual(anotherDate.day.toString());
      });
      it("render apply button", () => {
        expect(applyButton).toHaveLength(1);
      });

      it('render apply with "Aplicar" label', () => {
        expect(applyButton.text()).toEqual("Aplicar");
      });
    });
  });

  describe("when click a date", () => {
    const onDateClickedSpy = jest.fn();
    const { getDate } = setup({ onDateClicked: onDateClickedSpy });
    beforeAll(() => {
      const dateToClick = getDate(aDate);
      dateToClick.simulate("click");
    });
    it("call onDateClickedProp with the date", () => {
      expect(onDateClickedSpy).toBeCalledWith(aDate);
    });
  });

  describe("when pass a selectedDate", () => {
    const selectedDate = createDate(20, 4, 2021);

    describe("and this day existing in the calendar", () => {
      const { selectedDateElement } = setup({
        weeks: [[selectedDate]],
        selectedDate
      });

      it("mark as selected", () => {
        expect(selectedDateElement.text()).toEqual(selectedDate.day.toString());
      });
    });

    describe("and this day doesnt existing in the calendar", () => {
      const { selectedDateElement } = setup({
        weeks: [[createDate(19, 3, 2090)]],
        selectedDate
      });

      it("doenst mark as selected", () => {
        expect(selectedDateElement).toHaveLength(0);
      });
    });
  });

  describe("when click on apply button", () => {
    const onApplySpy = jest.fn();
    const { applyButton } = setup({ onApply: onApplySpy });

    beforeAll(() => {
      applyButton.simulate("click");
    });

    it("call onApply prop", () => {
      expect(onApplySpy).toBeCalled();
    });
  });
});
