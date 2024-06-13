import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import postcss from "rollup-plugin-postcss";
import json from '@rollup/plugin-json';
import copy from 'rollup-plugin-copy';

export default {
    input: 'src/index.js',
    output: {
        dir: 'public',
        format: 'iife',
        inlineDynamicImports: true
    },
    plugins: [
        nodeResolve({
            extensions: ['.js', '.jsx']
        }),
        babel({
            babelHelpers: 'bundled',
            presets: ['@babel/preset-react'],
            extensions: ['.js', '.jsx']
        }),
        commonjs(),
        replace({
            preventAssignment: false,
            'process.env.NODE_ENV': '"development"'
        }),
        postcss({
            extract: true,
            minimize: true,
        }),
        json(),
        copy({
            targets: [
                { src: 'src/assets', dest: 'public/' },
                { src: 'src/fonts', dest: 'public/' }
            ]
        }),
    ]
}
