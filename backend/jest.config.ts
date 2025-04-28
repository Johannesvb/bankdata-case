import { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest/presets/default-esm', // THIS is the important part
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': ['ts-jest', { useESM: true }],
    },
    extensionsToTreatAsEsm: ['.ts'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1', // Remove .js extensions in imports
    },
};

export default config;
