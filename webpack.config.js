const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
// 压缩代码插件
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const extractCSS = new ExtractTextPlugin('./css/[name].css');

module.exports = {
	devtool: "inline-source-map",
	plugins: [
	    extractCSS,
	    // 开启全局的模块热替换(HMR)
	    new webpack.HotModuleReplacementPlugin(),
	    // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息
	    new webpack.NamedModulesPlugin(),
	    new UglifyJSPlugin(),
	    new webpack.DefinePlugin({
	      	'process.env':{
	        	'NODE_ENV': JSON.stringify('production')
	      	}
	    }),
	],
	entry: [
		// 开启react代码的模块热替换（HMR）
		//'react-hot-loader/patch',
		// 为webpack-dev-server的环境打包好运行代码
    	// 然后连接到指定服务器域名与端口
		'webpack-dev-server/client?http://localhost:8080',
		// 为热替换（HMR）打包好运行代码
    	// only- 意味着只有成功更新运行代码才会执行热替换（HMR）
		'webpack/hot/only-dev-server',
		// 我们app的入口文件
		'./js/index.js'
	],
	output: {
		// 对于热替换（HMR）是必须的，让webpack知道在哪里载入热更新的模块（chunk）
		publicPath: '/',
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	},
	module: {
		rules: [
			{
             	test: /\.(js|jsx)$/,
             	exclude: /node_modules/,
             	use: {
             		loader: 'babel-loader'
             	}
       		},
       		{
       			test: /\.css$/,
       			use: [
       				'style-loader',
       				{
       					loader: 'css-loader',
       					options: {
       						importLoaders: 1
       					},
       				},
       				'postcss-loader'
       			]
       		},
       		{
             	test: /\.less$/,
             	use: extractCSS.extract({
		                use: [{
		                	loader: 'style-loader'
		                },{
		                    loader: "css-loader"
		                }, {
		                    loader: "less-loader"
		                }]
		            })
       		},
       		{
       			test: /\.scss$/,
       			use: extractCSS.extract({
		                use: [{
		                	loader: 'style-loader'
		                },{
		                    loader: "css-loader"
		                }, {
		                    loader: "sass-loader"
		                }]
		            })
       		}
		]
	},
	devServer: {
		// 开启服务器的模块热替换(HMR)
		hot: true,
		// 输出文件路径
		contentBase: path.resolve(__dirname, 'dist'),
		// 和output的publicaPath 保持一致
		publicPath: '/'
	}
}











