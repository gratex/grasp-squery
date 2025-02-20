// Generated by LiveScript 1.4.0
(function(){
  var syntaxFlat, toString$ = {}.toString;
  syntaxFlat = require('grasp-syntax-javascript').syntaxFlat;
  function Cache(ast){
    var nodes, types;
    this.ast = ast;
    nodes = [];
    types = [];
    visitPre(ast, function(node){
      var type, i$, ref$, len$, property;
      type = node.type;
      if (type === 'ObjectExpression') {
        for (i$ = 0, len$ = (ref$ = node.properties).length; i$ < len$; ++i$) {
          property = ref$[i$];
          property.type = 'Property';
          property.start = property.key.start;
          property.end = property.value.end;
          if (property.key.loc) {
            property.loc = {
              start: property.key.loc.start,
              end: property.value.loc.end
            };
          }
        }
      }
      nodes.push(node);
      types[type] == null && (types[type] = []);
      types[type].push(node);
    });
    this.nodes = nodes;
    this.types = types;
  }
  function visitPre(ast, fn, path){
    var ref$, nodes, nodeArrays, i$, len$, nodeName, node, newPath, nodeArrayName, nodeArray, j$, len1$;
    if (!ast) {
      return;
    }
    fn(ast, path);
    if (syntaxFlat[ast.type] == null) {
      return;
    }
    ref$ = syntaxFlat[ast.type], nodes = ref$.nodes, nodeArrays = ref$.nodeArrays;
    if (nodes) {
      for (i$ = 0, len$ = nodes.length; i$ < len$; ++i$) {
        nodeName = nodes[i$];
        node = ast[nodeName];
        if (!node) {
          continue;
        }
        newPath = path ? path + "." + nodeName : nodeName;
        visitPre(node, fn, newPath);
      }
    }
    if (nodeArrays) {
      for (i$ = 0, len$ = nodeArrays.length; i$ < len$; ++i$) {
        nodeArrayName = nodeArrays[i$];
        nodeArray = ast[nodeArrayName];
        newPath = path ? path + "." + nodeArrayName : nodeArrayName;
        for (j$ = 0, len1$ = nodeArray.length; j$ < len1$; ++j$) {
          node = nodeArray[j$];
          visitPre(node, fn, newPath);
        }
      }
    }
  }
  function visitChildren(ast, fn){
    var ref$, nodes, nodeArrays, i$, len$, nodeName, nodeArrayName, j$, len1$, node;
    if (syntaxFlat[ast.type] == null) {
      return;
    }
    ref$ = syntaxFlat[ast.type], nodes = ref$.nodes, nodeArrays = ref$.nodeArrays;
    if (nodes) {
      for (i$ = 0, len$ = nodes.length; i$ < len$; ++i$) {
        nodeName = nodes[i$];
        fn(ast[nodeName]);
      }
    }
    if (nodeArrays) {
      for (i$ = 0, len$ = nodeArrays.length; i$ < len$; ++i$) {
        nodeArrayName = nodeArrays[i$];
        for (j$ = 0, len1$ = (ref$ = ast[nodeArrayName]).length; j$ < len1$; ++j$) {
          node = ref$[j$];
          fn(node);
        }
      }
    }
  }
  function getPath(obj, key){
    var value, i$, ref$, len$, k, newValue;
    value = obj;
    for (i$ = 0, len$ = (ref$ = key.split('.')).length; i$ < len$; ++i$) {
      k = ref$[i$];
      newValue = value[k];
      if (toString$.call(newValue).slice(8, -1) !== 'Undefined') {
        value = newValue;
      } else {
        return;
      }
    }
    return value;
  }
  module.exports = {
    Cache: Cache,
    visitPre: visitPre,
    visitChildren: visitChildren,
    getPath: getPath
  };
}).call(this);
