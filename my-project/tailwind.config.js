/** @type {import('tailwindcss').Config} */

let spacingObject = [];

for (let i = 1; i < 30; i++) {
  spacingObject.push(`${i}vh`);
}

console.log(spacingObject);

const object = spacingObject.reduce((acc, item) => {
  acc[item] = item;
  return acc;
}, {});

console.log(object, "Object");

// FOR VIEW WIDTH (VW)
let tempArray = [];
for (let i = 1; i <= 400; i += 0.1) {
  tempArray.push(`${i.toFixed(1)}vw`);
}
const desiredObject = tempArray.reduce((acc, item) => {
  acc[item] = item;

  return acc;
}, {});

let intVw = [];
for (let i = 1; i <= 400; i++) {
  intVw.push(`${i}vw`);
}
const intVwObject = intVw.reduce((acc, item) => {
  acc[item] = item;

  return acc;
}, {});

// END VW

// FOR  VH
let VhArray = [];
for (let i = 1; i <= 400; i += 0.1) {
  VhArray.push(`${i.toFixed(1)}vh`);
}
const vhObject = VhArray.reduce((acc, item) => {
  acc[item] = item;

  return acc;
}, {});
// console.log(vhObject);

// FOR  PX
let PXArray = [];
for (let i = 1; i <= 400; i += 0.1) {
  PXArray.push(`${i.toFixed(1)}px`);
}
const PXObject = PXArray.reduce((acc, item) => {
  acc[item] = item;

  return acc;
}, {});
// console.log({ ...intVwObject, ...desiredObject, ...vhObject, ...PXArray });

// For Percentage
// let PArray = [];
// for (let i = 1; i <= 400; i++) {
//   PArray.push(`${i}%`);
// }
let pArray = [];
for (let i = 1; i <= 500; i++) {
  let value = (i / 100).toFixed(2);
  pArray.push(`percentages: ${value}%`);
}

// console.log(pArray);

// FlexGrow
let flexgrowArray = [];
for (let i = 1; i <= 500; i++) {
  let value = (i / 100).toFixed(2);
  flexgrowArray.push(`flex-grow: ${value}fr`);
}
// console.log(flexgrowArray);

// Font Size
let fontSizeArray = [];
for (let i = 1; i <= 100; i++) {
  let value = (i / 100).toFixed(1); // Convert to two decimal places
  value = value + "em"; // Add "em" units
  fontSizeArray.push(`font size: ${value};`);
}
// console.log(fontSizeArray);

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: object,
      colors: {
        white: "#FFFFFF",
        plan: "#5585FE",
      },
      backgroundColor: {
        custom: "#5585FE",
        customMap: "#1e293b",
        lightDark: "#374151",
      },
      borderRadius: {
        ...intVwObject,
        ...desiredObject,
        ...vhObject,
        ...PXArray,
        ...pArray,
      },

      backgroundImage: {
        image: "url('./src/assets/images/FootballLogo.jpg')",
      },
      flexGrow: { ...flexgrowArray },
      fontSize: { "3.3em": "3.3em", "2em": "2em" },
      flex: {
        base: "1/2",
        customBase: "1/7",
      },
    },
    screens: {
      sm: "100px",
      md: "900px",
      lg: "1024px",
      // max: "1280px",
      tb: "768px",
    },
    spacing: {
      ...intVwObject,
      ...desiredObject,
      ...vhObject,
      ...PXArray,
      ...pArray,
    },
  },
  plugins: [require("flowbite/plugin")],
};

// ADMIN
// denacc@gmail.com
// testacc1

// USER
// ssnitgh@gmail.com
// e0c778e5-9c
