var express = require('express');
exports.indexs = function(req, res) {
	res.render('index', { title: 'Express' });
}