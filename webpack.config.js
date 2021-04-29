const path = require('path')
const argv = require('yargs').argv
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs')
const isDevelopment = argv.mode === 'development'
const htmlPages = generateHtmlPlugins('./basic/assets/pages/')

const srcPath = './basic/assets'
const destPath = path.join(__dirname, '/dist/')

const entries = {
  'main/index': srcPath + '/index.js',
}

const types = [
  'pages',
  'layouts',
  'components',
  'common',
]

for (const type of types) {
  const dirs = fs.readdirSync(srcPath + '/' + type)

  for (const dir of dirs) {
    if (fs.existsSync(srcPath + '/' + type + '/' + dir + '/index.js')) {
      entries[type + '/' + dir] = srcPath + '/' + type + '/' + dir + '/index.js'
    }
  }
}

console.log(destPath, entries)

const config = {
  watch: isDevelopment,
  entry: entries,
  output: {
    path: destPath,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      esmodules: true,
                    },
                  },
                ],
              ],

            },
          },
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              minimize: false,
              outputStyle: 'uncompressed',
              plugins: [
                // require('cssnano'),
                require('autoprefixer'),
              ],
            },
          },
          'sass-loader',
          {
            loader: 'style-resources-loader',
            options: {
              patterns: [
                srcPath + '/shared.scss',
              ],
            },
          },
        ],
      },
      {
        test: /images[\\\\/].+\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
              publicPath: (isDevelopment !== 'development') ? '../' : '',
              // publicPath: () => {
              //   if (isDevelopment === 'development') {
              //     return '../'
              //   } else {
              //     return './'
              //   }
              // },
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 98,
              },
            },
          },
        ],
      },
      {
        test: /fonts[\\\\/].+\.(otf|eot|svg|ttf|woff|woff2)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
            publicPath: '../',
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new CopyPlugin([
      {
        from: srcPath + '/static', to: destPath + '/static',
      },
      {
        from: srcPath + '/upload', to: destPath + '/upload',
      },
    ]),
  ].concat(htmlPages),
  optimization: {
    minimizer: [
      new TerserPlugin(),
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'main/vendor',
          priority: 10,
          enforce: true,
        },
      },
    },
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    port: 9000,
  },
}

function convertToObject (arr) {
  return arr.reduce((obj, item, i) => {
    obj[item.replace('./basic/assets/pages/', '')] = `./${arr[i].replace('./basic/assets/pages/', '').replace('.js', '')}/${item.replace('./basic/assets/pages/', '').replace('.js', '')}.js`
    return obj
  }, {})
}

function excludeChunks (obj, name) {
  const excludes = []
  for (const itm in obj) {
    if (itm !== name) {
      excludes.push(itm)
    }
  }
  return excludes
}

function generateHtmlPlugins (templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))
  return templateFiles.map((item) => {
    const name = item
    // eslint-disable-next-line no-unused-vars
    const extension = [
      'html',
    ]
    console.log(name, path.resolve(__dirname, `${templateDir}/${name}/${name}.html`), excludeChunks(convertToObject(glob.sync('./basic/assets/pages/*')), name))
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      chunks: [
        'main/vendor',
        'main/index',
        'common/main',
        `pages/${name}`,
      ],
      // template: path.resolve(__dirname, `${templateDir}/${name}/${name}.${extension[0]}`),
      template: path.resolve(__dirname, `${templateDir}/${name}/${name}.html`),
      excludeChunks: excludeChunks(convertToObject(glob.sync('./basic/assets/pages/*')), name),
    })
  })
}

module.exports = config
