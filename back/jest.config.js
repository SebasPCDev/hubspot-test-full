// module.exports = {
//   preset: "ts-jest",
//   testEnvironment: "node",
//   transform: {
//     "^.+\\.ts$": "ts-jest",
//   },
//   moduleFileExtensions: ["ts", "js"],
//   moduleNameMapper: {
//     "^@/(.*)$": "<rootDir>/src/$1", // Mapea el alias '@/...' a la carpeta src
//   },
// };

export default {
  clearMocks: true,
  coverageProvider: "v8",
  moduleFileExtensions: ["js", "ts", "json", "node"],

  roots: ["<rootDir>/src"],

  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  transform: {
    "^.+\\.(ts)$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
