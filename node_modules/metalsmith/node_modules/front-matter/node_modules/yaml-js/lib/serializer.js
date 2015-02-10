(function() {
  var YAMLError, events, nodes, util, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  events = require('./events');

  nodes = require('./nodes');

  util = require('./util');

  YAMLError = require('./errors').YAMLError;

  this.SerializerError = (function(_super) {
    __extends(SerializerError, _super);

    function SerializerError() {
      _ref = SerializerError.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    return SerializerError;

  })(YAMLError);

  this.Serializer = (function() {
    function Serializer(_arg) {
      var _ref1;
      _ref1 = _arg != null ? _arg : {}, this.encoding = _ref1.encoding, this.explicit_start = _ref1.explicit_start, this.explicit_end = _ref1.explicit_end, this.version = _ref1.version, this.tags = _ref1.tags;
      this.serialized_nodes = {};
      this.anchors = {};
      this.last_anchor_id = 0;
      this.closed = null;
    }

    Serializer.prototype.open = function() {
      if (this.closed === null) {
        this.emit(new events.StreamStartEvent(this.encoding));
        return this.closed = false;
      } else if (this.closed) {
        throw new SerializerError('serializer is closed');
      } else {
        throw new SerializerError('serializer is already open');
      }
    };

    Serializer.prototype.close = function() {
      if (this.closed === null) {
        throw new SerializerError('serializer is not opened');
      } else if (!this.closed) {
        this.emit(new events.StreamEndEvent);
        return this.closed = true;
      }
    };

    Serializer.prototype.serialize = function(node) {
      if (this.closed === null) {
        throw new SerializerError('serializer is not opened');
      } else if (this.closed) {
        throw new SerializerError('serializer is closed');
      }
      if (node != null) {
        this.emit(new events.DocumentStartEvent(void 0, void 0, this.explicit_start, this.version, this.tags));
        this.anchor_node(node);
        this.serialize_node(node);
        this.emit(new events.DocumentEndEvent(void 0, void 0, this.explicit_end));
      }
      this.serialized_nodes = {};
      this.anchors = {};
      return this.last_anchor_id = 0;
    };

    Serializer.prototype.anchor_node = function(node) {
      var item, key, value, _base, _i, _j, _len, _len1, _name, _ref1, _ref2, _ref3, _results, _results1;
      if (node.unique_id in this.anchors) {
        return (_base = this.anchors)[_name = node.unique_id] != null ? (_base = this.anchors)[_name = node.unique_id] : _base[_name] = this.generate_anchor(node);
      } else {
        this.anchors[node.unique_id] = null;
        if (node instanceof nodes.SequenceNode) {
          _ref1 = node.value;
          _results = [];
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            item = _ref1[_i];
            _results.push(this.anchor_node(item));
          }
          return _results;
        } else if (node instanceof nodes.MappingNode) {
          _ref2 = node.value;
          _results1 = [];
          for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
            _ref3 = _ref2[_j], key = _ref3[0], value = _ref3[1];
            this.anchor_node(key);
            _results1.push(this.anchor_node(value));
          }
          return _results1;
        }
      }
    };

    Serializer.prototype.generate_anchor = function(node) {
      return "id" + (util.pad_left(++this.last_anchor_id, '0', 4));
    };

    Serializer.prototype.serialize_node = function(node, parent, index) {
      var alias, default_tag, detected_tag, implicit, item, key, value, _i, _j, _len, _len1, _ref1, _ref2, _ref3;
      alias = this.anchors[node.unique_id];
      if (node.unique_id in this.serialized_nodes) {
        return this.emit(new events.AliasEvent(alias));
      } else {
        this.serialized_nodes[node.unique_id] = true;
        this.descend_resolver(parent, index);
        if (node instanceof nodes.ScalarNode) {
          detected_tag = this.resolve(nodes.ScalarNode, node.value, [true, false]);
          default_tag = this.resolve(nodes.ScalarNode, node.value, [false, true]);
          implicit = [node.tag === detected_tag, node.tag === default_tag];
          this.emit(new events.ScalarEvent(alias, node.tag, implicit, node.value, void 0, void 0, node.style));
        } else if (node instanceof nodes.SequenceNode) {
          implicit = node.tag === this.resolve(nodes.SequenceNode, node.value, true);
          this.emit(new events.SequenceStartEvent(alias, node.tag, implicit, void 0, void 0, node.flow_style));
          _ref1 = node.value;
          for (index = _i = 0, _len = _ref1.length; _i < _len; index = ++_i) {
            item = _ref1[index];
            this.serialize_node(item, node, index);
          }
          this.emit(new events.SequenceEndEvent);
        } else if (node instanceof nodes.MappingNode) {
          implicit = node.tag === this.resolve(nodes.MappingNode, node.value, true);
          this.emit(new events.MappingStartEvent(alias, node.tag, implicit, void 0, void 0, node.flow_style));
          _ref2 = node.value;
          for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
            _ref3 = _ref2[_j], key = _ref3[0], value = _ref3[1];
            this.serialize_node(key, node, null);
            this.serialize_node(value, node, key);
          }
          this.emit(new events.MappingEndEvent);
        }
        return this.ascend_resolver();
      }
    };

    return Serializer;

  })();

}).call(this);
