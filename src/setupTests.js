import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

// jest.mock("react-router-dom", () => ({
//   useHistory: () => ({
//     push: jest.fn(),
//   }),
// }));

// jest.mock("react-intl", () => {
//   const reactIntl = require.requireActual("react-intl");
//   const intl = reactIntl.createIntl({
//     locale: "en",
//   });

//   return {
//     ...reactIntl,
//     useIntl: () => intl,
//   };
// });

// window.matchMedia =
//   window.matchMedia ||
//   (() => {
//     return { matches: false, addListener: () => {}, removeListener: () => {} };
//   });
