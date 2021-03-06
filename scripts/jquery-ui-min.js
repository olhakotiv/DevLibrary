/*! jQuery UI - v1.11.2 - 2014-10-16
* http://jqueryui.com
* Includes: core.js, widget.js, mouse.js, position.js, accordion.js, autocomplete.js, button.js, datepicker.js, dialog.js, draggable.js, droppable.js, effect.js, effect-blind.js, effect-bounce.js, effect-clip.js, effect-drop.js, effect-explode.js, effect-fade.js, effect-fold.js, effect-highlight.js, effect-puff.js, effect-pulsate.js, effect-scale.js, effect-shake.js, effect-size.js, effect-slide.js, effect-transfer.js, menu.js, progressbar.js, resizable.js, selectable.js, selectmenu.js, slider.js, sortable.js, spinner.js, tabs.js, tooltip.js
* Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */
(function(a) {
  "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery);
})(function(J) {
  function w(c, d) {
    var g,
      b,
      f,
      e = c.nodeName.toLowerCase();
    return "area" === e
      ? ((g = c.parentNode),
        (b = g.name),
        c.href && b && "map" === g.nodeName.toLowerCase()
          ? ((f = J("img[usemap='#" + b + "']")[0]), !!f && F(f))
          : !1)
      : (/input|select|textarea|button|object/.test(e)
          ? !c.disabled
          : "a" === e
            ? c.href || d
            : d) && F(c);
  }
  function F(a) {
    return (
      J.expr.filters.visible(a) &&
      !J(a)
        .parents()
        .addBack()
        .filter(function() {
          return "hidden" === J.css(this, "visibility");
        }).length
    );
  }
  function x(c) {
    for (var b, a; c.length && c[0] !== document; ) {
      if (
        ((b = c.css("position")),
        ("absolute" === b || "relative" === b || "fixed" === b) &&
          ((a = parseInt(c.css("zIndex"), 10)), !isNaN(a) && 0 !== a))
      ) {
        return a;
      }
      c = c.parent();
    }
    return 0;
  }
  function C() {
    (this._curInst = null),
      (this._keyEvent = !1),
      (this._disabledInputs = []),
      (this._datepickerShowing = !1),
      (this._inDialog = !1),
      (this._mainDivId = "ui-datepicker-div"),
      (this._inlineClass = "ui-datepicker-inline"),
      (this._appendClass = "ui-datepicker-append"),
      (this._triggerClass = "ui-datepicker-trigger"),
      (this._dialogClass = "ui-datepicker-dialog"),
      (this._disableClass = "ui-datepicker-disabled"),
      (this._unselectableClass = "ui-datepicker-unselectable"),
      (this._currentClass = "ui-datepicker-current-day"),
      (this._dayOverClass = "ui-datepicker-days-cell-over"),
      (this.regional = []),
      (this.regional[""] = {
        closeText: "Done",
        prevText: "Prev",
        nextText: "Next",
        currentText: "Today",
        monthNames: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        monthNamesShort: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        dayNames: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        weekHeader: "Wk",
        dateFormat: "mm/dd/yy",
        firstDay: 0,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
      }),
      (this._defaults = {
        showOn: "focus",
        showAnim: "fadeIn",
        showOptions: {},
        defaultDate: null,
        appendText: "",
        buttonText: "...",
        buttonImage: "",
        buttonImageOnly: !1,
        hideIfNoPrevNext: !1,
        navigationAsDateFormat: !1,
        gotoCurrent: !1,
        changeMonth: !1,
        changeYear: !1,
        yearRange: "c-10:c+10",
        showOtherMonths: !1,
        selectOtherMonths: !1,
        showWeek: !1,
        calculateWeek: this.iso8601Week,
        shortYearCutoff: "+10",
        minDate: null,
        maxDate: null,
        duration: "fast",
        beforeShowDay: null,
        beforeShow: null,
        onSelect: null,
        onChangeMonthYear: null,
        onClose: null,
        numberOfMonths: 1,
        showCurrentAtPos: 0,
        stepMonths: 1,
        stepBigMonths: 12,
        altField: "",
        altFormat: "",
        constrainInput: !0,
        showButtonPanel: !1,
        autoSize: !1,
        disabled: !1
      }),
      J.extend(this._defaults, this.regional[""]),
      (this.regional.en = J.extend(!0, {}, this.regional[""])),
      (this.regional["en-US"] = J.extend(!0, {}, this.regional.en)),
      (this.dpDiv = N(
        J(
          "<div id='" +
            this._mainDivId +
            "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"
        )
      ));
  }
  function N(b) {
    var a =
      "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
    return b
      .delegate(a, "mouseout", function() {
        J(this).removeClass("ui-state-hover"),
          -1 !== this.className.indexOf("ui-datepicker-prev") &&
            J(this).removeClass("ui-datepicker-prev-hover"),
          -1 !== this.className.indexOf("ui-datepicker-next") &&
            J(this).removeClass("ui-datepicker-next-hover");
      })
      .delegate(a, "mouseover", B);
  }
  function B() {
    J.datepicker._isDisabledDatepicker(
      k.inline ? k.dpDiv.parent()[0] : k.input[0]
    ) ||
      (J(this)
        .parents(".ui-datepicker-calendar")
        .find("a")
        .removeClass("ui-state-hover"),
      J(this).addClass("ui-state-hover"),
      -1 !== this.className.indexOf("ui-datepicker-prev") &&
        J(this).addClass("ui-datepicker-prev-hover"),
      -1 !== this.className.indexOf("ui-datepicker-next") &&
        J(this).addClass("ui-datepicker-next-hover"));
  }
  function z(b, a) {
    J.extend(b, a);
    for (var c in a) {
      null == a[c] && (b[c] = a[c]);
    }
    return b;
  }
  function G(a) {
    return function() {
      var b = this.element.val();
      a.apply(this, arguments),
        this._refresh(),
        b !== this.element.val() && this._trigger("change");
    };
  }
  (J.ui = J.ui || {}),
    J.extend(J.ui, {
      version: "1.11.2",
      keyCode: {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38
      }
    }),
    J.fn.extend({
      scrollParent: function(d) {
        var c = this.css("position"),
          e = "absolute" === c,
          f = d ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
          b = this.parents()
            .filter(function() {
              var a = J(this);
              return e && "static" === a.css("position")
                ? !1
                : f.test(
                    a.css("overflow") +
                      a.css("overflow-y") +
                      a.css("overflow-x")
                  );
            })
            .eq(0);
        return "fixed" !== c && b.length
          ? b
          : J(this[0].ownerDocument || document);
      },
      uniqueId: (function() {
        var a = 0;
        return function() {
          return this.each(function() {
            this.id || (this.id = "ui-id-" + ++a);
          });
        };
      })(),
      removeUniqueId: function() {
        return this.each(function() {
          /^ui-id-\d+$/.test(this.id) && J(this).removeAttr("id");
        });
      }
    }),
    J.extend(J.expr[":"], {
      data: J.expr.createPseudo
        ? J.expr.createPseudo(function(a) {
            return function(b) {
              return !!J.data(b, a);
            };
          })
        : function(b, a, c) {
            return !!J.data(b, c[3]);
          },
      focusable: function(a) {
        return w(a, !isNaN(J.attr(a, "tabindex")));
      },
      tabbable: function(a) {
        var b = J.attr(a, "tabindex"),
          c = isNaN(b);
        return (c || b >= 0) && w(a, !c);
      }
    }),
    J("<a>").outerWidth(1).jquery ||
      J.each(["Width", "Height"], function(d, c) {
        function e(m, l, n, h) {
          return (
            J.each(g, function() {
              (l -= parseFloat(J.css(m, "padding" + this)) || 0),
                n &&
                  (l -= parseFloat(J.css(m, "border" + this + "Width")) || 0),
                h && (l -= parseFloat(J.css(m, "margin" + this)) || 0);
            }),
            l
          );
        }
        var g = "Width" === c ? ["Left", "Right"] : ["Top", "Bottom"],
          b = c.toLowerCase(),
          f = {
            innerWidth: J.fn.innerWidth,
            innerHeight: J.fn.innerHeight,
            outerWidth: J.fn.outerWidth,
            outerHeight: J.fn.outerHeight
          };
        (J.fn["inner" + c] = function(a) {
          return void 0 === a
            ? f["inner" + c].call(this)
            : this.each(function() {
                J(this).css(b, e(this, a) + "px");
              });
        }),
          (J.fn["outer" + c] = function(a, h) {
            return "number" != typeof a
              ? f["outer" + c].call(this, a)
              : this.each(function() {
                  J(this).css(b, e(this, a, !0, h) + "px");
                });
          });
      }),
    J.fn.addBack ||
      (J.fn.addBack = function(a) {
        return this.add(
          null == a ? this.prevObject : this.prevObject.filter(a)
        );
      }),
    J("<a>")
      .data("a-b", "a")
      .removeData("a-b")
      .data("a-b") &&
      (J.fn.removeData = (function(a) {
        return function(b) {
          return arguments.length ? a.call(this, J.camelCase(b)) : a.call(this);
        };
      })(J.fn.removeData)),
    (J.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase())),
    J.fn.extend({
      focus: (function(a) {
        return function(b, c) {
          return "number" == typeof b
            ? this.each(function() {
                var d = this;
                setTimeout(function() {
                  J(d).focus(), c && c.call(d);
                }, b);
              })
            : a.apply(this, arguments);
        };
      })(J.fn.focus),
      disableSelection: (function() {
        var a =
          "onselectstart" in document.createElement("div")
            ? "selectstart"
            : "mousedown";
        return function() {
          return this.bind(a + ".ui-disableSelection", function(b) {
            b.preventDefault();
          });
        };
      })(),
      enableSelection: function() {
        return this.unbind(".ui-disableSelection");
      },
      zIndex: function(b) {
        if (void 0 !== b) {
          return this.css("zIndex", b);
        }
        if (this.length) {
          for (var a, c, d = J(this[0]); d.length && d[0] !== document; ) {
            if (
              ((a = d.css("position")),
              ("absolute" === a || "relative" === a || "fixed" === a) &&
                ((c = parseInt(d.css("zIndex"), 10)), !isNaN(c) && 0 !== c))
            ) {
              return c;
            }
            d = d.parent();
          }
        }
        return 0;
      }
    }),
    (J.ui.plugin = {
      add: function(d, c, e) {
        var f,
          b = J.ui[d].prototype;
        for (f in e) {
          (b.plugins[f] = b.plugins[f] || []), b.plugins[f].push([c, e[f]]);
        }
      },
      call: function(g, d, c, f) {
        var h,
          b = g.plugins[d];
        if (
          b &&
          (f ||
            (g.element[0].parentNode &&
              11 !== g.element[0].parentNode.nodeType))
        ) {
          for (h = 0; b.length > h; h++) {
            g.options[b[h][0]] && b[h][1].apply(g.element, c);
          }
        }
      }
    });
  var E = 0,
    q = Array.prototype.slice;
  (J.cleanData = (function(a) {
    return function(c) {
      var d, f, b;
      for (b = 0; null != (f = c[b]); b++) {
        try {
          (d = J._data(f, "events")),
            d && d.remove && J(f).triggerHandler("remove");
        } catch (e) {}
      }
      a(c);
    };
  })(J.cleanData)),
    (J.widget = function(p, f, u) {
      var d,
        m,
        c,
        b,
        g = {},
        e = p.split(".")[0];
      return (
        (p = p.split(".")[1]),
        (d = e + "-" + p),
        u || ((u = f), (f = J.Widget)),
        (J.expr[":"][d.toLowerCase()] = function(a) {
          return !!J.data(a, d);
        }),
        (J[e] = J[e] || {}),
        (m = J[e][p]),
        (c = J[e][p] = function(h, a) {
          return this._createWidget
            ? (arguments.length && this._createWidget(h, a), void 0)
            : new c(h, a);
        }),
        J.extend(c, m, {
          version: u.version,
          _proto: J.extend({}, u),
          _childConstructors: []
        }),
        (b = new f()),
        (b.options = J.widget.extend({}, b.options)),
        J.each(u, function(a, h) {
          return J.isFunction(h)
            ? ((g[a] = (function() {
                var i = function() {
                    return f.prototype[a].apply(this, arguments);
                  },
                  l = function(n) {
                    return f.prototype[a].apply(this, n);
                  };
                return function() {
                  var r,
                    o = this._super,
                    n = this._superApply;
                  return (
                    (this._super = i),
                    (this._superApply = l),
                    (r = h.apply(this, arguments)),
                    (this._super = o),
                    (this._superApply = n),
                    r
                  );
                };
              })()),
              void 0)
            : ((g[a] = h), void 0);
        }),
        (c.prototype = J.widget.extend(
          b,
          { widgetEventPrefix: m ? b.widgetEventPrefix || p : p },
          g,
          { constructor: c, namespace: e, widgetName: p, widgetFullName: d }
        )),
        m
          ? (J.each(m._childConstructors, function(h, a) {
              var l = a.prototype;
              J.widget(l.namespace + "." + l.widgetName, c, a._proto);
            }),
            delete m._childConstructors)
          : f._childConstructors.push(c),
        J.widget.bridge(p, c),
        c
      );
    }),
    (J.widget.extend = function(d) {
      for (
        var c, e, g = q.call(arguments, 1), b = 0, f = g.length;
        f > b;
        b++
      ) {
        for (c in g[b]) {
          (e = g[b][c]),
            g[b].hasOwnProperty(c) &&
              void 0 !== e &&
              (d[c] = J.isPlainObject(e)
                ? J.isPlainObject(d[c])
                  ? J.widget.extend({}, d[c], e)
                  : J.widget.extend({}, e)
                : e);
        }
      }
      return d;
    }),
    (J.widget.bridge = function(b, a) {
      var c = a.prototype.widgetFullName || b;
      J.fn[b] = function(g) {
        var d = "string" == typeof g,
          f = q.call(arguments, 1),
          e = this;
        return (
          (g = !d && f.length ? J.widget.extend.apply(null, [g].concat(f)) : g),
          d
            ? this.each(function() {
                var l,
                  h = J.data(this, c);
                return "instance" === g
                  ? ((e = h), !1)
                  : h
                    ? J.isFunction(h[g]) && "_" !== g.charAt(0)
                      ? ((l = h[g].apply(h, f)),
                        l !== h && void 0 !== l
                          ? ((e = l && l.jquery ? e.pushStack(l.get()) : l), !1)
                          : void 0)
                      : J.error(
                          "no such method '" +
                            g +
                            "' for " +
                            b +
                            " widget instance"
                        )
                    : J.error(
                        "cannot call methods on " +
                          b +
                          " prior to initialization; attempted to call method '" +
                          g +
                          "'"
                      );
              })
            : this.each(function() {
                var h = J.data(this, c);
                h
                  ? (h.option(g || {}), h._init && h._init())
                  : J.data(this, c, new a(g, this));
              }),
          e
        );
      };
    }),
    (J.Widget = function() {}),
    (J.Widget._childConstructors = []),
    (J.Widget.prototype = {
      widgetName: "widget",
      widgetEventPrefix: "",
      defaultElement: "<div>",
      options: { disabled: !1, create: null },
      _createWidget: function(b, a) {
        (a = J(a || this.defaultElement || this)[0]),
          (this.element = J(a)),
          (this.uuid = E++),
          (this.eventNamespace = "." + this.widgetName + this.uuid),
          (this.bindings = J()),
          (this.hoverable = J()),
          (this.focusable = J()),
          a !== this &&
            (J.data(a, this.widgetFullName, this),
            this._on(!0, this.element, {
              remove: function(c) {
                c.target === a && this.destroy();
              }
            }),
            (this.document = J(a.style ? a.ownerDocument : a.document || a)),
            (this.window = J(
              this.document[0].defaultView || this.document[0].parentWindow
            ))),
          (this.options = J.widget.extend(
            {},
            this.options,
            this._getCreateOptions(),
            b
          )),
          this._create(),
          this._trigger("create", null, this._getCreateEventData()),
          this._init();
      },
      _getCreateOptions: J.noop,
      _getCreateEventData: J.noop,
      _create: J.noop,
      _init: J.noop,
      destroy: function() {
        this._destroy(),
          this.element
            .unbind(this.eventNamespace)
            .removeData(this.widgetFullName)
            .removeData(J.camelCase(this.widgetFullName)),
          this.widget()
            .unbind(this.eventNamespace)
            .removeAttr("aria-disabled")
            .removeClass(this.widgetFullName + "-disabled ui-state-disabled"),
          this.bindings.unbind(this.eventNamespace),
          this.hoverable.removeClass("ui-state-hover"),
          this.focusable.removeClass("ui-state-focus");
      },
      _destroy: J.noop,
      widget: function() {
        return this.element;
      },
      option: function(d, c) {
        var e,
          g,
          b,
          f = d;
        if (0 === arguments.length) {
          return J.widget.extend({}, this.options);
        }
        if ("string" == typeof d) {
          if (((f = {}), (e = d.split(".")), (d = e.shift()), e.length)) {
            for (
              g = f[d] = J.widget.extend({}, this.options[d]), b = 0;
              e.length - 1 > b;
              b++
            ) {
              (g[e[b]] = g[e[b]] || {}), (g = g[e[b]]);
            }
            if (((d = e.pop()), 1 === arguments.length)) {
              return void 0 === g[d] ? null : g[d];
            }
            g[d] = c;
          } else {
            if (1 === arguments.length) {
              return void 0 === this.options[d] ? null : this.options[d];
            }
            f[d] = c;
          }
        }
        return this._setOptions(f), this;
      },
      _setOptions: function(b) {
        var a;
        for (a in b) {
          this._setOption(a, b[a]);
        }
        return this;
      },
      _setOption: function(b, a) {
        return (
          (this.options[b] = a),
          "disabled" === b &&
            (this.widget().toggleClass(this.widgetFullName + "-disabled", !!a),
            a &&
              (this.hoverable.removeClass("ui-state-hover"),
              this.focusable.removeClass("ui-state-focus"))),
          this
        );
      },
      enable: function() {
        return this._setOptions({ disabled: !1 });
      },
      disable: function() {
        return this._setOptions({ disabled: !0 });
      },
      _on: function(d, c, e) {
        var f,
          b = this;
        "boolean" != typeof d && ((e = c), (c = d), (d = !1)),
          e
            ? ((c = f = J(c)), (this.bindings = this.bindings.add(c)))
            : ((e = c), (c = this.element), (f = this.widget())),
          J.each(e, function(m, p) {
            function n() {
              return d ||
                (b.options.disabled !== !0 &&
                  !J(this).hasClass("ui-state-disabled"))
                ? ("string" == typeof p ? b[p] : p).apply(b, arguments)
                : void 0;
            }
            "string" != typeof p &&
              (n.guid = p.guid = p.guid || n.guid || J.guid++);
            var i = m.match(/^([\w:-]*)\s*(.*)$/),
              a = i[1] + b.eventNamespace,
              g = i[2];
            g ? f.delegate(g, a, n) : c.bind(a, n);
          });
      },
      _off: function(b, a) {
        (a =
          (a || "").split(" ").join(this.eventNamespace + " ") +
          this.eventNamespace),
          b.unbind(a).undelegate(a),
          (this.bindings = J(this.bindings.not(b).get())),
          (this.focusable = J(this.focusable.not(b).get())),
          (this.hoverable = J(this.hoverable.not(b).get()));
      },
      _delay: function(d, b) {
        function a() {
          return ("string" == typeof d ? c[d] : d).apply(c, arguments);
        }
        var c = this;
        return setTimeout(a, b || 0);
      },
      _hoverable: function(a) {
        (this.hoverable = this.hoverable.add(a)),
          this._on(a, {
            mouseenter: function(b) {
              J(b.currentTarget).addClass("ui-state-hover");
            },
            mouseleave: function(b) {
              J(b.currentTarget).removeClass("ui-state-hover");
            }
          });
      },
      _focusable: function(a) {
        (this.focusable = this.focusable.add(a)),
          this._on(a, {
            focusin: function(b) {
              J(b.currentTarget).addClass("ui-state-focus");
            },
            focusout: function(b) {
              J(b.currentTarget).removeClass("ui-state-focus");
            }
          });
      },
      _trigger: function(d, c, e) {
        var g,
          b,
          f = this.options[d];
        if (
          ((e = e || {}),
          (c = J.Event(c)),
          (c.type = (d === this.widgetEventPrefix
            ? d
            : this.widgetEventPrefix + d
          ).toLowerCase()),
          (c.target = this.element[0]),
          (b = c.originalEvent))
        ) {
          for (g in b) {
            g in c || (c[g] = b[g]);
          }
        }
        return (
          this.element.trigger(c, e),
          !(
            (J.isFunction(f) &&
              f.apply(this.element[0], [c].concat(e)) === !1) ||
            c.isDefaultPrevented()
          )
        );
      }
    }),
    J.each({ show: "fadeIn", hide: "fadeOut" }, function(b, a) {
      J.Widget.prototype["_" + b] = function(d, g, c) {
        "string" == typeof g && (g = { effect: g });
        var f,
          e = g ? (g === !0 || "number" == typeof g ? a : g.effect || a) : b;
        (g = g || {}),
          "number" == typeof g && (g = { duration: g }),
          (f = !J.isEmptyObject(g)),
          (g.complete = c),
          g.delay && d.delay(g.delay),
          f && J.effects && J.effects.effect[e]
            ? d[b](g)
            : e !== b && d[e]
              ? d[e](g.duration, g.easing, c)
              : d.queue(function(h) {
                  J(this)[b](), c && c.call(d[0]), h();
                });
      };
    }),
    J.widget;
  var K = !1;
  J(document).mouseup(function() {
    K = !1;
  }),
    J.widget("ui.mouse", {
      version: "1.11.2",
      options: {
        cancel: "input,textarea,button,select,option",
        distance: 1,
        delay: 0
      },
      _mouseInit: function() {
        var a = this;
        this.element
          .bind("mousedown." + this.widgetName, function(b) {
            return a._mouseDown(b);
          })
          .bind("click." + this.widgetName, function(b) {
            return !0 === J.data(b.target, a.widgetName + ".preventClickEvent")
              ? (J.removeData(b.target, a.widgetName + ".preventClickEvent"),
                b.stopImmediatePropagation(),
                !1)
              : void 0;
          }),
          (this.started = !1);
      },
      _mouseDestroy: function() {
        this.element.unbind("." + this.widgetName),
          this._mouseMoveDelegate &&
            this.document
              .unbind("mousemove." + this.widgetName, this._mouseMoveDelegate)
              .unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
      },
      _mouseDown: function(b) {
        if (!K) {
          (this._mouseMoved = !1),
            this._mouseStarted && this._mouseUp(b),
            (this._mouseDownEvent = b);
          var a = this,
            c = 1 === b.which,
            d =
              "string" == typeof this.options.cancel && b.target.nodeName
                ? J(b.target).closest(this.options.cancel).length
                : !1;
          return c && !d && this._mouseCapture(b)
            ? ((this.mouseDelayMet = !this.options.delay),
              this.mouseDelayMet ||
                (this._mouseDelayTimer = setTimeout(function() {
                  a.mouseDelayMet = !0;
                }, this.options.delay)),
              this._mouseDistanceMet(b) &&
              this._mouseDelayMet(b) &&
              ((this._mouseStarted = this._mouseStart(b) !== !1),
              !this._mouseStarted)
                ? (b.preventDefault(), !0)
                : (!0 ===
                    J.data(b.target, this.widgetName + ".preventClickEvent") &&
                    J.removeData(
                      b.target,
                      this.widgetName + ".preventClickEvent"
                    ),
                  (this._mouseMoveDelegate = function(f) {
                    return a._mouseMove(f);
                  }),
                  (this._mouseUpDelegate = function(f) {
                    return a._mouseUp(f);
                  }),
                  this.document
                    .bind(
                      "mousemove." + this.widgetName,
                      this._mouseMoveDelegate
                    )
                    .bind("mouseup." + this.widgetName, this._mouseUpDelegate),
                  b.preventDefault(),
                  (K = !0),
                  !0))
            : !0;
        }
      },
      _mouseMove: function(a) {
        if (this._mouseMoved) {
          if (
            J.ui.ie &&
            (!document.documentMode || 9 > document.documentMode) &&
            !a.button
          ) {
            return this._mouseUp(a);
          }
          if (!a.which) {
            return this._mouseUp(a);
          }
        }
        return (
          (a.which || a.button) && (this._mouseMoved = !0),
          this._mouseStarted
            ? (this._mouseDrag(a), a.preventDefault())
            : (this._mouseDistanceMet(a) &&
                this._mouseDelayMet(a) &&
                ((this._mouseStarted =
                  this._mouseStart(this._mouseDownEvent, a) !== !1),
                this._mouseStarted ? this._mouseDrag(a) : this._mouseUp(a)),
              !this._mouseStarted)
        );
      },
      _mouseUp: function(a) {
        return (
          this.document
            .unbind("mousemove." + this.widgetName, this._mouseMoveDelegate)
            .unbind("mouseup." + this.widgetName, this._mouseUpDelegate),
          this._mouseStarted &&
            ((this._mouseStarted = !1),
            a.target === this._mouseDownEvent.target &&
              J.data(a.target, this.widgetName + ".preventClickEvent", !0),
            this._mouseStop(a)),
          (K = !1),
          !1
        );
      },
      _mouseDistanceMet: function(a) {
        return (
          Math.max(
            Math.abs(this._mouseDownEvent.pageX - a.pageX),
            Math.abs(this._mouseDownEvent.pageY - a.pageY)
          ) >= this.options.distance
        );
      },
      _mouseDelayMet: function() {
        return this.mouseDelayMet;
      },
      _mouseStart: function() {},
      _mouseDrag: function() {},
      _mouseStop: function() {},
      _mouseCapture: function() {
        return !0;
      }
    }),
    (function() {
      function U(d, c, a) {
        return [
          parseFloat(d[0]) * (e.test(d[0]) ? c / 100 : 1),
          parseFloat(d[1]) * (e.test(d[1]) ? a / 100 : 1)
        ];
      }
      function y(c, a) {
        return parseInt(J.css(c, a), 10) || 0;
      }
      function V(c) {
        var a = c[0];
        return 9 === a.nodeType
          ? {
              width: c.width(),
              height: c.height(),
              offset: { top: 0, left: 0 }
            }
          : J.isWindow(a)
            ? {
                width: c.width(),
                height: c.height(),
                offset: { top: c.scrollTop(), left: c.scrollLeft() }
              }
            : a.preventDefault
              ? { width: 0, height: 0, offset: { top: a.pageY, left: a.pageX } }
              : {
                  width: c.outerWidth(),
                  height: c.outerHeight(),
                  offset: c.offset()
                };
      }
      J.ui = J.ui || {};
      var m,
        S,
        g = Math.max,
        b = Math.abs,
        O = Math.round,
        v = /left|center|right/,
        T = /top|center|bottom/,
        Q = /[\+\-]\d+(\.[\d]+)?%?/,
        R = /^\w+/,
        e = /%$/,
        P = J.fn.position;
      (J.position = {
        scrollbarWidth: function() {
          if (void 0 !== m) {
            return m;
          }
          var f,
            d,
            h = J(
              "<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"
            ),
            c = h.children()[0];
          return (
            J("body").append(h),
            (f = c.offsetWidth),
            h.css("overflow", "scroll"),
            (d = c.offsetWidth),
            f === d && (d = h[0].clientWidth),
            h.remove(),
            (m = f - d)
          );
        },
        getScrollInfo: function(f) {
          var d = f.isWindow || f.isDocument ? "" : f.element.css("overflow-x"),
            h = f.isWindow || f.isDocument ? "" : f.element.css("overflow-y"),
            l =
              "scroll" === d ||
              ("auto" === d && f.width < f.element[0].scrollWidth),
            c =
              "scroll" === h ||
              ("auto" === h && f.height < f.element[0].scrollHeight);
          return {
            width: c ? J.position.scrollbarWidth() : 0,
            height: l ? J.position.scrollbarWidth() : 0
          };
        },
        getWithinInfo: function(c) {
          var a = J(c || window),
            d = J.isWindow(a[0]),
            f = !!a[0] && 9 === a[0].nodeType;
          return {
            element: a,
            isWindow: d,
            isDocument: f,
            offset: a.offset() || { left: 0, top: 0 },
            scrollLeft: a.scrollLeft(),
            scrollTop: a.scrollTop(),
            width: d || f ? a.width() : a.outerWidth(),
            height: d || f ? a.height() : a.outerHeight()
          };
        }
      }),
        (J.fn.position = function(c) {
          if (!c || !c.of) {
            return P.apply(this, arguments);
          }
          c = J.extend({}, c);
          var a,
            d,
            i,
            u,
            l,
            o,
            t = J(c.of),
            r = J.position.getWithinInfo(c.within),
            s = J.position.getScrollInfo(r),
            h = (c.collision || "flip").split(" "),
            f = {};
          return (
            (o = V(t)),
            t[0].preventDefault && (c.at = "left top"),
            (d = o.width),
            (i = o.height),
            (u = o.offset),
            (l = J.extend({}, u)),
            J.each(["my", "at"], function() {
              var W,
                p,
                n = (c[this] || "").split(" ");
              1 === n.length &&
                (n = v.test(n[0])
                  ? n.concat(["center"])
                  : T.test(n[0])
                    ? ["center"].concat(n)
                    : ["center", "center"]),
                (n[0] = v.test(n[0]) ? n[0] : "center"),
                (n[1] = T.test(n[1]) ? n[1] : "center"),
                (W = Q.exec(n[0])),
                (p = Q.exec(n[1])),
                (f[this] = [W ? W[0] : 0, p ? p[0] : 0]),
                (c[this] = [R.exec(n[0])[0], R.exec(n[1])[0]]);
            }),
            1 === h.length && (h[1] = h[0]),
            "right" === c.at[0]
              ? (l.left += d)
              : "center" === c.at[0] && (l.left += d / 2),
            "bottom" === c.at[1]
              ? (l.top += i)
              : "center" === c.at[1] && (l.top += i / 2),
            (a = U(f.at, d, i)),
            (l.left += a[0]),
            (l.top += a[1]),
            this.each(function() {
              var ae,
                W,
                ad = J(this),
                aa = ad.outerWidth(),
                ab = ad.outerHeight(),
                Y = y(this, "marginLeft"),
                ac = y(this, "marginTop"),
                n = aa + Y + y(this, "marginRight") + s.width,
                X = ab + ac + y(this, "marginBottom") + s.height,
                Z = J.extend({}, l),
                p = U(f.my, ad.outerWidth(), ad.outerHeight());
              "right" === c.my[0]
                ? (Z.left -= aa)
                : "center" === c.my[0] && (Z.left -= aa / 2),
                "bottom" === c.my[1]
                  ? (Z.top -= ab)
                  : "center" === c.my[1] && (Z.top -= ab / 2),
                (Z.left += p[0]),
                (Z.top += p[1]),
                S || ((Z.left = O(Z.left)), (Z.top = O(Z.top))),
                (ae = { marginLeft: Y, marginTop: ac }),
                J.each(["left", "top"], function(ag, af) {
                  J.ui.position[h[ag]] &&
                    J.ui.position[h[ag]][af](Z, {
                      targetWidth: d,
                      targetHeight: i,
                      elemWidth: aa,
                      elemHeight: ab,
                      collisionPosition: ae,
                      collisionWidth: n,
                      collisionHeight: X,
                      offset: [a[0] + p[0], a[1] + p[1]],
                      my: c.my,
                      at: c.at,
                      within: r,
                      elem: ad
                    });
                }),
                c.using &&
                  (W = function(ak) {
                    var ah = u.left - Z.left,
                      ag = ah + d - aa,
                      aj = u.top - Z.top,
                      af = aj + i - ab,
                      ai = {
                        target: {
                          element: t,
                          left: u.left,
                          top: u.top,
                          width: d,
                          height: i
                        },
                        element: {
                          element: ad,
                          left: Z.left,
                          top: Z.top,
                          width: aa,
                          height: ab
                        },
                        horizontal:
                          0 > ag ? "left" : ah > 0 ? "right" : "center",
                        vertical: 0 > af ? "top" : aj > 0 ? "bottom" : "middle"
                      };
                    aa > d && d > b(ah + ag) && (ai.horizontal = "center"),
                      ab > i && i > b(aj + af) && (ai.vertical = "middle"),
                      (ai.important =
                        g(b(ah), b(ag)) > g(b(aj), b(af))
                          ? "horizontal"
                          : "vertical"),
                      c.using.call(this, ak, ai);
                  }),
                ad.offset(J.extend(Z, { using: W }));
            })
          );
        }),
        (J.ui.position = {
          fit: {
            left: function(u, X) {
              var o,
                Y = X.within,
                d = Y.isWindow ? Y.scrollLeft : Y.offset.left,
                W = Y.width,
                c = u.left - X.collisionPosition.marginLeft,
                p = d - c,
                f = c + X.collisionWidth - W - d;
              X.collisionWidth > W
                ? p > 0 && 0 >= f
                  ? ((o = u.left + p + X.collisionWidth - W - d),
                    (u.left += p - o))
                  : (u.left =
                      f > 0 && 0 >= p
                        ? d
                        : p > f
                          ? d + W - X.collisionWidth
                          : d)
                : p > 0
                  ? (u.left += p)
                  : f > 0
                    ? (u.left -= f)
                    : (u.left = g(u.left - c, u.left));
            },
            top: function(u, X) {
              var o,
                Y = X.within,
                d = Y.isWindow ? Y.scrollTop : Y.offset.top,
                W = X.within.height,
                c = u.top - X.collisionPosition.marginTop,
                p = d - c,
                f = c + X.collisionHeight - W - d;
              X.collisionHeight > W
                ? p > 0 && 0 >= f
                  ? ((o = u.top + p + X.collisionHeight - W - d),
                    (u.top += p - o))
                  : (u.top =
                      f > 0 && 0 >= p
                        ? d
                        : p > f
                          ? d + W - X.collisionHeight
                          : d)
                : p > 0
                  ? (u.top += p)
                  : f > 0
                    ? (u.top -= f)
                    : (u.top = g(u.top - c, u.top));
            }
          },
          flip: {
            left: function(ac, ah) {
              var Z,
                ai,
                X = ah.within,
                af = X.offset.left + X.scrollLeft,
                W = X.width,
                aa = X.isWindow ? X.scrollLeft : X.offset.left,
                Y = ac.left - ah.collisionPosition.marginLeft,
                ag = Y - aa,
                ad = Y + ah.collisionWidth - W - aa,
                ae =
                  "left" === ah.my[0]
                    ? -ah.elemWidth
                    : "right" === ah.my[0]
                      ? ah.elemWidth
                      : 0,
                r =
                  "left" === ah.at[0]
                    ? ah.targetWidth
                    : "right" === ah.at[0]
                      ? -ah.targetWidth
                      : 0,
                ab = -2 * ah.offset[0];
              0 > ag
                ? ((Z = ac.left + ae + r + ab + ah.collisionWidth - W - af),
                  (0 > Z || b(ag) > Z) && (ac.left += ae + r + ab))
                : ad > 0 &&
                  ((ai =
                    ac.left -
                    ah.collisionPosition.marginLeft +
                    ae +
                    r +
                    ab -
                    aa),
                  (ai > 0 || ad > b(ai)) && (ac.left += ae + r + ab));
            },
            top: function(ad, ai) {
              var aa,
                aj,
                X = ai.within,
                ag = X.offset.top + X.scrollTop,
                W = X.height,
                ab = X.isWindow ? X.scrollTop : X.offset.top,
                Z = ad.top - ai.collisionPosition.marginTop,
                ah = Z - ab,
                ae = Z + ai.collisionHeight - W - ab,
                af = "top" === ai.my[1],
                r = af
                  ? -ai.elemHeight
                  : "bottom" === ai.my[1]
                    ? ai.elemHeight
                    : 0,
                ac =
                  "top" === ai.at[1]
                    ? ai.targetHeight
                    : "bottom" === ai.at[1]
                      ? -ai.targetHeight
                      : 0,
                Y = -2 * ai.offset[1];
              0 > ah
                ? ((aj = ad.top + r + ac + Y + ai.collisionHeight - W - ag),
                  ad.top + r + ac + Y > ah &&
                    (0 > aj || b(ah) > aj) &&
                    (ad.top += r + ac + Y))
                : ae > 0 &&
                  ((aa =
                    ad.top - ai.collisionPosition.marginTop + r + ac + Y - ab),
                  ad.top + r + ac + Y > ae &&
                    (aa > 0 || ae > b(aa)) &&
                    (ad.top += r + ac + Y));
            }
          },
          flipfit: {
            left: function() {
              J.ui.position.flip.left.apply(this, arguments),
                J.ui.position.fit.left.apply(this, arguments);
            },
            top: function() {
              J.ui.position.flip.top.apply(this, arguments),
                J.ui.position.fit.top.apply(this, arguments);
            }
          }
        }),
        (function() {
          var c,
            a,
            f,
            u,
            p,
            l = document.getElementsByTagName("body")[0],
            d = document.createElement("div");
          (c = document.createElement(l ? "div" : "body")),
            (f = {
              visibility: "hidden",
              width: 0,
              height: 0,
              border: 0,
              margin: 0,
              background: "none"
            }),
            l &&
              J.extend(f, {
                position: "absolute",
                left: "-1000px",
                top: "-1000px"
              });
          for (p in f) {
            c.style[p] = f[p];
          }
          c.appendChild(d),
            (a = l || document.documentElement),
            a.insertBefore(c, a.firstChild),
            (d.style.cssText = "position: absolute; left: 10.7432222px;"),
            (u = J(d).offset().left),
            (S = u > 10 && 11 > u),
            (c.innerHTML = ""),
            a.removeChild(c);
        })();
    })(),
    J.ui.position,
    J.widget("ui.accordion", {
      version: "1.11.2",
      options: {
        active: 0,
        animate: {},
        collapsible: !1,
        event: "click",
        header: "> li > :first-child,> :not(li):even",
        heightStyle: "auto",
        icons: {
          activeHeader: "ui-icon-triangle-1-s",
          header: "ui-icon-triangle-1-e"
        },
        activate: null,
        beforeActivate: null
      },
      hideProps: {
        borderTopWidth: "hide",
        borderBottomWidth: "hide",
        paddingTop: "hide",
        paddingBottom: "hide",
        height: "hide"
      },
      showProps: {
        borderTopWidth: "show",
        borderBottomWidth: "show",
        paddingTop: "show",
        paddingBottom: "show",
        height: "show"
      },
      _create: function() {
        var a = this.options;
        (this.prevShow = this.prevHide = J()),
          this.element
            .addClass("ui-accordion ui-widget ui-helper-reset")
            .attr("role", "tablist"),
          a.collapsible ||
            (a.active !== !1 && null != a.active) ||
            (a.active = 0),
          this._processPanels(),
          0 > a.active && (a.active += this.headers.length),
          this._refresh();
      },
      _getCreateEventData: function() {
        return {
          header: this.active,
          panel: this.active.length ? this.active.next() : J()
        };
      },
      _createIcons: function() {
        var a = this.options.icons;
        a &&
          (J("<span>")
            .addClass("ui-accordion-header-icon ui-icon " + a.header)
            .prependTo(this.headers),
          this.active
            .children(".ui-accordion-header-icon")
            .removeClass(a.header)
            .addClass(a.activeHeader),
          this.headers.addClass("ui-accordion-icons"));
      },
      _destroyIcons: function() {
        this.headers
          .removeClass("ui-accordion-icons")
          .children(".ui-accordion-header-icon")
          .remove();
      },
      _destroy: function() {
        var a;
        this.element
          .removeClass("ui-accordion ui-widget ui-helper-reset")
          .removeAttr("role"),
          this.headers
            .removeClass(
              "ui-accordion-header ui-accordion-header-active ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top"
            )
            .removeAttr("role")
            .removeAttr("aria-expanded")
            .removeAttr("aria-selected")
            .removeAttr("aria-controls")
            .removeAttr("tabIndex")
            .removeUniqueId(),
          this._destroyIcons(),
          (a = this.headers
            .next()
            .removeClass(
              "ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled"
            )
            .css("display", "")
            .removeAttr("role")
            .removeAttr("aria-hidden")
            .removeAttr("aria-labelledby")
            .removeUniqueId()),
          "content" !== this.options.heightStyle && a.css("height", "");
      },
      _setOption: function(b, a) {
        return "active" === b
          ? (this._activate(a), void 0)
          : ("event" === b &&
              (this.options.event &&
                this._off(this.headers, this.options.event),
              this._setupEvents(a)),
            this._super(b, a),
            "collapsible" !== b ||
              a ||
              this.options.active !== !1 ||
              this._activate(0),
            "icons" === b && (this._destroyIcons(), a && this._createIcons()),
            "disabled" === b &&
              (this.element
                .toggleClass("ui-state-disabled", !!a)
                .attr("aria-disabled", a),
              this.headers
                .add(this.headers.next())
                .toggleClass("ui-state-disabled", !!a)),
            void 0);
      },
      _keydown: function(d) {
        if (!d.altKey && !d.ctrlKey) {
          var c = J.ui.keyCode,
            e = this.headers.length,
            f = this.headers.index(d.target),
            b = !1;
          switch (d.keyCode) {
            case c.RIGHT:
            case c.DOWN:
              b = this.headers[(f + 1) % e];
              break;
            case c.LEFT:
            case c.UP:
              b = this.headers[(f - 1 + e) % e];
              break;
            case c.SPACE:
            case c.ENTER:
              this._eventHandler(d);
              break;
            case c.HOME:
              b = this.headers[0];
              break;
            case c.END:
              b = this.headers[e - 1];
          }
          b &&
            (J(d.target).attr("tabIndex", -1),
            J(b).attr("tabIndex", 0),
            b.focus(),
            d.preventDefault());
        }
      },
      _panelKeyDown: function(a) {
        a.keyCode === J.ui.keyCode.UP &&
          a.ctrlKey &&
          J(a.currentTarget)
            .prev()
            .focus();
      },
      refresh: function() {
        var a = this.options;
        this._processPanels(),
          (a.active === !1 && a.collapsible === !0) || !this.headers.length
            ? ((a.active = !1), (this.active = J()))
            : a.active === !1
              ? this._activate(0)
              : this.active.length &&
                !J.contains(this.element[0], this.active[0])
                ? this.headers.length ===
                  this.headers.find(".ui-state-disabled").length
                  ? ((a.active = !1), (this.active = J()))
                  : this._activate(Math.max(0, a.active - 1))
                : (a.active = this.headers.index(this.active)),
          this._destroyIcons(),
          this._refresh();
      },
      _processPanels: function() {
        var b = this.headers,
          a = this.panels;
        (this.headers = this.element
          .find(this.options.header)
          .addClass("ui-accordion-header ui-state-default ui-corner-all")),
          (this.panels = this.headers
            .next()
            .addClass(
              "ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom"
            )
            .filter(":not(.ui-accordion-content-active)")
            .hide()),
          a && (this._off(b.not(this.headers)), this._off(a.not(this.panels)));
      },
      _refresh: function() {
        var b,
          a = this.options,
          c = a.heightStyle,
          d = this.element.parent();
        (this.active = this._findActive(a.active)
          .addClass("ui-accordion-header-active ui-state-active ui-corner-top")
          .removeClass("ui-corner-all")),
          this.active
            .next()
            .addClass("ui-accordion-content-active")
            .show(),
          this.headers
            .attr("role", "tab")
            .each(function() {
              var f = J(this),
                e = f.uniqueId().attr("id"),
                g = f.next(),
                h = g.uniqueId().attr("id");
              f.attr("aria-controls", h), g.attr("aria-labelledby", e);
            })
            .next()
            .attr("role", "tabpanel"),
          this.headers
            .not(this.active)
            .attr({
              "aria-selected": "false",
              "aria-expanded": "false",
              tabIndex: -1
            })
            .next()
            .attr({ "aria-hidden": "true" })
            .hide(),
          this.active.length
            ? this.active
                .attr({
                  "aria-selected": "true",
                  "aria-expanded": "true",
                  tabIndex: 0
                })
                .next()
                .attr({ "aria-hidden": "false" })
            : this.headers.eq(0).attr("tabIndex", 0),
          this._createIcons(),
          this._setupEvents(a.event),
          "fill" === c
            ? ((b = d.height()),
              this.element.siblings(":visible").each(function() {
                var e = J(this),
                  f = e.css("position");
                "absolute" !== f && "fixed" !== f && (b -= e.outerHeight(!0));
              }),
              this.headers.each(function() {
                b -= J(this).outerHeight(!0);
              }),
              this.headers
                .next()
                .each(function() {
                  J(this).height(
                    Math.max(0, b - J(this).innerHeight() + J(this).height())
                  );
                })
                .css("overflow", "auto"))
            : "auto" === c &&
              ((b = 0),
              this.headers
                .next()
                .each(function() {
                  b = Math.max(
                    b,
                    J(this)
                      .css("height", "")
                      .height()
                  );
                })
                .height(b));
      },
      _activate: function(b) {
        var a = this._findActive(b)[0];
        a !== this.active[0] &&
          ((a = a || this.active[0]),
          this._eventHandler({
            target: a,
            currentTarget: a,
            preventDefault: J.noop
          }));
      },
      _findActive: function(a) {
        return "number" == typeof a ? this.headers.eq(a) : J();
      },
      _setupEvents: function(b) {
        var a = { keydown: "_keydown" };
        b &&
          J.each(b.split(" "), function(d, c) {
            a[c] = "_eventHandler";
          }),
          this._off(this.headers.add(this.headers.next())),
          this._on(this.headers, a),
          this._on(this.headers.next(), { keydown: "_panelKeyDown" }),
          this._hoverable(this.headers),
          this._focusable(this.headers);
      },
      _eventHandler: function(p) {
        var f = this.options,
          u = this.active,
          d = J(p.currentTarget),
          m = d[0] === u[0],
          c = m && f.collapsible,
          b = c ? J() : d.next(),
          g = u.next(),
          e = {
            oldHeader: u,
            oldPanel: g,
            newHeader: c ? J() : d,
            newPanel: b
          };
        p.preventDefault(),
          (m && !f.collapsible) ||
            this._trigger("beforeActivate", p, e) === !1 ||
            ((f.active = c ? !1 : this.headers.index(d)),
            (this.active = m ? J() : d),
            this._toggle(e),
            u.removeClass("ui-accordion-header-active ui-state-active"),
            f.icons &&
              u
                .children(".ui-accordion-header-icon")
                .removeClass(f.icons.activeHeader)
                .addClass(f.icons.header),
            m ||
              (d
                .removeClass("ui-corner-all")
                .addClass(
                  "ui-accordion-header-active ui-state-active ui-corner-top"
                ),
              f.icons &&
                d
                  .children(".ui-accordion-header-icon")
                  .removeClass(f.icons.header)
                  .addClass(f.icons.activeHeader),
              d.next().addClass("ui-accordion-content-active")));
      },
      _toggle: function(b) {
        var a = b.newPanel,
          c = this.prevShow.length ? this.prevShow : b.oldPanel;
        this.prevShow.add(this.prevHide).stop(!0, !0),
          (this.prevShow = a),
          (this.prevHide = c),
          this.options.animate
            ? this._animate(a, c, b)
            : (c.hide(), a.show(), this._toggleComplete(b)),
          c.attr({ "aria-hidden": "true" }),
          c.prev().attr("aria-selected", "false"),
          a.length && c.length
            ? c.prev().attr({ tabIndex: -1, "aria-expanded": "false" })
            : a.length &&
              this.headers
                .filter(function() {
                  return 0 === J(this).attr("tabIndex");
                })
                .attr("tabIndex", -1),
          a
            .attr("aria-hidden", "false")
            .prev()
            .attr({
              "aria-selected": "true",
              tabIndex: 0,
              "aria-expanded": "true"
            });
      },
      _animate: function(v, Q, m) {
        var R,
          f,
          O,
          c = this,
          b = 0,
          p = v.length && (!Q.length || v.index() < Q.index()),
          g = this.options.animate || {},
          P = (p && g.down) || g,
          y = function() {
            c._toggleComplete(m);
          };
        return (
          "number" == typeof P && (O = P),
          "string" == typeof P && (f = P),
          (f = f || P.easing || g.easing),
          (O = O || P.duration || g.duration),
          Q.length
            ? v.length
              ? ((R = v.show().outerHeight()),
                Q.animate(this.hideProps, {
                  duration: O,
                  easing: f,
                  step: function(d, a) {
                    a.now = Math.round(d);
                  }
                }),
                v.hide().animate(this.showProps, {
                  duration: O,
                  easing: f,
                  complete: y,
                  step: function(d, a) {
                    (a.now = Math.round(d)),
                      "height" !== a.prop
                        ? (b += a.now)
                        : "content" !== c.options.heightStyle &&
                          ((a.now = Math.round(R - Q.outerHeight() - b)),
                          (b = 0));
                  }
                }),
                void 0)
              : Q.animate(this.hideProps, O, f, y)
            : v.animate(this.showProps, O, f, y)
        );
      },
      _toggleComplete: function(b) {
        var a = b.oldPanel;
        a
          .removeClass("ui-accordion-content-active")
          .prev()
          .removeClass("ui-corner-top")
          .addClass("ui-corner-all"),
          a.length && (a.parent()[0].className = a.parent()[0].className),
          this._trigger("activate", null, b);
      }
    }),
    J.widget("ui.menu", {
      version: "1.11.2",
      defaultElement: "<ul>",
      delay: 300,
      options: {
        icons: { submenu: "ui-icon-carat-1-e" },
        items: "> *",
        menus: "ul",
        position: { my: "left-1 top", at: "right top" },
        role: "menu",
        blur: null,
        focus: null,
        select: null
      },
      _create: function() {
        (this.activeMenu = this.element),
          (this.mouseHandled = !1),
          this.element
            .uniqueId()
            .addClass("ui-menu ui-widget ui-widget-content")
            .toggleClass(
              "ui-menu-icons",
              !!this.element.find(".ui-icon").length
            )
            .attr({ role: this.options.role, tabIndex: 0 }),
          this.options.disabled &&
            this.element
              .addClass("ui-state-disabled")
              .attr("aria-disabled", "true"),
          this._on({
            "mousedown .ui-menu-item": function(a) {
              a.preventDefault();
            },
            "click .ui-menu-item": function(b) {
              var a = J(b.target);
              !this.mouseHandled &&
                a.not(".ui-state-disabled").length &&
                (this.select(b),
                b.isPropagationStopped() || (this.mouseHandled = !0),
                a.has(".ui-menu").length
                  ? this.expand(b)
                  : !this.element.is(":focus") &&
                    J(this.document[0].activeElement).closest(".ui-menu")
                      .length &&
                    (this.element.trigger("focus", [!0]),
                    this.active &&
                      1 === this.active.parents(".ui-menu").length &&
                      clearTimeout(this.timer)));
            },
            "mouseenter .ui-menu-item": function(b) {
              if (!this.previousFilter) {
                var a = J(b.currentTarget);
                a.siblings(".ui-state-active").removeClass("ui-state-active"),
                  this.focus(b, a);
              }
            },
            mouseleave: "collapseAll",
            "mouseleave .ui-menu": "collapseAll",
            focus: function(c, b) {
              var a =
                this.active || this.element.find(this.options.items).eq(0);
              b || this.focus(c, a);
            },
            blur: function(a) {
              this._delay(function() {
                J.contains(this.element[0], this.document[0].activeElement) ||
                  this.collapseAll(a);
              });
            },
            keydown: "_keydown"
          }),
          this.refresh(),
          this._on(this.document, {
            click: function(a) {
              this._closeOnDocumentClick(a) && this.collapseAll(a),
                (this.mouseHandled = !1);
            }
          });
      },
      _destroy: function() {
        this.element
          .removeAttr("aria-activedescendant")
          .find(".ui-menu")
          .addBack()
          .removeClass(
            "ui-menu ui-widget ui-widget-content ui-menu-icons ui-front"
          )
          .removeAttr("role")
          .removeAttr("tabIndex")
          .removeAttr("aria-labelledby")
          .removeAttr("aria-expanded")
          .removeAttr("aria-hidden")
          .removeAttr("aria-disabled")
          .removeUniqueId()
          .show(),
          this.element
            .find(".ui-menu-item")
            .removeClass("ui-menu-item")
            .removeAttr("role")
            .removeAttr("aria-disabled")
            .removeUniqueId()
            .removeClass("ui-state-hover")
            .removeAttr("tabIndex")
            .removeAttr("role")
            .removeAttr("aria-haspopup")
            .children()
            .each(function() {
              var a = J(this);
              a.data("ui-menu-submenu-carat") && a.remove();
            }),
          this.element
            .find(".ui-menu-divider")
            .removeClass("ui-menu-divider ui-widget-content");
      },
      _keydown: function(d) {
        var c,
          e,
          g,
          b,
          f = !0;
        switch (d.keyCode) {
          case J.ui.keyCode.PAGE_UP:
            this.previousPage(d);
            break;
          case J.ui.keyCode.PAGE_DOWN:
            this.nextPage(d);
            break;
          case J.ui.keyCode.HOME:
            this._move("first", "first", d);
            break;
          case J.ui.keyCode.END:
            this._move("last", "last", d);
            break;
          case J.ui.keyCode.UP:
            this.previous(d);
            break;
          case J.ui.keyCode.DOWN:
            this.next(d);
            break;
          case J.ui.keyCode.LEFT:
            this.collapse(d);
            break;
          case J.ui.keyCode.RIGHT:
            this.active &&
              !this.active.is(".ui-state-disabled") &&
              this.expand(d);
            break;
          case J.ui.keyCode.ENTER:
          case J.ui.keyCode.SPACE:
            this._activate(d);
            break;
          case J.ui.keyCode.ESCAPE:
            this.collapse(d);
            break;
          default:
            (f = !1),
              (e = this.previousFilter || ""),
              (g = String.fromCharCode(d.keyCode)),
              (b = !1),
              clearTimeout(this.filterTimer),
              g === e ? (b = !0) : (g = e + g),
              (c = this._filterMenuItems(g)),
              (c =
                b && -1 !== c.index(this.active.next())
                  ? this.active.nextAll(".ui-menu-item")
                  : c),
              c.length ||
                ((g = String.fromCharCode(d.keyCode)),
                (c = this._filterMenuItems(g))),
              c.length
                ? (this.focus(d, c),
                  (this.previousFilter = g),
                  (this.filterTimer = this._delay(function() {
                    delete this.previousFilter;
                  }, 1000)))
                : delete this.previousFilter;
        }
        f && d.preventDefault();
      },
      _activate: function(a) {
        this.active.is(".ui-state-disabled") ||
          (this.active.is("[aria-haspopup='true']")
            ? this.expand(a)
            : this.select(a));
      },
      refresh: function() {
        var d,
          c,
          e = this,
          f = this.options.icons.submenu,
          b = this.element.find(this.options.menus);
        this.element.toggleClass(
          "ui-menu-icons",
          !!this.element.find(".ui-icon").length
        ),
          b
            .filter(":not(.ui-menu)")
            .addClass("ui-menu ui-widget ui-widget-content ui-front")
            .hide()
            .attr({
              role: this.options.role,
              "aria-hidden": "true",
              "aria-expanded": "false"
            })
            .each(function() {
              var g = J(this),
                a = g.parent(),
                h = J("<span>")
                  .addClass("ui-menu-icon ui-icon " + f)
                  .data("ui-menu-submenu-carat", !0);
              a.attr("aria-haspopup", "true").prepend(h),
                g.attr("aria-labelledby", a.attr("id"));
            }),
          (d = b.add(this.element)),
          (c = d.find(this.options.items)),
          c.not(".ui-menu-item").each(function() {
            var a = J(this);
            e._isDivider(a) && a.addClass("ui-widget-content ui-menu-divider");
          }),
          c
            .not(".ui-menu-item, .ui-menu-divider")
            .addClass("ui-menu-item")
            .uniqueId()
            .attr({ tabIndex: -1, role: this._itemRole() }),
          c.filter(".ui-state-disabled").attr("aria-disabled", "true"),
          this.active &&
            !J.contains(this.element[0], this.active[0]) &&
            this.blur();
      },
      _itemRole: function() {
        return { menu: "menuitem", listbox: "option" }[this.options.role];
      },
      _setOption: function(b, a) {
        "icons" === b &&
          this.element
            .find(".ui-menu-icon")
            .removeClass(this.options.icons.submenu)
            .addClass(a.submenu),
          "disabled" === b &&
            this.element
              .toggleClass("ui-state-disabled", !!a)
              .attr("aria-disabled", a),
          this._super(b, a);
      },
      focus: function(d, b) {
        var a, c;
        this.blur(d, d && "focus" === d.type),
          this._scrollIntoView(b),
          (this.active = b.first()),
          (c = this.active
            .addClass("ui-state-focus")
            .removeClass("ui-state-active")),
          this.options.role &&
            this.element.attr("aria-activedescendant", c.attr("id")),
          this.active
            .parent()
            .closest(".ui-menu-item")
            .addClass("ui-state-active"),
          d && "keydown" === d.type
            ? this._close()
            : (this.timer = this._delay(function() {
                this._close();
              }, this.delay)),
          (a = b.children(".ui-menu")),
          a.length && d && /^mouse/.test(d.type) && this._startOpening(a),
          (this.activeMenu = b.parent()),
          this._trigger("focus", d, { item: b });
      },
      _scrollIntoView: function(d) {
        var c, e, h, b, g, f;
        this._hasScroll() &&
          ((c = parseFloat(J.css(this.activeMenu[0], "borderTopWidth")) || 0),
          (e = parseFloat(J.css(this.activeMenu[0], "paddingTop")) || 0),
          (h = d.offset().top - this.activeMenu.offset().top - c - e),
          (b = this.activeMenu.scrollTop()),
          (g = this.activeMenu.height()),
          (f = d.outerHeight()),
          0 > h
            ? this.activeMenu.scrollTop(b + h)
            : h + f > g && this.activeMenu.scrollTop(b + h - g + f));
      },
      blur: function(b, a) {
        a || clearTimeout(this.timer),
          this.active &&
            (this.active.removeClass("ui-state-focus"),
            (this.active = null),
            this._trigger("blur", b, { item: this.active }));
      },
      _startOpening: function(a) {
        clearTimeout(this.timer),
          "true" === a.attr("aria-hidden") &&
            (this.timer = this._delay(function() {
              this._close(), this._open(a);
            }, this.delay));
      },
      _open: function(b) {
        var a = J.extend({ of: this.active }, this.options.position);
        clearTimeout(this.timer),
          this.element
            .find(".ui-menu")
            .not(b.parents(".ui-menu"))
            .hide()
            .attr("aria-hidden", "true"),
          b
            .show()
            .removeAttr("aria-hidden")
            .attr("aria-expanded", "true")
            .position(a);
      },
      collapseAll: function(b, a) {
        clearTimeout(this.timer),
          (this.timer = this._delay(function() {
            var c = a
              ? this.element
              : J(b && b.target).closest(this.element.find(".ui-menu"));
            c.length || (c = this.element),
              this._close(c),
              this.blur(b),
              (this.activeMenu = c);
          }, this.delay));
      },
      _close: function(a) {
        a || (a = this.active ? this.active.parent() : this.element),
          a
            .find(".ui-menu")
            .hide()
            .attr("aria-hidden", "true")
            .attr("aria-expanded", "false")
            .end()
            .find(".ui-state-active")
            .not(".ui-state-focus")
            .removeClass("ui-state-active");
      },
      _closeOnDocumentClick: function(a) {
        return !J(a.target).closest(".ui-menu").length;
      },
      _isDivider: function(a) {
        return !/[^\-\u2014\u2013\s]/.test(a.text());
      },
      collapse: function(b) {
        var a =
          this.active &&
          this.active.parent().closest(".ui-menu-item", this.element);
        a && a.length && (this._close(), this.focus(b, a));
      },
      expand: function(b) {
        var a =
          this.active &&
          this.active
            .children(".ui-menu ")
            .find(this.options.items)
            .first();
        a &&
          a.length &&
          (this._open(a.parent()),
          this._delay(function() {
            this.focus(b, a);
          }));
      },
      next: function(a) {
        this._move("next", "first", a);
      },
      previous: function(a) {
        this._move("prev", "last", a);
      },
      isFirstItem: function() {
        return this.active && !this.active.prevAll(".ui-menu-item").length;
      },
      isLastItem: function() {
        return this.active && !this.active.nextAll(".ui-menu-item").length;
      },
      _move: function(d, b, a) {
        var c;
        this.active &&
          (c =
            "first" === d || "last" === d
              ? this.active["first" === d ? "prevAll" : "nextAll"](
                  ".ui-menu-item"
                ).eq(-1)
              : this.active[d + "All"](".ui-menu-item").eq(0)),
          (c && c.length && this.active) ||
            (c = this.activeMenu.find(this.options.items)[b]()),
          this.focus(a, c);
      },
      nextPage: function(b) {
        var a, c, d;
        return this.active
          ? (this.isLastItem() ||
              (this._hasScroll()
                ? ((c = this.active.offset().top),
                  (d = this.element.height()),
                  this.active.nextAll(".ui-menu-item").each(function() {
                    return (a = J(this)), 0 > a.offset().top - c - d;
                  }),
                  this.focus(b, a))
                : this.focus(
                    b,
                    this.activeMenu
                      .find(this.options.items)
                      [this.active ? "last" : "first"]()
                  )),
            void 0)
          : (this.next(b), void 0);
      },
      previousPage: function(b) {
        var a, c, d;
        return this.active
          ? (this.isFirstItem() ||
              (this._hasScroll()
                ? ((c = this.active.offset().top),
                  (d = this.element.height()),
                  this.active.prevAll(".ui-menu-item").each(function() {
                    return (a = J(this)), a.offset().top - c + d > 0;
                  }),
                  this.focus(b, a))
                : this.focus(
                    b,
                    this.activeMenu.find(this.options.items).first()
                  )),
            void 0)
          : (this.next(b), void 0);
      },
      _hasScroll: function() {
        return this.element.outerHeight() < this.element.prop("scrollHeight");
      },
      select: function(b) {
        this.active = this.active || J(b.target).closest(".ui-menu-item");
        var a = { item: this.active };
        this.active.has(".ui-menu").length || this.collapseAll(b, !0),
          this._trigger("select", b, a);
      },
      _filterMenuItems: function(b) {
        var a = b.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
          c = RegExp("^" + a, "i");
        return this.activeMenu
          .find(this.options.items)
          .filter(".ui-menu-item")
          .filter(function() {
            return c.test(J.trim(J(this).text()));
          });
      }
    }),
    J.widget("ui.autocomplete", {
      version: "1.11.2",
      defaultElement: "<input>",
      options: {
        appendTo: null,
        autoFocus: !1,
        delay: 300,
        minLength: 1,
        position: { my: "left top", at: "left bottom", collision: "none" },
        source: null,
        change: null,
        close: null,
        focus: null,
        open: null,
        response: null,
        search: null,
        select: null
      },
      requestIndex: 0,
      pending: 0,
      _create: function() {
        var d,
          c,
          e,
          g = this.element[0].nodeName.toLowerCase(),
          b = "textarea" === g,
          f = "input" === g;
        (this.isMultiLine = b
          ? !0
          : f
            ? !1
            : this.element.prop("isContentEditable")),
          (this.valueMethod = this.element[b || f ? "val" : "text"]),
          (this.isNewMenu = !0),
          this.element
            .addClass("ui-autocomplete-input")
            .attr("autocomplete", "off"),
          this._on(this.element, {
            keydown: function(i) {
              if (this.element.prop("readOnly")) {
                return (d = !0), (e = !0), (c = !0), void 0;
              }
              (d = !1), (e = !1), (c = !1);
              var h = J.ui.keyCode;
              switch (i.keyCode) {
                case h.PAGE_UP:
                  (d = !0), this._move("previousPage", i);
                  break;
                case h.PAGE_DOWN:
                  (d = !0), this._move("nextPage", i);
                  break;
                case h.UP:
                  (d = !0), this._keyEvent("previous", i);
                  break;
                case h.DOWN:
                  (d = !0), this._keyEvent("next", i);
                  break;
                case h.ENTER:
                  this.menu.active &&
                    ((d = !0), i.preventDefault(), this.menu.select(i));
                  break;
                case h.TAB:
                  this.menu.active && this.menu.select(i);
                  break;
                case h.ESCAPE:
                  this.menu.element.is(":visible") &&
                    (this.isMultiLine || this._value(this.term),
                    this.close(i),
                    i.preventDefault());
                  break;
                default:
                  (c = !0), this._searchTimeout(i);
              }
            },
            keypress: function(a) {
              if (d) {
                return (
                  (d = !1),
                  (!this.isMultiLine || this.menu.element.is(":visible")) &&
                    a.preventDefault(),
                  void 0
                );
              }
              if (!c) {
                var h = J.ui.keyCode;
                switch (a.keyCode) {
                  case h.PAGE_UP:
                    this._move("previousPage", a);
                    break;
                  case h.PAGE_DOWN:
                    this._move("nextPage", a);
                    break;
                  case h.UP:
                    this._keyEvent("previous", a);
                    break;
                  case h.DOWN:
                    this._keyEvent("next", a);
                }
              }
            },
            input: function(a) {
              return e
                ? ((e = !1), a.preventDefault(), void 0)
                : (this._searchTimeout(a), void 0);
            },
            focus: function() {
              (this.selectedItem = null), (this.previous = this._value());
            },
            blur: function(a) {
              return this.cancelBlur
                ? (delete this.cancelBlur, void 0)
                : (clearTimeout(this.searching),
                  this.close(a),
                  this._change(a),
                  void 0);
            }
          }),
          this._initSource(),
          (this.menu = J("<ul>")
            .addClass("ui-autocomplete ui-front")
            .appendTo(this._appendTo())
            .menu({ role: null })
            .hide()
            .menu("instance")),
          this._on(this.menu.element, {
            mousedown: function(h) {
              h.preventDefault(),
                (this.cancelBlur = !0),
                this._delay(function() {
                  delete this.cancelBlur;
                });
              var a = this.menu.element[0];
              J(h.target).closest(".ui-menu-item").length ||
                this._delay(function() {
                  var i = this;
                  this.document.one("mousedown", function(l) {
                    l.target === i.element[0] ||
                      l.target === a ||
                      J.contains(a, l.target) ||
                      i.close();
                  });
                });
            },
            menufocus: function(h, a) {
              var l, m;
              return this.isNewMenu &&
                ((this.isNewMenu = !1),
                h.originalEvent && /^mouse/.test(h.originalEvent.type))
                ? (this.menu.blur(),
                  this.document.one("mousemove", function() {
                    J(h.target).trigger(h.originalEvent);
                  }),
                  void 0)
                : ((m = a.item.data("ui-autocomplete-item")),
                  !1 !== this._trigger("focus", h, { item: m }) &&
                    h.originalEvent &&
                    /^key/.test(h.originalEvent.type) &&
                    this._value(m.value),
                  (l = a.item.attr("aria-label") || m.value),
                  l &&
                    J.trim(l).length &&
                    (this.liveRegion.children().hide(),
                    J("<div>")
                      .text(l)
                      .appendTo(this.liveRegion)),
                  void 0);
            },
            menuselect: function(m, h) {
              var a = h.item.data("ui-autocomplete-item"),
                l = this.previous;
              this.element[0] !== this.document[0].activeElement &&
                (this.element.focus(),
                (this.previous = l),
                this._delay(function() {
                  (this.previous = l), (this.selectedItem = a);
                })),
                !1 !== this._trigger("select", m, { item: a }) &&
                  this._value(a.value),
                (this.term = this._value()),
                this.close(m),
                (this.selectedItem = a);
            }
          }),
          (this.liveRegion = J("<span>", {
            role: "status",
            "aria-live": "assertive",
            "aria-relevant": "additions"
          })
            .addClass("ui-helper-hidden-accessible")
            .appendTo(this.document[0].body)),
          this._on(this.window, {
            beforeunload: function() {
              this.element.removeAttr("autocomplete");
            }
          });
      },
      _destroy: function() {
        clearTimeout(this.searching),
          this.element
            .removeClass("ui-autocomplete-input")
            .removeAttr("autocomplete"),
          this.menu.element.remove(),
          this.liveRegion.remove();
      },
      _setOption: function(b, a) {
        this._super(b, a),
          "source" === b && this._initSource(),
          "appendTo" === b && this.menu.element.appendTo(this._appendTo()),
          "disabled" === b && a && this.xhr && this.xhr.abort();
      },
      _appendTo: function() {
        var a = this.options.appendTo;
        return (
          a &&
            (a = a.jquery || a.nodeType ? J(a) : this.document.find(a).eq(0)),
          (a && a[0]) || (a = this.element.closest(".ui-front")),
          a.length || (a = this.document[0].body),
          a
        );
      },
      _initSource: function() {
        var b,
          a,
          c = this;
        J.isArray(this.options.source)
          ? ((b = this.options.source),
            (this.source = function(d, e) {
              e(J.ui.autocomplete.filter(b, d.term));
            }))
          : "string" == typeof this.options.source
            ? ((a = this.options.source),
              (this.source = function(d, e) {
                c.xhr && c.xhr.abort(),
                  (c.xhr = J.ajax({
                    url: a,
                    data: d,
                    dataType: "json",
                    success: function(f) {
                      e(f);
                    },
                    error: function() {
                      e([]);
                    }
                  }));
              }))
            : (this.source = this.options.source);
      },
      _searchTimeout: function(a) {
        clearTimeout(this.searching),
          (this.searching = this._delay(function() {
            var c = this.term === this._value(),
              b = this.menu.element.is(":visible"),
              d = a.altKey || a.ctrlKey || a.metaKey || a.shiftKey;
            (!c || (c && !b && !d)) &&
              ((this.selectedItem = null), this.search(null, a));
          }, this.options.delay));
      },
      search: function(b, a) {
        return (
          (b = null != b ? b : this._value()),
          (this.term = this._value()),
          b.length < this.options.minLength
            ? this.close(a)
            : this._trigger("search", a) !== !1
              ? this._search(b)
              : void 0
        );
      },
      _search: function(a) {
        this.pending++,
          this.element.addClass("ui-autocomplete-loading"),
          (this.cancelSearch = !1),
          this.source({ term: a }, this._response());
      },
      _response: function() {
        var a = ++this.requestIndex;
        return J.proxy(function(b) {
          a === this.requestIndex && this.__response(b),
            this.pending--,
            this.pending || this.element.removeClass("ui-autocomplete-loading");
        }, this);
      },
      __response: function(a) {
        a && (a = this._normalize(a)),
          this._trigger("response", null, { content: a }),
          !this.options.disabled && a && a.length && !this.cancelSearch
            ? (this._suggest(a), this._trigger("open"))
            : this._close();
      },
      close: function(a) {
        (this.cancelSearch = !0), this._close(a);
      },
      _close: function(a) {
        this.menu.element.is(":visible") &&
          (this.menu.element.hide(),
          this.menu.blur(),
          (this.isNewMenu = !0),
          this._trigger("close", a));
      },
      _change: function(a) {
        this.previous !== this._value() &&
          this._trigger("change", a, { item: this.selectedItem });
      },
      _normalize: function(a) {
        return a.length && a[0].label && a[0].value
          ? a
          : J.map(a, function(b) {
              return "string" == typeof b
                ? { label: b, value: b }
                : J.extend({}, b, {
                    label: b.label || b.value,
                    value: b.value || b.label
                  });
            });
      },
      _suggest: function(b) {
        var a = this.menu.element.empty();
        this._renderMenu(a, b),
          (this.isNewMenu = !0),
          this.menu.refresh(),
          a.show(),
          this._resizeMenu(),
          a.position(J.extend({ of: this.element }, this.options.position)),
          this.options.autoFocus && this.menu.next();
      },
      _resizeMenu: function() {
        var a = this.menu.element;
        a.outerWidth(
          Math.max(a.width("").outerWidth() + 1, this.element.outerWidth())
        );
      },
      _renderMenu: function(b, a) {
        var c = this;
        J.each(a, function(f, d) {
          c._renderItemData(b, d);
        });
      },
      _renderItemData: function(b, a) {
        return this._renderItem(b, a).data("ui-autocomplete-item", a);
      },
      _renderItem: function(b, a) {
        return J("<li>")
          .text(a.label)
          .appendTo(b);
      },
      _move: function(b, a) {
        return this.menu.element.is(":visible")
          ? (this.menu.isFirstItem() && /^previous/.test(b)) ||
            (this.menu.isLastItem() && /^next/.test(b))
            ? (this.isMultiLine || this._value(this.term),
              this.menu.blur(),
              void 0)
            : (this.menu[b](a), void 0)
          : (this.search(null, a), void 0);
      },
      widget: function() {
        return this.menu.element;
      },
      _value: function() {
        return this.valueMethod.apply(this.element, arguments);
      },
      _keyEvent: function(b, a) {
        (!this.isMultiLine || this.menu.element.is(":visible")) &&
          (this._move(b, a), a.preventDefault());
      }
    }),
    J.extend(J.ui.autocomplete, {
      escapeRegex: function(a) {
        return a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
      },
      filter: function(b, a) {
        var c = RegExp(J.ui.autocomplete.escapeRegex(a), "i");
        return J.grep(b, function(d) {
          return c.test(d.label || d.value || d);
        });
      }
    }),
    J.widget("ui.autocomplete", J.ui.autocomplete, {
      options: {
        messages: {
          noResults: "No search results.",
          results: function(a) {
            return (
              a +
              (a > 1 ? " results are" : " result is") +
              " available, use up and down arrow keys to navigate."
            );
          }
        }
      },
      __response: function(b) {
        var a;
        this._superApply(arguments),
          this.options.disabled ||
            this.cancelSearch ||
            ((a =
              b && b.length
                ? this.options.messages.results(b.length)
                : this.options.messages.noResults),
            this.liveRegion.children().hide(),
            J("<div>")
              .text(a)
              .appendTo(this.liveRegion));
      }
    }),
    J.ui.autocomplete;
  var L,
    A = "ui-button ui-widget ui-state-default ui-corner-all",
    I =
      "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
    D = function() {
      var a = J(this);
      setTimeout(function() {
        a.find(":ui-button").button("refresh");
      }, 1);
    },
    H = function(b) {
      var a = b.name,
        c = b.form,
        d = J([]);
      return (
        a &&
          ((a = a.replace(/'/g, "\\'")),
          (d = c
            ? J(c).find("[name='" + a + "'][type=radio]")
            : J("[name='" + a + "'][type=radio]", b.ownerDocument).filter(
                function() {
                  return !this.form;
                }
              ))),
        d
      );
    };
  J.widget("ui.button", {
    version: "1.11.2",
    defaultElement: "<button>",
    options: {
      disabled: null,
      text: !0,
      label: null,
      icons: { primary: null, secondary: null }
    },
    _create: function() {
      this.element
        .closest("form")
        .unbind("reset" + this.eventNamespace)
        .bind("reset" + this.eventNamespace, D),
        "boolean" != typeof this.options.disabled
          ? (this.options.disabled = !!this.element.prop("disabled"))
          : this.element.prop("disabled", this.options.disabled),
        this._determineButtonType(),
        (this.hasTitle = !!this.buttonElement.attr("title"));
      var b = this,
        a = this.options,
        c = "checkbox" === this.type || "radio" === this.type,
        d = c ? "" : "ui-state-active";
      null === a.label &&
        (a.label =
          "input" === this.type
            ? this.buttonElement.val()
            : this.buttonElement.html()),
        this._hoverable(this.buttonElement),
        this.buttonElement
          .addClass(A)
          .attr("role", "button")
          .bind("mouseenter" + this.eventNamespace, function() {
            a.disabled || (this === L && J(this).addClass("ui-state-active"));
          })
          .bind("mouseleave" + this.eventNamespace, function() {
            a.disabled || J(this).removeClass(d);
          })
          .bind("click" + this.eventNamespace, function(f) {
            a.disabled && (f.preventDefault(), f.stopImmediatePropagation());
          }),
        this._on({
          focus: function() {
            this.buttonElement.addClass("ui-state-focus");
          },
          blur: function() {
            this.buttonElement.removeClass("ui-state-focus");
          }
        }),
        c &&
          this.element.bind("change" + this.eventNamespace, function() {
            b.refresh();
          }),
        "checkbox" === this.type
          ? this.buttonElement.bind("click" + this.eventNamespace, function() {
              return a.disabled ? !1 : void 0;
            })
          : "radio" === this.type
            ? this.buttonElement.bind(
                "click" + this.eventNamespace,
                function() {
                  if (a.disabled) {
                    return !1;
                  }
                  J(this).addClass("ui-state-active"),
                    b.buttonElement.attr("aria-pressed", "true");
                  var e = b.element[0];
                  H(e)
                    .not(e)
                    .map(function() {
                      return J(this).button("widget")[0];
                    })
                    .removeClass("ui-state-active")
                    .attr("aria-pressed", "false");
                }
              )
            : (this.buttonElement
                .bind("mousedown" + this.eventNamespace, function() {
                  return a.disabled
                    ? !1
                    : (J(this).addClass("ui-state-active"),
                      (L = this),
                      b.document.one("mouseup", function() {
                        L = null;
                      }),
                      void 0);
                })
                .bind("mouseup" + this.eventNamespace, function() {
                  return a.disabled
                    ? !1
                    : (J(this).removeClass("ui-state-active"), void 0);
                })
                .bind("keydown" + this.eventNamespace, function(e) {
                  return a.disabled
                    ? !1
                    : ((e.keyCode === J.ui.keyCode.SPACE ||
                        e.keyCode === J.ui.keyCode.ENTER) &&
                        J(this).addClass("ui-state-active"),
                      void 0);
                })
                .bind(
                  "keyup" + this.eventNamespace + " blur" + this.eventNamespace,
                  function() {
                    J(this).removeClass("ui-state-active");
                  }
                ),
              this.buttonElement.is("a") &&
                this.buttonElement.keyup(function(e) {
                  e.keyCode === J.ui.keyCode.SPACE && J(this).click();
                })),
        this._setOption("disabled", a.disabled),
        this._resetButton();
    },
    _determineButtonType: function() {
      var c, b, a;
      (this.type = this.element.is("[type=checkbox]")
        ? "checkbox"
        : this.element.is("[type=radio]")
          ? "radio"
          : this.element.is("input")
            ? "input"
            : "button"),
        "checkbox" === this.type || "radio" === this.type
          ? ((c = this.element.parents().last()),
            (b = "label[for='" + this.element.attr("id") + "']"),
            (this.buttonElement = c.find(b)),
            this.buttonElement.length ||
              ((c = c.length ? c.siblings() : this.element.siblings()),
              (this.buttonElement = c.filter(b)),
              this.buttonElement.length || (this.buttonElement = c.find(b))),
            this.element.addClass("ui-helper-hidden-accessible"),
            (a = this.element.is(":checked")),
            a && this.buttonElement.addClass("ui-state-active"),
            this.buttonElement.prop("aria-pressed", a))
          : (this.buttonElement = this.element);
    },
    widget: function() {
      return this.buttonElement;
    },
    _destroy: function() {
      this.element.removeClass("ui-helper-hidden-accessible"),
        this.buttonElement
          .removeClass(A + " ui-state-active " + I)
          .removeAttr("role")
          .removeAttr("aria-pressed")
          .html(this.buttonElement.find(".ui-button-text").html()),
        this.hasTitle || this.buttonElement.removeAttr("title");
    },
    _setOption: function(b, a) {
      return (
        this._super(b, a),
        "disabled" === b
          ? (this.widget().toggleClass("ui-state-disabled", !!a),
            this.element.prop("disabled", !!a),
            a &&
              ("checkbox" === this.type || "radio" === this.type
                ? this.buttonElement.removeClass("ui-state-focus")
                : this.buttonElement.removeClass(
                    "ui-state-focus ui-state-active"
                  )),
            void 0)
          : (this._resetButton(), void 0)
      );
    },
    refresh: function() {
      var a = this.element.is("input, button")
        ? this.element.is(":disabled")
        : this.element.hasClass("ui-button-disabled");
      a !== this.options.disabled && this._setOption("disabled", a),
        "radio" === this.type
          ? H(this.element[0]).each(function() {
              J(this).is(":checked")
                ? J(this)
                    .button("widget")
                    .addClass("ui-state-active")
                    .attr("aria-pressed", "true")
                : J(this)
                    .button("widget")
                    .removeClass("ui-state-active")
                    .attr("aria-pressed", "false");
            })
          : "checkbox" === this.type &&
            (this.element.is(":checked")
              ? this.buttonElement
                  .addClass("ui-state-active")
                  .attr("aria-pressed", "true")
              : this.buttonElement
                  .removeClass("ui-state-active")
                  .attr("aria-pressed", "false"));
    },
    _resetButton: function() {
      if ("input" === this.type) {
        return (
          this.options.label && this.element.val(this.options.label), void 0
        );
      }
      var d = this.buttonElement.removeClass(I),
        c = J("<span></span>", this.document[0])
          .addClass("ui-button-text")
          .html(this.options.label)
          .appendTo(d.empty())
          .text(),
        e = this.options.icons,
        f = e.primary && e.secondary,
        b = [];
      e.primary || e.secondary
        ? (this.options.text &&
            b.push(
              "ui-button-text-icon" +
                (f ? "s" : e.primary ? "-primary" : "-secondary")
            ),
          e.primary &&
            d.prepend(
              "<span class='ui-button-icon-primary ui-icon " +
                e.primary +
                "'></span>"
            ),
          e.secondary &&
            d.append(
              "<span class='ui-button-icon-secondary ui-icon " +
                e.secondary +
                "'></span>"
            ),
          this.options.text ||
            (b.push(f ? "ui-button-icons-only" : "ui-button-icon-only"),
            this.hasTitle || d.attr("title", J.trim(c))))
        : b.push("ui-button-text-only"),
        d.addClass(b.join(" "));
    }
  }),
    J.widget("ui.buttonset", {
      version: "1.11.2",
      options: {
        items:
          "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"
      },
      _create: function() {
        this.element.addClass("ui-buttonset");
      },
      _init: function() {
        this.refresh();
      },
      _setOption: function(b, a) {
        "disabled" === b && this.buttons.button("option", b, a),
          this._super(b, a);
      },
      refresh: function() {
        var b = "rtl" === this.element.css("direction"),
          a = this.element.find(this.options.items),
          c = a.filter(":ui-button");
        a.not(":ui-button").button(),
          c.button("refresh"),
          (this.buttons = a
            .map(function() {
              return J(this).button("widget")[0];
            })
            .removeClass("ui-corner-all ui-corner-left ui-corner-right")
            .filter(":first")
            .addClass(b ? "ui-corner-right" : "ui-corner-left")
            .end()
            .filter(":last")
            .addClass(b ? "ui-corner-left" : "ui-corner-right")
            .end()
            .end());
      },
      _destroy: function() {
        this.element.removeClass("ui-buttonset"),
          this.buttons
            .map(function() {
              return J(this).button("widget")[0];
            })
            .removeClass("ui-corner-left ui-corner-right")
            .end()
            .button("destroy");
      }
    }),
    J.ui.button,
    J.extend(J.ui, { datepicker: { version: "1.11.2" } });
  var k;
  J.extend(C.prototype, {
    markerClassName: "hasDatepicker",
    maxRows: 4,
    _widgetDatepicker: function() {
      return this.dpDiv;
    },
    setDefaults: function(a) {
      return z(this._defaults, a || {}), this;
    },
    _attachDatepicker: function(d, c) {
      var e, f, b;
      (e = d.nodeName.toLowerCase()),
        (f = "div" === e || "span" === e),
        d.id || ((this.uuid += 1), (d.id = "dp" + this.uuid)),
        (b = this._newInst(J(d), f)),
        (b.settings = J.extend({}, c || {})),
        "input" === e
          ? this._connectDatepicker(d, b)
          : f && this._inlineDatepicker(d, b);
    },
    _newInst: function(b, a) {
      var c = b[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
      return {
        id: c,
        input: b,
        selectedDay: 0,
        selectedMonth: 0,
        selectedYear: 0,
        drawMonth: 0,
        drawYear: 0,
        inline: a,
        dpDiv: a
          ? N(
              J(
                "<div class='" +
                  this._inlineClass +
                  " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"
              )
            )
          : this.dpDiv
      };
    },
    _connectDatepicker: function(b, a) {
      var c = J(b);
      (a.append = J([])),
        (a.trigger = J([])),
        c.hasClass(this.markerClassName) ||
          (this._attachments(c, a),
          c
            .addClass(this.markerClassName)
            .keydown(this._doKeyDown)
            .keypress(this._doKeyPress)
            .keyup(this._doKeyUp),
          this._autoSize(a),
          J.data(b, "datepicker", a),
          a.settings.disabled && this._disableDatepicker(b));
    },
    _attachments: function(d, c) {
      var e,
        h,
        b,
        g = this._get(c, "appendText"),
        f = this._get(c, "isRTL");
      c.append && c.append.remove(),
        g &&
          ((c.append = J(
            "<span class='" + this._appendClass + "'>" + g + "</span>"
          )),
          d[f ? "before" : "after"](c.append)),
        d.unbind("focus", this._showDatepicker),
        c.trigger && c.trigger.remove(),
        (e = this._get(c, "showOn")),
        ("focus" === e || "both" === e) && d.focus(this._showDatepicker),
        ("button" === e || "both" === e) &&
          ((h = this._get(c, "buttonText")),
          (b = this._get(c, "buttonImage")),
          (c.trigger = J(
            this._get(c, "buttonImageOnly")
              ? J("<img/>")
                  .addClass(this._triggerClass)
                  .attr({ src: b, alt: h, title: h })
              : J("<button type='button'></button>")
                  .addClass(this._triggerClass)
                  .html(b ? J("<img/>").attr({ src: b, alt: h, title: h }) : h)
          )),
          d[f ? "before" : "after"](c.trigger),
          c.trigger.click(function() {
            return (
              J.datepicker._datepickerShowing &&
              J.datepicker._lastInput === d[0]
                ? J.datepicker._hideDatepicker()
                : J.datepicker._datepickerShowing &&
                  J.datepicker._lastInput !== d[0]
                  ? (J.datepicker._hideDatepicker(),
                    J.datepicker._showDatepicker(d[0]))
                  : J.datepicker._showDatepicker(d[0]),
              !1
            );
          }));
    },
    _autoSize: function(g) {
      if (this._get(g, "autoSize") && !g.inline) {
        var d,
          c,
          f,
          l,
          b = new Date(2009, 11, 20),
          h = this._get(g, "dateFormat");
        h.match(/[DM]/) &&
          ((d = function(a) {
            for (c = 0, f = 0, l = 0; a.length > l; l++) {
              a[l].length > c && ((c = a[l].length), (f = l));
            }
            return f;
          }),
          b.setMonth(
            d(this._get(g, h.match(/MM/) ? "monthNames" : "monthNamesShort"))
          ),
          b.setDate(
            d(this._get(g, h.match(/DD/) ? "dayNames" : "dayNamesShort")) +
              20 -
              b.getDay()
          )),
          g.input.attr("size", this._formatDate(g, b).length);
      }
    },
    _inlineDatepicker: function(b, a) {
      var c = J(b);
      c.hasClass(this.markerClassName) ||
        (c.addClass(this.markerClassName).append(a.dpDiv),
        J.data(b, "datepicker", a),
        this._setDate(a, this._getDefaultDate(a), !0),
        this._updateDatepicker(a),
        this._updateAlternate(a),
        a.settings.disabled && this._disableDatepicker(b),
        a.dpDiv.css("display", "block"));
    },
    _dialogDatepicker: function(O, g, P, e, v) {
      var b,
        m,
        f,
        y,
        p,
        r = this._dialogInst;
      return (
        r ||
          ((this.uuid += 1),
          (b = "dp" + this.uuid),
          (this._dialogInput = J(
            "<input type='text' id='" +
              b +
              "' style='position: absolute; top: -100px; width: 0px;'/>"
          )),
          this._dialogInput.keydown(this._doKeyDown),
          J("body").append(this._dialogInput),
          (r = this._dialogInst = this._newInst(this._dialogInput, !1)),
          (r.settings = {}),
          J.data(this._dialogInput[0], "datepicker", r)),
        z(r.settings, e || {}),
        (g = g && g.constructor === Date ? this._formatDate(r, g) : g),
        this._dialogInput.val(g),
        (this._pos = v ? (v.length ? v : [v.pageX, v.pageY]) : null),
        this._pos ||
          ((m = document.documentElement.clientWidth),
          (f = document.documentElement.clientHeight),
          (y = document.documentElement.scrollLeft || document.body.scrollLeft),
          (p = document.documentElement.scrollTop || document.body.scrollTop),
          (this._pos = [m / 2 - 100 + y, f / 2 - 150 + p])),
        this._dialogInput
          .css("left", this._pos[0] + 20 + "px")
          .css("top", this._pos[1] + "px"),
        (r.settings.onSelect = P),
        (this._inDialog = !0),
        this.dpDiv.addClass(this._dialogClass),
        this._showDatepicker(this._dialogInput[0]),
        J.blockUI && J.blockUI(this.dpDiv),
        J.data(this._dialogInput[0], "datepicker", r),
        this
      );
    },
    _destroyDatepicker: function(b) {
      var a,
        c = J(b),
        d = J.data(b, "datepicker");
      c.hasClass(this.markerClassName) &&
        ((a = b.nodeName.toLowerCase()),
        J.removeData(b, "datepicker"),
        "input" === a
          ? (d.append.remove(),
            d.trigger.remove(),
            c
              .removeClass(this.markerClassName)
              .unbind("focus", this._showDatepicker)
              .unbind("keydown", this._doKeyDown)
              .unbind("keypress", this._doKeyPress)
              .unbind("keyup", this._doKeyUp))
          : ("div" === a || "span" === a) &&
            c.removeClass(this.markerClassName).empty());
    },
    _enableDatepicker: function(d) {
      var c,
        e,
        f = J(d),
        b = J.data(d, "datepicker");
      f.hasClass(this.markerClassName) &&
        ((c = d.nodeName.toLowerCase()),
        "input" === c
          ? ((d.disabled = !1),
            b.trigger
              .filter("button")
              .each(function() {
                this.disabled = !1;
              })
              .end()
              .filter("img")
              .css({ opacity: "1.0", cursor: "" }))
          : ("div" === c || "span" === c) &&
            ((e = f.children("." + this._inlineClass)),
            e.children().removeClass("ui-state-disabled"),
            e
              .find("select.ui-datepicker-month, select.ui-datepicker-year")
              .prop("disabled", !1)),
        (this._disabledInputs = J.map(this._disabledInputs, function(a) {
          return a === d ? null : a;
        })));
    },
    _disableDatepicker: function(d) {
      var c,
        e,
        f = J(d),
        b = J.data(d, "datepicker");
      f.hasClass(this.markerClassName) &&
        ((c = d.nodeName.toLowerCase()),
        "input" === c
          ? ((d.disabled = !0),
            b.trigger
              .filter("button")
              .each(function() {
                this.disabled = !0;
              })
              .end()
              .filter("img")
              .css({ opacity: "0.5", cursor: "default" }))
          : ("div" === c || "span" === c) &&
            ((e = f.children("." + this._inlineClass)),
            e.children().addClass("ui-state-disabled"),
            e
              .find("select.ui-datepicker-month, select.ui-datepicker-year")
              .prop("disabled", !0)),
        (this._disabledInputs = J.map(this._disabledInputs, function(a) {
          return a === d ? null : a;
        })),
        (this._disabledInputs[this._disabledInputs.length] = d));
    },
    _isDisabledDatepicker: function(b) {
      if (!b) {
        return !1;
      }
      for (var a = 0; this._disabledInputs.length > a; a++) {
        if (this._disabledInputs[a] === b) {
          return !0;
        }
      }
      return !1;
    },
    _getInst: function(b) {
      try {
        return J.data(b, "datepicker");
      } catch (a) {
        throw "Missing instance data for this datepicker";
      }
    },
    _optionDatepicker: function(e, d, g) {
      var p,
        c,
        m,
        f,
        b = this._getInst(e);
      return 2 === arguments.length && "string" == typeof d
        ? "defaults" === d
          ? J.extend({}, J.datepicker._defaults)
          : b
            ? "all" === d
              ? J.extend({}, b.settings)
              : this._get(b, d)
            : null
        : ((p = d || {}),
          "string" == typeof d && ((p = {}), (p[d] = g)),
          b &&
            (this._curInst === b && this._hideDatepicker(),
            (c = this._getDateDatepicker(e, !0)),
            (m = this._getMinMaxDate(b, "min")),
            (f = this._getMinMaxDate(b, "max")),
            z(b.settings, p),
            null !== m &&
              void 0 !== p.dateFormat &&
              void 0 === p.minDate &&
              (b.settings.minDate = this._formatDate(b, m)),
            null !== f &&
              void 0 !== p.dateFormat &&
              void 0 === p.maxDate &&
              (b.settings.maxDate = this._formatDate(b, f)),
            "disabled" in p &&
              (p.disabled
                ? this._disableDatepicker(e)
                : this._enableDatepicker(e)),
            this._attachments(J(e), b),
            this._autoSize(b),
            this._setDate(b, c),
            this._updateAlternate(b),
            this._updateDatepicker(b)),
          void 0);
    },
    _changeDatepicker: function(c, b, a) {
      this._optionDatepicker(c, b, a);
    },
    _refreshDatepicker: function(b) {
      var a = this._getInst(b);
      a && this._updateDatepicker(a);
    },
    _setDateDatepicker: function(c, b) {
      var a = this._getInst(c);
      a &&
        (this._setDate(a, b),
        this._updateDatepicker(a),
        this._updateAlternate(a));
    },
    _getDateDatepicker: function(c, b) {
      var a = this._getInst(c);
      return (
        a && !a.inline && this._setDateFromField(a, b),
        a ? this._getDate(a) : null
      );
    },
    _doKeyDown: function(d) {
      var c,
        e,
        h,
        b = J.datepicker._getInst(d.target),
        g = !0,
        f = b.dpDiv.is(".ui-datepicker-rtl");
      if (((b._keyEvent = !0), J.datepicker._datepickerShowing)) {
        switch (d.keyCode) {
          case 9:
            J.datepicker._hideDatepicker(), (g = !1);
            break;
          case 13:
            return (
              (h = J(
                "td." +
                  J.datepicker._dayOverClass +
                  ":not(." +
                  J.datepicker._currentClass +
                  ")",
                b.dpDiv
              )),
              h[0] &&
                J.datepicker._selectDay(
                  d.target,
                  b.selectedMonth,
                  b.selectedYear,
                  h[0]
                ),
              (c = J.datepicker._get(b, "onSelect")),
              c
                ? ((e = J.datepicker._formatDate(b)),
                  c.apply(b.input ? b.input[0] : null, [e, b]))
                : J.datepicker._hideDatepicker(),
              !1
            );
          case 27:
            J.datepicker._hideDatepicker();
            break;
          case 33:
            J.datepicker._adjustDate(
              d.target,
              d.ctrlKey
                ? -J.datepicker._get(b, "stepBigMonths")
                : -J.datepicker._get(b, "stepMonths"),
              "M"
            );
            break;
          case 34:
            J.datepicker._adjustDate(
              d.target,
              d.ctrlKey
                ? +J.datepicker._get(b, "stepBigMonths")
                : +J.datepicker._get(b, "stepMonths"),
              "M"
            );
            break;
          case 35:
            (d.ctrlKey || d.metaKey) && J.datepicker._clearDate(d.target),
              (g = d.ctrlKey || d.metaKey);
            break;
          case 36:
            (d.ctrlKey || d.metaKey) && J.datepicker._gotoToday(d.target),
              (g = d.ctrlKey || d.metaKey);
            break;
          case 37:
            (d.ctrlKey || d.metaKey) &&
              J.datepicker._adjustDate(d.target, f ? 1 : -1, "D"),
              (g = d.ctrlKey || d.metaKey),
              d.originalEvent.altKey &&
                J.datepicker._adjustDate(
                  d.target,
                  d.ctrlKey
                    ? -J.datepicker._get(b, "stepBigMonths")
                    : -J.datepicker._get(b, "stepMonths"),
                  "M"
                );
            break;
          case 38:
            (d.ctrlKey || d.metaKey) &&
              J.datepicker._adjustDate(d.target, -7, "D"),
              (g = d.ctrlKey || d.metaKey);
            break;
          case 39:
            (d.ctrlKey || d.metaKey) &&
              J.datepicker._adjustDate(d.target, f ? -1 : 1, "D"),
              (g = d.ctrlKey || d.metaKey),
              d.originalEvent.altKey &&
                J.datepicker._adjustDate(
                  d.target,
                  d.ctrlKey
                    ? +J.datepicker._get(b, "stepBigMonths")
                    : +J.datepicker._get(b, "stepMonths"),
                  "M"
                );
            break;
          case 40:
            (d.ctrlKey || d.metaKey) &&
              J.datepicker._adjustDate(d.target, 7, "D"),
              (g = d.ctrlKey || d.metaKey);
            break;
          default:
            g = !1;
        }
      } else {
        36 === d.keyCode && d.ctrlKey
          ? J.datepicker._showDatepicker(this)
          : (g = !1);
      }
      g && (d.preventDefault(), d.stopPropagation());
    },
    _doKeyPress: function(b) {
      var a,
        c,
        d = J.datepicker._getInst(b.target);
      return J.datepicker._get(d, "constrainInput")
        ? ((a = J.datepicker._possibleChars(
            J.datepicker._get(d, "dateFormat")
          )),
          (c = String.fromCharCode(
            null == b.charCode ? b.keyCode : b.charCode
          )),
          b.ctrlKey || b.metaKey || " " > c || !a || a.indexOf(c) > -1)
        : void 0;
    },
    _doKeyUp: function(b) {
      var a,
        c = J.datepicker._getInst(b.target);
      if (c.input.val() !== c.lastVal) {
        try {
          (a = J.datepicker.parseDate(
            J.datepicker._get(c, "dateFormat"),
            c.input ? c.input.val() : null,
            J.datepicker._getFormatConfig(c)
          )),
            a &&
              (J.datepicker._setDateFromField(c),
              J.datepicker._updateAlternate(c),
              J.datepicker._updateDatepicker(c));
        } catch (d) {}
      }
      return !0;
    },
    _showDatepicker: function(f) {
      if (
        ((f = f.target || f),
        "input" !== f.nodeName.toLowerCase() &&
          (f = J("input", f.parentNode)[0]),
        !J.datepicker._isDisabledDatepicker(f) && J.datepicker._lastInput !== f)
      ) {
        var e, p, c, m, g, b, d;
        (e = J.datepicker._getInst(f)),
          J.datepicker._curInst &&
            J.datepicker._curInst !== e &&
            (J.datepicker._curInst.dpDiv.stop(!0, !0),
            e &&
              J.datepicker._datepickerShowing &&
              J.datepicker._hideDatepicker(J.datepicker._curInst.input[0])),
          (p = J.datepicker._get(e, "beforeShow")),
          (c = p ? p.apply(f, [f, e]) : {}),
          c !== !1 &&
            (z(e.settings, c),
            (e.lastVal = null),
            (J.datepicker._lastInput = f),
            J.datepicker._setDateFromField(e),
            J.datepicker._inDialog && (f.value = ""),
            J.datepicker._pos ||
              ((J.datepicker._pos = J.datepicker._findPos(f)),
              (J.datepicker._pos[1] += f.offsetHeight)),
            (m = !1),
            J(f)
              .parents()
              .each(function() {
                return (m |= "fixed" === J(this).css("position")), !m;
              }),
            (g = { left: J.datepicker._pos[0], top: J.datepicker._pos[1] }),
            (J.datepicker._pos = null),
            e.dpDiv.empty(),
            e.dpDiv.css({
              position: "absolute",
              display: "block",
              top: "-1000px"
            }),
            J.datepicker._updateDatepicker(e),
            (g = J.datepicker._checkOffset(e, g, m)),
            e.dpDiv.css({
              position:
                J.datepicker._inDialog && J.blockUI
                  ? "static"
                  : m
                    ? "fixed"
                    : "absolute",
              display: "none",
              left: g.left + "px",
              top: g.top + "px"
            }),
            e.inline ||
              ((b = J.datepicker._get(e, "showAnim")),
              (d = J.datepicker._get(e, "duration")),
              e.dpDiv.css("z-index", x(J(f)) + 1),
              (J.datepicker._datepickerShowing = !0),
              J.effects && J.effects.effect[b]
                ? e.dpDiv.show(b, J.datepicker._get(e, "showOptions"), d)
                : e.dpDiv[b || "show"](b ? d : null),
              J.datepicker._shouldFocusInput(e) && e.input.focus(),
              (J.datepicker._curInst = e)));
      }
    },
    _updateDatepicker: function(d) {
      (this.maxRows = 4),
        (k = d),
        d.dpDiv.empty().append(this._generateHTML(d)),
        this._attachHandlers(d);
      var c,
        e = this._getNumberOfMonths(d),
        g = e[1],
        b = 17,
        f = d.dpDiv.find("." + this._dayOverClass + " a");
      f.length > 0 && B.apply(f.get(0)),
        d.dpDiv
          .removeClass(
            "ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4"
          )
          .width(""),
        g > 1 &&
          d.dpDiv
            .addClass("ui-datepicker-multi-" + g)
            .css("width", b * g + "em"),
        d.dpDiv[(1 !== e[0] || 1 !== e[1] ? "add" : "remove") + "Class"](
          "ui-datepicker-multi"
        ),
        d.dpDiv[(this._get(d, "isRTL") ? "add" : "remove") + "Class"](
          "ui-datepicker-rtl"
        ),
        d === J.datepicker._curInst &&
          J.datepicker._datepickerShowing &&
          J.datepicker._shouldFocusInput(d) &&
          d.input.focus(),
        d.yearshtml &&
          ((c = d.yearshtml),
          setTimeout(function() {
            c === d.yearshtml &&
              d.yearshtml &&
              d.dpDiv
                .find("select.ui-datepicker-year:first")
                .replaceWith(d.yearshtml),
              (c = d.yearshtml = null);
          }, 0));
    },
    _shouldFocusInput: function(a) {
      return (
        a.input &&
        a.input.is(":visible") &&
        !a.input.is(":disabled") &&
        !a.input.is(":focus")
      );
    },
    _checkOffset: function(p, f, u) {
      var d = p.dpDiv.outerWidth(),
        m = p.dpDiv.outerHeight(),
        c = p.input ? p.input.outerWidth() : 0,
        b = p.input ? p.input.outerHeight() : 0,
        g =
          document.documentElement.clientWidth +
          (u ? 0 : J(document).scrollLeft()),
        e =
          document.documentElement.clientHeight +
          (u ? 0 : J(document).scrollTop());
      return (
        (f.left -= this._get(p, "isRTL") ? d - c : 0),
        (f.left -=
          u && f.left === p.input.offset().left ? J(document).scrollLeft() : 0),
        (f.top -=
          u && f.top === p.input.offset().top + b
            ? J(document).scrollTop()
            : 0),
        (f.left -= Math.min(
          f.left,
          f.left + d > g && g > d ? Math.abs(f.left + d - g) : 0
        )),
        (f.top -= Math.min(
          f.top,
          f.top + m > e && e > m ? Math.abs(m + b) : 0
        )),
        f
      );
    },
    _findPos: function(b) {
      for (
        var a, c = this._getInst(b), d = this._get(c, "isRTL");
        b &&
        ("hidden" === b.type || 1 !== b.nodeType || J.expr.filters.hidden(b));

      ) {
        b = b[d ? "previousSibling" : "nextSibling"];
      }
      return (a = J(b).offset()), [a.left, a.top];
    },
    _hideDatepicker: function(d) {
      var c,
        e,
        g,
        b,
        f = this._curInst;
      !f ||
        (d && f !== J.data(d, "datepicker")) ||
        (this._datepickerShowing &&
          ((c = this._get(f, "showAnim")),
          (e = this._get(f, "duration")),
          (g = function() {
            J.datepicker._tidyDialog(f);
          }),
          J.effects && (J.effects.effect[c] || J.effects[c])
            ? f.dpDiv.hide(c, J.datepicker._get(f, "showOptions"), e, g)
            : f.dpDiv[
                "slideDown" === c
                  ? "slideUp"
                  : "fadeIn" === c
                    ? "fadeOut"
                    : "hide"
              ](c ? e : null, g),
          c || g(),
          (this._datepickerShowing = !1),
          (b = this._get(f, "onClose")),
          b &&
            b.apply(f.input ? f.input[0] : null, [
              f.input ? f.input.val() : "",
              f
            ]),
          (this._lastInput = null),
          this._inDialog &&
            (this._dialogInput.css({
              position: "absolute",
              left: "0",
              top: "-100px"
            }),
            J.blockUI && (J.unblockUI(), J("body").append(this.dpDiv))),
          (this._inDialog = !1)));
    },
    _tidyDialog: function(a) {
      a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar");
    },
    _checkExternalClick: function(b) {
      if (J.datepicker._curInst) {
        var a = J(b.target),
          c = J.datepicker._getInst(a[0]);
        ((a[0].id !== J.datepicker._mainDivId &&
          0 === a.parents("#" + J.datepicker._mainDivId).length &&
          !a.hasClass(J.datepicker.markerClassName) &&
          !a.closest("." + J.datepicker._triggerClass).length &&
          J.datepicker._datepickerShowing &&
          (!J.datepicker._inDialog || !J.blockUI)) ||
          (a.hasClass(J.datepicker.markerClassName) &&
            J.datepicker._curInst !== c)) &&
          J.datepicker._hideDatepicker();
      }
    },
    _adjustDate: function(d, c, e) {
      var f = J(d),
        b = this._getInst(f[0]);
      this._isDisabledDatepicker(f[0]) ||
        (this._adjustInstDate(
          b,
          c + ("M" === e ? this._get(b, "showCurrentAtPos") : 0),
          e
        ),
        this._updateDatepicker(b));
    },
    _gotoToday: function(b) {
      var a,
        c = J(b),
        d = this._getInst(c[0]);
      this._get(d, "gotoCurrent") && d.currentDay
        ? ((d.selectedDay = d.currentDay),
          (d.drawMonth = d.selectedMonth = d.currentMonth),
          (d.drawYear = d.selectedYear = d.currentYear))
        : ((a = new Date()),
          (d.selectedDay = a.getDate()),
          (d.drawMonth = d.selectedMonth = a.getMonth()),
          (d.drawYear = d.selectedYear = a.getFullYear())),
        this._notifyChange(d),
        this._adjustDate(c);
    },
    _selectMonthYear: function(d, c, e) {
      var f = J(d),
        b = this._getInst(f[0]);
      (b["selected" + ("M" === e ? "Month" : "Year")] = b[
        "draw" + ("M" === e ? "Month" : "Year")
      ] = parseInt(c.options[c.selectedIndex].value, 10)),
        this._notifyChange(b),
        this._adjustDate(f);
    },
    _selectDay: function(d, c, e, g) {
      var b,
        f = J(d);
      J(g).hasClass(this._unselectableClass) ||
        this._isDisabledDatepicker(f[0]) ||
        ((b = this._getInst(f[0])),
        (b.selectedDay = b.currentDay = J("a", g).html()),
        (b.selectedMonth = b.currentMonth = c),
        (b.selectedYear = b.currentYear = e),
        this._selectDate(
          d,
          this._formatDate(b, b.currentDay, b.currentMonth, b.currentYear)
        ));
    },
    _clearDate: function(b) {
      var a = J(b);
      this._selectDate(a, "");
    },
    _selectDate: function(d, c) {
      var e,
        f = J(d),
        b = this._getInst(f[0]);
      (c = null != c ? c : this._formatDate(b)),
        b.input && b.input.val(c),
        this._updateAlternate(b),
        (e = this._get(b, "onSelect")),
        e
          ? e.apply(b.input ? b.input[0] : null, [c, b])
          : b.input && b.input.trigger("change"),
        b.inline
          ? this._updateDatepicker(b)
          : (this._hideDatepicker(),
            (this._lastInput = b.input[0]),
            "object" != typeof b.input[0] && b.input.focus(),
            (this._lastInput = null));
    },
    _updateAlternate: function(d) {
      var c,
        e,
        f,
        b = this._get(d, "altField");
      b &&
        ((c = this._get(d, "altFormat") || this._get(d, "dateFormat")),
        (e = this._getDate(d)),
        (f = this.formatDate(c, e, this._getFormatConfig(d))),
        J(b).each(function() {
          J(this).val(f);
        }));
    },
    noWeekends: function(b) {
      var a = b.getDay();
      return [a > 0 && 6 > a, ""];
    },
    iso8601Week: function(c) {
      var b,
        a = new Date(c.getTime());
      return (
        a.setDate(a.getDate() + 4 - (a.getDay() || 7)),
        (b = a.getTime()),
        a.setMonth(0),
        a.setDate(1),
        Math.floor(Math.round((b - a) / 86400000) / 7) + 1
      );
    },
    parseDate: function(S, ab, T) {
      if (null == S || null == ab) {
        throw "Invalid arguments";
      }
      if (((ab = "object" == typeof ab ? "" + ab : ab + ""), "" === ab)) {
        return null;
      }
      var X,
        ai,
        W,
        U,
        ac = 0,
        Z = (T ? T.shortYearCutoff : null) || this._defaults.shortYearCutoff,
        R =
          "string" != typeof Z
            ? Z
            : new Date().getFullYear() % 100 + parseInt(Z, 10),
        af = (T ? T.dayNamesShort : null) || this._defaults.dayNamesShort,
        ag = (T ? T.dayNames : null) || this._defaults.dayNames,
        V = (T ? T.monthNamesShort : null) || this._defaults.monthNamesShort,
        ae = (T ? T.monthNames : null) || this._defaults.monthNames,
        Y = -1,
        ad = -1,
        Q = -1,
        e = -1,
        ah = !1,
        aj = function(b) {
          var a = S.length > X + 1 && S.charAt(X + 1) === b;
          return a && X++, a;
        },
        O = function(f) {
          var c = aj(f),
            d =
              "@" === f
                ? 14
                : "!" === f
                  ? 20
                  : "y" === f && c
                    ? 4
                    : "o" === f
                      ? 3
                      : 2,
            h = "y" === f ? d : 1,
            b = RegExp("^\\d{" + h + "," + d + "}"),
            g = ab.substring(ac).match(b);
          if (!g) {
            throw "Missing number at position " + ac;
          }
          return (ac += g[0].length), parseInt(g[0], 10);
        },
        P = function(c, d, g) {
          var b = -1,
            f = J.map(aj(c) ? g : d, function(h, a) {
              return [[a, h]];
            }).sort(function(h, a) {
              return -(h[1].length - a[1].length);
            });
          if (
            (J.each(f, function(i, a) {
              var h = a[1];
              return ab.substr(ac, h.length).toLowerCase() === h.toLowerCase()
                ? ((b = a[0]), (ac += h.length), !1)
                : void 0;
            }),
            -1 !== b)
          ) {
            return b + 1;
          }
          throw "Unknown name at position " + ac;
        },
        aa = function() {
          if (ab.charAt(ac) !== S.charAt(X)) {
            throw "Unexpected literal at position " + ac;
          }
          ac++;
        };
      for (X = 0; S.length > X; X++) {
        if (ah) {
          "'" !== S.charAt(X) || aj("'") ? aa() : (ah = !1);
        } else {
          switch (S.charAt(X)) {
            case "d":
              Q = O("d");
              break;
            case "D":
              P("D", af, ag);
              break;
            case "o":
              e = O("o");
              break;
            case "m":
              ad = O("m");
              break;
            case "M":
              ad = P("M", V, ae);
              break;
            case "y":
              Y = O("y");
              break;
            case "@":
              (U = new Date(O("@"))),
                (Y = U.getFullYear()),
                (ad = U.getMonth() + 1),
                (Q = U.getDate());
              break;
            case "!":
              (U = new Date((O("!") - this._ticksTo1970) / 10000)),
                (Y = U.getFullYear()),
                (ad = U.getMonth() + 1),
                (Q = U.getDate());
              break;
            case "'":
              aj("'") ? aa() : (ah = !0);
              break;
            default:
              aa();
          }
        }
      }
      if (ab.length > ac && ((W = ab.substr(ac)), !/^\s+/.test(W))) {
        throw "Extra/unparsed characters found in date: " + W;
      }
      if (
        (-1 === Y
          ? (Y = new Date().getFullYear())
          : 100 > Y &&
            (Y +=
              new Date().getFullYear() -
              new Date().getFullYear() % 100 +
              (R >= Y ? 0 : -100)),
        e > -1)
      ) {
        for (ad = 1, Q = e; ; ) {
          if (((ai = this._getDaysInMonth(Y, ad - 1)), ai >= Q)) {
            break;
          }
          ad++, (Q -= ai);
        }
      }
      if (
        ((U = this._daylightSavingAdjust(new Date(Y, ad - 1, Q))),
        U.getFullYear() !== Y || U.getMonth() + 1 !== ad || U.getDate() !== Q)
      ) {
        throw "Invalid date";
      }
      return U;
    },
    ATOM: "yy-mm-dd",
    COOKIE: "D, dd M yy",
    ISO_8601: "yy-mm-dd",
    RFC_822: "D, d M y",
    RFC_850: "DD, dd-M-y",
    RFC_1036: "D, d M y",
    RFC_1123: "D, d M yy",
    RFC_2822: "D, d M yy",
    RSS: "D, d M y",
    TICKS: "!",
    TIMESTAMP: "@",
    W3C: "yy-mm-dd",
    _ticksTo1970:
      10000000 *
      60 *
      60 *
      24 *
      (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
    formatDate: function(y, S, p) {
      if (!S) {
        return "";
      }
      var T,
        g = (p ? p.dayNamesShort : null) || this._defaults.dayNamesShort,
        Q = (p ? p.dayNames : null) || this._defaults.dayNames,
        f = (p ? p.monthNamesShort : null) || this._defaults.monthNamesShort,
        b = (p ? p.monthNames : null) || this._defaults.monthNames,
        v = function(c) {
          var a = y.length > T + 1 && y.charAt(T + 1) === c;
          return a && T++, a;
        },
        m = function(h, c, a) {
          var d = "" + c;
          if (v(h)) {
            for (; a > d.length; ) {
              d = "0" + d;
            }
          }
          return d;
        },
        R = function(h, c, a, d) {
          return v(h) ? d[c] : a[c];
        },
        O = "",
        P = !1;
      if (S) {
        for (T = 0; y.length > T; T++) {
          if (P) {
            "'" !== y.charAt(T) || v("'") ? (O += y.charAt(T)) : (P = !1);
          } else {
            switch (y.charAt(T)) {
              case "d":
                O += m("d", S.getDate(), 2);
                break;
              case "D":
                O += R("D", S.getDay(), g, Q);
                break;
              case "o":
                O += m(
                  "o",
                  Math.round(
                    (new Date(
                      S.getFullYear(),
                      S.getMonth(),
                      S.getDate()
                    ).getTime() -
                      new Date(S.getFullYear(), 0, 0).getTime()) /
                      86400000
                  ),
                  3
                );
                break;
              case "m":
                O += m("m", S.getMonth() + 1, 2);
                break;
              case "M":
                O += R("M", S.getMonth(), f, b);
                break;
              case "y":
                O += v("y")
                  ? S.getFullYear()
                  : (10 > S.getYear() % 100 ? "0" : "") + S.getYear() % 100;
                break;
              case "@":
                O += S.getTime();
                break;
              case "!":
                O += 10000 * S.getTime() + this._ticksTo1970;
                break;
              case "'":
                v("'") ? (O += "'") : (P = !0);
                break;
              default:
                O += y.charAt(T);
            }
          }
        }
      }
      return O;
    },
    _possibleChars: function(d) {
      var b,
        a = "",
        c = !1,
        f = function(e) {
          var g = d.length > b + 1 && d.charAt(b + 1) === e;
          return g && b++, g;
        };
      for (b = 0; d.length > b; b++) {
        if (c) {
          "'" !== d.charAt(b) || f("'") ? (a += d.charAt(b)) : (c = !1);
        } else {
          switch (d.charAt(b)) {
            case "d":
            case "m":
            case "y":
            case "@":
              a += "0123456789";
              break;
            case "D":
            case "M":
              return null;
            case "'":
              f("'") ? (a += "'") : (c = !0);
              break;
            default:
              a += d.charAt(b);
          }
        }
      }
      return a;
    },
    _get: function(b, a) {
      return void 0 !== b.settings[a] ? b.settings[a] : this._defaults[a];
    },
    _setDateFromField: function(h, d) {
      if (h.input.val() !== h.lastVal) {
        var c = this._get(h, "dateFormat"),
          f = (h.lastVal = h.input ? h.input.val() : null),
          m = this._getDefaultDate(h),
          b = m,
          l = this._getFormatConfig(h);
        try {
          b = this.parseDate(c, f, l) || m;
        } catch (g) {
          f = d ? "" : f;
        }
        (h.selectedDay = b.getDate()),
          (h.drawMonth = h.selectedMonth = b.getMonth()),
          (h.drawYear = h.selectedYear = b.getFullYear()),
          (h.currentDay = f ? b.getDate() : 0),
          (h.currentMonth = f ? b.getMonth() : 0),
          (h.currentYear = f ? b.getFullYear() : 0),
          this._adjustInstDate(h);
      }
    },
    _getDefaultDate: function(a) {
      return this._restrictMinMax(
        a,
        this._determineDate(a, this._get(a, "defaultDate"), new Date())
      );
    },
    _determineDate: function(d, c, e) {
      var g = function(h) {
          var a = new Date();
          return a.setDate(a.getDate() + h), a;
        },
        b = function(t) {
          try {
            return J.datepicker.parseDate(
              J.datepicker._get(d, "dateFormat"),
              t,
              J.datepicker._getFormatConfig(d)
            );
          } catch (v) {}
          for (
            var P =
                (t.toLowerCase().match(/^c/)
                  ? J.datepicker._getDate(d)
                  : null) || new Date(),
              p = P.getFullYear(),
              O = P.getMonth(),
              y = P.getDate(),
              u = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
              m = u.exec(t);
            m;

          ) {
            switch (m[2] || "d") {
              case "d":
              case "D":
                y += parseInt(m[1], 10);
                break;
              case "w":
              case "W":
                y += 7 * parseInt(m[1], 10);
                break;
              case "m":
              case "M":
                (O += parseInt(m[1], 10)),
                  (y = Math.min(y, J.datepicker._getDaysInMonth(p, O)));
                break;
              case "y":
              case "Y":
                (p += parseInt(m[1], 10)),
                  (y = Math.min(y, J.datepicker._getDaysInMonth(p, O)));
            }
            m = u.exec(t);
          }
          return new Date(p, O, y);
        },
        f =
          null == c || "" === c
            ? e
            : "string" == typeof c
              ? b(c)
              : "number" == typeof c
                ? isNaN(c)
                  ? e
                  : g(c)
                : new Date(c.getTime());
      return (
        (f = f && "Invalid Date" == "" + f ? e : f),
        f &&
          (f.setHours(0),
          f.setMinutes(0),
          f.setSeconds(0),
          f.setMilliseconds(0)),
        this._daylightSavingAdjust(f)
      );
    },
    _daylightSavingAdjust: function(a) {
      return a
        ? (a.setHours(a.getHours() > 12 ? a.getHours() + 2 : 0), a)
        : null;
    },
    _setDate: function(g, d, c) {
      var f = !d,
        l = g.selectedMonth,
        b = g.selectedYear,
        h = this._restrictMinMax(g, this._determineDate(g, d, new Date()));
      (g.selectedDay = g.currentDay = h.getDate()),
        (g.drawMonth = g.selectedMonth = g.currentMonth = h.getMonth()),
        (g.drawYear = g.selectedYear = g.currentYear = h.getFullYear()),
        (l === g.selectedMonth && b === g.selectedYear) ||
          c ||
          this._notifyChange(g),
        this._adjustInstDate(g),
        g.input && g.input.val(f ? "" : this._formatDate(g));
    },
    _getDate: function(b) {
      var a =
        !b.currentYear || (b.input && "" === b.input.val())
          ? null
          : this._daylightSavingAdjust(
              new Date(b.currentYear, b.currentMonth, b.currentDay)
            );
      return a;
    },
    _attachHandlers: function(b) {
      var a = this._get(b, "stepMonths"),
        c = "#" + b.id.replace(/\\\\/g, "\\");
      b.dpDiv.find("[data-handler]").map(function() {
        var d = {
          prev: function() {
            J.datepicker._adjustDate(c, -a, "M");
          },
          next: function() {
            J.datepicker._adjustDate(c, +a, "M");
          },
          hide: function() {
            J.datepicker._hideDatepicker();
          },
          today: function() {
            J.datepicker._gotoToday(c);
          },
          selectDay: function() {
            return (
              J.datepicker._selectDay(
                c,
                +this.getAttribute("data-month"),
                +this.getAttribute("data-year"),
                this
              ),
              !1
            );
          },
          selectMonth: function() {
            return J.datepicker._selectMonthYear(c, this, "M"), !1;
          },
          selectYear: function() {
            return J.datepicker._selectMonthYear(c, this, "Y"), !1;
          }
        };
        J(this).bind(
          this.getAttribute("data-event"),
          d[this.getAttribute("data-handler")]
        );
      });
    },
    _generateHTML: function(aY) {
      var aI,
        aU,
        aJ,
        aP,
        a2,
        aO,
        aK,
        aV,
        aR,
        aH,
        aZ,
        a0,
        aN,
        aX,
        aQ,
        aW,
        aG,
        aD,
        a1,
        a3,
        aE,
        aF,
        aS,
        ag,
        ax,
        ah,
        an,
        ay,
        am,
        aA,
        ak,
        ar,
        aC,
        at,
        av,
        aw,
        al,
        aT,
        ad,
        ao = new Date(),
        ai = this._daylightSavingAdjust(
          new Date(ao.getFullYear(), ao.getMonth(), ao.getDate())
        ),
        ab = this._get(aY, "isRTL"),
        az = this._get(aY, "showButtonPanel"),
        aq = this._get(aY, "hideIfNoPrevNext"),
        aL = this._get(aY, "navigationAsDateFormat"),
        ap = this._getNumberOfMonths(aY),
        ae = this._get(aY, "showCurrentAtPos"),
        af = this._get(aY, "stepMonths"),
        aj = 1 !== ap[0] || 1 !== ap[1],
        au = this._daylightSavingAdjust(
          aY.currentDay
            ? new Date(aY.currentYear, aY.currentMonth, aY.currentDay)
            : new Date(9999, 9, 9)
        ),
        ac = this._getMinMaxDate(aY, "min"),
        aB = this._getMinMaxDate(aY, "max"),
        aa = aY.drawMonth - ae,
        aM = aY.drawYear;
      if ((0 > aa && ((aa += 12), aM--), aB)) {
        for (
          aI = this._daylightSavingAdjust(
            new Date(
              aB.getFullYear(),
              aB.getMonth() - ap[0] * ap[1] + 1,
              aB.getDate()
            )
          ),
            aI = ac && ac > aI ? ac : aI;
          this._daylightSavingAdjust(new Date(aM, aa, 1)) > aI;

        ) {
          aa--, 0 > aa && ((aa = 11), aM--);
        }
      }
      for (
        aY.drawMonth = aa,
          aY.drawYear = aM,
          aU = this._get(aY, "prevText"),
          aU = aL
            ? this.formatDate(
                aU,
                this._daylightSavingAdjust(new Date(aM, aa - af, 1)),
                this._getFormatConfig(aY)
              )
            : aU,
          aJ = this._canAdjustMonth(aY, -1, aM, aa)
            ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" +
              aU +
              "'><span class='ui-icon ui-icon-circle-triangle-" +
              (ab ? "e" : "w") +
              "'>" +
              aU +
              "</span></a>"
            : aq
              ? ""
              : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" +
                aU +
                "'><span class='ui-icon ui-icon-circle-triangle-" +
                (ab ? "e" : "w") +
                "'>" +
                aU +
                "</span></a>",
          aP = this._get(aY, "nextText"),
          aP = aL
            ? this.formatDate(
                aP,
                this._daylightSavingAdjust(new Date(aM, aa + af, 1)),
                this._getFormatConfig(aY)
              )
            : aP,
          a2 = this._canAdjustMonth(aY, 1, aM, aa)
            ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" +
              aP +
              "'><span class='ui-icon ui-icon-circle-triangle-" +
              (ab ? "w" : "e") +
              "'>" +
              aP +
              "</span></a>"
            : aq
              ? ""
              : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" +
                aP +
                "'><span class='ui-icon ui-icon-circle-triangle-" +
                (ab ? "w" : "e") +
                "'>" +
                aP +
                "</span></a>",
          aO = this._get(aY, "currentText"),
          aK = this._get(aY, "gotoCurrent") && aY.currentDay ? au : ai,
          aO = aL ? this.formatDate(aO, aK, this._getFormatConfig(aY)) : aO,
          aV = aY.inline
            ? ""
            : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" +
              this._get(aY, "closeText") +
              "</button>",
          aR = az
            ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" +
              (ab ? aV : "") +
              (this._isInRange(aY, aK)
                ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" +
                  aO +
                  "</button>"
                : "") +
              (ab ? "" : aV) +
              "</div>"
            : "",
          aH = parseInt(this._get(aY, "firstDay"), 10),
          aH = isNaN(aH) ? 0 : aH,
          aZ = this._get(aY, "showWeek"),
          a0 = this._get(aY, "dayNames"),
          aN = this._get(aY, "dayNamesMin"),
          aX = this._get(aY, "monthNames"),
          aQ = this._get(aY, "monthNamesShort"),
          aW = this._get(aY, "beforeShowDay"),
          aG = this._get(aY, "showOtherMonths"),
          aD = this._get(aY, "selectOtherMonths"),
          a1 = this._getDefaultDate(aY),
          a3 = "",
          aF = 0;
        ap[0] > aF;
        aF++
      ) {
        for (aS = "", this.maxRows = 4, ag = 0; ap[1] > ag; ag++) {
          if (
            ((ax = this._daylightSavingAdjust(
              new Date(aM, aa, aY.selectedDay)
            )),
            (ah = " ui-corner-all"),
            (an = ""),
            aj)
          ) {
            if (((an += "<div class='ui-datepicker-group"), ap[1] > 1)) {
              switch (ag) {
                case 0:
                  (an += " ui-datepicker-group-first"),
                    (ah = " ui-corner-" + (ab ? "right" : "left"));
                  break;
                case ap[1] - 1:
                  (an += " ui-datepicker-group-last"),
                    (ah = " ui-corner-" + (ab ? "left" : "right"));
                  break;
                default:
                  (an += " ui-datepicker-group-middle"), (ah = "");
              }
            }
            an += "'>";
          }
          for (
            an +=
              "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" +
              ah +
              "'>" +
              (/all|left/.test(ah) && 0 === aF ? (ab ? a2 : aJ) : "") +
              (/all|right/.test(ah) && 0 === aF ? (ab ? aJ : a2) : "") +
              this._generateMonthYearHeader(
                aY,
                aa,
                aM,
                ac,
                aB,
                aF > 0 || ag > 0,
                aX,
                aQ
              ) +
              "</div><table class='ui-datepicker-calendar'><thead><tr>",
              ay = aZ
                ? "<th class='ui-datepicker-week-col'>" +
                  this._get(aY, "weekHeader") +
                  "</th>"
                : "",
              aE = 0;
            7 > aE;
            aE++
          ) {
            (am = (aE + aH) % 7),
              (ay +=
                "<th scope='col'" +
                ((aE + aH + 6) % 7 >= 5
                  ? " class='ui-datepicker-week-end'"
                  : "") +
                "><span title='" +
                a0[am] +
                "'>" +
                aN[am] +
                "</span></th>");
          }
          for (
            an += ay + "</tr></thead><tbody>",
              aA = this._getDaysInMonth(aM, aa),
              aM === aY.selectedYear &&
                aa === aY.selectedMonth &&
                (aY.selectedDay = Math.min(aY.selectedDay, aA)),
              ak = (this._getFirstDayOfMonth(aM, aa) - aH + 7) % 7,
              ar = Math.ceil((ak + aA) / 7),
              aC = aj ? (this.maxRows > ar ? this.maxRows : ar) : ar,
              this.maxRows = aC,
              at = this._daylightSavingAdjust(new Date(aM, aa, 1 - ak)),
              av = 0;
            aC > av;
            av++
          ) {
            for (
              an += "<tr>",
                aw = aZ
                  ? "<td class='ui-datepicker-week-col'>" +
                    this._get(aY, "calculateWeek")(at) +
                    "</td>"
                  : "",
                aE = 0;
              7 > aE;
              aE++
            ) {
              (al = aW
                ? aW.apply(aY.input ? aY.input[0] : null, [at])
                : [!0, ""]),
                (aT = at.getMonth() !== aa),
                (ad =
                  (aT && !aD) || !al[0] || (ac && ac > at) || (aB && at > aB)),
                (aw +=
                  "<td class='" +
                  ((aE + aH + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") +
                  (aT ? " ui-datepicker-other-month" : "") +
                  ((at.getTime() === ax.getTime() &&
                    aa === aY.selectedMonth &&
                    aY._keyEvent) ||
                  (a1.getTime() === at.getTime() &&
                    a1.getTime() === ax.getTime())
                    ? " " + this._dayOverClass
                    : "") +
                  (ad
                    ? " " + this._unselectableClass + " ui-state-disabled"
                    : "") +
                  (aT && !aG
                    ? ""
                    : " " +
                      al[1] +
                      (at.getTime() === au.getTime()
                        ? " " + this._currentClass
                        : "") +
                      (at.getTime() === ai.getTime()
                        ? " ui-datepicker-today"
                        : "")) +
                  "'" +
                  ((aT && !aG) || !al[2]
                    ? ""
                    : " title='" + al[2].replace(/'/g, "&#39;") + "'") +
                  (ad
                    ? ""
                    : " data-handler='selectDay' data-event='click' data-month='" +
                      at.getMonth() +
                      "' data-year='" +
                      at.getFullYear() +
                      "'") +
                  ">" +
                  (aT && !aG
                    ? "&#xa0;"
                    : ad
                      ? "<span class='ui-state-default'>" +
                        at.getDate() +
                        "</span>"
                      : "<a class='ui-state-default" +
                        (at.getTime() === ai.getTime()
                          ? " ui-state-highlight"
                          : "") +
                        (at.getTime() === au.getTime()
                          ? " ui-state-active"
                          : "") +
                        (aT ? " ui-priority-secondary" : "") +
                        "' href='#'>" +
                        at.getDate() +
                        "</a>") +
                  "</td>"),
                at.setDate(at.getDate() + 1),
                (at = this._daylightSavingAdjust(at));
            }
            an += aw + "</tr>";
          }
          aa++,
            aa > 11 && ((aa = 0), aM++),
            (an +=
              "</tbody></table>" +
              (aj
                ? "</div>" +
                  (ap[0] > 0 && ag === ap[1] - 1
                    ? "<div class='ui-datepicker-row-break'></div>"
                    : "")
                : "")),
            (aS += an);
        }
        a3 += aS;
      }
      return (a3 += aR), (aY._keyEvent = !1), a3;
    },
    _generateMonthYearHeader: function(ad, R, Z, S, W, ah, V, T) {
      var aa,
        Y,
        Q,
        ae,
        af,
        U,
        ac,
        X,
        ab = this._get(ad, "changeMonth"),
        P = this._get(ad, "changeYear"),
        O = this._get(ad, "showMonthAfterYear"),
        ag = "<div class='ui-datepicker-title'>",
        ai = "";
      if (ah || !ab) {
        ai += "<span class='ui-datepicker-month'>" + V[R] + "</span>";
      } else {
        for (
          aa = S && S.getFullYear() === Z,
            Y = W && W.getFullYear() === Z,
            ai +=
              "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>",
            Q = 0;
          12 > Q;
          Q++
        ) {
          (!aa || Q >= S.getMonth()) &&
            (!Y || W.getMonth() >= Q) &&
            (ai +=
              "<option value='" +
              Q +
              "'" +
              (Q === R ? " selected='selected'" : "") +
              ">" +
              T[Q] +
              "</option>");
        }
        ai += "</select>";
      }
      if ((O || (ag += ai + (!ah && ab && P ? "" : "&#xa0;")), !ad.yearshtml)) {
        if (((ad.yearshtml = ""), ah || !P)) {
          ag += "<span class='ui-datepicker-year'>" + Z + "</span>";
        } else {
          for (
            ae = this._get(ad, "yearRange").split(":"),
              af = new Date().getFullYear(),
              U = function(b) {
                var a = b.match(/c[+\-].*/)
                  ? Z + parseInt(b.substring(1), 10)
                  : b.match(/[+\-].*/)
                    ? af + parseInt(b, 10)
                    : parseInt(b, 10);
                return isNaN(a) ? af : a;
              },
              ac = U(ae[0]),
              X = Math.max(ac, U(ae[1] || "")),
              ac = S ? Math.max(ac, S.getFullYear()) : ac,
              X = W ? Math.min(X, W.getFullYear()) : X,
              ad.yearshtml +=
                "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";
            X >= ac;
            ac++
          ) {
            ad.yearshtml +=
              "<option value='" +
              ac +
              "'" +
              (ac === Z ? " selected='selected'" : "") +
              ">" +
              ac +
              "</option>";
          }
          (ad.yearshtml += "</select>"),
            (ag += ad.yearshtml),
            (ad.yearshtml = null);
        }
      }
      return (
        (ag += this._get(ad, "yearSuffix")),
        O && (ag += (!ah && ab && P ? "" : "&#xa0;") + ai),
        (ag += "</div>")
      );
    },
    _adjustInstDate: function(g, d, c) {
      var f = g.drawYear + ("Y" === c ? d : 0),
        l = g.drawMonth + ("M" === c ? d : 0),
        b =
          Math.min(g.selectedDay, this._getDaysInMonth(f, l)) +
          ("D" === c ? d : 0),
        h = this._restrictMinMax(
          g,
          this._daylightSavingAdjust(new Date(f, l, b))
        );
      (g.selectedDay = h.getDate()),
        (g.drawMonth = g.selectedMonth = h.getMonth()),
        (g.drawYear = g.selectedYear = h.getFullYear()),
        ("M" === c || "Y" === c) && this._notifyChange(g);
    },
    _restrictMinMax: function(d, b) {
      var a = this._getMinMaxDate(d, "min"),
        c = this._getMinMaxDate(d, "max"),
        f = a && a > b ? a : b;
      return c && f > c ? c : f;
    },
    _notifyChange: function(b) {
      var a = this._get(b, "onChangeMonthYear");
      a &&
        a.apply(b.input ? b.input[0] : null, [
          b.selectedYear,
          b.selectedMonth + 1,
          b
        ]);
    },
    _getNumberOfMonths: function(b) {
      var a = this._get(b, "numberOfMonths");
      return null == a ? [1, 1] : "number" == typeof a ? [1, a] : a;
    },
    _getMinMaxDate: function(b, a) {
      return this._determineDate(b, this._get(b, a + "Date"), null);
    },
    _getDaysInMonth: function(b, a) {
      return 32 - this._daylightSavingAdjust(new Date(b, a, 32)).getDate();
    },
    _getFirstDayOfMonth: function(b, a) {
      return new Date(b, a, 1).getDay();
    },
    _canAdjustMonth: function(g, d, c, f) {
      var h = this._getNumberOfMonths(g),
        b = this._daylightSavingAdjust(
          new Date(c, f + (0 > d ? d : h[0] * h[1]), 1)
        );
      return (
        0 > d && b.setDate(this._getDaysInMonth(b.getFullYear(), b.getMonth())),
        this._isInRange(g, b)
      );
    },
    _isInRange: function(l, p) {
      var f,
        u,
        d = this._getMinMaxDate(l, "min"),
        m = this._getMinMaxDate(l, "max"),
        c = null,
        b = null,
        g = this._get(l, "yearRange");
      return (
        g &&
          ((f = g.split(":")),
          (u = new Date().getFullYear()),
          (c = parseInt(f[0], 10)),
          (b = parseInt(f[1], 10)),
          f[0].match(/[+\-].*/) && (c += u),
          f[1].match(/[+\-].*/) && (b += u)),
        (!d || p.getTime() >= d.getTime()) &&
          (!m || p.getTime() <= m.getTime()) &&
          (!c || p.getFullYear() >= c) &&
          (!b || b >= p.getFullYear())
      );
    },
    _getFormatConfig: function(b) {
      var a = this._get(b, "shortYearCutoff");
      return (
        (a =
          "string" != typeof a
            ? a
            : new Date().getFullYear() % 100 + parseInt(a, 10)),
        {
          shortYearCutoff: a,
          dayNamesShort: this._get(b, "dayNamesShort"),
          dayNames: this._get(b, "dayNames"),
          monthNamesShort: this._get(b, "monthNamesShort"),
          monthNames: this._get(b, "monthNames")
        }
      );
    },
    _formatDate: function(d, b, a, c) {
      b ||
        ((d.currentDay = d.selectedDay),
        (d.currentMonth = d.selectedMonth),
        (d.currentYear = d.selectedYear));
      var f = b
        ? "object" == typeof b
          ? b
          : this._daylightSavingAdjust(new Date(c, a, b))
        : this._daylightSavingAdjust(
            new Date(d.currentYear, d.currentMonth, d.currentDay)
          );
      return this.formatDate(
        this._get(d, "dateFormat"),
        f,
        this._getFormatConfig(d)
      );
    }
  }),
    (J.fn.datepicker = function(b) {
      if (!this.length) {
        return this;
      }
      J.datepicker.initialized ||
        (J(document).mousedown(J.datepicker._checkExternalClick),
        (J.datepicker.initialized = !0)),
        0 === J("#" + J.datepicker._mainDivId).length &&
          J("body").append(J.datepicker.dpDiv);
      var a = Array.prototype.slice.call(arguments, 1);
      return "string" != typeof b ||
        ("isDisabled" !== b && "getDate" !== b && "widget" !== b)
        ? "option" === b &&
          2 === arguments.length &&
          "string" == typeof arguments[1]
          ? J.datepicker["_" + b + "Datepicker"].apply(
              J.datepicker,
              [this[0]].concat(a)
            )
          : this.each(function() {
              "string" == typeof b
                ? J.datepicker["_" + b + "Datepicker"].apply(
                    J.datepicker,
                    [this].concat(a)
                  )
                : J.datepicker._attachDatepicker(this, b);
            })
        : J.datepicker["_" + b + "Datepicker"].apply(
            J.datepicker,
            [this[0]].concat(a)
          );
    }),
    (J.datepicker = new C()),
    (J.datepicker.initialized = !1),
    (J.datepicker.uuid = new Date().getTime()),
    (J.datepicker.version = "1.11.2"),
    J.datepicker,
    J.widget("ui.draggable", J.ui.mouse, {
      version: "1.11.2",
      widgetEventPrefix: "drag",
      options: {
        addClasses: !0,
        appendTo: "parent",
        axis: !1,
        connectToSortable: !1,
        containment: !1,
        cursor: "auto",
        cursorAt: !1,
        grid: !1,
        handle: !1,
        helper: "original",
        iframeFix: !1,
        opacity: !1,
        refreshPositions: !1,
        revert: !1,
        revertDuration: 500,
        scope: "default",
        scroll: !0,
        scrollSensitivity: 20,
        scrollSpeed: 20,
        snap: !1,
        snapMode: "both",
        snapTolerance: 20,
        stack: !1,
        zIndex: !1,
        drag: null,
        start: null,
        stop: null
      },
      _create: function() {
        "original" === this.options.helper && this._setPositionRelative(),
          this.options.addClasses && this.element.addClass("ui-draggable"),
          this.options.disabled &&
            this.element.addClass("ui-draggable-disabled"),
          this._setHandleClassName(),
          this._mouseInit();
      },
      _setOption: function(b, a) {
        this._super(b, a),
          "handle" === b &&
            (this._removeHandleClassName(), this._setHandleClassName());
      },
      _destroy: function() {
        return (this.helper || this.element).is(".ui-draggable-dragging")
          ? ((this.destroyOnClear = !0), void 0)
          : (this.element.removeClass(
              "ui-draggable ui-draggable-dragging ui-draggable-disabled"
            ),
            this._removeHandleClassName(),
            this._mouseDestroy(),
            void 0);
      },
      _mouseCapture: function(b) {
        var a = this.options;
        return (
          this._blurActiveElement(b),
          this.helper ||
          a.disabled ||
          J(b.target).closest(".ui-resizable-handle").length > 0
            ? !1
            : ((this.handle = this._getHandle(b)),
              this.handle
                ? (this._blockFrames(
                    a.iframeFix === !0 ? "iframe" : a.iframeFix
                  ),
                  !0)
                : !1)
        );
      },
      _blockFrames: function(a) {
        this.iframeBlocks = this.document.find(a).map(function() {
          var b = J(this);
          return J("<div>")
            .css("position", "absolute")
            .appendTo(b.parent())
            .outerWidth(b.outerWidth())
            .outerHeight(b.outerHeight())
            .offset(b.offset())[0];
        });
      },
      _unblockFrames: function() {
        this.iframeBlocks &&
          (this.iframeBlocks.remove(), delete this.iframeBlocks);
      },
      _blurActiveElement: function(b) {
        var a = this.document[0];
        if (this.handleElement.is(b.target)) {
          try {
            a.activeElement &&
              "body" !== a.activeElement.nodeName.toLowerCase() &&
              J(a.activeElement).blur();
          } catch (c) {}
        }
      },
      _mouseStart: function(b) {
        var a = this.options;
        return (
          (this.helper = this._createHelper(b)),
          this.helper.addClass("ui-draggable-dragging"),
          this._cacheHelperProportions(),
          J.ui.ddmanager && (J.ui.ddmanager.current = this),
          this._cacheMargins(),
          (this.cssPosition = this.helper.css("position")),
          (this.scrollParent = this.helper.scrollParent(!0)),
          (this.offsetParent = this.helper.offsetParent()),
          (this.hasFixedAncestor =
            this.helper.parents().filter(function() {
              return "fixed" === J(this).css("position");
            }).length > 0),
          (this.positionAbs = this.element.offset()),
          this._refreshOffsets(b),
          (this.originalPosition = this.position = this._generatePosition(
            b,
            !1
          )),
          (this.originalPageX = b.pageX),
          (this.originalPageY = b.pageY),
          a.cursorAt && this._adjustOffsetFromHelper(a.cursorAt),
          this._setContainment(),
          this._trigger("start", b) === !1
            ? (this._clear(), !1)
            : (this._cacheHelperProportions(),
              J.ui.ddmanager &&
                !a.dropBehaviour &&
                J.ui.ddmanager.prepareOffsets(this, b),
              this._normalizeRightBottom(),
              this._mouseDrag(b, !0),
              J.ui.ddmanager && J.ui.ddmanager.dragStart(this, b),
              !0)
        );
      },
      _refreshOffsets: function(a) {
        (this.offset = {
          top: this.positionAbs.top - this.margins.top,
          left: this.positionAbs.left - this.margins.left,
          scroll: !1,
          parent: this._getParentOffset(),
          relative: this._getRelativeOffset()
        }),
          (this.offset.click = {
            left: a.pageX - this.offset.left,
            top: a.pageY - this.offset.top
          });
      },
      _mouseDrag: function(b, a) {
        if (
          (this.hasFixedAncestor &&
            (this.offset.parent = this._getParentOffset()),
          (this.position = this._generatePosition(b, !0)),
          (this.positionAbs = this._convertPositionTo("absolute")),
          !a)
        ) {
          var c = this._uiHash();
          if (this._trigger("drag", b, c) === !1) {
            return this._mouseUp({}), !1;
          }
          this.position = c.position;
        }
        return (
          (this.helper[0].style.left = this.position.left + "px"),
          (this.helper[0].style.top = this.position.top + "px"),
          J.ui.ddmanager && J.ui.ddmanager.drag(this, b),
          !1
        );
      },
      _mouseStop: function(b) {
        var a = this,
          c = !1;
        return (
          J.ui.ddmanager &&
            !this.options.dropBehaviour &&
            (c = J.ui.ddmanager.drop(this, b)),
          this.dropped && ((c = this.dropped), (this.dropped = !1)),
          ("invalid" === this.options.revert && !c) ||
          ("valid" === this.options.revert && c) ||
          this.options.revert === !0 ||
          (J.isFunction(this.options.revert) &&
            this.options.revert.call(this.element, c))
            ? J(this.helper).animate(
                this.originalPosition,
                parseInt(this.options.revertDuration, 10),
                function() {
                  a._trigger("stop", b) !== !1 && a._clear();
                }
              )
            : this._trigger("stop", b) !== !1 && this._clear(),
          !1
        );
      },
      _mouseUp: function(a) {
        return (
          this._unblockFrames(),
          J.ui.ddmanager && J.ui.ddmanager.dragStop(this, a),
          this.handleElement.is(a.target) && this.element.focus(),
          J.ui.mouse.prototype._mouseUp.call(this, a)
        );
      },
      cancel: function() {
        return (
          this.helper.is(".ui-draggable-dragging")
            ? this._mouseUp({})
            : this._clear(),
          this
        );
      },
      _getHandle: function(a) {
        return this.options.handle
          ? !!J(a.target).closest(this.element.find(this.options.handle)).length
          : !0;
      },
      _setHandleClassName: function() {
        (this.handleElement = this.options.handle
          ? this.element.find(this.options.handle)
          : this.element),
          this.handleElement.addClass("ui-draggable-handle");
      },
      _removeHandleClassName: function() {
        this.handleElement.removeClass("ui-draggable-handle");
      },
      _createHelper: function(b) {
        var a = this.options,
          c = J.isFunction(a.helper),
          d = c
            ? J(a.helper.apply(this.element[0], [b]))
            : "clone" === a.helper
              ? this.element.clone().removeAttr("id")
              : this.element;
        return (
          d.parents("body").length ||
            d.appendTo(
              "parent" === a.appendTo ? this.element[0].parentNode : a.appendTo
            ),
          c && d[0] === this.element[0] && this._setPositionRelative(),
          d[0] === this.element[0] ||
            /(fixed|absolute)/.test(d.css("position")) ||
            d.css("position", "absolute"),
          d
        );
      },
      _setPositionRelative: function() {
        /^(?:r|a|f)/.test(this.element.css("position")) ||
          (this.element[0].style.position = "relative");
      },
      _adjustOffsetFromHelper: function(a) {
        "string" == typeof a && (a = a.split(" ")),
          J.isArray(a) && (a = { left: +a[0], top: +a[1] || 0 }),
          "left" in a && (this.offset.click.left = a.left + this.margins.left),
          "right" in a &&
            (this.offset.click.left =
              this.helperProportions.width - a.right + this.margins.left),
          "top" in a && (this.offset.click.top = a.top + this.margins.top),
          "bottom" in a &&
            (this.offset.click.top =
              this.helperProportions.height - a.bottom + this.margins.top);
      },
      _isRootNode: function(a) {
        return /(html|body)/i.test(a.tagName) || a === this.document[0];
      },
      _getParentOffset: function() {
        var b = this.offsetParent.offset(),
          a = this.document[0];
        return (
          "absolute" === this.cssPosition &&
            this.scrollParent[0] !== a &&
            J.contains(this.scrollParent[0], this.offsetParent[0]) &&
            ((b.left += this.scrollParent.scrollLeft()),
            (b.top += this.scrollParent.scrollTop())),
          this._isRootNode(this.offsetParent[0]) && (b = { top: 0, left: 0 }),
          {
            top:
              b.top +
              (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
            left:
              b.left +
              (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
          }
        );
      },
      _getRelativeOffset: function() {
        if ("relative" !== this.cssPosition) {
          return { top: 0, left: 0 };
        }
        var b = this.element.position(),
          a = this._isRootNode(this.scrollParent[0]);
        return {
          top:
            b.top -
            (parseInt(this.helper.css("top"), 10) || 0) +
            (a ? 0 : this.scrollParent.scrollTop()),
          left:
            b.left -
            (parseInt(this.helper.css("left"), 10) || 0) +
            (a ? 0 : this.scrollParent.scrollLeft())
        };
      },
      _cacheMargins: function() {
        this.margins = {
          left: parseInt(this.element.css("marginLeft"), 10) || 0,
          top: parseInt(this.element.css("marginTop"), 10) || 0,
          right: parseInt(this.element.css("marginRight"), 10) || 0,
          bottom: parseInt(this.element.css("marginBottom"), 10) || 0
        };
      },
      _cacheHelperProportions: function() {
        this.helperProportions = {
          width: this.helper.outerWidth(),
          height: this.helper.outerHeight()
        };
      },
      _setContainment: function() {
        var d,
          c,
          e,
          f = this.options,
          b = this.document[0];
        return (
          (this.relativeContainer = null),
          f.containment
            ? "window" === f.containment
              ? ((this.containment = [
                  J(window).scrollLeft() -
                    this.offset.relative.left -
                    this.offset.parent.left,
                  J(window).scrollTop() -
                    this.offset.relative.top -
                    this.offset.parent.top,
                  J(window).scrollLeft() +
                    J(window).width() -
                    this.helperProportions.width -
                    this.margins.left,
                  J(window).scrollTop() +
                    (J(window).height() || b.body.parentNode.scrollHeight) -
                    this.helperProportions.height -
                    this.margins.top
                ]),
                void 0)
              : "document" === f.containment
                ? ((this.containment = [
                    0,
                    0,
                    J(b).width() -
                      this.helperProportions.width -
                      this.margins.left,
                    (J(b).height() || b.body.parentNode.scrollHeight) -
                      this.helperProportions.height -
                      this.margins.top
                  ]),
                  void 0)
                : f.containment.constructor === Array
                  ? ((this.containment = f.containment), void 0)
                  : ("parent" === f.containment &&
                      (f.containment = this.helper[0].parentNode),
                    (c = J(f.containment)),
                    (e = c[0]),
                    e &&
                      ((d = /(scroll|auto)/.test(c.css("overflow"))),
                      (this.containment = [
                        (parseInt(c.css("borderLeftWidth"), 10) || 0) +
                          (parseInt(c.css("paddingLeft"), 10) || 0),
                        (parseInt(c.css("borderTopWidth"), 10) || 0) +
                          (parseInt(c.css("paddingTop"), 10) || 0),
                        (d
                          ? Math.max(e.scrollWidth, e.offsetWidth)
                          : e.offsetWidth) -
                          (parseInt(c.css("borderRightWidth"), 10) || 0) -
                          (parseInt(c.css("paddingRight"), 10) || 0) -
                          this.helperProportions.width -
                          this.margins.left -
                          this.margins.right,
                        (d
                          ? Math.max(e.scrollHeight, e.offsetHeight)
                          : e.offsetHeight) -
                          (parseInt(c.css("borderBottomWidth"), 10) || 0) -
                          (parseInt(c.css("paddingBottom"), 10) || 0) -
                          this.helperProportions.height -
                          this.margins.top -
                          this.margins.bottom
                      ]),
                      (this.relativeContainer = c)),
                    void 0)
            : ((this.containment = null), void 0)
        );
      },
      _convertPositionTo: function(d, b) {
        b || (b = this.position);
        var a = "absolute" === d ? 1 : -1,
          c = this._isRootNode(this.scrollParent[0]);
        return {
          top:
            b.top +
            this.offset.relative.top * a +
            this.offset.parent.top * a -
            ("fixed" === this.cssPosition
              ? -this.offset.scroll.top
              : c
                ? 0
                : this.offset.scroll.top) *
              a,
          left:
            b.left +
            this.offset.relative.left * a +
            this.offset.parent.left * a -
            ("fixed" === this.cssPosition
              ? -this.offset.scroll.left
              : c
                ? 0
                : this.offset.scroll.left) *
              a
        };
      },
      _generatePosition: function(p, v) {
        var g,
          y,
          d,
          u,
          c = this.options,
          b = this._isRootNode(this.scrollParent[0]),
          m = p.pageX,
          f = p.pageY;
        return (
          (b && this.offset.scroll) ||
            (this.offset.scroll = {
              top: this.scrollParent.scrollTop(),
              left: this.scrollParent.scrollLeft()
            }),
          v &&
            (this.containment &&
              (this.relativeContainer
                ? ((y = this.relativeContainer.offset()),
                  (g = [
                    this.containment[0] + y.left,
                    this.containment[1] + y.top,
                    this.containment[2] + y.left,
                    this.containment[3] + y.top
                  ]))
                : (g = this.containment),
              p.pageX - this.offset.click.left < g[0] &&
                (m = g[0] + this.offset.click.left),
              p.pageY - this.offset.click.top < g[1] &&
                (f = g[1] + this.offset.click.top),
              p.pageX - this.offset.click.left > g[2] &&
                (m = g[2] + this.offset.click.left),
              p.pageY - this.offset.click.top > g[3] &&
                (f = g[3] + this.offset.click.top)),
            c.grid &&
              ((d = c.grid[1]
                ? this.originalPageY +
                  Math.round((f - this.originalPageY) / c.grid[1]) * c.grid[1]
                : this.originalPageY),
              (f = g
                ? d - this.offset.click.top >= g[1] ||
                  d - this.offset.click.top > g[3]
                  ? d
                  : d - this.offset.click.top >= g[1]
                    ? d - c.grid[1]
                    : d + c.grid[1]
                : d),
              (u = c.grid[0]
                ? this.originalPageX +
                  Math.round((m - this.originalPageX) / c.grid[0]) * c.grid[0]
                : this.originalPageX),
              (m = g
                ? u - this.offset.click.left >= g[0] ||
                  u - this.offset.click.left > g[2]
                  ? u
                  : u - this.offset.click.left >= g[0]
                    ? u - c.grid[0]
                    : u + c.grid[0]
                : u)),
            "y" === c.axis && (m = this.originalPageX),
            "x" === c.axis && (f = this.originalPageY)),
          {
            top:
              f -
              this.offset.click.top -
              this.offset.relative.top -
              this.offset.parent.top +
              ("fixed" === this.cssPosition
                ? -this.offset.scroll.top
                : b
                  ? 0
                  : this.offset.scroll.top),
            left:
              m -
              this.offset.click.left -
              this.offset.relative.left -
              this.offset.parent.left +
              ("fixed" === this.cssPosition
                ? -this.offset.scroll.left
                : b
                  ? 0
                  : this.offset.scroll.left)
          }
        );
      },
      _clear: function() {
        this.helper.removeClass("ui-draggable-dragging"),
          this.helper[0] === this.element[0] ||
            this.cancelHelperRemoval ||
            this.helper.remove(),
          (this.helper = null),
          (this.cancelHelperRemoval = !1),
          this.destroyOnClear && this.destroy();
      },
      _normalizeRightBottom: function() {
        "y" !== this.options.axis &&
          "auto" !== this.helper.css("right") &&
          (this.helper.width(this.helper.width()),
          this.helper.css("right", "auto")),
          "x" !== this.options.axis &&
            "auto" !== this.helper.css("bottom") &&
            (this.helper.height(this.helper.height()),
            this.helper.css("bottom", "auto"));
      },
      _trigger: function(b, a, c) {
        return (
          (c = c || this._uiHash()),
          J.ui.plugin.call(this, b, [a, c, this], !0),
          /^(drag|start|stop)/.test(b) &&
            ((this.positionAbs = this._convertPositionTo("absolute")),
            (c.offset = this.positionAbs)),
          J.Widget.prototype._trigger.call(this, b, a, c)
        );
      },
      plugins: {},
      _uiHash: function() {
        return {
          helper: this.helper,
          position: this.position,
          originalPosition: this.originalPosition,
          offset: this.positionAbs
        };
      }
    }),
    J.ui.plugin.add("draggable", "connectToSortable", {
      start: function(b, a, c) {
        var d = J.extend({}, a, { item: c.element });
        (c.sortables = []),
          J(c.options.connectToSortable).each(function() {
            var e = J(this).sortable("instance");
            e &&
              !e.options.disabled &&
              (c.sortables.push(e),
              e.refreshPositions(),
              e._trigger("activate", b, d));
          });
      },
      stop: function(b, a, c) {
        var d = J.extend({}, a, { item: c.element });
        (c.cancelHelperRemoval = !1),
          J.each(c.sortables, function() {
            var f = this;
            f.isOver
              ? ((f.isOver = 0),
                (c.cancelHelperRemoval = !0),
                (f.cancelHelperRemoval = !1),
                (f._storedCSS = {
                  position: f.placeholder.css("position"),
                  top: f.placeholder.css("top"),
                  left: f.placeholder.css("left")
                }),
                f._mouseStop(b),
                (f.options.helper = f.options._helper))
              : ((f.cancelHelperRemoval = !0), f._trigger("deactivate", b, d));
          });
      },
      drag: function(b, a, c) {
        J.each(c.sortables, function() {
          var e = !1,
            d = this;
          (d.positionAbs = c.positionAbs),
            (d.helperProportions = c.helperProportions),
            (d.offset.click = c.offset.click),
            d._intersectsWith(d.containerCache) &&
              ((e = !0),
              J.each(c.sortables, function() {
                return (
                  (this.positionAbs = c.positionAbs),
                  (this.helperProportions = c.helperProportions),
                  (this.offset.click = c.offset.click),
                  this !== d &&
                    this._intersectsWith(this.containerCache) &&
                    J.contains(d.element[0], this.element[0]) &&
                    (e = !1),
                  e
                );
              })),
            e
              ? (d.isOver ||
                  ((d.isOver = 1),
                  (d.currentItem = a.helper
                    .appendTo(d.element)
                    .data("ui-sortable-item", !0)),
                  (d.options._helper = d.options.helper),
                  (d.options.helper = function() {
                    return a.helper[0];
                  }),
                  (b.target = d.currentItem[0]),
                  d._mouseCapture(b, !0),
                  d._mouseStart(b, !0, !0),
                  (d.offset.click.top = c.offset.click.top),
                  (d.offset.click.left = c.offset.click.left),
                  (d.offset.parent.left -=
                    c.offset.parent.left - d.offset.parent.left),
                  (d.offset.parent.top -=
                    c.offset.parent.top - d.offset.parent.top),
                  c._trigger("toSortable", b),
                  (c.dropped = d.element),
                  J.each(c.sortables, function() {
                    this.refreshPositions();
                  }),
                  (c.currentItem = c.element),
                  (d.fromOutside = c)),
                d.currentItem && (d._mouseDrag(b), (a.position = d.position)))
              : d.isOver &&
                ((d.isOver = 0),
                (d.cancelHelperRemoval = !0),
                (d.options._revert = d.options.revert),
                (d.options.revert = !1),
                d._trigger("out", b, d._uiHash(d)),
                d._mouseStop(b, !0),
                (d.options.revert = d.options._revert),
                (d.options.helper = d.options._helper),
                d.placeholder && d.placeholder.remove(),
                c._refreshOffsets(b),
                (a.position = c._generatePosition(b, !0)),
                c._trigger("fromSortable", b),
                (c.dropped = !1),
                J.each(c.sortables, function() {
                  this.refreshPositions();
                }));
        });
      }
    }),
    J.ui.plugin.add("draggable", "cursor", {
      start: function(d, c, e) {
        var f = J("body"),
          b = e.options;
        f.css("cursor") && (b._cursor = f.css("cursor")),
          f.css("cursor", b.cursor);
      },
      stop: function(b, a, c) {
        var d = c.options;
        d._cursor && J("body").css("cursor", d._cursor);
      }
    }),
    J.ui.plugin.add("draggable", "opacity", {
      start: function(d, c, e) {
        var f = J(c.helper),
          b = e.options;
        f.css("opacity") && (b._opacity = f.css("opacity")),
          f.css("opacity", b.opacity);
      },
      stop: function(b, a, c) {
        var d = c.options;
        d._opacity && J(a.helper).css("opacity", d._opacity);
      }
    }),
    J.ui.plugin.add("draggable", "scroll", {
      start: function(c, b, a) {
        a.scrollParentNotHidden ||
          (a.scrollParentNotHidden = a.helper.scrollParent(!1)),
          a.scrollParentNotHidden[0] !== a.document[0] &&
            "HTML" !== a.scrollParentNotHidden[0].tagName &&
            (a.overflowOffset = a.scrollParentNotHidden.offset());
      },
      drag: function(d, c, e) {
        var h = e.options,
          b = !1,
          g = e.scrollParentNotHidden[0],
          f = e.document[0];
        g !== f && "HTML" !== g.tagName
          ? ((h.axis && "x" === h.axis) ||
              (e.overflowOffset.top + g.offsetHeight - d.pageY <
              h.scrollSensitivity
                ? (g.scrollTop = b = g.scrollTop + h.scrollSpeed)
                : d.pageY - e.overflowOffset.top < h.scrollSensitivity &&
                  (g.scrollTop = b = g.scrollTop - h.scrollSpeed)),
            (h.axis && "y" === h.axis) ||
              (e.overflowOffset.left + g.offsetWidth - d.pageX <
              h.scrollSensitivity
                ? (g.scrollLeft = b = g.scrollLeft + h.scrollSpeed)
                : d.pageX - e.overflowOffset.left < h.scrollSensitivity &&
                  (g.scrollLeft = b = g.scrollLeft - h.scrollSpeed)))
          : ((h.axis && "x" === h.axis) ||
              (d.pageY - J(f).scrollTop() < h.scrollSensitivity
                ? (b = J(f).scrollTop(J(f).scrollTop() - h.scrollSpeed))
                : J(window).height() - (d.pageY - J(f).scrollTop()) <
                    h.scrollSensitivity &&
                  (b = J(f).scrollTop(J(f).scrollTop() + h.scrollSpeed))),
            (h.axis && "y" === h.axis) ||
              (d.pageX - J(f).scrollLeft() < h.scrollSensitivity
                ? (b = J(f).scrollLeft(J(f).scrollLeft() - h.scrollSpeed))
                : J(window).width() - (d.pageX - J(f).scrollLeft()) <
                    h.scrollSensitivity &&
                  (b = J(f).scrollLeft(J(f).scrollLeft() + h.scrollSpeed)))),
          b !== !1 &&
            J.ui.ddmanager &&
            !h.dropBehaviour &&
            J.ui.ddmanager.prepareOffsets(e, d);
      }
    }),
    J.ui.plugin.add("draggable", "snap", {
      start: function(b, a, c) {
        var d = c.options;
        (c.snapElements = []),
          J(
            d.snap.constructor !== String
              ? d.snap.items || ":data(ui-draggable)"
              : d.snap
          ).each(function() {
            var f = J(this),
              e = f.offset();
            this !== c.element[0] &&
              c.snapElements.push({
                item: this,
                width: f.outerWidth(),
                height: f.outerHeight(),
                top: e.top,
                left: e.left
              });
          });
      },
      drag: function(Q, Y, R) {
        var V,
          af,
          U,
          S,
          Z,
          X,
          P,
          ac,
          ad,
          T,
          ab = R.options,
          W = ab.snapTolerance,
          aa = Y.offset.left,
          O = aa + R.helperProportions.width,
          e = Y.offset.top,
          ae = e + R.helperProportions.height;
        for (ad = R.snapElements.length - 1; ad >= 0; ad--) {
          (Z = R.snapElements[ad].left - R.margins.left),
            (X = Z + R.snapElements[ad].width),
            (P = R.snapElements[ad].top - R.margins.top),
            (ac = P + R.snapElements[ad].height),
            Z - W > O ||
            aa > X + W ||
            P - W > ae ||
            e > ac + W ||
            !J.contains(
              R.snapElements[ad].item.ownerDocument,
              R.snapElements[ad].item
            )
              ? (R.snapElements[ad].snapping &&
                  R.options.snap.release &&
                  R.options.snap.release.call(
                    R.element,
                    Q,
                    J.extend(R._uiHash(), { snapItem: R.snapElements[ad].item })
                  ),
                (R.snapElements[ad].snapping = !1))
              : ("inner" !== ab.snapMode &&
                  ((V = W >= Math.abs(P - ae)),
                  (af = W >= Math.abs(ac - e)),
                  (U = W >= Math.abs(Z - O)),
                  (S = W >= Math.abs(X - aa)),
                  V &&
                    (Y.position.top = R._convertPositionTo("relative", {
                      top: P - R.helperProportions.height,
                      left: 0
                    }).top),
                  af &&
                    (Y.position.top = R._convertPositionTo("relative", {
                      top: ac,
                      left: 0
                    }).top),
                  U &&
                    (Y.position.left = R._convertPositionTo("relative", {
                      top: 0,
                      left: Z - R.helperProportions.width
                    }).left),
                  S &&
                    (Y.position.left = R._convertPositionTo("relative", {
                      top: 0,
                      left: X
                    }).left)),
                (T = V || af || U || S),
                "outer" !== ab.snapMode &&
                  ((V = W >= Math.abs(P - e)),
                  (af = W >= Math.abs(ac - ae)),
                  (U = W >= Math.abs(Z - aa)),
                  (S = W >= Math.abs(X - O)),
                  V &&
                    (Y.position.top = R._convertPositionTo("relative", {
                      top: P,
                      left: 0
                    }).top),
                  af &&
                    (Y.position.top = R._convertPositionTo("relative", {
                      top: ac - R.helperProportions.height,
                      left: 0
                    }).top),
                  U &&
                    (Y.position.left = R._convertPositionTo("relative", {
                      top: 0,
                      left: Z
                    }).left),
                  S &&
                    (Y.position.left = R._convertPositionTo("relative", {
                      top: 0,
                      left: X - R.helperProportions.width
                    }).left)),
                !R.snapElements[ad].snapping &&
                  (V || af || U || S || T) &&
                  R.options.snap.snap &&
                  R.options.snap.snap.call(
                    R.element,
                    Q,
                    J.extend(R._uiHash(), { snapItem: R.snapElements[ad].item })
                  ),
                (R.snapElements[ad].snapping = V || af || U || S || T));
        }
      }
    }),
    J.ui.plugin.add("draggable", "stack", {
      start: function(d, c, e) {
        var g,
          b = e.options,
          f = J.makeArray(J(b.stack)).sort(function(h, a) {
            return (
              (parseInt(J(h).css("zIndex"), 10) || 0) -
              (parseInt(J(a).css("zIndex"), 10) || 0)
            );
          });
        f.length &&
          ((g = parseInt(J(f[0]).css("zIndex"), 10) || 0),
          J(f).each(function(a) {
            J(this).css("zIndex", g + a);
          }),
          this.css("zIndex", g + f.length));
      }
    }),
    J.ui.plugin.add("draggable", "zIndex", {
      start: function(d, c, e) {
        var f = J(c.helper),
          b = e.options;
        f.css("zIndex") && (b._zIndex = f.css("zIndex")),
          f.css("zIndex", b.zIndex);
      },
      stop: function(b, a, c) {
        var d = c.options;
        d._zIndex && J(a.helper).css("zIndex", d._zIndex);
      }
    }),
    J.ui.draggable,
    J.widget("ui.resizable", J.ui.mouse, {
      version: "1.11.2",
      widgetEventPrefix: "resize",
      options: {
        alsoResize: !1,
        animate: !1,
        animateDuration: "slow",
        animateEasing: "swing",
        aspectRatio: !1,
        autoHide: !1,
        containment: !1,
        ghost: !1,
        grid: !1,
        handles: "e,s,se",
        helper: !1,
        maxHeight: null,
        maxWidth: null,
        minHeight: 10,
        minWidth: 10,
        zIndex: 90,
        resize: null,
        start: null,
        stop: null
      },
      _num: function(a) {
        return parseInt(a, 10) || 0;
      },
      _isNumber: function(a) {
        return !isNaN(parseInt(a, 10));
      },
      _hasScroll: function(b, a) {
        if ("hidden" === J(b).css("overflow")) {
          return !1;
        }
        var c = a && "left" === a ? "scrollLeft" : "scrollTop",
          d = !1;
        return b[c] > 0 ? !0 : ((b[c] = 1), (d = b[c] > 0), (b[c] = 0), d);
      },
      _create: function() {
        var d,
          c,
          e,
          h,
          b,
          g = this,
          f = this.options;
        if (
          (this.element.addClass("ui-resizable"),
          J.extend(this, {
            _aspectRatio: !!f.aspectRatio,
            aspectRatio: f.aspectRatio,
            originalElement: this.element,
            _proportionallyResizeElements: [],
            _helper:
              f.helper || f.ghost || f.animate
                ? f.helper || "ui-resizable-helper"
                : null
          }),
          this.element[0].nodeName.match(
            /canvas|textarea|input|select|button|img/i
          ) &&
            (this.element.wrap(
              J("<div class='ui-wrapper' style='overflow: hidden;'></div>").css(
                {
                  position: this.element.css("position"),
                  width: this.element.outerWidth(),
                  height: this.element.outerHeight(),
                  top: this.element.css("top"),
                  left: this.element.css("left")
                }
              )
            ),
            (this.element = this.element
              .parent()
              .data("ui-resizable", this.element.resizable("instance"))),
            (this.elementIsWrapper = !0),
            this.element.css({
              marginLeft: this.originalElement.css("marginLeft"),
              marginTop: this.originalElement.css("marginTop"),
              marginRight: this.originalElement.css("marginRight"),
              marginBottom: this.originalElement.css("marginBottom")
            }),
            this.originalElement.css({
              marginLeft: 0,
              marginTop: 0,
              marginRight: 0,
              marginBottom: 0
            }),
            (this.originalResizeStyle = this.originalElement.css("resize")),
            this.originalElement.css("resize", "none"),
            this._proportionallyResizeElements.push(
              this.originalElement.css({
                position: "static",
                zoom: 1,
                display: "block"
              })
            ),
            this.originalElement.css({
              margin: this.originalElement.css("margin")
            }),
            this._proportionallyResize()),
          (this.handles =
            f.handles ||
            (J(".ui-resizable-handle", this.element).length
              ? {
                  n: ".ui-resizable-n",
                  e: ".ui-resizable-e",
                  s: ".ui-resizable-s",
                  w: ".ui-resizable-w",
                  se: ".ui-resizable-se",
                  sw: ".ui-resizable-sw",
                  ne: ".ui-resizable-ne",
                  nw: ".ui-resizable-nw"
                }
              : "e,s,se")),
          this.handles.constructor === String)
        ) {
          for (
            "all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"),
              d = this.handles.split(","),
              this.handles = {},
              c = 0;
            d.length > c;
            c++
          ) {
            (e = J.trim(d[c])),
              (b = "ui-resizable-" + e),
              (h = J("<div class='ui-resizable-handle " + b + "'></div>")),
              h.css({ zIndex: f.zIndex }),
              "se" === e && h.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),
              (this.handles[e] = ".ui-resizable-" + e),
              this.element.append(h);
          }
        }
        (this._renderAxis = function(o) {
          var m, p, r, l;
          o = o || this.element;
          for (m in this.handles) {
            this.handles[m].constructor === String &&
              (this.handles[m] = this.element
                .children(this.handles[m])
                .first()
                .show()),
              this.elementIsWrapper &&
                this.originalElement[0].nodeName.match(
                  /textarea|input|select|button/i
                ) &&
                ((p = J(this.handles[m], this.element)),
                (l = /sw|ne|nw|se|n|s/.test(m)
                  ? p.outerHeight()
                  : p.outerWidth()),
                (r = [
                  "padding",
                  /ne|nw|n/.test(m)
                    ? "Top"
                    : /se|sw|s/.test(m)
                      ? "Bottom"
                      : /^e$/.test(m)
                        ? "Right"
                        : "Left"
                ].join("")),
                o.css(r, l),
                this._proportionallyResize()),
              J(this.handles[m]).length;
          }
        }),
          this._renderAxis(this.element),
          (this._handles = J(
            ".ui-resizable-handle",
            this.element
          ).disableSelection()),
          this._handles.mouseover(function() {
            g.resizing ||
              (this.className &&
                (h = this.className.match(
                  /ui-resizable-(se|sw|ne|nw|n|e|s|w)/i
                )),
              (g.axis = h && h[1] ? h[1] : "se"));
          }),
          f.autoHide &&
            (this._handles.hide(),
            J(this.element)
              .addClass("ui-resizable-autohide")
              .mouseenter(function() {
                f.disabled ||
                  (J(this).removeClass("ui-resizable-autohide"),
                  g._handles.show());
              })
              .mouseleave(function() {
                f.disabled ||
                  g.resizing ||
                  (J(this).addClass("ui-resizable-autohide"),
                  g._handles.hide());
              })),
          this._mouseInit();
      },
      _destroy: function() {
        this._mouseDestroy();
        var b,
          a = function(c) {
            J(c)
              .removeClass(
                "ui-resizable ui-resizable-disabled ui-resizable-resizing"
              )
              .removeData("resizable")
              .removeData("ui-resizable")
              .unbind(".resizable")
              .find(".ui-resizable-handle")
              .remove();
          };
        return (
          this.elementIsWrapper &&
            (a(this.element),
            (b = this.element),
            this.originalElement
              .css({
                position: b.css("position"),
                width: b.outerWidth(),
                height: b.outerHeight(),
                top: b.css("top"),
                left: b.css("left")
              })
              .insertAfter(b),
            b.remove()),
          this.originalElement.css("resize", this.originalResizeStyle),
          a(this.originalElement),
          this
        );
      },
      _mouseCapture: function(b) {
        var a,
          c,
          d = !1;
        for (a in this.handles) {
          (c = J(this.handles[a])[0]),
            (c === b.target || J.contains(c, b.target)) && (d = !0);
        }
        return !this.options.disabled && d;
      },
      _mouseStart: function(d) {
        var c,
          e,
          g,
          b = this.options,
          f = this.element;
        return (
          (this.resizing = !0),
          this._renderProxy(),
          (c = this._num(this.helper.css("left"))),
          (e = this._num(this.helper.css("top"))),
          b.containment &&
            ((c += J(b.containment).scrollLeft() || 0),
            (e += J(b.containment).scrollTop() || 0)),
          (this.offset = this.helper.offset()),
          (this.position = { left: c, top: e }),
          (this.size = this._helper
            ? { width: this.helper.width(), height: this.helper.height() }
            : { width: f.width(), height: f.height() }),
          (this.originalSize = this._helper
            ? { width: f.outerWidth(), height: f.outerHeight() }
            : { width: f.width(), height: f.height() }),
          (this.sizeDiff = {
            width: f.outerWidth() - f.width(),
            height: f.outerHeight() - f.height()
          }),
          (this.originalPosition = { left: c, top: e }),
          (this.originalMousePosition = { left: d.pageX, top: d.pageY }),
          (this.aspectRatio =
            "number" == typeof b.aspectRatio
              ? b.aspectRatio
              : this.originalSize.width / this.originalSize.height || 1),
          (g = J(".ui-resizable-" + this.axis).css("cursor")),
          J("body").css("cursor", "auto" === g ? this.axis + "-resize" : g),
          f.addClass("ui-resizable-resizing"),
          this._propagate("start", d),
          !0
        );
      },
      _mouseDrag: function(d) {
        var c,
          f,
          m = this.originalMousePosition,
          b = this.axis,
          l = d.pageX - m.left || 0,
          g = d.pageY - m.top || 0,
          e = this._change[b];
        return (
          this._updatePrevProperties(),
          e
            ? ((c = e.apply(this, [d, l, g])),
              this._updateVirtualBoundaries(d.shiftKey),
              (this._aspectRatio || d.shiftKey) &&
                (c = this._updateRatio(c, d)),
              (c = this._respectSize(c, d)),
              this._updateCache(c),
              this._propagate("resize", d),
              (f = this._applyChanges()),
              !this._helper &&
                this._proportionallyResizeElements.length &&
                this._proportionallyResize(),
              J.isEmptyObject(f) ||
                (this._updatePrevProperties(),
                this._trigger("resize", d, this.ui()),
                this._applyChanges()),
              !1)
            : !1
        );
      },
      _mouseStop: function(v) {
        this.resizing = !1;
        var f,
          y,
          d,
          m,
          c,
          b,
          g,
          e = this.options,
          p = this;
        return (
          this._helper &&
            ((f = this._proportionallyResizeElements),
            (y = f.length && /textarea/i.test(f[0].nodeName)),
            (d = y && this._hasScroll(f[0], "left") ? 0 : p.sizeDiff.height),
            (m = y ? 0 : p.sizeDiff.width),
            (c = {
              width: p.helper.width() - m,
              height: p.helper.height() - d
            }),
            (b =
              parseInt(p.element.css("left"), 10) +
                (p.position.left - p.originalPosition.left) || null),
            (g =
              parseInt(p.element.css("top"), 10) +
                (p.position.top - p.originalPosition.top) || null),
            e.animate || this.element.css(J.extend(c, { top: g, left: b })),
            p.helper.height(p.size.height),
            p.helper.width(p.size.width),
            this._helper && !e.animate && this._proportionallyResize()),
          J("body").css("cursor", "auto"),
          this.element.removeClass("ui-resizable-resizing"),
          this._propagate("stop", v),
          this._helper && this.helper.remove(),
          !1
        );
      },
      _updatePrevProperties: function() {
        (this.prevPosition = {
          top: this.position.top,
          left: this.position.left
        }),
          (this.prevSize = {
            width: this.size.width,
            height: this.size.height
          });
      },
      _applyChanges: function() {
        var a = {};
        return (
          this.position.top !== this.prevPosition.top &&
            (a.top = this.position.top + "px"),
          this.position.left !== this.prevPosition.left &&
            (a.left = this.position.left + "px"),
          this.size.width !== this.prevSize.width &&
            (a.width = this.size.width + "px"),
          this.size.height !== this.prevSize.height &&
            (a.height = this.size.height + "px"),
          this.helper.css(a),
          a
        );
      },
      _updateVirtualBoundaries: function(g) {
        var d,
          c,
          f,
          l,
          b,
          h = this.options;
        (b = {
          minWidth: this._isNumber(h.minWidth) ? h.minWidth : 0,
          maxWidth: this._isNumber(h.maxWidth) ? h.maxWidth : 1 / 0,
          minHeight: this._isNumber(h.minHeight) ? h.minHeight : 0,
          maxHeight: this._isNumber(h.maxHeight) ? h.maxHeight : 1 / 0
        }),
          (this._aspectRatio || g) &&
            ((d = b.minHeight * this.aspectRatio),
            (f = b.minWidth / this.aspectRatio),
            (c = b.maxHeight * this.aspectRatio),
            (l = b.maxWidth / this.aspectRatio),
            d > b.minWidth && (b.minWidth = d),
            f > b.minHeight && (b.minHeight = f),
            b.maxWidth > c && (b.maxWidth = c),
            b.maxHeight > l && (b.maxHeight = l)),
          (this._vBoundaries = b);
      },
      _updateCache: function(a) {
        (this.offset = this.helper.offset()),
          this._isNumber(a.left) && (this.position.left = a.left),
          this._isNumber(a.top) && (this.position.top = a.top),
          this._isNumber(a.height) && (this.size.height = a.height),
          this._isNumber(a.width) && (this.size.width = a.width);
      },
      _updateRatio: function(d) {
        var b = this.position,
          a = this.size,
          c = this.axis;
        return (
          this._isNumber(d.height)
            ? (d.width = d.height * this.aspectRatio)
            : this._isNumber(d.width) &&
              (d.height = d.width / this.aspectRatio),
          "sw" === c &&
            ((d.left = b.left + (a.width - d.width)), (d.top = null)),
          "nw" === c &&
            ((d.top = b.top + (a.height - d.height)),
            (d.left = b.left + (a.width - d.width))),
          d
        );
      },
      _respectSize: function(p) {
        var O = this._vBoundaries,
          g = this.axis,
          P = this._isNumber(p.width) && O.maxWidth && O.maxWidth < p.width,
          d = this._isNumber(p.height) && O.maxHeight && O.maxHeight < p.height,
          v = this._isNumber(p.width) && O.minWidth && O.minWidth > p.width,
          c = this._isNumber(p.height) && O.minHeight && O.minHeight > p.height,
          b = this.originalPosition.left + this.originalSize.width,
          m = this.position.top + this.size.height,
          f = /sw|nw|w/.test(g),
          y = /nw|ne|n/.test(g);
        return (
          v && (p.width = O.minWidth),
          c && (p.height = O.minHeight),
          P && (p.width = O.maxWidth),
          d && (p.height = O.maxHeight),
          v && f && (p.left = b - O.minWidth),
          P && f && (p.left = b - O.maxWidth),
          c && y && (p.top = m - O.minHeight),
          d && y && (p.top = m - O.maxHeight),
          p.width || p.height || p.left || !p.top
            ? p.width || p.height || p.top || !p.left || (p.left = null)
            : (p.top = null),
          p
        );
      },
      _getPaddingPlusBorderDimensions: function(d) {
        for (
          var b = 0,
            a = [],
            c = [
              d.css("borderTopWidth"),
              d.css("borderRightWidth"),
              d.css("borderBottomWidth"),
              d.css("borderLeftWidth")
            ],
            f = [
              d.css("paddingTop"),
              d.css("paddingRight"),
              d.css("paddingBottom"),
              d.css("paddingLeft")
            ];
          4 > b;
          b++
        ) {
          (a[b] = parseInt(c[b], 10) || 0), (a[b] += parseInt(f[b], 10) || 0);
        }
        return { height: a[0] + a[2], width: a[1] + a[3] };
      },
      _proportionallyResize: function() {
        if (this._proportionallyResizeElements.length) {
          for (
            var c, b = 0, a = this.helper || this.element;
            this._proportionallyResizeElements.length > b;
            b++
          ) {
            (c = this._proportionallyResizeElements[b]),
              this.outerDimensions ||
                (this.outerDimensions = this._getPaddingPlusBorderDimensions(
                  c
                )),
              c.css({
                height: a.height() - this.outerDimensions.height || 0,
                width: a.width() - this.outerDimensions.width || 0
              });
          }
        }
      },
      _renderProxy: function() {
        var b = this.element,
          a = this.options;
        (this.elementOffset = b.offset()),
          this._helper
            ? ((this.helper =
                this.helper || J("<div style='overflow:hidden;'></div>")),
              this.helper
                .addClass(this._helper)
                .css({
                  width: this.element.outerWidth() - 1,
                  height: this.element.outerHeight() - 1,
                  position: "absolute",
                  left: this.elementOffset.left + "px",
                  top: this.elementOffset.top + "px",
                  zIndex: ++a.zIndex
                }),
              this.helper.appendTo("body").disableSelection())
            : (this.helper = this.element);
      },
      _change: {
        e: function(b, a) {
          return { width: this.originalSize.width + a };
        },
        w: function(d, b) {
          var a = this.originalSize,
            c = this.originalPosition;
          return { left: c.left + b, width: a.width - b };
        },
        n: function(d, b, a) {
          var c = this.originalSize,
            f = this.originalPosition;
          return { top: f.top + a, height: c.height - a };
        },
        s: function(c, b, a) {
          return { height: this.originalSize.height + a };
        },
        se: function(b, a, c) {
          return J.extend(
            this._change.s.apply(this, arguments),
            this._change.e.apply(this, [b, a, c])
          );
        },
        sw: function(b, a, c) {
          return J.extend(
            this._change.s.apply(this, arguments),
            this._change.w.apply(this, [b, a, c])
          );
        },
        ne: function(b, a, c) {
          return J.extend(
            this._change.n.apply(this, arguments),
            this._change.e.apply(this, [b, a, c])
          );
        },
        nw: function(b, a, c) {
          return J.extend(
            this._change.n.apply(this, arguments),
            this._change.w.apply(this, [b, a, c])
          );
        }
      },
      _propagate: function(b, a) {
        J.ui.plugin.call(this, b, [a, this.ui()]),
          "resize" !== b && this._trigger(b, a, this.ui());
      },
      plugins: {},
      ui: function() {
        return {
          originalElement: this.originalElement,
          element: this.element,
          helper: this.helper,
          position: this.position,
          size: this.size,
          originalSize: this.originalSize,
          originalPosition: this.originalPosition
        };
      }
    }),
    J.ui.plugin.add("resizable", "animate", {
      stop: function(v) {
        var f = J(this).resizable("instance"),
          y = f.options,
          d = f._proportionallyResizeElements,
          m = d.length && /textarea/i.test(d[0].nodeName),
          c = m && f._hasScroll(d[0], "left") ? 0 : f.sizeDiff.height,
          b = m ? 0 : f.sizeDiff.width,
          g = { width: f.size.width - b, height: f.size.height - c },
          e =
            parseInt(f.element.css("left"), 10) +
              (f.position.left - f.originalPosition.left) || null,
          p =
            parseInt(f.element.css("top"), 10) +
              (f.position.top - f.originalPosition.top) || null;
        f.element.animate(J.extend(g, p && e ? { top: p, left: e } : {}), {
          duration: y.animateDuration,
          easing: y.animateEasing,
          step: function() {
            var a = {
              width: parseInt(f.element.css("width"), 10),
              height: parseInt(f.element.css("height"), 10),
              top: parseInt(f.element.css("top"), 10),
              left: parseInt(f.element.css("left"), 10)
            };
            d && d.length && J(d[0]).css({ width: a.width, height: a.height }),
              f._updateCache(a),
              f._propagate("resize", v);
          }
        });
      }
    }),
    J.ui.plugin.add("resizable", "containment", {
      start: function() {
        var Q,
          m,
          R,
          f,
          O,
          e,
          b,
          p = J(this).resizable("instance"),
          g = p.options,
          P = p.element,
          v = g.containment,
          y =
            v instanceof J
              ? v.get(0)
              : /parent/.test(v)
                ? P.parent().get(0)
                : v;
        y &&
          ((p.containerElement = J(y)),
          /document/.test(v) || v === document
            ? ((p.containerOffset = { left: 0, top: 0 }),
              (p.containerPosition = { left: 0, top: 0 }),
              (p.parentData = {
                element: J(document),
                left: 0,
                top: 0,
                width: J(document).width(),
                height:
                  J(document).height() || document.body.parentNode.scrollHeight
              }))
            : ((Q = J(y)),
              (m = []),
              J(["Top", "Right", "Left", "Bottom"]).each(function(c, a) {
                m[c] = p._num(Q.css("padding" + a));
              }),
              (p.containerOffset = Q.offset()),
              (p.containerPosition = Q.position()),
              (p.containerSize = {
                height: Q.innerHeight() - m[3],
                width: Q.innerWidth() - m[1]
              }),
              (R = p.containerOffset),
              (f = p.containerSize.height),
              (O = p.containerSize.width),
              (e = p._hasScroll(y, "left") ? y.scrollWidth : O),
              (b = p._hasScroll(y) ? y.scrollHeight : f),
              (p.parentData = {
                element: y,
                left: R.left,
                top: R.top,
                width: e,
                height: b
              })));
      },
      resize: function(S) {
        var v,
          T,
          g,
          Q,
          f = J(this).resizable("instance"),
          b = f.options,
          y = f.containerOffset,
          m = f.position,
          R = f._aspectRatio || S.shiftKey,
          O = { top: 0, left: 0 },
          P = f.containerElement,
          e = !0;
        P[0] !== document && /static/.test(P.css("position")) && (O = y),
          m.left < (f._helper ? y.left : 0) &&
            ((f.size.width =
              f.size.width +
              (f._helper
                ? f.position.left - y.left
                : f.position.left - O.left)),
            R && ((f.size.height = f.size.width / f.aspectRatio), (e = !1)),
            (f.position.left = b.helper ? y.left : 0)),
          m.top < (f._helper ? y.top : 0) &&
            ((f.size.height =
              f.size.height +
              (f._helper ? f.position.top - y.top : f.position.top)),
            R && ((f.size.width = f.size.height * f.aspectRatio), (e = !1)),
            (f.position.top = f._helper ? y.top : 0)),
          (g = f.containerElement.get(0) === f.element.parent().get(0)),
          (Q = /relative|absolute/.test(f.containerElement.css("position"))),
          g && Q
            ? ((f.offset.left = f.parentData.left + f.position.left),
              (f.offset.top = f.parentData.top + f.position.top))
            : ((f.offset.left = f.element.offset().left),
              (f.offset.top = f.element.offset().top)),
          (v = Math.abs(
            f.sizeDiff.width +
              (f._helper ? f.offset.left - O.left : f.offset.left - y.left)
          )),
          (T = Math.abs(
            f.sizeDiff.height +
              (f._helper ? f.offset.top - O.top : f.offset.top - y.top)
          )),
          v + f.size.width >= f.parentData.width &&
            ((f.size.width = f.parentData.width - v),
            R && ((f.size.height = f.size.width / f.aspectRatio), (e = !1))),
          T + f.size.height >= f.parentData.height &&
            ((f.size.height = f.parentData.height - T),
            R && ((f.size.width = f.size.height * f.aspectRatio), (e = !1))),
          e ||
            ((f.position.left = f.prevPosition.left),
            (f.position.top = f.prevPosition.top),
            (f.size.width = f.prevSize.width),
            (f.size.height = f.prevSize.height));
      },
      stop: function() {
        var p = J(this).resizable("instance"),
          f = p.options,
          u = p.containerOffset,
          d = p.containerPosition,
          m = p.containerElement,
          c = J(p.helper),
          b = c.offset(),
          g = c.outerWidth() - p.sizeDiff.width,
          e = c.outerHeight() - p.sizeDiff.height;
        p._helper &&
          !f.animate &&
          /relative/.test(m.css("position")) &&
          J(this).css({ left: b.left - d.left - u.left, width: g, height: e }),
          p._helper &&
            !f.animate &&
            /static/.test(m.css("position")) &&
            J(this).css({
              left: b.left - d.left - u.left,
              width: g,
              height: e
            });
      }
    }),
    J.ui.plugin.add("resizable", "alsoResize", {
      start: function() {
        var b = J(this).resizable("instance"),
          a = b.options,
          c = function(d) {
            J(d).each(function() {
              var e = J(this);
              e.data("ui-resizable-alsoresize", {
                width: parseInt(e.width(), 10),
                height: parseInt(e.height(), 10),
                left: parseInt(e.css("left"), 10),
                top: parseInt(e.css("top"), 10)
              });
            });
          };
        "object" != typeof a.alsoResize || a.alsoResize.parentNode
          ? c(a.alsoResize)
          : a.alsoResize.length
            ? ((a.alsoResize = a.alsoResize[0]), c(a.alsoResize))
            : J.each(a.alsoResize, function(d) {
                c(d);
              });
      },
      resize: function(d, c) {
        var f = J(this).resizable("instance"),
          m = f.options,
          b = f.originalSize,
          l = f.originalPosition,
          g = {
            height: f.size.height - b.height || 0,
            width: f.size.width - b.width || 0,
            top: f.position.top - l.top || 0,
            left: f.position.left - l.left || 0
          },
          e = function(a, h) {
            J(a).each(function() {
              var p = J(this),
                s = J(this).data("ui-resizable-alsoresize"),
                i = {},
                r =
                  h && h.length
                    ? h
                    : p.parents(c.originalElement[0]).length
                      ? ["width", "height"]
                      : ["width", "height", "top", "left"];
              J.each(r, function(u, o) {
                var n = (s[o] || 0) + (g[o] || 0);
                n && n >= 0 && (i[o] = n || null);
              }),
                p.css(i);
            });
          };
        "object" != typeof m.alsoResize || m.alsoResize.nodeType
          ? e(m.alsoResize)
          : J.each(m.alsoResize, function(h, a) {
              e(h, a);
            });
      },
      stop: function() {
        J(this).removeData("resizable-alsoresize");
      }
    }),
    J.ui.plugin.add("resizable", "ghost", {
      start: function() {
        var b = J(this).resizable("instance"),
          a = b.options,
          c = b.size;
        (b.ghost = b.originalElement.clone()),
          b.ghost
            .css({
              opacity: 0.25,
              display: "block",
              position: "relative",
              height: c.height,
              width: c.width,
              margin: 0,
              left: 0,
              top: 0
            })
            .addClass("ui-resizable-ghost")
            .addClass("string" == typeof a.ghost ? a.ghost : ""),
          b.ghost.appendTo(b.helper);
      },
      resize: function() {
        var a = J(this).resizable("instance");
        a.ghost &&
          a.ghost.css({
            position: "relative",
            height: a.size.height,
            width: a.size.width
          });
      },
      stop: function() {
        var a = J(this).resizable("instance");
        a.ghost && a.helper && a.helper.get(0).removeChild(a.ghost.get(0));
      }
    }),
    J.ui.plugin.add("resizable", "grid", {
      resize: function() {
        var P,
          X = J(this).resizable("instance"),
          Q = X.options,
          U = X.size,
          ad = X.originalSize,
          T = X.originalPosition,
          R = X.axis,
          Y = "number" == typeof Q.grid ? [Q.grid, Q.grid] : Q.grid,
          W = Y[0] || 1,
          O = Y[1] || 1,
          ab = Math.round((U.width - ad.width) / W) * W,
          ac = Math.round((U.height - ad.height) / O) * O,
          S = ad.width + ab,
          aa = ad.height + ac,
          V = Q.maxWidth && S > Q.maxWidth,
          Z = Q.maxHeight && aa > Q.maxHeight,
          e = Q.minWidth && Q.minWidth > S,
          b = Q.minHeight && Q.minHeight > aa;
        (Q.grid = Y),
          e && (S += W),
          b && (aa += O),
          V && (S -= W),
          Z && (aa -= O),
          /^(se|s|e)$/.test(R)
            ? ((X.size.width = S), (X.size.height = aa))
            : /^(ne)$/.test(R)
              ? ((X.size.width = S),
                (X.size.height = aa),
                (X.position.top = T.top - ac))
              : /^(sw)$/.test(R)
                ? ((X.size.width = S),
                  (X.size.height = aa),
                  (X.position.left = T.left - ab))
                : ((0 >= aa - O || 0 >= S - W) &&
                    (P = X._getPaddingPlusBorderDimensions(this)),
                  aa - O > 0
                    ? ((X.size.height = aa), (X.position.top = T.top - ac))
                    : ((aa = O - P.height),
                      (X.size.height = aa),
                      (X.position.top = T.top + ad.height - aa)),
                  S - W > 0
                    ? ((X.size.width = S), (X.position.left = T.left - ab))
                    : ((S = O - P.height),
                      (X.size.width = S),
                      (X.position.left = T.left + ad.width - S)));
      }
    }),
    J.ui.resizable,
    J.widget("ui.dialog", {
      version: "1.11.2",
      options: {
        appendTo: "body",
        autoOpen: !0,
        buttons: [],
        closeOnEscape: !0,
        closeText: "Close",
        dialogClass: "",
        draggable: !0,
        hide: null,
        height: "auto",
        maxHeight: null,
        maxWidth: null,
        minHeight: 150,
        minWidth: 150,
        modal: !1,
        position: {
          my: "center",
          at: "center",
          of: window,
          collision: "fit",
          using: function(b) {
            var a = J(this)
              .css(b)
              .offset().top;
            0 > a && J(this).css("top", b.top - a);
          }
        },
        resizable: !0,
        show: null,
        title: null,
        width: 300,
        beforeClose: null,
        close: null,
        drag: null,
        dragStart: null,
        dragStop: null,
        focus: null,
        open: null,
        resize: null,
        resizeStart: null,
        resizeStop: null
      },
      sizeRelatedOptions: {
        buttons: !0,
        height: !0,
        maxHeight: !0,
        maxWidth: !0,
        minHeight: !0,
        minWidth: !0,
        width: !0
      },
      resizableRelatedOptions: {
        maxHeight: !0,
        maxWidth: !0,
        minHeight: !0,
        minWidth: !0
      },
      _create: function() {
        (this.originalCss = {
          display: this.element[0].style.display,
          width: this.element[0].style.width,
          minHeight: this.element[0].style.minHeight,
          maxHeight: this.element[0].style.maxHeight,
          height: this.element[0].style.height
        }),
          (this.originalPosition = {
            parent: this.element.parent(),
            index: this.element
              .parent()
              .children()
              .index(this.element)
          }),
          (this.originalTitle = this.element.attr("title")),
          (this.options.title = this.options.title || this.originalTitle),
          this._createWrapper(),
          this.element
            .show()
            .removeAttr("title")
            .addClass("ui-dialog-content ui-widget-content")
            .appendTo(this.uiDialog),
          this._createTitlebar(),
          this._createButtonPane(),
          this.options.draggable && J.fn.draggable && this._makeDraggable(),
          this.options.resizable && J.fn.resizable && this._makeResizable(),
          (this._isOpen = !1),
          this._trackFocus();
      },
      _init: function() {
        this.options.autoOpen && this.open();
      },
      _appendTo: function() {
        var a = this.options.appendTo;
        return a && (a.jquery || a.nodeType)
          ? J(a)
          : this.document.find(a || "body").eq(0);
      },
      _destroy: function() {
        var b,
          a = this.originalPosition;
        this._destroyOverlay(),
          this.element
            .removeUniqueId()
            .removeClass("ui-dialog-content ui-widget-content")
            .css(this.originalCss)
            .detach(),
          this.uiDialog.stop(!0, !0).remove(),
          this.originalTitle && this.element.attr("title", this.originalTitle),
          (b = a.parent.children().eq(a.index)),
          b.length && b[0] !== this.element[0]
            ? b.before(this.element)
            : a.parent.append(this.element);
      },
      widget: function() {
        return this.uiDialog;
      },
      disable: J.noop,
      enable: J.noop,
      close: function(b) {
        var a,
          c = this;
        if (this._isOpen && this._trigger("beforeClose", b) !== !1) {
          if (
            ((this._isOpen = !1),
            (this._focusedElement = null),
            this._destroyOverlay(),
            this._untrackInstance(),
            !this.opener.filter(":focusable").focus().length)
          ) {
            try {
              (a = this.document[0].activeElement),
                a && "body" !== a.nodeName.toLowerCase() && J(a).blur();
            } catch (d) {}
          }
          this._hide(this.uiDialog, this.options.hide, function() {
            c._trigger("close", b);
          });
        }
      },
      isOpen: function() {
        return this._isOpen;
      },
      moveToTop: function() {
        this._moveToTop();
      },
      _moveToTop: function(d, c) {
        var e = !1,
          f = this.uiDialog
            .siblings(".ui-front:visible")
            .map(function() {
              return +J(this).css("z-index");
            })
            .get(),
          b = Math.max.apply(null, f);
        return (
          b >= +this.uiDialog.css("z-index") &&
            (this.uiDialog.css("z-index", b + 1), (e = !0)),
          e && !c && this._trigger("focus", d),
          e
        );
      },
      open: function() {
        var a = this;
        return this._isOpen
          ? (this._moveToTop() && this._focusTabbable(), void 0)
          : ((this._isOpen = !0),
            (this.opener = J(this.document[0].activeElement)),
            this._size(),
            this._position(),
            this._createOverlay(),
            this._moveToTop(null, !0),
            this.overlay &&
              this.overlay.css("z-index", this.uiDialog.css("z-index") - 1),
            this._show(this.uiDialog, this.options.show, function() {
              a._focusTabbable(), a._trigger("focus");
            }),
            this._makeFocusTarget(),
            this._trigger("open"),
            void 0);
      },
      _focusTabbable: function() {
        var a = this._focusedElement;
        a || (a = this.element.find("[autofocus]")),
          a.length || (a = this.element.find(":tabbable")),
          a.length || (a = this.uiDialogButtonPane.find(":tabbable")),
          a.length || (a = this.uiDialogTitlebarClose.filter(":tabbable")),
          a.length || (a = this.uiDialog),
          a.eq(0).focus();
      },
      _keepFocus: function(b) {
        function a() {
          var d = this.document[0].activeElement,
            c = this.uiDialog[0] === d || J.contains(this.uiDialog[0], d);
          c || this._focusTabbable();
        }
        b.preventDefault(), a.call(this), this._delay(a);
      },
      _createWrapper: function() {
        (this.uiDialog = J("<div>")
          .addClass(
            "ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " +
              this.options.dialogClass
          )
          .hide()
          .attr({ tabIndex: -1, role: "dialog" })
          .appendTo(this._appendTo())),
          this._on(this.uiDialog, {
            keydown: function(b) {
              if (
                this.options.closeOnEscape &&
                !b.isDefaultPrevented() &&
                b.keyCode &&
                b.keyCode === J.ui.keyCode.ESCAPE
              ) {
                return b.preventDefault(), this.close(b), void 0;
              }
              if (b.keyCode === J.ui.keyCode.TAB && !b.isDefaultPrevented()) {
                var a = this.uiDialog.find(":tabbable"),
                  c = a.filter(":first"),
                  d = a.filter(":last");
                (b.target !== d[0] && b.target !== this.uiDialog[0]) ||
                b.shiftKey
                  ? (b.target !== c[0] && b.target !== this.uiDialog[0]) ||
                    !b.shiftKey ||
                    (this._delay(function() {
                      d.focus();
                    }),
                    b.preventDefault())
                  : (this._delay(function() {
                      c.focus();
                    }),
                    b.preventDefault());
              }
            },
            mousedown: function(a) {
              this._moveToTop(a) && this._focusTabbable();
            }
          }),
          this.element.find("[aria-describedby]").length ||
            this.uiDialog.attr({
              "aria-describedby": this.element.uniqueId().attr("id")
            });
      },
      _createTitlebar: function() {
        var a;
        (this.uiDialogTitlebar = J("<div>")
          .addClass(
            "ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix"
          )
          .prependTo(this.uiDialog)),
          this._on(this.uiDialogTitlebar, {
            mousedown: function(b) {
              J(b.target).closest(".ui-dialog-titlebar-close") ||
                this.uiDialog.focus();
            }
          }),
          (this.uiDialogTitlebarClose = J("<button type='button'></button>")
            .button({
              label: this.options.closeText,
              icons: { primary: "ui-icon-closethick" },
              text: !1
            })
            .addClass("ui-dialog-titlebar-close")
            .appendTo(this.uiDialogTitlebar)),
          this._on(this.uiDialogTitlebarClose, {
            click: function(b) {
              b.preventDefault(), this.close(b);
            }
          }),
          (a = J("<span>")
            .uniqueId()
            .addClass("ui-dialog-title")
            .prependTo(this.uiDialogTitlebar)),
          this._title(a),
          this.uiDialog.attr({ "aria-labelledby": a.attr("id") });
      },
      _title: function(a) {
        this.options.title || a.html("&#160;"), a.text(this.options.title);
      },
      _createButtonPane: function() {
        (this.uiDialogButtonPane = J("<div>").addClass(
          "ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"
        )),
          (this.uiButtonSet = J("<div>")
            .addClass("ui-dialog-buttonset")
            .appendTo(this.uiDialogButtonPane)),
          this._createButtons();
      },
      _createButtons: function() {
        var b = this,
          a = this.options.buttons;
        return (
          this.uiDialogButtonPane.remove(),
          this.uiButtonSet.empty(),
          J.isEmptyObject(a) || (J.isArray(a) && !a.length)
            ? (this.uiDialog.removeClass("ui-dialog-buttons"), void 0)
            : (J.each(a, function(d, e) {
                var f, c;
                (e = J.isFunction(e) ? { click: e, text: d } : e),
                  (e = J.extend({ type: "button" }, e)),
                  (f = e.click),
                  (e.click = function() {
                    f.apply(b.element[0], arguments);
                  }),
                  (c = { icons: e.icons, text: e.showText }),
                  delete e.icons,
                  delete e.showText,
                  J("<button></button>", e)
                    .button(c)
                    .appendTo(b.uiButtonSet);
              }),
              this.uiDialog.addClass("ui-dialog-buttons"),
              this.uiDialogButtonPane.appendTo(this.uiDialog),
              void 0)
        );
      },
      _makeDraggable: function() {
        function b(d) {
          return { position: d.position, offset: d.offset };
        }
        var a = this,
          c = this.options;
        this.uiDialog.draggable({
          cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
          handle: ".ui-dialog-titlebar",
          containment: "document",
          start: function(d, e) {
            J(this).addClass("ui-dialog-dragging"),
              a._blockFrames(),
              a._trigger("dragStart", d, b(e));
          },
          drag: function(f, d) {
            a._trigger("drag", f, b(d));
          },
          stop: function(g, d) {
            var f = d.offset.left - a.document.scrollLeft(),
              e = d.offset.top - a.document.scrollTop();
            (c.position = {
              my: "left top",
              at:
                "left" +
                (f >= 0 ? "+" : "") +
                f +
                " top" +
                (e >= 0 ? "+" : "") +
                e,
              of: a.window
            }),
              J(this).removeClass("ui-dialog-dragging"),
              a._unblockFrames(),
              a._trigger("dragStop", g, b(d));
          }
        });
      },
      _makeResizable: function() {
        function d(a) {
          return {
            originalPosition: a.originalPosition,
            originalSize: a.originalSize,
            position: a.position,
            size: a.size
          };
        }
        var c = this,
          e = this.options,
          g = e.resizable,
          b = this.uiDialog.css("position"),
          f = "string" == typeof g ? g : "n,e,s,w,se,sw,ne,nw";
        this.uiDialog
          .resizable({
            cancel: ".ui-dialog-content",
            containment: "document",
            alsoResize: this.element,
            maxWidth: e.maxWidth,
            maxHeight: e.maxHeight,
            minWidth: e.minWidth,
            minHeight: this._minHeight(),
            handles: f,
            start: function(a, h) {
              J(this).addClass("ui-dialog-resizing"),
                c._blockFrames(),
                c._trigger("resizeStart", a, d(h));
            },
            resize: function(h, a) {
              c._trigger("resize", h, d(a));
            },
            stop: function(s, i) {
              var p = c.uiDialog.offset(),
                m = p.left - c.document.scrollLeft(),
                l = p.top - c.document.scrollTop();
              (e.height = c.uiDialog.height()),
                (e.width = c.uiDialog.width()),
                (e.position = {
                  my: "left top",
                  at:
                    "left" +
                    (m >= 0 ? "+" : "") +
                    m +
                    " top" +
                    (l >= 0 ? "+" : "") +
                    l,
                  of: c.window
                }),
                J(this).removeClass("ui-dialog-resizing"),
                c._unblockFrames(),
                c._trigger("resizeStop", s, d(i));
            }
          })
          .css("position", b);
      },
      _trackFocus: function() {
        this._on(this.widget(), {
          focusin: function(a) {
            this._makeFocusTarget(), (this._focusedElement = J(a.target));
          }
        });
      },
      _makeFocusTarget: function() {
        this._untrackInstance(), this._trackingInstances().unshift(this);
      },
      _untrackInstance: function() {
        var b = this._trackingInstances(),
          a = J.inArray(this, b);
        -1 !== a && b.splice(a, 1);
      },
      _trackingInstances: function() {
        var a = this.document.data("ui-dialog-instances");
        return a || ((a = []), this.document.data("ui-dialog-instances", a)), a;
      },
      _minHeight: function() {
        var a = this.options;
        return "auto" === a.height
          ? a.minHeight
          : Math.min(a.minHeight, a.height);
      },
      _position: function() {
        var a = this.uiDialog.is(":visible");
        a || this.uiDialog.show(),
          this.uiDialog.position(this.options.position),
          a || this.uiDialog.hide();
      },
      _setOptions: function(b) {
        var a = this,
          c = !1,
          d = {};
        J.each(b, function(g, f) {
          a._setOption(g, f),
            g in a.sizeRelatedOptions && (c = !0),
            g in a.resizableRelatedOptions && (d[g] = f);
        }),
          c && (this._size(), this._position()),
          this.uiDialog.is(":data(ui-resizable)") &&
            this.uiDialog.resizable("option", d);
      },
      _setOption: function(d, b) {
        var a,
          c,
          f = this.uiDialog;
        "dialogClass" === d &&
          f.removeClass(this.options.dialogClass).addClass(b),
          "disabled" !== d &&
            (this._super(d, b),
            "appendTo" === d && this.uiDialog.appendTo(this._appendTo()),
            "buttons" === d && this._createButtons(),
            "closeText" === d &&
              this.uiDialogTitlebarClose.button({ label: "" + b }),
            "draggable" === d &&
              ((a = f.is(":data(ui-draggable)")),
              a && !b && f.draggable("destroy"),
              !a && b && this._makeDraggable()),
            "position" === d && this._position(),
            "resizable" === d &&
              ((c = f.is(":data(ui-resizable)")),
              c && !b && f.resizable("destroy"),
              c && "string" == typeof b && f.resizable("option", "handles", b),
              c || b === !1 || this._makeResizable()),
            "title" === d &&
              this._title(this.uiDialogTitlebar.find(".ui-dialog-title")));
      },
      _size: function() {
        var d,
          b,
          a,
          c = this.options;
        this.element
          .show()
          .css({ width: "auto", minHeight: 0, maxHeight: "none", height: 0 }),
          c.minWidth > c.width && (c.width = c.minWidth),
          (d = this.uiDialog
            .css({ height: "auto", width: c.width })
            .outerHeight()),
          (b = Math.max(0, c.minHeight - d)),
          (a =
            "number" == typeof c.maxHeight
              ? Math.max(0, c.maxHeight - d)
              : "none"),
          "auto" === c.height
            ? this.element.css({ minHeight: b, maxHeight: a, height: "auto" })
            : this.element.height(Math.max(0, c.height - d)),
          this.uiDialog.is(":data(ui-resizable)") &&
            this.uiDialog.resizable("option", "minHeight", this._minHeight());
      },
      _blockFrames: function() {
        this.iframeBlocks = this.document.find("iframe").map(function() {
          var a = J(this);
          return J("<div>")
            .css({
              position: "absolute",
              width: a.outerWidth(),
              height: a.outerHeight()
            })
            .appendTo(a.parent())
            .offset(a.offset())[0];
        });
      },
      _unblockFrames: function() {
        this.iframeBlocks &&
          (this.iframeBlocks.remove(), delete this.iframeBlocks);
      },
      _allowInteraction: function(a) {
        return J(a.target).closest(".ui-dialog").length
          ? !0
          : !!J(a.target).closest(".ui-datepicker").length;
      },
      _createOverlay: function() {
        if (this.options.modal) {
          var a = !0;
          this._delay(function() {
            a = !1;
          }),
            this.document.data("ui-dialog-overlays") ||
              this._on(this.document, {
                focusin: function(b) {
                  a ||
                    this._allowInteraction(b) ||
                    (b.preventDefault(),
                    this._trackingInstances()[0]._focusTabbable());
                }
              }),
            (this.overlay = J("<div>")
              .addClass("ui-widget-overlay ui-front")
              .appendTo(this._appendTo())),
            this._on(this.overlay, { mousedown: "_keepFocus" }),
            this.document.data(
              "ui-dialog-overlays",
              (this.document.data("ui-dialog-overlays") || 0) + 1
            );
        }
      },
      _destroyOverlay: function() {
        if (this.options.modal && this.overlay) {
          var a = this.document.data("ui-dialog-overlays") - 1;
          a
            ? this.document.data("ui-dialog-overlays", a)
            : this.document.unbind("focusin").removeData("ui-dialog-overlays"),
            this.overlay.remove(),
            (this.overlay = null);
        }
      }
    }),
    J.widget("ui.droppable", {
      version: "1.11.2",
      widgetEventPrefix: "drop",
      options: {
        accept: "*",
        activeClass: !1,
        addClasses: !0,
        greedy: !1,
        hoverClass: !1,
        scope: "default",
        tolerance: "intersect",
        activate: null,
        deactivate: null,
        drop: null,
        out: null,
        over: null
      },
      _create: function() {
        var b,
          a = this.options,
          c = a.accept;
        (this.isover = !1),
          (this.isout = !0),
          (this.accept = J.isFunction(c)
            ? c
            : function(d) {
                return d.is(c);
              }),
          (this.proportions = function() {
            return arguments.length
              ? ((b = arguments[0]), void 0)
              : b
                ? b
                : (b = {
                    width: this.element[0].offsetWidth,
                    height: this.element[0].offsetHeight
                  });
          }),
          this._addToManager(a.scope),
          a.addClasses && this.element.addClass("ui-droppable");
      },
      _addToManager: function(a) {
        (J.ui.ddmanager.droppables[a] = J.ui.ddmanager.droppables[a] || []),
          J.ui.ddmanager.droppables[a].push(this);
      },
      _splice: function(b) {
        for (var a = 0; b.length > a; a++) {
          b[a] === this && b.splice(a, 1);
        }
      },
      _destroy: function() {
        var a = J.ui.ddmanager.droppables[this.options.scope];
        this._splice(a),
          this.element.removeClass("ui-droppable ui-droppable-disabled");
      },
      _setOption: function(b, a) {
        if ("accept" === b) {
          this.accept = J.isFunction(a)
            ? a
            : function(d) {
                return d.is(a);
              };
        } else {
          if ("scope" === b) {
            var c = J.ui.ddmanager.droppables[this.options.scope];
            this._splice(c), this._addToManager(a);
          }
        }
        this._super(b, a);
      },
      _activate: function(b) {
        var a = J.ui.ddmanager.current;
        this.options.activeClass &&
          this.element.addClass(this.options.activeClass),
          a && this._trigger("activate", b, this.ui(a));
      },
      _deactivate: function(b) {
        var a = J.ui.ddmanager.current;
        this.options.activeClass &&
          this.element.removeClass(this.options.activeClass),
          a && this._trigger("deactivate", b, this.ui(a));
      },
      _over: function(b) {
        var a = J.ui.ddmanager.current;
        a &&
          (a.currentItem || a.element)[0] !== this.element[0] &&
          this.accept.call(this.element[0], a.currentItem || a.element) &&
          (this.options.hoverClass &&
            this.element.addClass(this.options.hoverClass),
          this._trigger("over", b, this.ui(a)));
      },
      _out: function(b) {
        var a = J.ui.ddmanager.current;
        a &&
          (a.currentItem || a.element)[0] !== this.element[0] &&
          this.accept.call(this.element[0], a.currentItem || a.element) &&
          (this.options.hoverClass &&
            this.element.removeClass(this.options.hoverClass),
          this._trigger("out", b, this.ui(a)));
      },
      _drop: function(b, a) {
        var c = a || J.ui.ddmanager.current,
          d = !1;
        return c && (c.currentItem || c.element)[0] !== this.element[0]
          ? (this.element
              .find(":data(ui-droppable)")
              .not(".ui-draggable-dragging")
              .each(function() {
                var e = J(this).droppable("instance");
                return e.options.greedy &&
                  !e.options.disabled &&
                  e.options.scope === c.options.scope &&
                  e.accept.call(e.element[0], c.currentItem || c.element) &&
                  J.ui.intersect(
                    c,
                    J.extend(e, { offset: e.element.offset() }),
                    e.options.tolerance,
                    b
                  )
                  ? ((d = !0), !1)
                  : void 0;
              }),
            d
              ? !1
              : this.accept.call(this.element[0], c.currentItem || c.element)
                ? (this.options.activeClass &&
                    this.element.removeClass(this.options.activeClass),
                  this.options.hoverClass &&
                    this.element.removeClass(this.options.hoverClass),
                  this._trigger("drop", b, this.ui(c)),
                  this.element)
                : !1)
          : !1;
      },
      ui: function(a) {
        return {
          draggable: a.currentItem || a.element,
          helper: a.helper,
          position: a.position,
          offset: a.positionAbs
        };
      }
    }),
    (J.ui.intersect = (function() {
      function a(d, c, b) {
        return d >= c && c + b > d;
      }
      return function(Q, m, R, f) {
        if (!m.offset) {
          return !1;
        }
        var O = (Q.positionAbs || Q.position.absolute).left + Q.margins.left,
          e = (Q.positionAbs || Q.position.absolute).top + Q.margins.top,
          b = O + Q.helperProportions.width,
          p = e + Q.helperProportions.height,
          g = m.offset.left,
          P = m.offset.top,
          v = g + m.proportions().width,
          y = P + m.proportions().height;
        switch (R) {
          case "fit":
            return O >= g && v >= b && e >= P && y >= p;
          case "intersect":
            return (
              O + Q.helperProportions.width / 2 > g &&
              v > b - Q.helperProportions.width / 2 &&
              e + Q.helperProportions.height / 2 > P &&
              y > p - Q.helperProportions.height / 2
            );
          case "pointer":
            return (
              a(f.pageY, P, m.proportions().height) &&
              a(f.pageX, g, m.proportions().width)
            );
          case "touch":
            return (
              ((e >= P && y >= e) || (p >= P && y >= p) || (P > e && p > y)) &&
              ((O >= g && v >= O) || (b >= g && v >= b) || (g > O && b > v))
            );
          default:
            return !1;
        }
      };
    })()),
    (J.ui.ddmanager = {
      current: null,
      droppables: { default: [] },
      prepareOffsets: function(d, c) {
        var e,
          h,
          b = J.ui.ddmanager.droppables[d.options.scope] || [],
          g = c ? c.type : null,
          f = (d.currentItem || d.element)
            .find(":data(ui-droppable)")
            .addBack();
        J: for (e = 0; b.length > e; e++) {
          if (
            !(
              b[e].options.disabled ||
              (d &&
                !b[e].accept.call(b[e].element[0], d.currentItem || d.element))
            )
          ) {
            for (h = 0; f.length > h; h++) {
              if (f[h] === b[e].element[0]) {
                b[e].proportions().height = 0;
                continue J;
              }
            }
            (b[e].visible = "none" !== b[e].element.css("display")),
              b[e].visible &&
                ("mousedown" === g && b[e]._activate.call(b[e], c),
                (b[e].offset = b[e].element.offset()),
                b[e].proportions({
                  width: b[e].element[0].offsetWidth,
                  height: b[e].element[0].offsetHeight
                }));
          }
        }
      },
      drop: function(b, a) {
        var c = !1;
        return (
          J.each(
            (J.ui.ddmanager.droppables[b.options.scope] || []).slice(),
            function() {
              this.options &&
                (!this.options.disabled &&
                  this.visible &&
                  J.ui.intersect(b, this, this.options.tolerance, a) &&
                  (c = this._drop.call(this, a) || c),
                !this.options.disabled &&
                  this.visible &&
                  this.accept.call(
                    this.element[0],
                    b.currentItem || b.element
                  ) &&
                  ((this.isout = !0),
                  (this.isover = !1),
                  this._deactivate.call(this, a)));
            }
          ),
          c
        );
      },
      dragStart: function(b, a) {
        b.element.parentsUntil("body").bind("scroll.droppable", function() {
          b.options.refreshPositions || J.ui.ddmanager.prepareOffsets(b, a);
        });
      },
      drag: function(b, a) {
        b.options.refreshPositions && J.ui.ddmanager.prepareOffsets(b, a),
          J.each(J.ui.ddmanager.droppables[b.options.scope] || [], function() {
            if (!this.options.disabled && !this.greedyChild && this.visible) {
              var d,
                g,
                c,
                f = J.ui.intersect(b, this, this.options.tolerance, a),
                e =
                  !f && this.isover
                    ? "isout"
                    : f && !this.isover
                      ? "isover"
                      : null;
              e &&
                (this.options.greedy &&
                  ((g = this.options.scope),
                  (c = this.element
                    .parents(":data(ui-droppable)")
                    .filter(function() {
                      return J(this).droppable("instance").options.scope === g;
                    })),
                  c.length &&
                    ((d = J(c[0]).droppable("instance")),
                    (d.greedyChild = "isover" === e))),
                d &&
                  "isover" === e &&
                  ((d.isover = !1), (d.isout = !0), d._out.call(d, a)),
                (this[e] = !0),
                (this["isout" === e ? "isover" : "isout"] = !1),
                this["isover" === e ? "_over" : "_out"].call(this, a),
                d &&
                  "isout" === e &&
                  ((d.isout = !1), (d.isover = !0), d._over.call(d, a)));
            }
          });
      },
      dragStop: function(b, a) {
        b.element.parentsUntil("body").unbind("scroll.droppable"),
          b.options.refreshPositions || J.ui.ddmanager.prepareOffsets(b, a);
      }
    }),
    J.ui.droppable;
  var j = "ui-effects-",
    M = J;
  (J.effects = { effect: {} }),
    (function(R, W) {
      function O(f, c, a) {
        var d = S[c.type] || {};
        return null == f
          ? a || !c.def
            ? null
            : c.def
          : ((f = d.floor ? ~~f : parseFloat(f)),
            isNaN(f)
              ? c.def
              : d.mod
                ? (f + d.mod) % d.mod
                : 0 > f
                  ? 0
                  : f > d.max
                    ? d.max
                    : f);
      }
      function X(a) {
        var c = y(),
          d = (c._rgba = []);
        return (
          (a = a.toLowerCase()),
          Q(P, function(s, i) {
            var t,
              p = i.re.exec(a),
              n = p && i.parse(p),
              f = i.space || "rgba";
            return n
              ? ((t = c[f](n)),
                (c[V[f].cache] = t[V[f].cache]),
                (d = c._rgba = t._rgba),
                !1)
              : W;
          }),
          d.length
            ? ("0,0,0,0" === d.join() && R.extend(d, U.transparent), c)
            : U[a]
        );
      }
      function v(d, c, a) {
        return (
          (a = (a + 1) % 1),
          1 > 6 * a
            ? d + 6 * (c - d) * a
            : 1 > 2 * a
              ? c
              : 2 > 3 * a
                ? d + 6 * (c - d) * (2 / 3 - a)
                : d
        );
      }
      var U,
        m =
          "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
        b = /^([\-+])=\s*(\d+\.?\d*)/,
        P = [
          {
            re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function(a) {
              return [a[1], a[2], a[3], a[4]];
            }
          },
          {
            re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function(a) {
              return [2.55 * a[1], 2.55 * a[2], 2.55 * a[3], a[4]];
            }
          },
          {
            re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
            parse: function(a) {
              return [
                parseInt(a[1], 16),
                parseInt(a[2], 16),
                parseInt(a[3], 16)
              ];
            }
          },
          {
            re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
            parse: function(a) {
              return [
                parseInt(a[1] + a[1], 16),
                parseInt(a[2] + a[2], 16),
                parseInt(a[3] + a[3], 16)
              ];
            }
          },
          {
            re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            space: "hsla",
            parse: function(a) {
              return [a[1], a[2] / 100, a[3] / 100, a[4]];
            }
          }
        ],
        y = (R.Color = function(c, a, d, e) {
          return new R.Color.fn.parse(c, a, d, e);
        }),
        V = {
          rgba: {
            props: {
              red: { idx: 0, type: "byte" },
              green: { idx: 1, type: "byte" },
              blue: { idx: 2, type: "byte" }
            }
          },
          hsla: {
            props: {
              hue: { idx: 0, type: "degrees" },
              saturation: { idx: 1, type: "percent" },
              lightness: { idx: 2, type: "percent" }
            }
          }
        },
        S = {
          byte: { floor: !0, max: 255 },
          percent: { max: 1 },
          degrees: { mod: 360, floor: !0 }
        },
        T = (y.support = {}),
        g = R("<p>")[0],
        Q = R.each;
      (g.style.cssText = "background-color:rgba(1,1,1,.5)"),
        (T.rgba = g.style.backgroundColor.indexOf("rgba") > -1),
        Q(V, function(c, a) {
          (a.cache = "_" + c),
            (a.props.alpha = { idx: 3, type: "percent", def: 1 });
        }),
        (y.fn = R.extend(y.prototype, {
          parse: function(t, l, e, a) {
            if (t === W) {
              return (this._rgba = [null, null, null, null]), this;
            }
            (t.jquery || t.nodeType) && ((t = R(t).css(l)), (l = W));
            var i = this,
              s = R.type(t),
              f = (this._rgba = []);
            return (
              l !== W && ((t = [t, l, e, a]), (s = "array")),
              "string" === s
                ? this.parse(X(t) || U._default)
                : "array" === s
                  ? (Q(V.rgba.props, function(d, c) {
                      f[c.idx] = O(t[c.idx], c);
                    }),
                    this)
                  : "object" === s
                    ? (t instanceof y
                        ? Q(V, function(d, c) {
                            t[c.cache] && (i[c.cache] = t[c.cache].slice());
                          })
                        : Q(V, function(d, h) {
                            var c = h.cache;
                            Q(h.props, function(o, n) {
                              if (!i[c] && h.to) {
                                if ("alpha" === o || null == t[o]) {
                                  return;
                                }
                                i[c] = h.to(i._rgba);
                              }
                              i[c][n.idx] = O(t[o], n, !0);
                            }),
                              i[c] &&
                                0 > R.inArray(null, i[c].slice(0, 3)) &&
                                ((i[c][3] = 1),
                                h.from && (i._rgba = h.from(i[c])));
                          }),
                      this)
                    : W
            );
          },
          is: function(d) {
            var a = y(d),
              c = !0,
              f = this;
            return (
              Q(V, function(l, h) {
                var n,
                  i = a[h.cache];
                return (
                  i &&
                    ((n = f[h.cache] || (h.to && h.to(f._rgba)) || []),
                    Q(h.props, function(p, o) {
                      return null != i[o.idx] ? (c = i[o.idx] === n[o.idx]) : W;
                    })),
                  c
                );
              }),
              c
            );
          },
          _space: function() {
            var c = [],
              a = this;
            return (
              Q(V, function(d, e) {
                a[e.cache] && c.push(d);
              }),
              c.pop()
            );
          },
          transition: function(p, d) {
            var i = y(p),
              Y = i._space(),
              c = V[Y],
              u = 0 === this.alpha() ? y("transparent") : this,
              l = u[c.cache] || c.to(u._rgba),
              f = l.slice();
            return (
              (i = i[c.cache]),
              Q(c.props, function(t, aa) {
                var r = aa.idx,
                  Z = l[r],
                  h = i[r],
                  s = S[aa.type] || {};
                null !== h &&
                  (null === Z
                    ? (f[r] = h)
                    : (s.mod &&
                        (h - Z > s.mod / 2
                          ? (Z += s.mod)
                          : Z - h > s.mod / 2 && (Z -= s.mod)),
                      (f[r] = O((h - Z) * d + Z, aa))));
              }),
              this[Y](f)
            );
          },
          blend: function(c) {
            if (1 === this._rgba[3]) {
              return this;
            }
            var a = this._rgba.slice(),
              d = a.pop(),
              e = y(c)._rgba;
            return y(
              R.map(a, function(h, f) {
                return (1 - d) * e[f] + d * h;
              })
            );
          },
          toRgbaString: function() {
            var c = "rgba(",
              a = R.map(this._rgba, function(f, d) {
                return null == f ? (d > 2 ? 1 : 0) : f;
              });
            return 1 === a[3] && (a.pop(), (c = "rgb(")), c + a.join() + ")";
          },
          toHslaString: function() {
            var c = "hsla(",
              a = R.map(this.hsla(), function(f, d) {
                return (
                  null == f && (f = d > 2 ? 1 : 0),
                  d && 3 > d && (f = Math.round(100 * f) + "%"),
                  f
                );
              });
            return 1 === a[3] && (a.pop(), (c = "hsl(")), c + a.join() + ")";
          },
          toHexString: function(c) {
            var a = this._rgba.slice(),
              d = a.pop();
            return (
              c && a.push(~~(255 * d)),
              "#" +
                R.map(a, function(f) {
                  return (
                    (f = (f || 0).toString(16)), 1 === f.length ? "0" + f : f
                  );
                }).join("")
            );
          },
          toString: function() {
            return 0 === this._rgba[3] ? "transparent" : this.toRgbaString();
          }
        })),
        (y.fn.parse.prototype = y.fn),
        (V.hsla.to = function(ab) {
          if (null == ab[0] || null == ab[1] || null == ab[2]) {
            return [null, null, null, ab[3]];
          }
          var af,
            Z,
            ag = ab[0] / 255,
            p = ab[1] / 255,
            ad = ab[2] / 255,
            f = ab[3],
            c = Math.max(ag, p, ad),
            aa = Math.min(ag, p, ad),
            Y = c - aa,
            ae = c + aa,
            ac = 0.5 * ae;
          return (
            (af =
              aa === c
                ? 0
                : ag === c
                  ? 60 * (p - ad) / Y + 360
                  : p === c
                    ? 60 * (ad - ag) / Y + 120
                    : 60 * (ag - p) / Y + 240),
            (Z = 0 === Y ? 0 : 0.5 >= ac ? Y / ae : Y / (2 - ae)),
            [Math.round(af) % 360, Z, ac, null == f ? 1 : f]
          );
        }),
        (V.hsla.from = function(n) {
          if (null == n[0] || null == n[1] || null == n[2]) {
            return [null, null, null, n[3]];
          }
          var f = n[0] / 360,
            d = n[1],
            h = n[2],
            c = n[3],
            p = 0.5 >= h ? h * (1 + d) : h + d - h * d,
            l = 2 * h - p;
          return [
            Math.round(255 * v(l, p, f + 1 / 3)),
            Math.round(255 * v(l, p, f)),
            Math.round(255 * v(l, p, f - 1 / 3)),
            c
          ];
        }),
        Q(V, function(f, l) {
          var c = l.props,
            i = l.cache,
            e = l.to,
            d = l.from;
          (y.fn[f] = function(a) {
            if ((e && !this[i] && (this[i] = e(this._rgba)), a === W)) {
              return this[i].slice();
            }
            var t,
              h = R.type(a),
              o = "array" === h || "object" === h ? a : arguments,
              p = this[i].slice();
            return (
              Q(c, function(u, n) {
                var r = o["object" === h ? u : n.idx];
                null == r && (r = p[n.idx]), (p[n.idx] = O(r, n));
              }),
              d ? ((t = y(d(p))), (t[i] = p), t) : y(p)
            );
          }),
            Q(c, function(h, a) {
              y.fn[h] ||
                (y.fn[h] = function(Z) {
                  var r,
                    Y = R.type(Z),
                    t = "alpha" === h ? (this._hsla ? "hsla" : "rgba") : f,
                    p = this[t](),
                    s = p[a.idx];
                  return "undefined" === Y
                    ? s
                    : ("function" === Y &&
                        ((Z = Z.call(this, s)), (Y = R.type(Z))),
                      null == Z && a.empty
                        ? this
                        : ("string" === Y &&
                            ((r = b.exec(Z)),
                            r &&
                              (Z =
                                s +
                                parseFloat(r[2]) * ("+" === r[1] ? 1 : -1))),
                          (p[a.idx] = Z),
                          this[t](p)));
                });
            });
        }),
        (y.hook = function(c) {
          var a = c.split(" ");
          Q(a, function(e, d) {
            (R.cssHooks[d] = {
              set: function(i, u) {
                var f,
                  s,
                  p = "";
                if (
                  "transparent" !== u &&
                  ("string" !== R.type(u) || (f = X(u)))
                ) {
                  if (((u = y(f || u)), !T.rgba && 1 !== u._rgba[3])) {
                    for (
                      s = "backgroundColor" === d ? i.parentNode : i;
                      ("" === p || "transparent" === p) && s && s.style;

                    ) {
                      try {
                        (p = R.css(s, "backgroundColor")), (s = s.parentNode);
                      } catch (l) {}
                    }
                    u = u.blend(p && "transparent" !== p ? p : "_default");
                  }
                  u = u.toRgbaString();
                }
                try {
                  i.style[d] = u;
                } catch (l) {}
              }
            }),
              (R.fx.step[d] = function(f) {
                f.colorInit ||
                  ((f.start = y(f.elem, d)),
                  (f.end = y(f.end)),
                  (f.colorInit = !0)),
                  R.cssHooks[d].set(f.elem, f.start.transition(f.end, f.pos));
              });
          });
        }),
        y.hook(m),
        (R.cssHooks.borderColor = {
          expand: function(c) {
            var a = {};
            return (
              Q(["Top", "Right", "Bottom", "Left"], function(d, e) {
                a["border" + e + "Color"] = c;
              }),
              a
            );
          }
        }),
        (U = R.Color.names = {
          aqua: "#00ffff",
          black: "#000000",
          blue: "#0000ff",
          fuchsia: "#ff00ff",
          gray: "#808080",
          green: "#008000",
          lime: "#00ff00",
          maroon: "#800000",
          navy: "#000080",
          olive: "#808000",
          purple: "#800080",
          red: "#ff0000",
          silver: "#c0c0c0",
          teal: "#008080",
          white: "#ffffff",
          yellow: "#ffff00",
          transparent: [null, null, null, 0],
          _default: "#ffffff"
        });
    })(M),
    (function() {
      function b(g) {
        var f,
          h,
          l = g.ownerDocument.defaultView
            ? g.ownerDocument.defaultView.getComputedStyle(g, null)
            : g.currentStyle,
          e = {};
        if (l && l.length && l[0] && l[l[0]]) {
          for (h = l.length; h--; ) {
            (f = l[h]), "string" == typeof l[f] && (e[J.camelCase(f)] = l[f]);
          }
        } else {
          for (f in l) {
            "string" == typeof l[f] && (e[f] = l[f]);
          }
        }
        return e;
      }
      function a(g, f) {
        var h,
          e,
          l = {};
        for (h in f) {
          (e = f[h]),
            g[h] !== e &&
              (d[h] || ((J.fx.step[h] || !isNaN(parseFloat(e))) && (l[h] = e)));
        }
        return l;
      }
      var c = ["add", "remove", "toggle"],
        d = {
          border: 1,
          borderBottom: 1,
          borderColor: 1,
          borderLeft: 1,
          borderRight: 1,
          borderTop: 1,
          borderWidth: 1,
          margin: 1,
          padding: 1
        };
      J.each(
        [
          "borderLeftStyle",
          "borderRightStyle",
          "borderBottomStyle",
          "borderTopStyle"
        ],
        function(f, e) {
          J.fx.step[e] = function(g) {
            (("none" !== g.end && !g.setAttr) || (1 === g.pos && !g.setAttr)) &&
              (M.style(g.elem, e, g.end), (g.setAttr = !0));
          };
        }
      ),
        J.fn.addBack ||
          (J.fn.addBack = function(f) {
            return this.add(
              null == f ? this.prevObject : this.prevObject.filter(f)
            );
          }),
        (J.effects.animateClass = function(l, e, i, g) {
          var f = J.speed(e, i, g);
          return this.queue(function() {
            var m,
              p = J(this),
              n = p.attr("class") || "",
              h = f.children ? p.find("*").addBack() : p;
            (h = h.map(function() {
              var o = J(this);
              return { el: o, start: b(this) };
            })),
              (m = function() {
                J.each(c, function(r, o) {
                  l[o] && p[o + "Class"](l[o]);
                });
              }),
              m(),
              (h = h.map(function() {
                return (
                  (this.end = b(this.el[0])),
                  (this.diff = a(this.start, this.end)),
                  this
                );
              })),
              p.attr("class", n),
              (h = h.map(function() {
                var r = this,
                  o = J.Deferred(),
                  u = J.extend({}, f, {
                    queue: !1,
                    complete: function() {
                      o.resolve(r);
                    }
                  });
                return this.el.animate(this.diff, u), o.promise();
              })),
              J.when.apply(J, h.get()).done(function() {
                m(),
                  J.each(arguments, function() {
                    var o = this.el;
                    J.each(this.diff, function(r) {
                      o.css(r, "");
                    });
                  }),
                  f.complete.call(p[0]);
              });
          });
        }),
        J.fn.extend({
          addClass: (function(e) {
            return function(g, h, l, f) {
              return h
                ? J.effects.animateClass.call(this, { add: g }, h, l, f)
                : e.apply(this, arguments);
            };
          })(J.fn.addClass),
          removeClass: (function(e) {
            return function(g, h, l, f) {
              return arguments.length > 1
                ? J.effects.animateClass.call(this, { remove: g }, h, l, f)
                : e.apply(this, arguments);
            };
          })(J.fn.removeClass),
          toggleClass: (function(e) {
            return function(g, h, m, f, l) {
              return "boolean" == typeof h || void 0 === h
                ? m
                  ? J.effects.animateClass.call(
                      this,
                      h ? { add: g } : { remove: g },
                      m,
                      f,
                      l
                    )
                  : e.apply(this, arguments)
                : J.effects.animateClass.call(this, { toggle: g }, h, m, f);
            };
          })(J.fn.toggleClass),
          switchClass: function(g, f, h, l, e) {
            return J.effects.animateClass.call(
              this,
              { add: f, remove: g },
              h,
              l,
              e
            );
          }
        });
    })(),
    (function() {
      function b(d, c, e, f) {
        return (
          J.isPlainObject(d) && ((c = d), (d = d.effect)),
          (d = { effect: d }),
          null == c && (c = {}),
          J.isFunction(c) && ((f = c), (e = null), (c = {})),
          ("number" == typeof c || J.fx.speeds[c]) &&
            ((f = e), (e = c), (c = {})),
          J.isFunction(e) && ((f = e), (e = null)),
          c && J.extend(d, c),
          (e = e || c.duration),
          (d.duration = J.fx.off
            ? 0
            : "number" == typeof e
              ? e
              : e in J.fx.speeds
                ? J.fx.speeds[e]
                : J.fx.speeds._default),
          (d.complete = f || c.complete),
          d
        );
      }
      function a(c) {
        return !c || "number" == typeof c || J.fx.speeds[c]
          ? !0
          : "string" != typeof c || J.effects.effect[c]
            ? J.isFunction(c)
              ? !0
              : "object" != typeof c || c.effect
                ? !1
                : !0
            : !0;
      }
      J.extend(J.effects, {
        version: "1.11.2",
        save: function(f, d) {
          for (var c = 0; d.length > c; c++) {
            null !== d[c] && f.data(j + d[c], f[0].style[d[c]]);
          }
        },
        restore: function(g, d) {
          var c, f;
          for (f = 0; d.length > f; f++) {
            null !== d[f] &&
              ((c = g.data(j + d[f])),
              void 0 === c && (c = ""),
              g.css(d[f], c));
          }
        },
        setMode: function(d, c) {
          return "toggle" === c && (c = d.is(":hidden") ? "show" : "hide"), c;
        },
        getBaseline: function(g, d) {
          var c, f;
          switch (g[0]) {
            case "top":
              c = 0;
              break;
            case "middle":
              c = 0.5;
              break;
            case "bottom":
              c = 1;
              break;
            default:
              c = g[0] / d.height;
          }
          switch (g[1]) {
            case "left":
              f = 0;
              break;
            case "center":
              f = 0.5;
              break;
            case "right":
              f = 1;
              break;
            default:
              f = g[1] / d.width;
          }
          return { x: f, y: c };
        },
        createWrapper: function(e) {
          if (e.parent().is(".ui-effects-wrapper")) {
            return e.parent();
          }
          var d = {
              width: e.outerWidth(!0),
              height: e.outerHeight(!0),
              float: e.css("float")
            },
            f = J("<div></div>")
              .addClass("ui-effects-wrapper")
              .css({
                fontSize: "100%",
                background: "transparent",
                border: "none",
                margin: 0,
                padding: 0
              }),
            h = { width: e.width(), height: e.height() },
            c = document.activeElement;
          try {
            c.id;
          } catch (g) {
            c = document.body;
          }
          return (
            e.wrap(f),
            (e[0] === c || J.contains(e[0], c)) && J(c).focus(),
            (f = e.parent()),
            "static" === e.css("position")
              ? (f.css({ position: "relative" }),
                e.css({ position: "relative" }))
              : (J.extend(d, {
                  position: e.css("position"),
                  zIndex: e.css("z-index")
                }),
                J.each(["top", "left", "bottom", "right"], function(l, i) {
                  (d[i] = e.css(i)),
                    isNaN(parseInt(d[i], 10)) && (d[i] = "auto");
                }),
                e.css({
                  position: "relative",
                  top: 0,
                  left: 0,
                  right: "auto",
                  bottom: "auto"
                })),
            e.css(h),
            f.css(d).show()
          );
        },
        removeWrapper: function(d) {
          var c = document.activeElement;
          return (
            d.parent().is(".ui-effects-wrapper") &&
              (d.parent().replaceWith(d),
              (d[0] === c || J.contains(d[0], c)) && J(c).focus()),
            d
          );
        },
        setTransition: function(d, c, e, f) {
          return (
            (f = f || {}),
            J.each(c, function(l, h) {
              var g = d.cssUnit(h);
              g[0] > 0 && (f[h] = g[0] * e + g[1]);
            }),
            f
          );
        }
      }),
        J.fn.extend({
          effect: function() {
            function d(m) {
              function l() {
                J.isFunction(h) && h.call(p[0]), J.isFunction(m) && m();
              }
              var p = J(this),
                h = e.complete,
                o = e.mode;
              (p.is(":hidden")
              ? "hide" === o
              : "show" === o)
                ? (p[o](), l())
                : f.call(p[0], e, l);
            }
            var e = b.apply(this, arguments),
              g = e.mode,
              c = e.queue,
              f = J.effects.effect[e.effect];
            return J.fx.off || !f
              ? g
                ? this[g](e.duration, e.complete)
                : this.each(function() {
                    e.complete && e.complete.call(this);
                  })
              : c === !1
                ? this.each(d)
                : this.queue(c || "fx", d);
          },
          show: (function(c) {
            return function(d) {
              if (a(d)) {
                return c.apply(this, arguments);
              }
              var e = b.apply(this, arguments);
              return (e.mode = "show"), this.effect.call(this, e);
            };
          })(J.fn.show),
          hide: (function(c) {
            return function(d) {
              if (a(d)) {
                return c.apply(this, arguments);
              }
              var e = b.apply(this, arguments);
              return (e.mode = "hide"), this.effect.call(this, e);
            };
          })(J.fn.hide),
          toggle: (function(c) {
            return function(d) {
              if (a(d) || "boolean" == typeof d) {
                return c.apply(this, arguments);
              }
              var e = b.apply(this, arguments);
              return (e.mode = "toggle"), this.effect.call(this, e);
            };
          })(J.fn.toggle),
          cssUnit: function(d) {
            var c = this.css(d),
              e = [];
            return (
              J.each(["em", "px", "%", "pt"], function(g, f) {
                c.indexOf(f) > 0 && (e = [parseFloat(c), f]);
              }),
              e
            );
          }
        });
    })(),
    (function() {
      var a = {};
      J.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(c, b) {
        a[b] = function(d) {
          return Math.pow(d, c + 2);
        };
      }),
        J.extend(a, {
          Sine: function(b) {
            return 1 - Math.cos(b * Math.PI / 2);
          },
          Circ: function(b) {
            return 1 - Math.sqrt(1 - b * b);
          },
          Elastic: function(b) {
            return 0 === b || 1 === b
              ? b
              : -Math.pow(2, 8 * (b - 1)) *
                  Math.sin((80 * (b - 1) - 7.5) * Math.PI / 15);
          },
          Back: function(b) {
            return b * b * (3 * b - 2);
          },
          Bounce: function(d) {
            for (var c, b = 4; ((c = Math.pow(2, --b)) - 1) / 11 > d; ) {}
            return (
              1 / Math.pow(4, 3 - b) -
              7.5625 * Math.pow((3 * c - 2) / 22 - d, 2)
            );
          }
        }),
        J.each(a, function(c, b) {
          (J.easing["easeIn" + c] = b),
            (J.easing["easeOut" + c] = function(d) {
              return 1 - b(1 - d);
            }),
            (J.easing["easeInOut" + c] = function(d) {
              return 0.5 > d ? b(2 * d) / 2 : 1 - b(-2 * d + 2) / 2;
            });
        });
    })(),
    J.effects,
    (J.effects.effect.blind = function(aa, R) {
      var ab,
        O,
        X,
        y = J(this),
        b = /up|down|vertical/,
        S = /up|left|vertical|horizontal/,
        Q = ["position", "top", "bottom", "left", "right", "height", "width"],
        Z = J.effects.setMode(y, aa.mode || "hide"),
        V = aa.direction || "up",
        W = b.test(V),
        e = W ? "height" : "width",
        U = W ? "top" : "left",
        P = S.test(V),
        T = {},
        Y = "show" === Z;
      y.parent().is(".ui-effects-wrapper")
        ? J.effects.save(y.parent(), Q)
        : J.effects.save(y, Q),
        y.show(),
        (ab = J.effects.createWrapper(y).css({ overflow: "hidden" })),
        (O = ab[e]()),
        (X = parseFloat(ab.css(U)) || 0),
        (T[e] = Y ? O : 0),
        P ||
          (y
            .css(W ? "bottom" : "right", 0)
            .css(W ? "top" : "left", "auto")
            .css({ position: "absolute" }),
          (T[U] = Y ? X : O + X)),
        Y && (ab.css(e, 0), P || ab.css(U, X + O)),
        ab.animate(T, {
          duration: aa.duration,
          easing: aa.easing,
          queue: !1,
          complete: function() {
            "hide" === Z && y.hide(),
              J.effects.restore(y, Q),
              J.effects.removeWrapper(y),
              R();
          }
        });
    }),
    (J.effects.effect.bounce = function(Q, Y) {
      var R,
        V,
        af,
        U = J(this),
        S = ["position", "top", "bottom", "left", "right", "height", "width"],
        Z = J.effects.setMode(U, Q.mode || "effect"),
        X = "hide" === Z,
        P = "show" === Z,
        ac = Q.direction || "up",
        ad = Q.distance,
        T = Q.times || 5,
        ab = 2 * T + (P || X ? 1 : 0),
        W = Q.duration / ab,
        aa = Q.easing,
        O = "up" === ac || "down" === ac ? "top" : "left",
        e = "up" === ac || "left" === ac,
        ae = U.queue(),
        ag = ae.length;
      for (
        (P || X) && S.push("opacity"),
          J.effects.save(U, S),
          U.show(),
          J.effects.createWrapper(U),
          ad || (ad = U["top" === O ? "outerHeight" : "outerWidth"]() / 3),
          P &&
            ((af = { opacity: 1 }),
            (af[O] = 0),
            U.css("opacity", 0)
              .css(O, e ? 2 * -ad : 2 * ad)
              .animate(af, W, aa)),
          X && (ad /= Math.pow(2, T - 1)),
          af = {},
          af[O] = 0,
          R = 0;
        T > R;
        R++
      ) {
        (V = {}),
          (V[O] = (e ? "-=" : "+=") + ad),
          U.animate(V, W, aa).animate(af, W, aa),
          (ad = X ? 2 * ad : ad / 2);
      }
      X &&
        ((V = { opacity: 0 }),
        (V[O] = (e ? "-=" : "+=") + ad),
        U.animate(V, W, aa)),
        U.queue(function() {
          X && U.hide(),
            J.effects.restore(U, S),
            J.effects.removeWrapper(U),
            Y();
        }),
        ag > 1 && ae.splice.apply(ae, [1, 0].concat(ae.splice(ag, ab + 1))),
        U.dequeue();
    }),
    (J.effects.effect.clip = function(U, y) {
      var V,
        m,
        S,
        g = J(this),
        b = ["position", "top", "bottom", "left", "right", "height", "width"],
        O = J.effects.setMode(g, U.mode || "hide"),
        v = "show" === O,
        T = U.direction || "vertical",
        Q = "vertical" === T,
        R = Q ? "height" : "width",
        e = Q ? "top" : "left",
        P = {};
      J.effects.save(g, b),
        g.show(),
        (V = J.effects.createWrapper(g).css({ overflow: "hidden" })),
        (m = "IMG" === g[0].tagName ? V : g),
        (S = m[R]()),
        v && (m.css(R, 0), m.css(e, S / 2)),
        (P[R] = v ? S : 0),
        (P[e] = v ? 0 : S / 2),
        m.animate(P, {
          queue: !1,
          duration: U.duration,
          easing: U.easing,
          complete: function() {
            v || g.hide(),
              J.effects.restore(g, b),
              J.effects.removeWrapper(g),
              y();
          }
        });
    }),
    (J.effects.effect.drop = function(O, g) {
      var P,
        e = J(this),
        v = [
          "position",
          "top",
          "bottom",
          "left",
          "right",
          "opacity",
          "height",
          "width"
        ],
        c = J.effects.setMode(e, O.mode || "hide"),
        b = "show" === c,
        m = O.direction || "left",
        f = "up" === m || "down" === m ? "top" : "left",
        y = "up" === m || "left" === m ? "pos" : "neg",
        p = { opacity: b ? 1 : 0 };
      J.effects.save(e, v),
        e.show(),
        J.effects.createWrapper(e),
        (P =
          O.distance || e["top" === f ? "outerHeight" : "outerWidth"](!0) / 2),
        b && e.css("opacity", 0).css(f, "pos" === y ? -P : P),
        (p[f] =
          (b ? ("pos" === y ? "+=" : "-=") : "pos" === y ? "-=" : "+=") + P),
        e.animate(p, {
          queue: !1,
          duration: O.duration,
          easing: O.easing,
          complete: function() {
            "hide" === c && e.hide(),
              J.effects.restore(e, v),
              J.effects.removeWrapper(e),
              g();
          }
        });
    }),
    (J.effects.effect.explode = function(Q, Y) {
      function R() {
        ae.push(this), ae.length === ac * ad && V();
      }
      function V() {
        T.css({ visibility: "visible" }), J(ae).remove(), W || T.hide(), Y();
      }
      var af,
        U,
        S,
        Z,
        X,
        P,
        ac = Q.pieces ? Math.round(Math.sqrt(Q.pieces)) : 3,
        ad = ac,
        T = J(this),
        ab = J.effects.setMode(T, Q.mode || "hide"),
        W = "show" === ab,
        aa = T.show()
          .css("visibility", "hidden")
          .offset(),
        O = Math.ceil(T.outerWidth() / ad),
        e = Math.ceil(T.outerHeight() / ac),
        ae = [];
      for (af = 0; ac > af; af++) {
        for (Z = aa.top + af * e, P = af - (ac - 1) / 2, U = 0; ad > U; U++) {
          (S = aa.left + U * O),
            (X = U - (ad - 1) / 2),
            T.clone()
              .appendTo("body")
              .wrap("<div></div>")
              .css({
                position: "absolute",
                visibility: "visible",
                left: -U * O,
                top: -af * e
              })
              .parent()
              .addClass("ui-effects-explode")
              .css({
                position: "absolute",
                overflow: "hidden",
                width: O,
                height: e,
                left: S + (W ? X * O : 0),
                top: Z + (W ? P * e : 0),
                opacity: W ? 0 : 1
              })
              .animate(
                {
                  left: S + (W ? 0 : X * O),
                  top: Z + (W ? 0 : P * e),
                  opacity: W ? 1 : 0
                },
                Q.duration || 500,
                Q.easing,
                R
              );
        }
      }
    }),
    (J.effects.effect.fade = function(b, a) {
      var c = J(this),
        d = J.effects.setMode(c, b.mode || "toggle");
      c.animate(
        { opacity: d },
        { queue: !1, duration: b.duration, easing: b.easing, complete: a }
      );
    }),
    (J.effects.effect.fold = function(aa, R) {
      var ab,
        O,
        X = J(this),
        y = ["position", "top", "bottom", "left", "right", "height", "width"],
        b = J.effects.setMode(X, aa.mode || "hide"),
        S = "show" === b,
        Q = "hide" === b,
        Z = aa.size || 15,
        V = /([0-9]+)%/.exec(Z),
        W = !!aa.horizFirst,
        e = S !== W,
        U = e ? ["width", "height"] : ["height", "width"],
        P = aa.duration / 2,
        T = {},
        Y = {};
      J.effects.save(X, y),
        X.show(),
        (ab = J.effects.createWrapper(X).css({ overflow: "hidden" })),
        (O = e ? [ab.width(), ab.height()] : [ab.height(), ab.width()]),
        V && (Z = parseInt(V[1], 10) / 100 * O[Q ? 0 : 1]),
        S && ab.css(W ? { height: 0, width: Z } : { height: Z, width: 0 }),
        (T[U[0]] = S ? O[0] : Z),
        (Y[U[1]] = S ? O[1] : 0),
        ab.animate(T, P, aa.easing).animate(Y, P, aa.easing, function() {
          Q && X.hide(),
            J.effects.restore(X, y),
            J.effects.removeWrapper(X),
            R();
        });
    }),
    (J.effects.effect.highlight = function(d, c) {
      var e = J(this),
        g = ["backgroundImage", "backgroundColor", "opacity"],
        b = J.effects.setMode(e, d.mode || "show"),
        f = { backgroundColor: e.css("backgroundColor") };
      "hide" === b && (f.opacity = 0),
        J.effects.save(e, g),
        e
          .show()
          .css({
            backgroundImage: "none",
            backgroundColor: d.color || "#ffff99"
          })
          .animate(f, {
            queue: !1,
            duration: d.duration,
            easing: d.easing,
            complete: function() {
              "hide" === b && e.hide(), J.effects.restore(e, g), c();
            }
          });
    }),
    (J.effects.effect.size = function(Q, Y) {
      var R,
        V,
        af,
        U = J(this),
        S = [
          "position",
          "top",
          "bottom",
          "left",
          "right",
          "width",
          "height",
          "overflow",
          "opacity"
        ],
        Z = [
          "position",
          "top",
          "bottom",
          "left",
          "right",
          "overflow",
          "opacity"
        ],
        X = ["width", "height", "overflow"],
        P = ["fontSize"],
        ac = [
          "borderTopWidth",
          "borderBottomWidth",
          "paddingTop",
          "paddingBottom"
        ],
        ad = [
          "borderLeftWidth",
          "borderRightWidth",
          "paddingLeft",
          "paddingRight"
        ],
        T = J.effects.setMode(U, Q.mode || "effect"),
        ab = Q.restore || "effect" !== T,
        W = Q.scale || "both",
        aa = Q.origin || ["middle", "center"],
        O = U.css("position"),
        e = ab ? S : Z,
        ae = { height: 0, width: 0, outerHeight: 0, outerWidth: 0 };
      "show" === T && U.show(),
        (R = {
          height: U.height(),
          width: U.width(),
          outerHeight: U.outerHeight(),
          outerWidth: U.outerWidth()
        }),
        "toggle" === Q.mode && "show" === T
          ? ((U.from = Q.to || ae), (U.to = Q.from || R))
          : ((U.from = Q.from || ("show" === T ? ae : R)),
            (U.to = Q.to || ("hide" === T ? ae : R))),
        (af = {
          from: { y: U.from.height / R.height, x: U.from.width / R.width },
          to: { y: U.to.height / R.height, x: U.to.width / R.width }
        }),
        ("box" === W || "both" === W) &&
          (af.from.y !== af.to.y &&
            ((e = e.concat(ac)),
            (U.from = J.effects.setTransition(U, ac, af.from.y, U.from)),
            (U.to = J.effects.setTransition(U, ac, af.to.y, U.to))),
          af.from.x !== af.to.x &&
            ((e = e.concat(ad)),
            (U.from = J.effects.setTransition(U, ad, af.from.x, U.from)),
            (U.to = J.effects.setTransition(U, ad, af.to.x, U.to)))),
        ("content" === W || "both" === W) &&
          af.from.y !== af.to.y &&
          ((e = e.concat(P).concat(X)),
          (U.from = J.effects.setTransition(U, P, af.from.y, U.from)),
          (U.to = J.effects.setTransition(U, P, af.to.y, U.to))),
        J.effects.save(U, e),
        U.show(),
        J.effects.createWrapper(U),
        U.css("overflow", "hidden").css(U.from),
        aa &&
          ((V = J.effects.getBaseline(aa, R)),
          (U.from.top = (R.outerHeight - U.outerHeight()) * V.y),
          (U.from.left = (R.outerWidth - U.outerWidth()) * V.x),
          (U.to.top = (R.outerHeight - U.to.outerHeight) * V.y),
          (U.to.left = (R.outerWidth - U.to.outerWidth) * V.x)),
        U.css(U.from),
        ("content" === W || "both" === W) &&
          ((ac = ac.concat(["marginTop", "marginBottom"]).concat(P)),
          (ad = ad.concat(["marginLeft", "marginRight"])),
          (X = S.concat(ac).concat(ad)),
          U.find("*[width]").each(function() {
            var a = J(this),
              b = {
                height: a.height(),
                width: a.width(),
                outerHeight: a.outerHeight(),
                outerWidth: a.outerWidth()
              };
            ab && J.effects.save(a, X),
              (a.from = {
                height: b.height * af.from.y,
                width: b.width * af.from.x,
                outerHeight: b.outerHeight * af.from.y,
                outerWidth: b.outerWidth * af.from.x
              }),
              (a.to = {
                height: b.height * af.to.y,
                width: b.width * af.to.x,
                outerHeight: b.height * af.to.y,
                outerWidth: b.width * af.to.x
              }),
              af.from.y !== af.to.y &&
                ((a.from = J.effects.setTransition(a, ac, af.from.y, a.from)),
                (a.to = J.effects.setTransition(a, ac, af.to.y, a.to))),
              af.from.x !== af.to.x &&
                ((a.from = J.effects.setTransition(a, ad, af.from.x, a.from)),
                (a.to = J.effects.setTransition(a, ad, af.to.x, a.to))),
              a.css(a.from),
              a.animate(a.to, Q.duration, Q.easing, function() {
                ab && J.effects.restore(a, X);
              });
          })),
        U.animate(U.to, {
          queue: !1,
          duration: Q.duration,
          easing: Q.easing,
          complete: function() {
            0 === U.to.opacity && U.css("opacity", U.from.opacity),
              "hide" === T && U.hide(),
              J.effects.restore(U, e),
              ab ||
                ("static" === O
                  ? U.css({
                      position: "relative",
                      top: U.to.top,
                      left: U.to.left
                    })
                  : J.each(["top", "left"], function(b, a) {
                      U.css(a, function(d, c) {
                        var f = parseInt(c, 10),
                          g = b ? U.to.left : U.to.top;
                        return "auto" === c ? g + "px" : f + g + "px";
                      });
                    })),
              J.effects.removeWrapper(U),
              Y();
          }
        });
    }),
    (J.effects.effect.scale = function(v, f) {
      var y = J(this),
        d = J.extend(!0, {}, v),
        m = J.effects.setMode(y, v.mode || "effect"),
        c =
          parseInt(v.percent, 10) ||
          (0 === parseInt(v.percent, 10) ? 0 : "hide" === m ? 0 : 100),
        b = v.direction || "both",
        g = v.origin,
        e = {
          height: y.height(),
          width: y.width(),
          outerHeight: y.outerHeight(),
          outerWidth: y.outerWidth()
        },
        p = {
          y: "horizontal" !== b ? c / 100 : 1,
          x: "vertical" !== b ? c / 100 : 1
        };
      (d.effect = "size"),
        (d.queue = !1),
        (d.complete = f),
        "effect" !== m &&
          ((d.origin = g || ["middle", "center"]), (d.restore = !0)),
        (d.from =
          v.from ||
          ("show" === m
            ? { height: 0, width: 0, outerHeight: 0, outerWidth: 0 }
            : e)),
        (d.to = {
          height: e.height * p.y,
          width: e.width * p.x,
          outerHeight: e.outerHeight * p.y,
          outerWidth: e.outerWidth * p.x
        }),
        d.fade &&
          ("show" === m && ((d.from.opacity = 0), (d.to.opacity = 1)),
          "hide" === m && ((d.from.opacity = 1), (d.to.opacity = 0))),
        y.effect(d);
    }),
    (J.effects.effect.puff = function(d, c) {
      var f = J(this),
        m = J.effects.setMode(f, d.mode || "hide"),
        b = "hide" === m,
        l = parseInt(d.percent, 10) || 150,
        g = l / 100,
        e = {
          height: f.height(),
          width: f.width(),
          outerHeight: f.outerHeight(),
          outerWidth: f.outerWidth()
        };
      J.extend(d, {
        effect: "scale",
        queue: !1,
        fade: !0,
        mode: m,
        complete: c,
        percent: b ? l : 100,
        from: b
          ? e
          : {
              height: e.height * g,
              width: e.width * g,
              outerHeight: e.outerHeight * g,
              outerWidth: e.outerWidth * g
            }
      }),
        f.effect(d);
    }),
    (J.effects.effect.pulsate = function(S, v) {
      var T,
        g = J(this),
        Q = J.effects.setMode(g, S.mode || "show"),
        f = "show" === Q,
        b = "hide" === Q,
        y = f || "hide" === Q,
        m = 2 * (S.times || 5) + (y ? 1 : 0),
        R = S.duration / m,
        O = 0,
        P = g.queue(),
        e = P.length;
      for (
        (f || !g.is(":visible")) && (g.css("opacity", 0).show(), (O = 1)),
          T = 1;
        m > T;
        T++
      ) {
        g.animate({ opacity: O }, R, S.easing), (O = 1 - O);
      }
      g.animate({ opacity: O }, R, S.easing),
        g.queue(function() {
          b && g.hide(), v();
        }),
        e > 1 && P.splice.apply(P, [1, 0].concat(P.splice(e, m + 1))),
        g.dequeue();
    }),
    (J.effects.effect.shake = function(P, X) {
      var Q,
        U = J(this),
        ad = ["position", "top", "bottom", "left", "right", "height", "width"],
        T = J.effects.setMode(U, P.mode || "effect"),
        R = P.direction || "left",
        Y = P.distance || 20,
        W = P.times || 3,
        O = 2 * W + 1,
        ab = Math.round(P.duration / O),
        ac = "up" === R || "down" === R ? "top" : "left",
        S = "up" === R || "left" === R,
        aa = {},
        V = {},
        Z = {},
        e = U.queue(),
        b = e.length;
      for (
        J.effects.save(U, ad),
          U.show(),
          J.effects.createWrapper(U),
          aa[ac] = (S ? "-=" : "+=") + Y,
          V[ac] = (S ? "+=" : "-=") + 2 * Y,
          Z[ac] = (S ? "-=" : "+=") + 2 * Y,
          U.animate(aa, ab, P.easing),
          Q = 1;
        W > Q;
        Q++
      ) {
        U.animate(V, ab, P.easing).animate(Z, ab, P.easing);
      }
      U.animate(V, ab, P.easing)
        .animate(aa, ab / 2, P.easing)
        .queue(function() {
          "hide" === T && U.hide(),
            J.effects.restore(U, ad),
            J.effects.removeWrapper(U),
            X();
        }),
        b > 1 && e.splice.apply(e, [1, 0].concat(e.splice(b, O + 1))),
        U.dequeue();
    }),
    (J.effects.effect.slide = function(O, g) {
      var P,
        e = J(this),
        v = ["position", "top", "bottom", "left", "right", "width", "height"],
        c = J.effects.setMode(e, O.mode || "show"),
        b = "show" === c,
        m = O.direction || "left",
        f = "up" === m || "down" === m ? "top" : "left",
        y = "up" === m || "left" === m,
        p = {};
      J.effects.save(e, v),
        e.show(),
        (P = O.distance || e["top" === f ? "outerHeight" : "outerWidth"](!0)),
        J.effects.createWrapper(e).css({ overflow: "hidden" }),
        b && e.css(f, y ? (isNaN(P) ? "-" + P : -P) : P),
        (p[f] = (b ? (y ? "+=" : "-=") : y ? "-=" : "+=") + P),
        e.animate(p, {
          queue: !1,
          duration: O.duration,
          easing: O.easing,
          complete: function() {
            "hide" === c && e.hide(),
              J.effects.restore(e, v),
              J.effects.removeWrapper(e),
              g();
          }
        });
    }),
    (J.effects.effect.transfer = function(Q, m) {
      var R = J(this),
        f = J(Q.to),
        O = "fixed" === f.css("position"),
        e = J("body"),
        b = O ? e.scrollTop() : 0,
        p = O ? e.scrollLeft() : 0,
        g = f.offset(),
        P = {
          top: g.top - b,
          left: g.left - p,
          height: f.innerHeight(),
          width: f.innerWidth()
        },
        v = R.offset(),
        y = J("<div class='ui-effects-transfer'></div>")
          .appendTo(document.body)
          .addClass(Q.className)
          .css({
            top: v.top - b,
            left: v.left - p,
            height: R.innerHeight(),
            width: R.innerWidth(),
            position: O ? "fixed" : "absolute"
          })
          .animate(P, Q.duration, Q.easing, function() {
            y.remove(), m();
          });
    }),
    J.widget("ui.progressbar", {
      version: "1.11.2",
      options: { max: 100, value: 0, change: null, complete: null },
      min: 0,
      _create: function() {
        (this.oldValue = this.options.value = this._constrainedValue()),
          this.element
            .addClass(
              "ui-progressbar ui-widget ui-widget-content ui-corner-all"
            )
            .attr({ role: "progressbar", "aria-valuemin": this.min }),
          (this.valueDiv = J(
            "<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>"
          ).appendTo(this.element)),
          this._refreshValue();
      },
      _destroy: function() {
        this.element
          .removeClass(
            "ui-progressbar ui-widget ui-widget-content ui-corner-all"
          )
          .removeAttr("role")
          .removeAttr("aria-valuemin")
          .removeAttr("aria-valuemax")
          .removeAttr("aria-valuenow"),
          this.valueDiv.remove();
      },
      value: function(a) {
        return void 0 === a
          ? this.options.value
          : ((this.options.value = this._constrainedValue(a)),
            this._refreshValue(),
            void 0);
      },
      _constrainedValue: function(a) {
        return (
          void 0 === a && (a = this.options.value),
          (this.indeterminate = a === !1),
          "number" != typeof a && (a = 0),
          this.indeterminate
            ? !1
            : Math.min(this.options.max, Math.max(this.min, a))
        );
      },
      _setOptions: function(b) {
        var a = b.value;
        delete b.value,
          this._super(b),
          (this.options.value = this._constrainedValue(a)),
          this._refreshValue();
      },
      _setOption: function(b, a) {
        "max" === b && (a = Math.max(this.min, a)),
          "disabled" === b &&
            this.element
              .toggleClass("ui-state-disabled", !!a)
              .attr("aria-disabled", a),
          this._super(b, a);
      },
      _percentage: function() {
        return this.indeterminate
          ? 100
          : 100 *
              (this.options.value - this.min) /
              (this.options.max - this.min);
      },
      _refreshValue: function() {
        var b = this.options.value,
          a = this._percentage();
        this.valueDiv
          .toggle(this.indeterminate || b > this.min)
          .toggleClass("ui-corner-right", b === this.options.max)
          .width(a.toFixed(0) + "%"),
          this.element.toggleClass(
            "ui-progressbar-indeterminate",
            this.indeterminate
          ),
          this.indeterminate
            ? (this.element.removeAttr("aria-valuenow"),
              this.overlayDiv ||
                (this.overlayDiv = J(
                  "<div class='ui-progressbar-overlay'></div>"
                ).appendTo(this.valueDiv)))
            : (this.element.attr({
                "aria-valuemax": this.options.max,
                "aria-valuenow": b
              }),
              this.overlayDiv &&
                (this.overlayDiv.remove(), (this.overlayDiv = null))),
          this.oldValue !== b && ((this.oldValue = b), this._trigger("change")),
          b === this.options.max && this._trigger("complete");
      }
    }),
    J.widget("ui.selectable", J.ui.mouse, {
      version: "1.11.2",
      options: {
        appendTo: "body",
        autoRefresh: !0,
        distance: 0,
        filter: "*",
        tolerance: "touch",
        selected: null,
        selecting: null,
        start: null,
        stop: null,
        unselected: null,
        unselecting: null
      },
      _create: function() {
        var b,
          a = this;
        this.element.addClass("ui-selectable"),
          (this.dragged = !1),
          (this.refresh = function() {
            (b = J(a.options.filter, a.element[0])),
              b.addClass("ui-selectee"),
              b.each(function() {
                var d = J(this),
                  c = d.offset();
                J.data(this, "selectable-item", {
                  element: this,
                  $element: d,
                  left: c.left,
                  top: c.top,
                  right: c.left + d.outerWidth(),
                  bottom: c.top + d.outerHeight(),
                  startselected: !1,
                  selected: d.hasClass("ui-selected"),
                  selecting: d.hasClass("ui-selecting"),
                  unselecting: d.hasClass("ui-unselecting")
                });
              });
          }),
          this.refresh(),
          (this.selectees = b.addClass("ui-selectee")),
          this._mouseInit(),
          (this.helper = J("<div class='ui-selectable-helper'></div>"));
      },
      _destroy: function() {
        this.selectees.removeClass("ui-selectee").removeData("selectable-item"),
          this.element.removeClass("ui-selectable ui-selectable-disabled"),
          this._mouseDestroy();
      },
      _mouseStart: function(b) {
        var a = this,
          c = this.options;
        (this.opos = [b.pageX, b.pageY]),
          this.options.disabled ||
            ((this.selectees = J(c.filter, this.element[0])),
            this._trigger("start", b),
            J(c.appendTo).append(this.helper),
            this.helper.css({
              left: b.pageX,
              top: b.pageY,
              width: 0,
              height: 0
            }),
            c.autoRefresh && this.refresh(),
            this.selectees.filter(".ui-selected").each(function() {
              var d = J.data(this, "selectable-item");
              (d.startselected = !0),
                b.metaKey ||
                  b.ctrlKey ||
                  (d.$element.removeClass("ui-selected"),
                  (d.selected = !1),
                  d.$element.addClass("ui-unselecting"),
                  (d.unselecting = !0),
                  a._trigger("unselecting", b, { unselecting: d.element }));
            }),
            J(b.target)
              .parents()
              .addBack()
              .each(function() {
                var d,
                  e = J.data(this, "selectable-item");
                return e
                  ? ((d =
                      (!b.metaKey && !b.ctrlKey) ||
                      !e.$element.hasClass("ui-selected")),
                    e.$element
                      .removeClass(d ? "ui-unselecting" : "ui-selected")
                      .addClass(d ? "ui-selecting" : "ui-unselecting"),
                    (e.unselecting = !d),
                    (e.selecting = d),
                    (e.selected = d),
                    d
                      ? a._trigger("selecting", b, { selecting: e.element })
                      : a._trigger("unselecting", b, {
                          unselecting: e.element
                        }),
                    !1)
                  : void 0;
              }));
      },
      _mouseDrag: function(d) {
        if (((this.dragged = !0), !this.options.disabled)) {
          var c,
            f = this,
            m = this.options,
            b = this.opos[0],
            l = this.opos[1],
            g = d.pageX,
            e = d.pageY;
          return (
            b > g && ((c = g), (g = b), (b = c)),
            l > e && ((c = e), (e = l), (l = c)),
            this.helper.css({ left: b, top: l, width: g - b, height: e - l }),
            this.selectees.each(function() {
              var h = J.data(this, "selectable-item"),
                a = !1;
              h &&
                h.element !== f.element[0] &&
                ("touch" === m.tolerance
                  ? (a = !(
                      h.left > g ||
                      b > h.right ||
                      h.top > e ||
                      l > h.bottom
                    ))
                  : "fit" === m.tolerance &&
                    (a =
                      h.left > b && g > h.right && h.top > l && e > h.bottom),
                a
                  ? (h.selected &&
                      (h.$element.removeClass("ui-selected"),
                      (h.selected = !1)),
                    h.unselecting &&
                      (h.$element.removeClass("ui-unselecting"),
                      (h.unselecting = !1)),
                    h.selecting ||
                      (h.$element.addClass("ui-selecting"),
                      (h.selecting = !0),
                      f._trigger("selecting", d, { selecting: h.element })))
                  : (h.selecting &&
                      ((d.metaKey || d.ctrlKey) && h.startselected
                        ? (h.$element.removeClass("ui-selecting"),
                          (h.selecting = !1),
                          h.$element.addClass("ui-selected"),
                          (h.selected = !0))
                        : (h.$element.removeClass("ui-selecting"),
                          (h.selecting = !1),
                          h.startselected &&
                            (h.$element.addClass("ui-unselecting"),
                            (h.unselecting = !0)),
                          f._trigger("unselecting", d, {
                            unselecting: h.element
                          }))),
                    h.selected &&
                      (d.metaKey ||
                        d.ctrlKey ||
                        h.startselected ||
                        (h.$element.removeClass("ui-selected"),
                        (h.selected = !1),
                        h.$element.addClass("ui-unselecting"),
                        (h.unselecting = !0),
                        f._trigger("unselecting", d, {
                          unselecting: h.element
                        })))));
            }),
            !1
          );
        }
      },
      _mouseStop: function(b) {
        var a = this;
        return (
          (this.dragged = !1),
          J(".ui-unselecting", this.element[0]).each(function() {
            var c = J.data(this, "selectable-item");
            c.$element.removeClass("ui-unselecting"),
              (c.unselecting = !1),
              (c.startselected = !1),
              a._trigger("unselected", b, { unselected: c.element });
          }),
          J(".ui-selecting", this.element[0]).each(function() {
            var c = J.data(this, "selectable-item");
            c.$element.removeClass("ui-selecting").addClass("ui-selected"),
              (c.selecting = !1),
              (c.selected = !0),
              (c.startselected = !0),
              a._trigger("selected", b, { selected: c.element });
          }),
          this._trigger("stop", b),
          this.helper.remove(),
          !1
        );
      }
    }),
    J.widget("ui.selectmenu", {
      version: "1.11.2",
      defaultElement: "<select>",
      options: {
        appendTo: null,
        disabled: null,
        icons: { button: "ui-icon-triangle-1-s" },
        position: { my: "left top", at: "left bottom", collision: "none" },
        width: null,
        change: null,
        close: null,
        focus: null,
        open: null,
        select: null
      },
      _create: function() {
        var a = this.element.uniqueId().attr("id");
        (this.ids = { element: a, button: a + "-button", menu: a + "-menu" }),
          this._drawButton(),
          this._drawMenu(),
          this.options.disabled && this.disable();
      },
      _drawButton: function() {
        var b = this,
          a = this.element.attr("tabindex");
        (this.label = J("label[for='" + this.ids.element + "']").attr(
          "for",
          this.ids.button
        )),
          this._on(this.label, {
            click: function(c) {
              this.button.focus(), c.preventDefault();
            }
          }),
          this.element.hide(),
          (this.button = J("<span>", {
            class:
              "ui-selectmenu-button ui-widget ui-state-default ui-corner-all",
            tabindex: a || this.options.disabled ? -1 : 0,
            id: this.ids.button,
            role: "combobox",
            "aria-expanded": "false",
            "aria-autocomplete": "list",
            "aria-owns": this.ids.menu,
            "aria-haspopup": "true"
          }).insertAfter(this.element)),
          J("<span>", {
            class: "ui-icon " + this.options.icons.button
          }).prependTo(this.button),
          (this.buttonText = J("<span>", {
            class: "ui-selectmenu-text"
          }).appendTo(this.button)),
          this._setText(
            this.buttonText,
            this.element.find("option:selected").text()
          ),
          this._resizeButton(),
          this._on(this.button, this._buttonEvents),
          this.button.one("focusin", function() {
            b.menuItems || b._refreshMenu();
          }),
          this._hoverable(this.button),
          this._focusable(this.button);
      },
      _drawMenu: function() {
        var a = this;
        (this.menu = J("<ul>", {
          "aria-hidden": "true",
          "aria-labelledby": this.ids.button,
          id: this.ids.menu
        })),
          (this.menuWrap = J("<div>", { class: "ui-selectmenu-menu ui-front" })
            .append(this.menu)
            .appendTo(this._appendTo())),
          (this.menuInstance = this.menu
            .menu({
              role: "listbox",
              select: function(c, b) {
                c.preventDefault(),
                  a._setSelection(),
                  a._select(b.item.data("ui-selectmenu-item"), c);
              },
              focus: function(d, b) {
                var c = b.item.data("ui-selectmenu-item");
                null != a.focusIndex &&
                  c.index !== a.focusIndex &&
                  (a._trigger("focus", d, { item: c }),
                  a.isOpen || a._select(c, d)),
                  (a.focusIndex = c.index),
                  a.button.attr(
                    "aria-activedescendant",
                    a.menuItems.eq(c.index).attr("id")
                  );
              }
            })
            .menu("instance")),
          this.menu.addClass("ui-corner-bottom").removeClass("ui-corner-all"),
          this.menuInstance._off(this.menu, "mouseleave"),
          (this.menuInstance._closeOnDocumentClick = function() {
            return !1;
          }),
          (this.menuInstance._isDivider = function() {
            return !1;
          });
      },
      refresh: function() {
        this._refreshMenu(),
          this._setText(this.buttonText, this._getSelectedItem().text()),
          this.options.width || this._resizeButton();
      },
      _refreshMenu: function() {
        this.menu.empty();
        var b,
          a = this.element.find("option");
        a.length &&
          (this._parseOptions(a),
          this._renderMenu(this.menu, this.items),
          this.menuInstance.refresh(),
          (this.menuItems = this.menu
            .find("li")
            .not(".ui-selectmenu-optgroup")),
          (b = this._getSelectedItem()),
          this.menuInstance.focus(null, b),
          this._setAria(b.data("ui-selectmenu-item")),
          this._setOption("disabled", this.element.prop("disabled")));
      },
      open: function(a) {
        this.options.disabled ||
          (this.menuItems
            ? (this.menu.find(".ui-state-focus").removeClass("ui-state-focus"),
              this.menuInstance.focus(null, this._getSelectedItem()))
            : this._refreshMenu(),
          (this.isOpen = !0),
          this._toggleAttr(),
          this._resizeMenu(),
          this._position(),
          this._on(this.document, this._documentClick),
          this._trigger("open", a));
      },
      _position: function() {
        this.menuWrap.position(
          J.extend({ of: this.button }, this.options.position)
        );
      },
      close: function(a) {
        this.isOpen &&
          ((this.isOpen = !1),
          this._toggleAttr(),
          (this.range = null),
          this._off(this.document),
          this._trigger("close", a));
      },
      widget: function() {
        return this.button;
      },
      menuWidget: function() {
        return this.menu;
      },
      _renderMenu: function(b, a) {
        var c = this,
          d = "";
        J.each(a, function(f, e) {
          e.optgroup !== d &&
            (J("<li>", {
              class:
                "ui-selectmenu-optgroup ui-menu-divider" +
                (e.element.parent("optgroup").prop("disabled")
                  ? " ui-state-disabled"
                  : ""),
              text: e.optgroup
            }).appendTo(b),
            (d = e.optgroup)),
            c._renderItemData(b, e);
        });
      },
      _renderItemData: function(b, a) {
        return this._renderItem(b, a).data("ui-selectmenu-item", a);
      },
      _renderItem: function(b, a) {
        var c = J("<li>");
        return (
          a.disabled && c.addClass("ui-state-disabled"),
          this._setText(c, a.label),
          c.appendTo(b)
        );
      },
      _setText: function(b, a) {
        a ? b.text(a) : b.html("&#160;");
      },
      _move: function(d, b) {
        var a,
          c,
          f = ".ui-menu-item";
        this.isOpen
          ? (a = this.menuItems.eq(this.focusIndex))
          : ((a = this.menuItems.eq(this.element[0].selectedIndex)),
            (f += ":not(.ui-state-disabled)")),
          (c =
            "first" === d || "last" === d
              ? a["first" === d ? "prevAll" : "nextAll"](f).eq(-1)
              : a[d + "All"](f).eq(0)),
          c.length && this.menuInstance.focus(b, c);
      },
      _getSelectedItem: function() {
        return this.menuItems.eq(this.element[0].selectedIndex);
      },
      _toggle: function(a) {
        this[this.isOpen ? "close" : "open"](a);
      },
      _setSelection: function() {
        var a;
        this.range &&
          (window.getSelection
            ? ((a = window.getSelection()),
              a.removeAllRanges(),
              a.addRange(this.range))
            : this.range.select(),
          this.button.focus());
      },
      _documentClick: {
        mousedown: function(a) {
          this.isOpen &&
            (J(a.target).closest(".ui-selectmenu-menu, #" + this.ids.button)
              .length ||
              this.close(a));
        }
      },
      _buttonEvents: {
        mousedown: function() {
          var a;
          window.getSelection
            ? ((a = window.getSelection()),
              a.rangeCount && (this.range = a.getRangeAt(0)))
            : (this.range = document.selection.createRange());
        },
        click: function(a) {
          this._setSelection(), this._toggle(a);
        },
        keydown: function(b) {
          var a = !0;
          switch (b.keyCode) {
            case J.ui.keyCode.TAB:
            case J.ui.keyCode.ESCAPE:
              this.close(b), (a = !1);
              break;
            case J.ui.keyCode.ENTER:
              this.isOpen && this._selectFocusedItem(b);
              break;
            case J.ui.keyCode.UP:
              b.altKey ? this._toggle(b) : this._move("prev", b);
              break;
            case J.ui.keyCode.DOWN:
              b.altKey ? this._toggle(b) : this._move("next", b);
              break;
            case J.ui.keyCode.SPACE:
              this.isOpen ? this._selectFocusedItem(b) : this._toggle(b);
              break;
            case J.ui.keyCode.LEFT:
              this._move("prev", b);
              break;
            case J.ui.keyCode.RIGHT:
              this._move("next", b);
              break;
            case J.ui.keyCode.HOME:
            case J.ui.keyCode.PAGE_UP:
              this._move("first", b);
              break;
            case J.ui.keyCode.END:
            case J.ui.keyCode.PAGE_DOWN:
              this._move("last", b);
              break;
            default:
              this.menu.trigger(b), (a = !1);
          }
          a && b.preventDefault();
        }
      },
      _selectFocusedItem: function(b) {
        var a = this.menuItems.eq(this.focusIndex);
        a.hasClass("ui-state-disabled") ||
          this._select(a.data("ui-selectmenu-item"), b);
      },
      _select: function(c, b) {
        var a = this.element[0].selectedIndex;
        (this.element[0].selectedIndex = c.index),
          this._setText(this.buttonText, c.label),
          this._setAria(c),
          this._trigger("select", b, { item: c }),
          c.index !== a && this._trigger("change", b, { item: c }),
          this.close(b);
      },
      _setAria: function(b) {
        var a = this.menuItems.eq(b.index).attr("id");
        this.button.attr({ "aria-labelledby": a, "aria-activedescendant": a }),
          this.menu.attr("aria-activedescendant", a);
      },
      _setOption: function(b, a) {
        "icons" === b &&
          this.button
            .find("span.ui-icon")
            .removeClass(this.options.icons.button)
            .addClass(a.button),
          this._super(b, a),
          "appendTo" === b && this.menuWrap.appendTo(this._appendTo()),
          "disabled" === b &&
            (this.menuInstance.option("disabled", a),
            this.button
              .toggleClass("ui-state-disabled", a)
              .attr("aria-disabled", a),
            this.element.prop("disabled", a),
            a
              ? (this.button.attr("tabindex", -1), this.close())
              : this.button.attr("tabindex", 0)),
          "width" === b && this._resizeButton();
      },
      _appendTo: function() {
        var a = this.options.appendTo;
        return (
          a &&
            (a = a.jquery || a.nodeType ? J(a) : this.document.find(a).eq(0)),
          (a && a[0]) || (a = this.element.closest(".ui-front")),
          a.length || (a = this.document[0].body),
          a
        );
      },
      _toggleAttr: function() {
        this.button
          .toggleClass("ui-corner-top", this.isOpen)
          .toggleClass("ui-corner-all", !this.isOpen)
          .attr("aria-expanded", this.isOpen),
          this.menuWrap.toggleClass("ui-selectmenu-open", this.isOpen),
          this.menu.attr("aria-hidden", !this.isOpen);
      },
      _resizeButton: function() {
        var a = this.options.width;
        a || ((a = this.element.show().outerWidth()), this.element.hide()),
          this.button.outerWidth(a);
      },
      _resizeMenu: function() {
        this.menu.outerWidth(
          Math.max(
            this.button.outerWidth(),
            this.menu.width("").outerWidth() + 1
          )
        );
      },
      _getCreateOptions: function() {
        return { disabled: this.element.prop("disabled") };
      },
      _parseOptions: function(b) {
        var a = [];
        b.each(function(d, e) {
          var f = J(e),
            c = f.parent("optgroup");
          a.push({
            element: f,
            index: d,
            value: f.attr("value"),
            label: f.text(),
            optgroup: c.attr("label") || "",
            disabled: c.prop("disabled") || f.prop("disabled")
          });
        }),
          (this.items = a);
      },
      _destroy: function() {
        this.menuWrap.remove(),
          this.button.remove(),
          this.element.show(),
          this.element.removeUniqueId(),
          this.label.attr("for", this.ids.element);
      }
    }),
    J.widget("ui.slider", J.ui.mouse, {
      version: "1.11.2",
      widgetEventPrefix: "slide",
      options: {
        animate: !1,
        distance: 0,
        max: 100,
        min: 0,
        orientation: "horizontal",
        range: !1,
        step: 1,
        value: 0,
        values: null,
        change: null,
        slide: null,
        start: null,
        stop: null
      },
      numPages: 5,
      _create: function() {
        (this._keySliding = !1),
          (this._mouseSliding = !1),
          (this._animateOff = !0),
          (this._handleIndex = null),
          this._detectOrientation(),
          this._mouseInit(),
          this._calculateNewMax(),
          this.element.addClass(
            "ui-slider ui-slider-" +
              this.orientation +
              " ui-widget ui-widget-content ui-corner-all"
          ),
          this._refresh(),
          this._setOption("disabled", this.options.disabled),
          (this._animateOff = !1);
      },
      _refresh: function() {
        this._createRange(),
          this._createHandles(),
          this._setupEvents(),
          this._refreshValue();
      },
      _createHandles: function() {
        var d,
          c,
          e = this.options,
          g = this.element
            .find(".ui-slider-handle")
            .addClass("ui-state-default ui-corner-all"),
          b =
            "<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>",
          f = [];
        for (
          c = (e.values && e.values.length) || 1,
            g.length > c && (g.slice(c).remove(), (g = g.slice(0, c))),
            d = g.length;
          c > d;
          d++
        ) {
          f.push(b);
        }
        (this.handles = g.add(J(f.join("")).appendTo(this.element))),
          (this.handle = this.handles.eq(0)),
          this.handles.each(function(a) {
            J(this).data("ui-slider-handle-index", a);
          });
      },
      _createRange: function() {
        var b = this.options,
          a = "";
        b.range
          ? (b.range === !0 &&
              (b.values
                ? b.values.length && 2 !== b.values.length
                  ? (b.values = [b.values[0], b.values[0]])
                  : J.isArray(b.values) && (b.values = b.values.slice(0))
                : (b.values = [this._valueMin(), this._valueMin()])),
            this.range && this.range.length
              ? this.range
                  .removeClass("ui-slider-range-min ui-slider-range-max")
                  .css({ left: "", bottom: "" })
              : ((this.range = J("<div></div>").appendTo(this.element)),
                (a = "ui-slider-range ui-widget-header ui-corner-all")),
            this.range.addClass(
              a +
                ("min" === b.range || "max" === b.range
                  ? " ui-slider-range-" + b.range
                  : "")
            ))
          : (this.range && this.range.remove(), (this.range = null));
      },
      _setupEvents: function() {
        this._off(this.handles),
          this._on(this.handles, this._handleEvents),
          this._hoverable(this.handles),
          this._focusable(this.handles);
      },
      _destroy: function() {
        this.handles.remove(),
          this.range && this.range.remove(),
          this.element.removeClass(
            "ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"
          ),
          this._mouseDestroy();
      },
      _mouseCapture: function(O) {
        var g,
          P,
          e,
          v,
          c,
          b,
          m,
          f,
          y = this,
          p = this.options;
        return p.disabled
          ? !1
          : ((this.elementSize = {
              width: this.element.outerWidth(),
              height: this.element.outerHeight()
            }),
            (this.elementOffset = this.element.offset()),
            (g = { x: O.pageX, y: O.pageY }),
            (P = this._normValueFromMouse(g)),
            (e = this._valueMax() - this._valueMin() + 1),
            this.handles.each(function(d) {
              var a = Math.abs(P - y.values(d));
              (e > a ||
                (e === a &&
                  (d === y._lastChangedValue || y.values(d) === p.min))) &&
                ((e = a), (v = J(this)), (c = d));
            }),
            (b = this._start(O, c)),
            b === !1
              ? !1
              : ((this._mouseSliding = !0),
                (this._handleIndex = c),
                v.addClass("ui-state-active").focus(),
                (m = v.offset()),
                (f = !J(O.target)
                  .parents()
                  .addBack()
                  .is(".ui-slider-handle")),
                (this._clickOffset = f
                  ? { left: 0, top: 0 }
                  : {
                      left: O.pageX - m.left - v.width() / 2,
                      top:
                        O.pageY -
                        m.top -
                        v.height() / 2 -
                        (parseInt(v.css("borderTopWidth"), 10) || 0) -
                        (parseInt(v.css("borderBottomWidth"), 10) || 0) +
                        (parseInt(v.css("marginTop"), 10) || 0)
                    }),
                this.handles.hasClass("ui-state-hover") || this._slide(O, c, P),
                (this._animateOff = !0),
                !0));
      },
      _mouseStart: function() {
        return !0;
      },
      _mouseDrag: function(c) {
        var b = { x: c.pageX, y: c.pageY },
          a = this._normValueFromMouse(b);
        return this._slide(c, this._handleIndex, a), !1;
      },
      _mouseStop: function(a) {
        return (
          this.handles.removeClass("ui-state-active"),
          (this._mouseSliding = !1),
          this._stop(a, this._handleIndex),
          this._change(a, this._handleIndex),
          (this._handleIndex = null),
          (this._clickOffset = null),
          (this._animateOff = !1),
          !1
        );
      },
      _detectOrientation: function() {
        this.orientation =
          "vertical" === this.options.orientation ? "vertical" : "horizontal";
      },
      _normValueFromMouse: function(g) {
        var d, c, f, h, b;
        return (
          "horizontal" === this.orientation
            ? ((d = this.elementSize.width),
              (c =
                g.x -
                this.elementOffset.left -
                (this._clickOffset ? this._clickOffset.left : 0)))
            : ((d = this.elementSize.height),
              (c =
                g.y -
                this.elementOffset.top -
                (this._clickOffset ? this._clickOffset.top : 0))),
          (f = c / d),
          f > 1 && (f = 1),
          0 > f && (f = 0),
          "vertical" === this.orientation && (f = 1 - f),
          (h = this._valueMax() - this._valueMin()),
          (b = this._valueMin() + f * h),
          this._trimAlignValue(b)
        );
      },
      _start: function(c, b) {
        var a = { handle: this.handles[b], value: this.value() };
        return (
          this.options.values &&
            this.options.values.length &&
            ((a.value = this.values(b)), (a.values = this.values())),
          this._trigger("start", c, a)
        );
      },
      _slide: function(g, d, c) {
        var f, h, b;
        this.options.values && this.options.values.length
          ? ((f = this.values(d ? 0 : 1)),
            2 === this.options.values.length &&
              this.options.range === !0 &&
              ((0 === d && c > f) || (1 === d && f > c)) &&
              (c = f),
            c !== this.values(d) &&
              ((h = this.values()),
              (h[d] = c),
              (b = this._trigger("slide", g, {
                handle: this.handles[d],
                value: c,
                values: h
              })),
              (f = this.values(d ? 0 : 1)),
              b !== !1 && this.values(d, c)))
          : c !== this.value() &&
            ((b = this._trigger("slide", g, {
              handle: this.handles[d],
              value: c
            })),
            b !== !1 && this.value(c));
      },
      _stop: function(c, b) {
        var a = { handle: this.handles[b], value: this.value() };
        this.options.values &&
          this.options.values.length &&
          ((a.value = this.values(b)), (a.values = this.values())),
          this._trigger("stop", c, a);
      },
      _change: function(c, b) {
        if (!this._keySliding && !this._mouseSliding) {
          var a = { handle: this.handles[b], value: this.value() };
          this.options.values &&
            this.options.values.length &&
            ((a.value = this.values(b)), (a.values = this.values())),
            (this._lastChangedValue = b),
            this._trigger("change", c, a);
        }
      },
      value: function(a) {
        return arguments.length
          ? ((this.options.value = this._trimAlignValue(a)),
            this._refreshValue(),
            this._change(null, 0),
            void 0)
          : this._value();
      },
      values: function(d, c) {
        var e, f, b;
        if (arguments.length > 1) {
          return (
            (this.options.values[d] = this._trimAlignValue(c)),
            this._refreshValue(),
            this._change(null, d),
            void 0
          );
        }
        if (!arguments.length) {
          return this._values();
        }
        if (!J.isArray(arguments[0])) {
          return this.options.values && this.options.values.length
            ? this._values(d)
            : this.value();
        }
        for (
          e = this.options.values, f = arguments[0], b = 0;
          e.length > b;
          b += 1
        ) {
          (e[b] = this._trimAlignValue(f[b])), this._change(null, b);
        }
        this._refreshValue();
      },
      _setOption: function(b, a) {
        var c,
          d = 0;
        switch (
          ("range" === b &&
            this.options.range === !0 &&
            ("min" === a
              ? ((this.options.value = this._values(0)),
                (this.options.values = null))
              : "max" === a &&
                ((this.options.value = this._values(
                  this.options.values.length - 1
                )),
                (this.options.values = null))),
          J.isArray(this.options.values) && (d = this.options.values.length),
          "disabled" === b &&
            this.element.toggleClass("ui-state-disabled", !!a),
          this._super(b, a),
          b)
        ) {
          case "orientation":
            this._detectOrientation(),
              this.element
                .removeClass("ui-slider-horizontal ui-slider-vertical")
                .addClass("ui-slider-" + this.orientation),
              this._refreshValue(),
              this.handles.css("horizontal" === a ? "bottom" : "left", "");
            break;
          case "value":
            (this._animateOff = !0),
              this._refreshValue(),
              this._change(null, 0),
              (this._animateOff = !1);
            break;
          case "values":
            for (
              this._animateOff = !0, this._refreshValue(), c = 0;
              d > c;
              c += 1
            ) {
              this._change(null, c);
            }
            this._animateOff = !1;
            break;
          case "step":
          case "min":
          case "max":
            (this._animateOff = !0),
              this._calculateNewMax(),
              this._refreshValue(),
              (this._animateOff = !1);
            break;
          case "range":
            (this._animateOff = !0), this._refresh(), (this._animateOff = !1);
        }
      },
      _value: function() {
        var a = this.options.value;
        return (a = this._trimAlignValue(a));
      },
      _values: function(d) {
        var b, a, c;
        if (arguments.length) {
          return (b = this.options.values[d]), (b = this._trimAlignValue(b));
        }
        if (this.options.values && this.options.values.length) {
          for (a = this.options.values.slice(), c = 0; a.length > c; c += 1) {
            a[c] = this._trimAlignValue(a[c]);
          }
          return a;
        }
        return [];
      },
      _trimAlignValue: function(d) {
        if (this._valueMin() >= d) {
          return this._valueMin();
        }
        if (d >= this._valueMax()) {
          return this._valueMax();
        }
        var b = this.options.step > 0 ? this.options.step : 1,
          a = (d - this._valueMin()) % b,
          c = d - a;
        return (
          2 * Math.abs(a) >= b && (c += a > 0 ? b : -b),
          parseFloat(c.toFixed(5))
        );
      },
      _calculateNewMax: function() {
        var a = (this.options.max - this._valueMin()) % this.options.step;
        this.max = this.options.max - a;
      },
      _valueMin: function() {
        return this.options.min;
      },
      _valueMax: function() {
        return this.max;
      },
      _refreshValue: function() {
        var v,
          f,
          y,
          d,
          m,
          c = this.options.range,
          b = this.options,
          g = this,
          e = this._animateOff ? !1 : b.animate,
          p = {};
        this.options.values && this.options.values.length
          ? this.handles.each(function(a) {
              (f =
                100 *
                ((g.values(a) - g._valueMin()) /
                  (g._valueMax() - g._valueMin()))),
                (p["horizontal" === g.orientation ? "left" : "bottom"] =
                  f + "%"),
                J(this)
                  .stop(1, 1)
                  [e ? "animate" : "css"](p, b.animate),
                g.options.range === !0 &&
                  ("horizontal" === g.orientation
                    ? (0 === a &&
                        g.range
                          .stop(1, 1)
                          [e ? "animate" : "css"]({ left: f + "%" }, b.animate),
                      1 === a &&
                        g.range[e ? "animate" : "css"](
                          { width: f - v + "%" },
                          { queue: !1, duration: b.animate }
                        ))
                    : (0 === a &&
                        g.range
                          .stop(1, 1)
                          [e ? "animate" : "css"](
                            { bottom: f + "%" },
                            b.animate
                          ),
                      1 === a &&
                        g.range[e ? "animate" : "css"](
                          { height: f - v + "%" },
                          { queue: !1, duration: b.animate }
                        ))),
                (v = f);
            })
          : ((y = this.value()),
            (d = this._valueMin()),
            (m = this._valueMax()),
            (f = m !== d ? 100 * ((y - d) / (m - d)) : 0),
            (p["horizontal" === this.orientation ? "left" : "bottom"] =
              f + "%"),
            this.handle.stop(1, 1)[e ? "animate" : "css"](p, b.animate),
            "min" === c &&
              "horizontal" === this.orientation &&
              this.range
                .stop(1, 1)
                [e ? "animate" : "css"]({ width: f + "%" }, b.animate),
            "max" === c &&
              "horizontal" === this.orientation &&
              this.range[e ? "animate" : "css"](
                { width: 100 - f + "%" },
                { queue: !1, duration: b.animate }
              ),
            "min" === c &&
              "vertical" === this.orientation &&
              this.range
                .stop(1, 1)
                [e ? "animate" : "css"]({ height: f + "%" }, b.animate),
            "max" === c &&
              "vertical" === this.orientation &&
              this.range[e ? "animate" : "css"](
                { height: 100 - f + "%" },
                { queue: !1, duration: b.animate }
              ));
      },
      _handleEvents: {
        keydown: function(d) {
          var c,
            e,
            g,
            b,
            f = J(d.target).data("ui-slider-handle-index");
          switch (d.keyCode) {
            case J.ui.keyCode.HOME:
            case J.ui.keyCode.END:
            case J.ui.keyCode.PAGE_UP:
            case J.ui.keyCode.PAGE_DOWN:
            case J.ui.keyCode.UP:
            case J.ui.keyCode.RIGHT:
            case J.ui.keyCode.DOWN:
            case J.ui.keyCode.LEFT:
              if (
                (d.preventDefault(),
                !this._keySliding &&
                  ((this._keySliding = !0),
                  J(d.target).addClass("ui-state-active"),
                  (c = this._start(d, f)),
                  c === !1))
              ) {
                return;
              }
          }
          switch (
            ((b = this.options.step),
            (e = g =
              this.options.values && this.options.values.length
                ? this.values(f)
                : this.value()),
            d.keyCode)
          ) {
            case J.ui.keyCode.HOME:
              g = this._valueMin();
              break;
            case J.ui.keyCode.END:
              g = this._valueMax();
              break;
            case J.ui.keyCode.PAGE_UP:
              g = this._trimAlignValue(
                e + (this._valueMax() - this._valueMin()) / this.numPages
              );
              break;
            case J.ui.keyCode.PAGE_DOWN:
              g = this._trimAlignValue(
                e - (this._valueMax() - this._valueMin()) / this.numPages
              );
              break;
            case J.ui.keyCode.UP:
            case J.ui.keyCode.RIGHT:
              if (e === this._valueMax()) {
                return;
              }
              g = this._trimAlignValue(e + b);
              break;
            case J.ui.keyCode.DOWN:
            case J.ui.keyCode.LEFT:
              if (e === this._valueMin()) {
                return;
              }
              g = this._trimAlignValue(e - b);
          }
          this._slide(d, f, g);
        },
        keyup: function(b) {
          var a = J(b.target).data("ui-slider-handle-index");
          this._keySliding &&
            ((this._keySliding = !1),
            this._stop(b, a),
            this._change(b, a),
            J(b.target).removeClass("ui-state-active"));
        }
      }
    }),
    J.widget("ui.sortable", J.ui.mouse, {
      version: "1.11.2",
      widgetEventPrefix: "sort",
      ready: !1,
      options: {
        appendTo: "parent",
        axis: !1,
        connectWith: !1,
        containment: !1,
        cursor: "auto",
        cursorAt: !1,
        dropOnEmpty: !0,
        forcePlaceholderSize: !1,
        forceHelperSize: !1,
        grid: !1,
        handle: !1,
        helper: "original",
        items: "> *",
        opacity: !1,
        placeholder: !1,
        revert: !1,
        scroll: !0,
        scrollSensitivity: 20,
        scrollSpeed: 20,
        scope: "default",
        tolerance: "intersect",
        zIndex: 1000,
        activate: null,
        beforeStop: null,
        change: null,
        deactivate: null,
        out: null,
        over: null,
        receive: null,
        remove: null,
        sort: null,
        start: null,
        stop: null,
        update: null
      },
      _isOverAxis: function(c, b, a) {
        return c >= b && b + a > c;
      },
      _isFloating: function(a) {
        return (
          /left|right/.test(a.css("float")) ||
          /inline|table-cell/.test(a.css("display"))
        );
      },
      _create: function() {
        var a = this.options;
        (this.containerCache = {}),
          this.element.addClass("ui-sortable"),
          this.refresh(),
          (this.floating = this.items.length
            ? "x" === a.axis || this._isFloating(this.items[0].item)
            : !1),
          (this.offset = this.element.offset()),
          this._mouseInit(),
          this._setHandleClassName(),
          (this.ready = !0);
      },
      _setOption: function(b, a) {
        this._super(b, a), "handle" === b && this._setHandleClassName();
      },
      _setHandleClassName: function() {
        this.element
          .find(".ui-sortable-handle")
          .removeClass("ui-sortable-handle"),
          J.each(this.items, function() {
            (this.instance.options.handle
              ? this.item.find(this.instance.options.handle)
              : this.item
            ).addClass("ui-sortable-handle");
          });
      },
      _destroy: function() {
        this.element
          .removeClass("ui-sortable ui-sortable-disabled")
          .find(".ui-sortable-handle")
          .removeClass("ui-sortable-handle"),
          this._mouseDestroy();
        for (var a = this.items.length - 1; a >= 0; a--) {
          this.items[a].item.removeData(this.widgetName + "-item");
        }
        return this;
      },
      _mouseCapture: function(d, c) {
        var e = null,
          f = !1,
          b = this;
        return this.reverting
          ? !1
          : this.options.disabled || "static" === this.options.type
            ? !1
            : (this._refreshItems(d),
              J(d.target)
                .parents()
                .each(function() {
                  return J.data(this, b.widgetName + "-item") === b
                    ? ((e = J(this)), !1)
                    : void 0;
                }),
              J.data(d.target, b.widgetName + "-item") === b &&
                (e = J(d.target)),
              e
                ? !this.options.handle ||
                  c ||
                  (J(this.options.handle, e)
                    .find("*")
                    .addBack()
                    .each(function() {
                      this === d.target && (f = !0);
                    }),
                  f)
                  ? ((this.currentItem = e),
                    this._removeCurrentsFromItems(),
                    !0)
                  : !1
                : !1);
      },
      _mouseStart: function(d, c, e) {
        var g,
          b,
          f = this.options;
        if (
          ((this.currentContainer = this),
          this.refreshPositions(),
          (this.helper = this._createHelper(d)),
          this._cacheHelperProportions(),
          this._cacheMargins(),
          (this.scrollParent = this.helper.scrollParent()),
          (this.offset = this.currentItem.offset()),
          (this.offset = {
            top: this.offset.top - this.margins.top,
            left: this.offset.left - this.margins.left
          }),
          J.extend(this.offset, {
            click: {
              left: d.pageX - this.offset.left,
              top: d.pageY - this.offset.top
            },
            parent: this._getParentOffset(),
            relative: this._getRelativeOffset()
          }),
          this.helper.css("position", "absolute"),
          (this.cssPosition = this.helper.css("position")),
          (this.originalPosition = this._generatePosition(d)),
          (this.originalPageX = d.pageX),
          (this.originalPageY = d.pageY),
          f.cursorAt && this._adjustOffsetFromHelper(f.cursorAt),
          (this.domPosition = {
            prev: this.currentItem.prev()[0],
            parent: this.currentItem.parent()[0]
          }),
          this.helper[0] !== this.currentItem[0] && this.currentItem.hide(),
          this._createPlaceholder(),
          f.containment && this._setContainment(),
          f.cursor &&
            "auto" !== f.cursor &&
            ((b = this.document.find("body")),
            (this.storedCursor = b.css("cursor")),
            b.css("cursor", f.cursor),
            (this.storedStylesheet = J(
              "<style>*{ cursor: " + f.cursor + " !important; }</style>"
            ).appendTo(b))),
          f.opacity &&
            (this.helper.css("opacity") &&
              (this._storedOpacity = this.helper.css("opacity")),
            this.helper.css("opacity", f.opacity)),
          f.zIndex &&
            (this.helper.css("zIndex") &&
              (this._storedZIndex = this.helper.css("zIndex")),
            this.helper.css("zIndex", f.zIndex)),
          this.scrollParent[0] !== document &&
            "HTML" !== this.scrollParent[0].tagName &&
            (this.overflowOffset = this.scrollParent.offset()),
          this._trigger("start", d, this._uiHash()),
          this._preserveHelperProportions || this._cacheHelperProportions(),
          !e)
        ) {
          for (g = this.containers.length - 1; g >= 0; g--) {
            this.containers[g]._trigger("activate", d, this._uiHash(this));
          }
        }
        return (
          J.ui.ddmanager && (J.ui.ddmanager.current = this),
          J.ui.ddmanager &&
            !f.dropBehaviour &&
            J.ui.ddmanager.prepareOffsets(this, d),
          (this.dragging = !0),
          this.helper.addClass("ui-sortable-helper"),
          this._mouseDrag(d),
          !0
        );
      },
      _mouseDrag: function(d) {
        var c,
          e,
          h,
          b,
          g = this.options,
          f = !1;
        for (
          this.position = this._generatePosition(d),
            this.positionAbs = this._convertPositionTo("absolute"),
            this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs),
            this.options.scroll &&
              (this.scrollParent[0] !== document &&
              "HTML" !== this.scrollParent[0].tagName
                ? (this.overflowOffset.top +
                    this.scrollParent[0].offsetHeight -
                    d.pageY <
                  g.scrollSensitivity
                    ? (this.scrollParent[0].scrollTop = f =
                        this.scrollParent[0].scrollTop + g.scrollSpeed)
                    : d.pageY - this.overflowOffset.top < g.scrollSensitivity &&
                      (this.scrollParent[0].scrollTop = f =
                        this.scrollParent[0].scrollTop - g.scrollSpeed),
                  this.overflowOffset.left +
                    this.scrollParent[0].offsetWidth -
                    d.pageX <
                  g.scrollSensitivity
                    ? (this.scrollParent[0].scrollLeft = f =
                        this.scrollParent[0].scrollLeft + g.scrollSpeed)
                    : d.pageX - this.overflowOffset.left <
                        g.scrollSensitivity &&
                      (this.scrollParent[0].scrollLeft = f =
                        this.scrollParent[0].scrollLeft - g.scrollSpeed))
                : (d.pageY - J(document).scrollTop() < g.scrollSensitivity
                    ? (f = J(document).scrollTop(
                        J(document).scrollTop() - g.scrollSpeed
                      ))
                    : J(window).height() - (d.pageY - J(document).scrollTop()) <
                        g.scrollSensitivity &&
                      (f = J(document).scrollTop(
                        J(document).scrollTop() + g.scrollSpeed
                      )),
                  d.pageX - J(document).scrollLeft() < g.scrollSensitivity
                    ? (f = J(document).scrollLeft(
                        J(document).scrollLeft() - g.scrollSpeed
                      ))
                    : J(window).width() - (d.pageX - J(document).scrollLeft()) <
                        g.scrollSensitivity &&
                      (f = J(document).scrollLeft(
                        J(document).scrollLeft() + g.scrollSpeed
                      ))),
              f !== !1 &&
                J.ui.ddmanager &&
                !g.dropBehaviour &&
                J.ui.ddmanager.prepareOffsets(this, d)),
            this.positionAbs = this._convertPositionTo("absolute"),
            (this.options.axis && "y" === this.options.axis) ||
              (this.helper[0].style.left = this.position.left + "px"),
            (this.options.axis && "x" === this.options.axis) ||
              (this.helper[0].style.top = this.position.top + "px"),
            c = this.items.length - 1;
          c >= 0;
          c--
        ) {
          if (
            ((e = this.items[c]),
            (h = e.item[0]),
            (b = this._intersectsWithPointer(e)),
            b &&
              e.instance === this.currentContainer &&
              h !== this.currentItem[0] &&
              this.placeholder[1 === b ? "next" : "prev"]()[0] !== h &&
              !J.contains(this.placeholder[0], h) &&
              ("semi-dynamic" === this.options.type
                ? !J.contains(this.element[0], h)
                : !0))
          ) {
            if (
              ((this.direction = 1 === b ? "down" : "up"),
              "pointer" !== this.options.tolerance &&
                !this._intersectsWithSides(e))
            ) {
              break;
            }
            this._rearrange(d, e), this._trigger("change", d, this._uiHash());
            break;
          }
        }
        return (
          this._contactContainers(d),
          J.ui.ddmanager && J.ui.ddmanager.drag(this, d),
          this._trigger("sort", d, this._uiHash()),
          (this.lastPositionAbs = this.positionAbs),
          !1
        );
      },
      _mouseStop: function(d, c) {
        if (d) {
          if (
            (J.ui.ddmanager &&
              !this.options.dropBehaviour &&
              J.ui.ddmanager.drop(this, d),
            this.options.revert)
          ) {
            var e = this,
              g = this.placeholder.offset(),
              b = this.options.axis,
              f = {};
            (b && "x" !== b) ||
              (f.left =
                g.left -
                this.offset.parent.left -
                this.margins.left +
                (this.offsetParent[0] === document.body
                  ? 0
                  : this.offsetParent[0].scrollLeft)),
              (b && "y" !== b) ||
                (f.top =
                  g.top -
                  this.offset.parent.top -
                  this.margins.top +
                  (this.offsetParent[0] === document.body
                    ? 0
                    : this.offsetParent[0].scrollTop)),
              (this.reverting = !0),
              J(this.helper).animate(
                f,
                parseInt(this.options.revert, 10) || 500,
                function() {
                  e._clear(d);
                }
              );
          } else {
            this._clear(d, c);
          }
          return !1;
        }
      },
      cancel: function() {
        if (this.dragging) {
          this._mouseUp({ target: null }),
            "original" === this.options.helper
              ? this.currentItem
                  .css(this._storedCSS)
                  .removeClass("ui-sortable-helper")
              : this.currentItem.show();
          for (var a = this.containers.length - 1; a >= 0; a--) {
            this.containers[a]._trigger("deactivate", null, this._uiHash(this)),
              this.containers[a].containerCache.over &&
                (this.containers[a]._trigger("out", null, this._uiHash(this)),
                (this.containers[a].containerCache.over = 0));
          }
        }
        return (
          this.placeholder &&
            (this.placeholder[0].parentNode &&
              this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
            "original" !== this.options.helper &&
              this.helper &&
              this.helper[0].parentNode &&
              this.helper.remove(),
            J.extend(this, {
              helper: null,
              dragging: !1,
              reverting: !1,
              _noFinalSort: null
            }),
            this.domPosition.prev
              ? J(this.domPosition.prev).after(this.currentItem)
              : J(this.domPosition.parent).prepend(this.currentItem)),
          this
        );
      },
      serialize: function(b) {
        var a = this._getItemsAsjQuery(b && b.connected),
          c = [];
        return (
          (b = b || {}),
          J(a).each(function() {
            var d = (J(b.item || this).attr(b.attribute || "id") || "").match(
              b.expression || /(.+)[\-=_](.+)/
            );
            d &&
              c.push(
                (b.key || d[1] + "[]") +
                  "=" +
                  (b.key && b.expression ? d[1] : d[2])
              );
          }),
          !c.length && b.key && c.push(b.key + "="),
          c.join("&")
        );
      },
      toArray: function(b) {
        var a = this._getItemsAsjQuery(b && b.connected),
          c = [];
        return (
          (b = b || {}),
          a.each(function() {
            c.push(J(b.item || this).attr(b.attribute || "id") || "");
          }),
          c
        );
      },
      _intersectsWith: function(P) {
        var U = this.positionAbs.left,
          y = U + this.helperProportions.width,
          V = this.positionAbs.top,
          m = V + this.helperProportions.height,
          S = P.left,
          g = S + P.width,
          b = P.top,
          O = b + P.height,
          v = this.offset.click.top,
          T = this.offset.click.left,
          Q = "x" === this.options.axis || (V + v > b && O > V + v),
          R = "y" === this.options.axis || (U + T > S && g > U + T),
          f = Q && R;
        return "pointer" === this.options.tolerance ||
          this.options.forcePointerForContainers ||
          ("pointer" !== this.options.tolerance &&
            this.helperProportions[this.floating ? "width" : "height"] >
              P[this.floating ? "width" : "height"])
          ? f
          : U + this.helperProportions.width / 2 > S &&
              g > y - this.helperProportions.width / 2 &&
              V + this.helperProportions.height / 2 > b &&
              O > m - this.helperProportions.height / 2;
      },
      _intersectsWithPointer: function(g) {
        var d =
            "x" === this.options.axis ||
            this._isOverAxis(
              this.positionAbs.top + this.offset.click.top,
              g.top,
              g.height
            ),
          c =
            "y" === this.options.axis ||
            this._isOverAxis(
              this.positionAbs.left + this.offset.click.left,
              g.left,
              g.width
            ),
          f = d && c,
          h = this._getDragVerticalDirection(),
          b = this._getDragHorizontalDirection();
        return f
          ? this.floating
            ? (b && "right" === b) || "down" === h
              ? 2
              : 1
            : h && ("down" === h ? 2 : 1)
          : !1;
      },
      _intersectsWithSides: function(d) {
        var b = this._isOverAxis(
            this.positionAbs.top + this.offset.click.top,
            d.top + d.height / 2,
            d.height
          ),
          a = this._isOverAxis(
            this.positionAbs.left + this.offset.click.left,
            d.left + d.width / 2,
            d.width
          ),
          c = this._getDragVerticalDirection(),
          f = this._getDragHorizontalDirection();
        return this.floating && f
          ? ("right" === f && a) || ("left" === f && !a)
          : c && (("down" === c && b) || ("up" === c && !b));
      },
      _getDragVerticalDirection: function() {
        var a = this.positionAbs.top - this.lastPositionAbs.top;
        return 0 !== a && (a > 0 ? "down" : "up");
      },
      _getDragHorizontalDirection: function() {
        var a = this.positionAbs.left - this.lastPositionAbs.left;
        return 0 !== a && (a > 0 ? "right" : "left");
      },
      refresh: function(a) {
        return (
          this._refreshItems(a),
          this._setHandleClassName(),
          this.refreshPositions(),
          this
        );
      },
      _connectWith: function() {
        var a = this.options;
        return a.connectWith.constructor === String
          ? [a.connectWith]
          : a.connectWith;
      },
      _getItemsAsjQuery: function(p) {
        function f() {
          b.push(this);
        }
        var u,
          d,
          m,
          c,
          b = [],
          g = [],
          e = this._connectWith();
        if (e && p) {
          for (u = e.length - 1; u >= 0; u--) {
            for (m = J(e[u]), d = m.length - 1; d >= 0; d--) {
              (c = J.data(m[d], this.widgetFullName)),
                c &&
                  c !== this &&
                  !c.options.disabled &&
                  g.push([
                    J.isFunction(c.options.items)
                      ? c.options.items.call(c.element)
                      : J(c.options.items, c.element)
                          .not(".ui-sortable-helper")
                          .not(".ui-sortable-placeholder"),
                    c
                  ]);
            }
          }
        }
        for (
          g.push([
            J.isFunction(this.options.items)
              ? this.options.items.call(this.element, null, {
                  options: this.options,
                  item: this.currentItem
                })
              : J(this.options.items, this.element)
                  .not(".ui-sortable-helper")
                  .not(".ui-sortable-placeholder"),
            this
          ]),
            u = g.length - 1;
          u >= 0;
          u--
        ) {
          g[u][0].each(f);
        }
        return J(b);
      },
      _removeCurrentsFromItems: function() {
        var a = this.currentItem.find(":data(" + this.widgetName + "-item)");
        this.items = J.grep(this.items, function(c) {
          for (var b = 0; a.length > b; b++) {
            if (a[b] === c.item[0]) {
              return !1;
            }
          }
          return !0;
        });
      },
      _refreshItems: function(Q) {
        (this.items = []), (this.containers = [this]);
        var m,
          R,
          f,
          O,
          e,
          b,
          p,
          g,
          P = this.items,
          v = [
            [
              J.isFunction(this.options.items)
                ? this.options.items.call(this.element[0], Q, {
                    item: this.currentItem
                  })
                : J(this.options.items, this.element),
              this
            ]
          ],
          y = this._connectWith();
        if (y && this.ready) {
          for (m = y.length - 1; m >= 0; m--) {
            for (f = J(y[m]), R = f.length - 1; R >= 0; R--) {
              (O = J.data(f[R], this.widgetFullName)),
                O &&
                  O !== this &&
                  !O.options.disabled &&
                  (v.push([
                    J.isFunction(O.options.items)
                      ? O.options.items.call(O.element[0], Q, {
                          item: this.currentItem
                        })
                      : J(O.options.items, O.element),
                    O
                  ]),
                  this.containers.push(O));
            }
          }
        }
        for (m = v.length - 1; m >= 0; m--) {
          for (e = v[m][1], b = v[m][0], R = 0, g = b.length; g > R; R++) {
            (p = J(b[R])),
              p.data(this.widgetName + "-item", e),
              P.push({
                item: p,
                instance: e,
                width: 0,
                height: 0,
                left: 0,
                top: 0
              });
          }
        }
      },
      refreshPositions: function(d) {
        this.offsetParent &&
          this.helper &&
          (this.offset.parent = this._getParentOffset());
        var c, e, f, b;
        for (c = this.items.length - 1; c >= 0; c--) {
          (e = this.items[c]),
            (e.instance !== this.currentContainer &&
              this.currentContainer &&
              e.item[0] !== this.currentItem[0]) ||
              ((f = this.options.toleranceElement
                ? J(this.options.toleranceElement, e.item)
                : e.item),
              d || ((e.width = f.outerWidth()), (e.height = f.outerHeight())),
              (b = f.offset()),
              (e.left = b.left),
              (e.top = b.top));
        }
        if (this.options.custom && this.options.custom.refreshContainers) {
          this.options.custom.refreshContainers.call(this);
        } else {
          for (c = this.containers.length - 1; c >= 0; c--) {
            (b = this.containers[c].element.offset()),
              (this.containers[c].containerCache.left = b.left),
              (this.containers[c].containerCache.top = b.top),
              (this.containers[c].containerCache.width = this.containers[
                c
              ].element.outerWidth()),
              (this.containers[c].containerCache.height = this.containers[
                c
              ].element.outerHeight());
          }
        }
        return this;
      },
      _createPlaceholder: function(b) {
        b = b || this;
        var a,
          c = b.options;
        (c.placeholder && c.placeholder.constructor !== String) ||
          ((a = c.placeholder),
          (c.placeholder = {
            element: function() {
              var d = b.currentItem[0].nodeName.toLowerCase(),
                e = J("<" + d + ">", b.document[0])
                  .addClass(
                    a || b.currentItem[0].className + " ui-sortable-placeholder"
                  )
                  .removeClass("ui-sortable-helper");
              return (
                "tr" === d
                  ? b.currentItem.children().each(function() {
                      J("<td>&#160;</td>", b.document[0])
                        .attr("colspan", J(this).attr("colspan") || 1)
                        .appendTo(e);
                    })
                  : "img" === d && e.attr("src", b.currentItem.attr("src")),
                a || e.css("visibility", "hidden"),
                e
              );
            },
            update: function(d, f) {
              (!a || c.forcePlaceholderSize) &&
                (f.height() ||
                  f.height(
                    b.currentItem.innerHeight() -
                      parseInt(b.currentItem.css("paddingTop") || 0, 10) -
                      parseInt(b.currentItem.css("paddingBottom") || 0, 10)
                  ),
                f.width() ||
                  f.width(
                    b.currentItem.innerWidth() -
                      parseInt(b.currentItem.css("paddingLeft") || 0, 10) -
                      parseInt(b.currentItem.css("paddingRight") || 0, 10)
                  ));
            }
          })),
          (b.placeholder = J(
            c.placeholder.element.call(b.element, b.currentItem)
          )),
          b.currentItem.after(b.placeholder),
          c.placeholder.update(b, b.placeholder);
      },
      _contactContainers: function(S) {
        var v,
          T,
          g,
          Q,
          f,
          b,
          y,
          m,
          R,
          O,
          P = null,
          e = null;
        for (v = this.containers.length - 1; v >= 0; v--) {
          if (!J.contains(this.currentItem[0], this.containers[v].element[0])) {
            if (this._intersectsWith(this.containers[v].containerCache)) {
              if (
                P &&
                J.contains(this.containers[v].element[0], P.element[0])
              ) {
                continue;
              }
              (P = this.containers[v]), (e = v);
            } else {
              this.containers[v].containerCache.over &&
                (this.containers[v]._trigger("out", S, this._uiHash(this)),
                (this.containers[v].containerCache.over = 0));
            }
          }
        }
        if (P) {
          if (1 === this.containers.length) {
            this.containers[e].containerCache.over ||
              (this.containers[e]._trigger("over", S, this._uiHash(this)),
              (this.containers[e].containerCache.over = 1));
          } else {
            for (
              g = 10000,
                Q = null,
                R = P.floating || this._isFloating(this.currentItem),
                f = R ? "left" : "top",
                b = R ? "width" : "height",
                O = R ? "clientX" : "clientY",
                T = this.items.length - 1;
              T >= 0;
              T--
            ) {
              J.contains(
                this.containers[e].element[0],
                this.items[T].item[0]
              ) &&
                this.items[T].item[0] !== this.currentItem[0] &&
                ((y = this.items[T].item.offset()[f]),
                (m = !1),
                S[O] - y > this.items[T][b] / 2 && (m = !0),
                g > Math.abs(S[O] - y) &&
                  ((g = Math.abs(S[O] - y)),
                  (Q = this.items[T]),
                  (this.direction = m ? "up" : "down")));
            }
            if (!Q && !this.options.dropOnEmpty) {
              return;
            }
            if (this.currentContainer === this.containers[e]) {
              return (
                this.currentContainer.containerCache.over ||
                  (this.containers[e]._trigger("over", S, this._uiHash()),
                  (this.currentContainer.containerCache.over = 1)),
                void 0
              );
            }
            Q
              ? this._rearrange(S, Q, null, !0)
              : this._rearrange(S, null, this.containers[e].element, !0),
              this._trigger("change", S, this._uiHash()),
              this.containers[e]._trigger("change", S, this._uiHash(this)),
              (this.currentContainer = this.containers[e]),
              this.options.placeholder.update(
                this.currentContainer,
                this.placeholder
              ),
              this.containers[e]._trigger("over", S, this._uiHash(this)),
              (this.containers[e].containerCache.over = 1);
          }
        }
      },
      _createHelper: function(b) {
        var a = this.options,
          c = J.isFunction(a.helper)
            ? J(a.helper.apply(this.element[0], [b, this.currentItem]))
            : "clone" === a.helper
              ? this.currentItem.clone()
              : this.currentItem;
        return (
          c.parents("body").length ||
            J(
              "parent" !== a.appendTo
                ? a.appendTo
                : this.currentItem[0].parentNode
            )[0].appendChild(c[0]),
          c[0] === this.currentItem[0] &&
            (this._storedCSS = {
              width: this.currentItem[0].style.width,
              height: this.currentItem[0].style.height,
              position: this.currentItem.css("position"),
              top: this.currentItem.css("top"),
              left: this.currentItem.css("left")
            }),
          (!c[0].style.width || a.forceHelperSize) &&
            c.width(this.currentItem.width()),
          (!c[0].style.height || a.forceHelperSize) &&
            c.height(this.currentItem.height()),
          c
        );
      },
      _adjustOffsetFromHelper: function(a) {
        "string" == typeof a && (a = a.split(" ")),
          J.isArray(a) && (a = { left: +a[0], top: +a[1] || 0 }),
          "left" in a && (this.offset.click.left = a.left + this.margins.left),
          "right" in a &&
            (this.offset.click.left =
              this.helperProportions.width - a.right + this.margins.left),
          "top" in a && (this.offset.click.top = a.top + this.margins.top),
          "bottom" in a &&
            (this.offset.click.top =
              this.helperProportions.height - a.bottom + this.margins.top);
      },
      _getParentOffset: function() {
        this.offsetParent = this.helper.offsetParent();
        var a = this.offsetParent.offset();
        return (
          "absolute" === this.cssPosition &&
            this.scrollParent[0] !== document &&
            J.contains(this.scrollParent[0], this.offsetParent[0]) &&
            ((a.left += this.scrollParent.scrollLeft()),
            (a.top += this.scrollParent.scrollTop())),
          (this.offsetParent[0] === document.body ||
            (this.offsetParent[0].tagName &&
              "html" === this.offsetParent[0].tagName.toLowerCase() &&
              J.ui.ie)) &&
            (a = { top: 0, left: 0 }),
          {
            top:
              a.top +
              (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
            left:
              a.left +
              (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
          }
        );
      },
      _getRelativeOffset: function() {
        if ("relative" === this.cssPosition) {
          var a = this.currentItem.position();
          return {
            top:
              a.top -
              (parseInt(this.helper.css("top"), 10) || 0) +
              this.scrollParent.scrollTop(),
            left:
              a.left -
              (parseInt(this.helper.css("left"), 10) || 0) +
              this.scrollParent.scrollLeft()
          };
        }
        return { top: 0, left: 0 };
      },
      _cacheMargins: function() {
        this.margins = {
          left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
          top: parseInt(this.currentItem.css("marginTop"), 10) || 0
        };
      },
      _cacheHelperProportions: function() {
        this.helperProportions = {
          width: this.helper.outerWidth(),
          height: this.helper.outerHeight()
        };
      },
      _setContainment: function() {
        var b,
          a,
          c,
          d = this.options;
        "parent" === d.containment &&
          (d.containment = this.helper[0].parentNode),
          ("document" === d.containment || "window" === d.containment) &&
            (this.containment = [
              0 - this.offset.relative.left - this.offset.parent.left,
              0 - this.offset.relative.top - this.offset.parent.top,
              J("document" === d.containment ? document : window).width() -
                this.helperProportions.width -
                this.margins.left,
              (J("document" === d.containment ? document : window).height() ||
                document.body.parentNode.scrollHeight) -
                this.helperProportions.height -
                this.margins.top
            ]),
          /^(document|window|parent)$/.test(d.containment) ||
            ((b = J(d.containment)[0]),
            (a = J(d.containment).offset()),
            (c = "hidden" !== J(b).css("overflow")),
            (this.containment = [
              a.left +
                (parseInt(J(b).css("borderLeftWidth"), 10) || 0) +
                (parseInt(J(b).css("paddingLeft"), 10) || 0) -
                this.margins.left,
              a.top +
                (parseInt(J(b).css("borderTopWidth"), 10) || 0) +
                (parseInt(J(b).css("paddingTop"), 10) || 0) -
                this.margins.top,
              a.left +
                (c ? Math.max(b.scrollWidth, b.offsetWidth) : b.offsetWidth) -
                (parseInt(J(b).css("borderLeftWidth"), 10) || 0) -
                (parseInt(J(b).css("paddingRight"), 10) || 0) -
                this.helperProportions.width -
                this.margins.left,
              a.top +
                (c
                  ? Math.max(b.scrollHeight, b.offsetHeight)
                  : b.offsetHeight) -
                (parseInt(J(b).css("borderTopWidth"), 10) || 0) -
                (parseInt(J(b).css("paddingBottom"), 10) || 0) -
                this.helperProportions.height -
                this.margins.top
            ]));
      },
      _convertPositionTo: function(d, c) {
        c || (c = this.position);
        var e = "absolute" === d ? 1 : -1,
          f =
            "absolute" !== this.cssPosition ||
            (this.scrollParent[0] !== document &&
              J.contains(this.scrollParent[0], this.offsetParent[0]))
              ? this.scrollParent
              : this.offsetParent,
          b = /(html|body)/i.test(f[0].tagName);
        return {
          top:
            c.top +
            this.offset.relative.top * e +
            this.offset.parent.top * e -
            ("fixed" === this.cssPosition
              ? -this.scrollParent.scrollTop()
              : b
                ? 0
                : f.scrollTop()) *
              e,
          left:
            c.left +
            this.offset.relative.left * e +
            this.offset.parent.left * e -
            ("fixed" === this.cssPosition
              ? -this.scrollParent.scrollLeft()
              : b
                ? 0
                : f.scrollLeft()) *
              e
        };
      },
      _generatePosition: function(d) {
        var c,
          f,
          m = this.options,
          b = d.pageX,
          l = d.pageY,
          g =
            "absolute" !== this.cssPosition ||
            (this.scrollParent[0] !== document &&
              J.contains(this.scrollParent[0], this.offsetParent[0]))
              ? this.scrollParent
              : this.offsetParent,
          e = /(html|body)/i.test(g[0].tagName);
        return (
          "relative" !== this.cssPosition ||
            (this.scrollParent[0] !== document &&
              this.scrollParent[0] !== this.offsetParent[0]) ||
            (this.offset.relative = this._getRelativeOffset()),
          this.originalPosition &&
            (this.containment &&
              (d.pageX - this.offset.click.left < this.containment[0] &&
                (b = this.containment[0] + this.offset.click.left),
              d.pageY - this.offset.click.top < this.containment[1] &&
                (l = this.containment[1] + this.offset.click.top),
              d.pageX - this.offset.click.left > this.containment[2] &&
                (b = this.containment[2] + this.offset.click.left),
              d.pageY - this.offset.click.top > this.containment[3] &&
                (l = this.containment[3] + this.offset.click.top)),
            m.grid &&
              ((c =
                this.originalPageY +
                Math.round((l - this.originalPageY) / m.grid[1]) * m.grid[1]),
              (l = this.containment
                ? c - this.offset.click.top >= this.containment[1] &&
                  c - this.offset.click.top <= this.containment[3]
                  ? c
                  : c - this.offset.click.top >= this.containment[1]
                    ? c - m.grid[1]
                    : c + m.grid[1]
                : c),
              (f =
                this.originalPageX +
                Math.round((b - this.originalPageX) / m.grid[0]) * m.grid[0]),
              (b = this.containment
                ? f - this.offset.click.left >= this.containment[0] &&
                  f - this.offset.click.left <= this.containment[2]
                  ? f
                  : f - this.offset.click.left >= this.containment[0]
                    ? f - m.grid[0]
                    : f + m.grid[0]
                : f))),
          {
            top:
              l -
              this.offset.click.top -
              this.offset.relative.top -
              this.offset.parent.top +
              ("fixed" === this.cssPosition
                ? -this.scrollParent.scrollTop()
                : e
                  ? 0
                  : g.scrollTop()),
            left:
              b -
              this.offset.click.left -
              this.offset.relative.left -
              this.offset.parent.left +
              ("fixed" === this.cssPosition
                ? -this.scrollParent.scrollLeft()
                : e
                  ? 0
                  : g.scrollLeft())
          }
        );
      },
      _rearrange: function(d, b, a, c) {
        a
          ? a[0].appendChild(this.placeholder[0])
          : b.item[0].parentNode.insertBefore(
              this.placeholder[0],
              "down" === this.direction ? b.item[0] : b.item[0].nextSibling
            ),
          (this.counter = this.counter ? ++this.counter : 1);
        var f = this.counter;
        this._delay(function() {
          f === this.counter && this.refreshPositions(!c);
        });
      },
      _clear: function(d, b) {
        function a(l, h, g) {
          return function(e) {
            g._trigger(l, e, h._uiHash(h));
          };
        }
        this.reverting = !1;
        var c,
          f = [];
        if (
          (!this._noFinalSort &&
            this.currentItem.parent().length &&
            this.placeholder.before(this.currentItem),
          (this._noFinalSort = null),
          this.helper[0] === this.currentItem[0])
        ) {
          for (c in this._storedCSS) {
            ("auto" === this._storedCSS[c] ||
              "static" === this._storedCSS[c]) &&
              (this._storedCSS[c] = "");
          }
          this.currentItem
            .css(this._storedCSS)
            .removeClass("ui-sortable-helper");
        } else {
          this.currentItem.show();
        }
        for (
          this.fromOutside &&
            !b &&
            f.push(function(g) {
              this._trigger("receive", g, this._uiHash(this.fromOutside));
            }),
            (!this.fromOutside &&
              this.domPosition.prev ===
                this.currentItem.prev().not(".ui-sortable-helper")[0] &&
              this.domPosition.parent === this.currentItem.parent()[0]) ||
              b ||
              f.push(function(g) {
                this._trigger("update", g, this._uiHash());
              }),
            this !== this.currentContainer &&
              (b ||
                (f.push(function(g) {
                  this._trigger("remove", g, this._uiHash());
                }),
                f.push(
                  function(g) {
                    return function(e) {
                      g._trigger("receive", e, this._uiHash(this));
                    };
                  }.call(this, this.currentContainer)
                ),
                f.push(
                  function(g) {
                    return function(e) {
                      g._trigger("update", e, this._uiHash(this));
                    };
                  }.call(this, this.currentContainer)
                ))),
            c = this.containers.length - 1;
          c >= 0;
          c--
        ) {
          b || f.push(a("deactivate", this, this.containers[c])),
            this.containers[c].containerCache.over &&
              (f.push(a("out", this, this.containers[c])),
              (this.containers[c].containerCache.over = 0));
        }
        if (
          (this.storedCursor &&
            (this.document.find("body").css("cursor", this.storedCursor),
            this.storedStylesheet.remove()),
          this._storedOpacity &&
            this.helper.css("opacity", this._storedOpacity),
          this._storedZIndex &&
            this.helper.css(
              "zIndex",
              "auto" === this._storedZIndex ? "" : this._storedZIndex
            ),
          (this.dragging = !1),
          b || this._trigger("beforeStop", d, this._uiHash()),
          this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
          this.cancelHelperRemoval ||
            (this.helper[0] !== this.currentItem[0] && this.helper.remove(),
            (this.helper = null)),
          !b)
        ) {
          for (c = 0; f.length > c; c++) {
            f[c].call(this, d);
          }
          this._trigger("stop", d, this._uiHash());
        }
        return (this.fromOutside = !1), !this.cancelHelperRemoval;
      },
      _trigger: function() {
        J.Widget.prototype._trigger.apply(this, arguments) === !1 &&
          this.cancel();
      },
      _uiHash: function(b) {
        var a = b || this;
        return {
          helper: a.helper,
          placeholder: a.placeholder || J([]),
          position: a.position,
          originalPosition: a.originalPosition,
          offset: a.positionAbs,
          item: a.currentItem,
          sender: b ? b.element : null
        };
      }
    }),
    J.widget("ui.spinner", {
      version: "1.11.2",
      defaultElement: "<input>",
      widgetEventPrefix: "spin",
      options: {
        culture: null,
        icons: { down: "ui-icon-triangle-1-s", up: "ui-icon-triangle-1-n" },
        incremental: !0,
        max: null,
        min: null,
        numberFormat: null,
        page: 10,
        step: 1,
        change: null,
        spin: null,
        start: null,
        stop: null
      },
      _create: function() {
        this._setOption("max", this.options.max),
          this._setOption("min", this.options.min),
          this._setOption("step", this.options.step),
          "" !== this.value() && this._value(this.element.val(), !0),
          this._draw(),
          this._on(this._events),
          this._refresh(),
          this._on(this.window, {
            beforeunload: function() {
              this.element.removeAttr("autocomplete");
            }
          });
      },
      _getCreateOptions: function() {
        var b = {},
          a = this.element;
        return (
          J.each(["min", "max", "step"], function(d, c) {
            var f = a.attr(c);
            void 0 !== f && f.length && (b[c] = f);
          }),
          b
        );
      },
      _events: {
        keydown: function(a) {
          this._start(a) && this._keydown(a) && a.preventDefault();
        },
        keyup: "_stop",
        focus: function() {
          this.previous = this.element.val();
        },
        blur: function(a) {
          return this.cancelBlur
            ? (delete this.cancelBlur, void 0)
            : (this._stop(),
              this._refresh(),
              this.previous !== this.element.val() &&
                this._trigger("change", a),
              void 0);
        },
        mousewheel: function(b, a) {
          if (a) {
            if (!this.spinning && !this._start(b)) {
              return !1;
            }
            this._spin((a > 0 ? 1 : -1) * this.options.step, b),
              clearTimeout(this.mousewheelTimer),
              (this.mousewheelTimer = this._delay(function() {
                this.spinning && this._stop(b);
              }, 100)),
              b.preventDefault();
          }
        },
        "mousedown .ui-spinner-button": function(b) {
          function a() {
            var d = this.element[0] === this.document[0].activeElement;
            d ||
              (this.element.focus(),
              (this.previous = c),
              this._delay(function() {
                this.previous = c;
              }));
          }
          var c;
          (c =
            this.element[0] === this.document[0].activeElement
              ? this.previous
              : this.element.val()),
            b.preventDefault(),
            a.call(this),
            (this.cancelBlur = !0),
            this._delay(function() {
              delete this.cancelBlur, a.call(this);
            }),
            this._start(b) !== !1 &&
              this._repeat(
                null,
                J(b.currentTarget).hasClass("ui-spinner-up") ? 1 : -1,
                b
              );
        },
        "mouseup .ui-spinner-button": "_stop",
        "mouseenter .ui-spinner-button": function(a) {
          return J(a.currentTarget).hasClass("ui-state-active")
            ? this._start(a) === !1
              ? !1
              : (this._repeat(
                  null,
                  J(a.currentTarget).hasClass("ui-spinner-up") ? 1 : -1,
                  a
                ),
                void 0)
            : void 0;
        },
        "mouseleave .ui-spinner-button": "_stop"
      },
      _draw: function() {
        var a = (this.uiSpinner = this.element
          .addClass("ui-spinner-input")
          .attr("autocomplete", "off")
          .wrap(this._uiSpinnerHtml())
          .parent()
          .append(this._buttonHtml()));
        this.element.attr("role", "spinbutton"),
          (this.buttons = a
            .find(".ui-spinner-button")
            .attr("tabIndex", -1)
            .button()
            .removeClass("ui-corner-all")),
          this.buttons.height() > Math.ceil(0.5 * a.height()) &&
            a.height() > 0 &&
            a.height(a.height()),
          this.options.disabled && this.disable();
      },
      _keydown: function(b) {
        var a = this.options,
          c = J.ui.keyCode;
        switch (b.keyCode) {
          case c.UP:
            return this._repeat(null, 1, b), !0;
          case c.DOWN:
            return this._repeat(null, -1, b), !0;
          case c.PAGE_UP:
            return this._repeat(null, a.page, b), !0;
          case c.PAGE_DOWN:
            return this._repeat(null, -a.page, b), !0;
        }
        return !1;
      },
      _uiSpinnerHtml: function() {
        return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>";
      },
      _buttonHtml: function() {
        return (
          "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon " +
          this.options.icons.up +
          "'>&#9650;</span></a><a class='ui-spinner-button ui-spinner-down ui-corner-br'><span class='ui-icon " +
          this.options.icons.down +
          "'>&#9660;</span></a>"
        );
      },
      _start: function(a) {
        return this.spinning || this._trigger("start", a) !== !1
          ? (this.counter || (this.counter = 1), (this.spinning = !0), !0)
          : !1;
      },
      _repeat: function(c, b, a) {
        (c = c || 500),
          clearTimeout(this.timer),
          (this.timer = this._delay(function() {
            this._repeat(40, b, a);
          }, c)),
          this._spin(b * this.options.step, a);
      },
      _spin: function(c, b) {
        var a = this.value() || 0;
        this.counter || (this.counter = 1),
          (a = this._adjustValue(a + c * this._increment(this.counter))),
          (this.spinning && this._trigger("spin", b, { value: a }) === !1) ||
            (this._value(a), this.counter++);
      },
      _increment: function(b) {
        var a = this.options.incremental;
        return a
          ? J.isFunction(a)
            ? a(b)
            : Math.floor(b * b * b / 50000 - b * b / 500 + 17 * b / 200 + 1)
          : 1;
      },
      _precision: function() {
        var a = this._precisionOf(this.options.step);
        return (
          null !== this.options.min &&
            (a = Math.max(a, this._precisionOf(this.options.min))),
          a
        );
      },
      _precisionOf: function(c) {
        var b = "" + c,
          a = b.indexOf(".");
        return -1 === a ? 0 : b.length - a - 1;
      },
      _adjustValue: function(d) {
        var b,
          a,
          c = this.options;
        return (
          (b = null !== c.min ? c.min : 0),
          (a = d - b),
          (a = Math.round(a / c.step) * c.step),
          (d = b + a),
          (d = parseFloat(d.toFixed(this._precision()))),
          null !== c.max && d > c.max
            ? c.max
            : null !== c.min && c.min > d
              ? c.min
              : d
        );
      },
      _stop: function(a) {
        this.spinning &&
          (clearTimeout(this.timer),
          clearTimeout(this.mousewheelTimer),
          (this.counter = 0),
          (this.spinning = !1),
          this._trigger("stop", a));
      },
      _setOption: function(c, b) {
        if ("culture" === c || "numberFormat" === c) {
          var a = this._parse(this.element.val());
          return (
            (this.options[c] = b), this.element.val(this._format(a)), void 0
          );
        }
        ("max" === c || "min" === c || "step" === c) &&
          "string" == typeof b &&
          (b = this._parse(b)),
          "icons" === c &&
            (this.buttons
              .first()
              .find(".ui-icon")
              .removeClass(this.options.icons.up)
              .addClass(b.up),
            this.buttons
              .last()
              .find(".ui-icon")
              .removeClass(this.options.icons.down)
              .addClass(b.down)),
          this._super(c, b),
          "disabled" === c &&
            (this.widget().toggleClass("ui-state-disabled", !!b),
            this.element.prop("disabled", !!b),
            this.buttons.button(b ? "disable" : "enable"));
      },
      _setOptions: G(function(a) {
        this._super(a);
      }),
      _parse: function(a) {
        return (
          "string" == typeof a &&
            "" !== a &&
            (a =
              window.Globalize && this.options.numberFormat
                ? Globalize.parseFloat(a, 10, this.options.culture)
                : +a),
          "" === a || isNaN(a) ? null : a
        );
      },
      _format: function(a) {
        return "" === a
          ? ""
          : window.Globalize && this.options.numberFormat
            ? Globalize.format(
                a,
                this.options.numberFormat,
                this.options.culture
              )
            : a;
      },
      _refresh: function() {
        this.element.attr({
          "aria-valuemin": this.options.min,
          "aria-valuemax": this.options.max,
          "aria-valuenow": this._parse(this.element.val())
        });
      },
      isValid: function() {
        var a = this.value();
        return null === a ? !1 : a === this._adjustValue(a);
      },
      _value: function(c, b) {
        var a;
        "" !== c &&
          ((a = this._parse(c)),
          null !== a &&
            (b || (a = this._adjustValue(a)), (c = this._format(a)))),
          this.element.val(c),
          this._refresh();
      },
      _destroy: function() {
        this.element
          .removeClass("ui-spinner-input")
          .prop("disabled", !1)
          .removeAttr("autocomplete")
          .removeAttr("role")
          .removeAttr("aria-valuemin")
          .removeAttr("aria-valuemax")
          .removeAttr("aria-valuenow"),
          this.uiSpinner.replaceWith(this.element);
      },
      stepUp: G(function(a) {
        this._stepUp(a);
      }),
      _stepUp: function(a) {
        this._start() &&
          (this._spin((a || 1) * this.options.step), this._stop());
      },
      stepDown: G(function(a) {
        this._stepDown(a);
      }),
      _stepDown: function(a) {
        this._start() &&
          (this._spin((a || 1) * -this.options.step), this._stop());
      },
      pageUp: G(function(a) {
        this._stepUp((a || 1) * this.options.page);
      }),
      pageDown: G(function(a) {
        this._stepDown((a || 1) * this.options.page);
      }),
      value: function(a) {
        return arguments.length
          ? (G(this._value).call(this, a), void 0)
          : this._parse(this.element.val());
      },
      widget: function() {
        return this.uiSpinner;
      }
    }),
    J.widget("ui.tabs", {
      version: "1.11.2",
      delay: 300,
      options: {
        active: null,
        collapsible: !1,
        event: "click",
        heightStyle: "content",
        hide: null,
        show: null,
        activate: null,
        beforeActivate: null,
        beforeLoad: null,
        load: null
      },
      _isLocal: (function() {
        var a = /#.*$/;
        return function(c) {
          var b, d;
          (c = c.cloneNode(!1)),
            (b = c.href.replace(a, "")),
            (d = location.href.replace(a, ""));
          try {
            b = decodeURIComponent(b);
          } catch (e) {}
          try {
            d = decodeURIComponent(d);
          } catch (e) {}
          return c.hash.length > 1 && b === d;
        };
      })(),
      _create: function() {
        var b = this,
          a = this.options;
        (this.running = !1),
          this.element
            .addClass("ui-tabs ui-widget ui-widget-content ui-corner-all")
            .toggleClass("ui-tabs-collapsible", a.collapsible),
          this._processTabs(),
          (a.active = this._initialActive()),
          J.isArray(a.disabled) &&
            (a.disabled = J.unique(
              a.disabled.concat(
                J.map(this.tabs.filter(".ui-state-disabled"), function(c) {
                  return b.tabs.index(c);
                })
              )
            ).sort()),
          (this.active =
            this.options.active !== !1 && this.anchors.length
              ? this._findActive(a.active)
              : J()),
          this._refresh(),
          this.active.length && this.load(a.active);
      },
      _initialActive: function() {
        var b = this.options.active,
          a = this.options.collapsible,
          c = location.hash.substring(1);
        return (
          null === b &&
            (c &&
              this.tabs.each(function(d, e) {
                return J(e).attr("aria-controls") === c
                  ? ((b = d), !1)
                  : void 0;
              }),
            null === b &&
              (b = this.tabs.index(this.tabs.filter(".ui-tabs-active"))),
            (null === b || -1 === b) && (b = this.tabs.length ? 0 : !1)),
          b !== !1 &&
            ((b = this.tabs.index(this.tabs.eq(b))),
            -1 === b && (b = a ? !1 : 0)),
          !a && b === !1 && this.anchors.length && (b = 0),
          b
        );
      },
      _getCreateEventData: function() {
        return {
          tab: this.active,
          panel: this.active.length ? this._getPanelForTab(this.active) : J()
        };
      },
      _tabKeydown: function(b) {
        var a = J(this.document[0].activeElement).closest("li"),
          c = this.tabs.index(a),
          d = !0;
        if (!this._handlePageNav(b)) {
          switch (b.keyCode) {
            case J.ui.keyCode.RIGHT:
            case J.ui.keyCode.DOWN:
              c++;
              break;
            case J.ui.keyCode.UP:
            case J.ui.keyCode.LEFT:
              (d = !1), c--;
              break;
            case J.ui.keyCode.END:
              c = this.anchors.length - 1;
              break;
            case J.ui.keyCode.HOME:
              c = 0;
              break;
            case J.ui.keyCode.SPACE:
              return (
                b.preventDefault(),
                clearTimeout(this.activating),
                this._activate(c),
                void 0
              );
            case J.ui.keyCode.ENTER:
              return (
                b.preventDefault(),
                clearTimeout(this.activating),
                this._activate(c === this.options.active ? !1 : c),
                void 0
              );
            default:
              return;
          }
          b.preventDefault(),
            clearTimeout(this.activating),
            (c = this._focusNextTab(c, d)),
            b.ctrlKey ||
              (a.attr("aria-selected", "false"),
              this.tabs.eq(c).attr("aria-selected", "true"),
              (this.activating = this._delay(function() {
                this.option("active", c);
              }, this.delay)));
        }
      },
      _panelKeydown: function(a) {
        this._handlePageNav(a) ||
          (a.ctrlKey &&
            a.keyCode === J.ui.keyCode.UP &&
            (a.preventDefault(), this.active.focus()));
      },
      _handlePageNav: function(a) {
        return a.altKey && a.keyCode === J.ui.keyCode.PAGE_UP
          ? (this._activate(this._focusNextTab(this.options.active - 1, !1)),
            !0)
          : a.altKey && a.keyCode === J.ui.keyCode.PAGE_DOWN
            ? (this._activate(this._focusNextTab(this.options.active + 1, !0)),
              !0)
            : void 0;
      },
      _findNextTab: function(b, a) {
        function c() {
          return b > d && (b = 0), 0 > b && (b = d), b;
        }
        for (
          var d = this.tabs.length - 1;
          -1 !== J.inArray(c(), this.options.disabled);

        ) {
          b = a ? b + 1 : b - 1;
        }
        return b;
      },
      _focusNextTab: function(b, a) {
        return (b = this._findNextTab(b, a)), this.tabs.eq(b).focus(), b;
      },
      _setOption: function(b, a) {
        return "active" === b
          ? (this._activate(a), void 0)
          : "disabled" === b
            ? (this._setupDisabled(a), void 0)
            : (this._super(b, a),
              "collapsible" === b &&
                (this.element.toggleClass("ui-tabs-collapsible", a),
                a || this.options.active !== !1 || this._activate(0)),
              "event" === b && this._setupEvents(a),
              "heightStyle" === b && this._setupHeightStyle(a),
              void 0);
      },
      _sanitizeSelector: function(a) {
        return a
          ? a.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&")
          : "";
      },
      refresh: function() {
        var b = this.options,
          a = this.tablist.children(":has(a[href])");
        (b.disabled = J.map(a.filter(".ui-state-disabled"), function(c) {
          return a.index(c);
        })),
          this._processTabs(),
          b.active !== !1 && this.anchors.length
            ? this.active.length && !J.contains(this.tablist[0], this.active[0])
              ? this.tabs.length === b.disabled.length
                ? ((b.active = !1), (this.active = J()))
                : this._activate(
                    this._findNextTab(Math.max(0, b.active - 1), !1)
                  )
              : (b.active = this.tabs.index(this.active))
            : ((b.active = !1), (this.active = J())),
          this._refresh();
      },
      _refresh: function() {
        this._setupDisabled(this.options.disabled),
          this._setupEvents(this.options.event),
          this._setupHeightStyle(this.options.heightStyle),
          this.tabs
            .not(this.active)
            .attr({
              "aria-selected": "false",
              "aria-expanded": "false",
              tabIndex: -1
            }),
          this.panels
            .not(this._getPanelForTab(this.active))
            .hide()
            .attr({ "aria-hidden": "true" }),
          this.active.length
            ? (this.active
                .addClass("ui-tabs-active ui-state-active")
                .attr({
                  "aria-selected": "true",
                  "aria-expanded": "true",
                  tabIndex: 0
                }),
              this._getPanelForTab(this.active)
                .show()
                .attr({ "aria-hidden": "false" }))
            : this.tabs.eq(0).attr("tabIndex", 0);
      },
      _processTabs: function() {
        var b = this,
          a = this.tabs,
          c = this.anchors,
          d = this.panels;
        (this.tablist = this._getList()
          .addClass(
            "ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"
          )
          .attr("role", "tablist")
          .delegate("> li", "mousedown" + this.eventNamespace, function(e) {
            J(this).is(".ui-state-disabled") && e.preventDefault();
          })
          .delegate(
            ".ui-tabs-anchor",
            "focus" + this.eventNamespace,
            function() {
              J(this)
                .closest("li")
                .is(".ui-state-disabled") && this.blur();
            }
          )),
          (this.tabs = this.tablist
            .find("> li:has(a[href])")
            .addClass("ui-state-default ui-corner-top")
            .attr({ role: "tab", tabIndex: -1 })),
          (this.anchors = this.tabs
            .map(function() {
              return J("a", this)[0];
            })
            .addClass("ui-tabs-anchor")
            .attr({ role: "presentation", tabIndex: -1 })),
          (this.panels = J()),
          this.anchors.each(function(g, p) {
            var v,
              f,
              u,
              t = J(p)
                .uniqueId()
                .attr("id"),
              m = J(p).closest("li"),
              e = m.attr("aria-controls");
            b._isLocal(p)
              ? ((v = p.hash),
                (u = v.substring(1)),
                (f = b.element.find(b._sanitizeSelector(v))))
              : ((u = m.attr("aria-controls") || J({}).uniqueId()[0].id),
                (v = "#" + u),
                (f = b.element.find(v)),
                f.length ||
                  ((f = b._createPanel(u)),
                  f.insertAfter(b.panels[g - 1] || b.tablist)),
                f.attr("aria-live", "polite")),
              f.length && (b.panels = b.panels.add(f)),
              e && m.data("ui-tabs-aria-controls", e),
              m.attr({ "aria-controls": u, "aria-labelledby": t }),
              f.attr("aria-labelledby", t);
          }),
          this.panels
            .addClass("ui-tabs-panel ui-widget-content ui-corner-bottom")
            .attr("role", "tabpanel"),
          a &&
            (this._off(a.not(this.tabs)),
            this._off(c.not(this.anchors)),
            this._off(d.not(this.panels)));
      },
      _getList: function() {
        return this.tablist || this.element.find("ol,ul").eq(0);
      },
      _createPanel: function(a) {
        return J("<div>")
          .attr("id", a)
          .addClass("ui-tabs-panel ui-widget-content ui-corner-bottom")
          .data("ui-tabs-destroy", !0);
      },
      _setupDisabled: function(b) {
        J.isArray(b) &&
          (b.length ? b.length === this.anchors.length && (b = !0) : (b = !1));
        for (var a, c = 0; (a = this.tabs[c]); c++) {
          b === !0 || -1 !== J.inArray(c, b)
            ? J(a)
                .addClass("ui-state-disabled")
                .attr("aria-disabled", "true")
            : J(a)
                .removeClass("ui-state-disabled")
                .removeAttr("aria-disabled");
        }
        this.options.disabled = b;
      },
      _setupEvents: function(b) {
        var a = {};
        b &&
          J.each(b.split(" "), function(d, c) {
            a[c] = "_eventHandler";
          }),
          this._off(this.anchors.add(this.tabs).add(this.panels)),
          this._on(!0, this.anchors, {
            click: function(c) {
              c.preventDefault();
            }
          }),
          this._on(this.anchors, a),
          this._on(this.tabs, { keydown: "_tabKeydown" }),
          this._on(this.panels, { keydown: "_panelKeydown" }),
          this._focusable(this.tabs),
          this._hoverable(this.tabs);
      },
      _setupHeightStyle: function(b) {
        var a,
          c = this.element.parent();
        "fill" === b
          ? ((a = c.height()),
            (a -= this.element.outerHeight() - this.element.height()),
            this.element.siblings(":visible").each(function() {
              var d = J(this),
                e = d.css("position");
              "absolute" !== e && "fixed" !== e && (a -= d.outerHeight(!0));
            }),
            this.element
              .children()
              .not(this.panels)
              .each(function() {
                a -= J(this).outerHeight(!0);
              }),
            this.panels
              .each(function() {
                J(this).height(
                  Math.max(0, a - J(this).innerHeight() + J(this).height())
                );
              })
              .css("overflow", "auto"))
          : "auto" === b &&
            ((a = 0),
            this.panels
              .each(function() {
                a = Math.max(
                  a,
                  J(this)
                    .height("")
                    .height()
                );
              })
              .height(a));
      },
      _eventHandler: function(v) {
        var f = this.options,
          y = this.active,
          d = J(v.currentTarget),
          m = d.closest("li"),
          c = m[0] === y[0],
          b = c && f.collapsible,
          g = b ? J() : this._getPanelForTab(m),
          e = y.length ? this._getPanelForTab(y) : J(),
          p = { oldTab: y, oldPanel: e, newTab: b ? J() : m, newPanel: g };
        v.preventDefault(),
          m.hasClass("ui-state-disabled") ||
            m.hasClass("ui-tabs-loading") ||
            this.running ||
            (c && !f.collapsible) ||
            this._trigger("beforeActivate", v, p) === !1 ||
            ((f.active = b ? !1 : this.tabs.index(m)),
            (this.active = c ? J() : m),
            this.xhr && this.xhr.abort(),
            e.length ||
              g.length ||
              J.error("jQuery UI Tabs: Mismatching fragment identifier."),
            g.length && this.load(this.tabs.index(m), v),
            this._toggle(v, p));
      },
      _toggle: function(d, c) {
        function e() {
          (b.running = !1), b._trigger("activate", d, c);
        }
        function h() {
          c.newTab.closest("li").addClass("ui-tabs-active ui-state-active"),
            g.length && b.options.show
              ? b._show(g, b.options.show, e)
              : (g.show(), e());
        }
        var b = this,
          g = c.newPanel,
          f = c.oldPanel;
        (this.running = !0),
          f.length && this.options.hide
            ? this._hide(f, this.options.hide, function() {
                c.oldTab
                  .closest("li")
                  .removeClass("ui-tabs-active ui-state-active"),
                  h();
              })
            : (c.oldTab
                .closest("li")
                .removeClass("ui-tabs-active ui-state-active"),
              f.hide(),
              h()),
          f.attr("aria-hidden", "true"),
          c.oldTab.attr({ "aria-selected": "false", "aria-expanded": "false" }),
          g.length && f.length
            ? c.oldTab.attr("tabIndex", -1)
            : g.length &&
              this.tabs
                .filter(function() {
                  return 0 === J(this).attr("tabIndex");
                })
                .attr("tabIndex", -1),
          g.attr("aria-hidden", "false"),
          c.newTab.attr({
            "aria-selected": "true",
            "aria-expanded": "true",
            tabIndex: 0
          });
      },
      _activate: function(b) {
        var a,
          c = this._findActive(b);
        c[0] !== this.active[0] &&
          (c.length || (c = this.active),
          (a = c.find(".ui-tabs-anchor")[0]),
          this._eventHandler({
            target: a,
            currentTarget: a,
            preventDefault: J.noop
          }));
      },
      _findActive: function(a) {
        return a === !1 ? J() : this.tabs.eq(a);
      },
      _getIndex: function(a) {
        return (
          "string" == typeof a &&
            (a = this.anchors.index(
              this.anchors.filter("[href$='" + a + "']")
            )),
          a
        );
      },
      _destroy: function() {
        this.xhr && this.xhr.abort(),
          this.element.removeClass(
            "ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"
          ),
          this.tablist
            .removeClass(
              "ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"
            )
            .removeAttr("role"),
          this.anchors
            .removeClass("ui-tabs-anchor")
            .removeAttr("role")
            .removeAttr("tabIndex")
            .removeUniqueId(),
          this.tablist.unbind(this.eventNamespace),
          this.tabs.add(this.panels).each(function() {
            J.data(this, "ui-tabs-destroy")
              ? J(this).remove()
              : J(this)
                  .removeClass(
                    "ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel"
                  )
                  .removeAttr("tabIndex")
                  .removeAttr("aria-live")
                  .removeAttr("aria-busy")
                  .removeAttr("aria-selected")
                  .removeAttr("aria-labelledby")
                  .removeAttr("aria-hidden")
                  .removeAttr("aria-expanded")
                  .removeAttr("role");
          }),
          this.tabs.each(function() {
            var b = J(this),
              a = b.data("ui-tabs-aria-controls");
            a
              ? b.attr("aria-controls", a).removeData("ui-tabs-aria-controls")
              : b.removeAttr("aria-controls");
          }),
          this.panels.show(),
          "content" !== this.options.heightStyle &&
            this.panels.css("height", "");
      },
      enable: function(b) {
        var a = this.options.disabled;
        a !== !1 &&
          (void 0 === b
            ? (a = !1)
            : ((b = this._getIndex(b)),
              (a = J.isArray(a)
                ? J.map(a, function(c) {
                    return c !== b ? c : null;
                  })
                : J.map(this.tabs, function(d, c) {
                    return c !== b ? c : null;
                  }))),
          this._setupDisabled(a));
      },
      disable: function(b) {
        var a = this.options.disabled;
        if (a !== !0) {
          if (void 0 === b) {
            a = !0;
          } else {
            if (((b = this._getIndex(b)), -1 !== J.inArray(b, a))) {
              return;
            }
            a = J.isArray(a) ? J.merge([b], a).sort() : [b];
          }
          this._setupDisabled(a);
        }
      },
      load: function(d, c) {
        d = this._getIndex(d);
        var e = this,
          h = this.tabs.eq(d),
          b = h.find(".ui-tabs-anchor"),
          g = this._getPanelForTab(h),
          f = { tab: h, panel: g };
        this._isLocal(b[0]) ||
          ((this.xhr = J.ajax(this._ajaxSettings(b, c, f))),
          this.xhr &&
            "canceled" !== this.xhr.statusText &&
            (h.addClass("ui-tabs-loading"),
            g.attr("aria-busy", "true"),
            this.xhr
              .success(function(a) {
                setTimeout(function() {
                  g.html(a), e._trigger("load", c, f);
                }, 1);
              })
              .complete(function(i, a) {
                setTimeout(function() {
                  "abort" === a && e.panels.stop(!1, !0),
                    h.removeClass("ui-tabs-loading"),
                    g.removeAttr("aria-busy"),
                    i === e.xhr && delete e.xhr;
                }, 1);
              })));
      },
      _ajaxSettings: function(b, a, c) {
        var d = this;
        return {
          url: b.attr("href"),
          beforeSend: function(f, e) {
            return d._trigger(
              "beforeLoad",
              a,
              J.extend({ jqXHR: f, ajaxSettings: e }, c)
            );
          }
        };
      },
      _getPanelForTab: function(b) {
        var a = J(b).attr("aria-controls");
        return this.element.find(this._sanitizeSelector("#" + a));
      }
    }),
    J.widget("ui.tooltip", {
      version: "1.11.2",
      options: {
        content: function() {
          var a = J(this).attr("title") || "";
          return J("<a>")
            .text(a)
            .html();
        },
        hide: !0,
        items: "[title]:not([disabled])",
        position: {
          my: "left top+15",
          at: "left bottom",
          collision: "flipfit flip"
        },
        show: !0,
        tooltipClass: null,
        track: !1,
        close: null,
        open: null
      },
      _addDescribedBy: function(b, a) {
        var c = (b.attr("aria-describedby") || "").split(/\s+/);
        c.push(a),
          b
            .data("ui-tooltip-id", a)
            .attr("aria-describedby", J.trim(c.join(" ")));
      },
      _removeDescribedBy: function(b) {
        var a = b.data("ui-tooltip-id"),
          c = (b.attr("aria-describedby") || "").split(/\s+/),
          d = J.inArray(a, c);
        -1 !== d && c.splice(d, 1),
          b.removeData("ui-tooltip-id"),
          (c = J.trim(c.join(" "))),
          c ? b.attr("aria-describedby", c) : b.removeAttr("aria-describedby");
      },
      _create: function() {
        this._on({ mouseover: "open", focusin: "open" }),
          (this.tooltips = {}),
          (this.parents = {}),
          this.options.disabled && this._disable(),
          (this.liveRegion = J("<div>")
            .attr({
              role: "log",
              "aria-live": "assertive",
              "aria-relevant": "additions"
            })
            .addClass("ui-helper-hidden-accessible")
            .appendTo(this.document[0].body));
      },
      _setOption: function(b, a) {
        var c = this;
        return "disabled" === b
          ? (this[a ? "_disable" : "_enable"](), (this.options[b] = a), void 0)
          : (this._super(b, a),
            "content" === b &&
              J.each(this.tooltips, function(f, d) {
                c._updateContent(d.element);
              }),
            void 0);
      },
      _disable: function() {
        var a = this;
        J.each(this.tooltips, function(b, c) {
          var d = J.Event("blur");
          (d.target = d.currentTarget = c.element[0]), a.close(d, !0);
        }),
          this.element
            .find(this.options.items)
            .addBack()
            .each(function() {
              var b = J(this);
              b.is("[title]") &&
                b.data("ui-tooltip-title", b.attr("title")).removeAttr("title");
            });
      },
      _enable: function() {
        this.element
          .find(this.options.items)
          .addBack()
          .each(function() {
            var a = J(this);
            a.data("ui-tooltip-title") &&
              a.attr("title", a.data("ui-tooltip-title"));
          });
      },
      open: function(b) {
        var a = this,
          c = J(b ? b.target : this.element).closest(this.options.items);
        c.length &&
          !c.data("ui-tooltip-id") &&
          (c.attr("title") && c.data("ui-tooltip-title", c.attr("title")),
          c.data("ui-tooltip-open", !0),
          b &&
            "mouseover" === b.type &&
            c.parents().each(function() {
              var d,
                e = J(this);
              e.data("ui-tooltip-open") &&
                ((d = J.Event("blur")),
                (d.target = d.currentTarget = this),
                a.close(d, !0)),
                e.attr("title") &&
                  (e.uniqueId(),
                  (a.parents[this.id] = {
                    element: this,
                    title: e.attr("title")
                  }),
                  e.attr("title", ""));
            }),
          this._updateContent(c, b));
      },
      _updateContent: function(g, d) {
        var c,
          f = this.options.content,
          h = this,
          b = d ? d.type : null;
        return "string" == typeof f
          ? this._open(d, g, f)
          : ((c = f.call(g[0], function(a) {
              g.data("ui-tooltip-open") &&
                h._delay(function() {
                  d && (d.type = b), this._open(d, g, a);
                });
            })),
            c && this._open(d, g, c),
            void 0);
      },
      _open: function(v, f, y) {
        function d(a) {
          (p.of = a), c.is(":hidden") || c.position(p);
        }
        var m,
          c,
          b,
          g,
          e,
          p = J.extend({}, this.options.position);
        if (y) {
          if ((m = this._find(f))) {
            return m.tooltip.find(".ui-tooltip-content").html(y), void 0;
          }
          f.is("[title]") &&
            (v && "mouseover" === v.type
              ? f.attr("title", "")
              : f.removeAttr("title")),
            (m = this._tooltip(f)),
            (c = m.tooltip),
            this._addDescribedBy(f, c.attr("id")),
            c.find(".ui-tooltip-content").html(y),
            this.liveRegion.children().hide(),
            y.clone
              ? ((e = y.clone()),
                e
                  .removeAttr("id")
                  .find("[id]")
                  .removeAttr("id"))
              : (e = y),
            J("<div>")
              .html(e)
              .appendTo(this.liveRegion),
            this.options.track && v && /^mouse/.test(v.type)
              ? (this._on(this.document, { mousemove: d }), d(v))
              : c.position(J.extend({ of: f }, this.options.position)),
            c.hide(),
            this._show(c, this.options.show),
            this.options.show &&
              this.options.show.delay &&
              (g = this.delayedShow = setInterval(function() {
                c.is(":visible") && (d(p.of), clearInterval(g));
              }, J.fx.interval)),
            this._trigger("open", v, { tooltip: c }),
            (b = {
              keyup: function(a) {
                if (a.keyCode === J.ui.keyCode.ESCAPE) {
                  var h = J.Event(a);
                  (h.currentTarget = f[0]), this.close(h, !0);
                }
              }
            }),
            f[0] !== this.element[0] &&
              (b.remove = function() {
                this._removeTooltip(c);
              }),
            (v && "mouseover" !== v.type) || (b.mouseleave = "close"),
            (v && "focusin" !== v.type) || (b.focusout = "close"),
            this._on(!0, f, b);
        }
      },
      close: function(d) {
        var c,
          e = this,
          f = J(d ? d.currentTarget : this.element),
          b = this._find(f);
        b &&
          ((c = b.tooltip),
          b.closing ||
            (clearInterval(this.delayedShow),
            f.data("ui-tooltip-title") &&
              !f.attr("title") &&
              f.attr("title", f.data("ui-tooltip-title")),
            this._removeDescribedBy(f),
            (b.hiding = !0),
            c.stop(!0),
            this._hide(c, this.options.hide, function() {
              e._removeTooltip(J(this));
            }),
            f.removeData("ui-tooltip-open"),
            this._off(f, "mouseleave focusout keyup"),
            f[0] !== this.element[0] && this._off(f, "remove"),
            this._off(this.document, "mousemove"),
            d &&
              "mouseleave" === d.type &&
              J.each(this.parents, function(g, a) {
                J(a.element).attr("title", a.title), delete e.parents[g];
              }),
            (b.closing = !0),
            this._trigger("close", d, { tooltip: c }),
            b.hiding || (b.closing = !1)));
      },
      _tooltip: function(b) {
        var a = J("<div>")
            .attr("role", "tooltip")
            .addClass(
              "ui-tooltip ui-widget ui-corner-all ui-widget-content " +
                (this.options.tooltipClass || "")
            ),
          c = a.uniqueId().attr("id");
        return (
          J("<div>")
            .addClass("ui-tooltip-content")
            .appendTo(a),
          a.appendTo(this.document[0].body),
          (this.tooltips[c] = { element: b, tooltip: a })
        );
      },
      _find: function(b) {
        var a = b.data("ui-tooltip-id");
        return a ? this.tooltips[a] : null;
      },
      _removeTooltip: function(a) {
        a.remove(), delete this.tooltips[a.attr("id")];
      },
      _destroy: function() {
        var a = this;
        J.each(this.tooltips, function(c, d) {
          var e = J.Event("blur"),
            b = d.element;
          (e.target = e.currentTarget = b[0]),
            a.close(e, !0),
            J("#" + c).remove(),
            b.data("ui-tooltip-title") &&
              (b.attr("title") || b.attr("title", b.data("ui-tooltip-title")),
              b.removeData("ui-tooltip-title"));
        }),
          this.liveRegion.remove();
      }
    });
});
