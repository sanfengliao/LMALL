const path = require('path')
const HtmlTemplatePlugin = require('html-webpack-plugin')
const miniCSSExtractPlugin = require('mini-css-extract-plugin')
var Ex = require('extract-text-webpack-plugin');  

function getHTMLConfig(name, title) {
  return {
    template: './src/view/' + name + '.html',
    filename: `${name}.html`,
    title: title,
    hash: true,
    inject: true,
    chunks: [name, 'common']
  }
}

const config  = {
  mode: 'development',
  entry: {
    'index': ['./src/page/index/index.js'],
    'result': ['./src/page/result/index.js'],
    'user-login': ['./src/page/user-login/index.js'],
    'user-register': ['./src/page/user-register/index.js'],
    'user-center': ['./src/page/user-center/index.js'],
    'user-pass-update': ['./src/page/user-pass-update/index.js'],
    'list': ['./src/page/list/index.js'],
    'detail': ['./src/page/detail/index.js'],
  },          
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js",
    //publicPath: path.resolve(__dirname, "dist")
  },
  externals: {
    'jquery':'window.jQuery'
  },
  resolve: {
    alias: {
        node_modules    : path.join(__dirname, '/node_modules'),
        lib             : path.join(__dirname, '/src/lib'),
        util            : path.join(__dirname, '/src/util'),
        component       : path.join(__dirname, '/src/component'),
        service         : path.join(__dirname, '/src/service'),
        page            : path.join(__dirname, '/src/page'),
    }
},
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: miniCSSExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.(gif|png|jpg|woff|svg|eot|ttf|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name].[ext]',
              outputPath: 'images'
            }
          },
        ]
      },
      // {
      //   test: /\.(gif|png|jpg)$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[name].[ext]',
      //         publicPath: "./images/",
      //         outputPath: "images/"
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.(string)$/,
        use: [ {
          loader: 'html-loader',
          options: {
            minimize: true,
            attrs: ['img:src', 'img:data-src', 'audio:srcs']
          }
        }],
      }
    ]
  },
  plugins:[
   new miniCSSExtractPlugin({
     filename:'css/[name].css',
   }),
   new HtmlTemplatePlugin(getHTMLConfig('index', '首页')),
   new HtmlTemplatePlugin(getHTMLConfig('list', '商品列表')),
   new HtmlTemplatePlugin(getHTMLConfig('detail', '商品详情')),
   new HtmlTemplatePlugin(getHTMLConfig('result', '操作结果')),
   new HtmlTemplatePlugin(getHTMLConfig('user-login', '用户登录')),
   new HtmlTemplatePlugin(getHTMLConfig('user-register', '用户注册')),
   new HtmlTemplatePlugin(getHTMLConfig('user-center', '用户中心')),
   new HtmlTemplatePlugin(getHTMLConfig('user-pass-update', '修改密码')),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'common',
          minChunks: 2, //表示提取公共部分最少的文件数
          minSize: 0, //表示提取公共部分最小的大小
          chunks:'initial',
        }
      }
    }
  },
  devServer: {
    port: 3000,
    contentBase: path.resolve(__dirname, "dist"),
    inline: true,
    disableHostCheck: true,
    proxy: {
      "/api": {
        target: "http://happymmall.com",
        changeOrigin: true, 
        pathRewrite: {'^/api' : '/'},
        onProxyRes: function(proxyRes, req, res) {
          var cookies = proxyRes.headers['set-cookie'];
          var cookieRegex = /Domain=\.?happymmall.com/i;
          //修改cookie Path
          if (cookies) {
            var newCookie = cookies.map(function(cookie) {
              if (cookieRegex.test(cookie)) {
                return cookie.replace(cookieRegex, 'Domain=localhost');
              }
              return cookie;
            });
            //修改cookie path
            delete proxyRes.headers['set-cookie'];
            proxyRes.headers['set-cookie'] = newCookie;
          }
        }
      },
     
    }
  
  }
}



module.exports  = config