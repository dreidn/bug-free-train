const path = require('path');

module.exports = {
    entry: './src/index.ts',
    mode: "development",

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclue: /node_modules/
            }
        ]
    },

    resolve: {
        extensions: ['.tsx', '.ts', 'js']
    },

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8080
    }
}