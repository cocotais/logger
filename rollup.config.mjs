import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import json from '@rollup/plugin-json';

const config = [
    {
        input: 'index.ts',
        output: [
            {
                file: 'index.js',
                format: 'es'
            }
        ],
        plugins: [
            typescript(),
            json()
        ]
    },
    {
        input: "index.ts",
        output: [{ file: "index.d.ts", format: "es" }],
        plugins: [dts()]
    }
]
export default config;