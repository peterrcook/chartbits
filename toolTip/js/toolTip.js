/* (C) 2014 Peter Cook */

(function() {

"use strict";

var animdata = window.animdata || {};
window.animdata = animdata;

animdata.d3 = animdata.d3 || {};
animdata.d3.toolTip = function() {

  /*----
  Configurable variables
  ----*/
  var config = {
    element: null,
    elements: null, // allows different templates on different elements
    offset: {x: 10, y: 10},
    template: null,
    templates: null, // allows different templates on different elements
    templateFunc: null, // allow template function
    title: null, // if no template specified, defines the title. If not a data property, display the string
    fields: null, // if no template specified, list the specified fields
    freezeOnClick: false,
    templateVariableScope: false,
    width: 200,
//    allowPointerEvents: false   // ie9 doesn't like this
  }



  /*----
  Internal variables
  ----*/
  var d3elements = {
    container: null,
    elements: null,
    tooltip: null
  }

  var uiState = {
    position: {x: 0, y: 0},
    hoverElement: null, // the element being hovered over
    frozen: false, // indicates whether the tooltip is frozen
  }

  var templates = null; // array of template functions


  /*------------
  Initialisation
  ------------*/
  function init(s) {
    // To make things simpler, we assume just one element in the selection
    d3elements.container = d3.select(s[0][0]);

    if(config.elements)
      d3elements.elements = d3elements.container.selectAll(config.elements.join(', '));
    else
      d3elements.elements = d3elements.container.selectAll(config.element);

    d3elements.elements
      .style('cursor', 'pointer');

    d3elements.tooltip = d3elements.container
      .select('div.tooltip');

    if(d3elements.tooltip[0][0] === null)
      constructTooltip();

    // Compile template
    if(config.template) {
      if(config.templateVariableScope)
        templates = [_.template(config.template, null, {variable: 'data'})];
      else
        templates = [_.template(config.template)];
    }

    if(config.templates) {
      if(config.templateVariableScope) {
        templates = _.map(config.templates, function(t) {
          return _.template(t, null, {variable: 'data'});
        });
      } else {
        templates = _.map(config.templates, function(t) {
          return _.template(t);
        });
      }
    }

    // console.log(templates);

    // Append template id to data
    if(config.elements) {
      _.each(config.elements, function(e, i) {
        d3elements.container.selectAll(e).attr('data-tooltip-template', i);
      });
    } else {
      d3elements.elements
        .attr('data-tooltip-template', 0);
    }
  }

  /*----
  Construction
  ----*/
  function constructTooltip() {
    d3elements.tooltip = d3elements.container
      .append('div')
      .classed('tooltip', true)
      .style('position', 'absolute')
      .style('opacity', 0)
      .style('width', config.width + 'px');
      // .style('pointer-events', config.allowPointerEvents); //ie9 doesn't like this
  }

  function addEvents() {
    d3elements.container
      .on('mousemove.tooltipComponent', function(d) {
        if(uiState.frozen)
          return;

        updatePosition();
      })
      .on('click.tooltipComponent', function() {
        if(!uiState.frozen)
          return;

        uiState.frozen = false;
        uiState.hoverElement = null;
        d3elements.tooltip
          .transition()
          .style('opacity', '0');
      });

    d3elements.elements
      .on('mouseover.tooltipComponent', function(d) {
        if(uiState.frozen)
          return;
        uiState.hoverElement = d3.select(this);
        d3elements.tooltip
          .transition()
         .style('opacity', '1');
        updateContent();
      })
      .on('mouseout.tooltipComponent', function() {
        if(uiState.frozen)
          return;
        d3elements.tooltip
          .transition()
          .style('opacity', '0');
        uiState.hoverElement = null;
      })
      .on('click.tooltipComponent', function(d) {
        if(!config.freezeOnClick)
          return;

        if(uiState.frozen && d3.select(this).classed('tooltip-selected')) {
          uiState.hoverElement.classed('tooltip-selected', false);
          uiState.frozen = false;
          return;
        }
        uiState.frozen = true;

        if(uiState.hoverElement !== null)
          uiState.hoverElement.classed('tooltip-selected', false);

        uiState.hoverElement = d3.select(this);
        uiState.hoverElement
          .classed('tooltip-selected', true);
        updatePosition();
        updateContent();
        d3.event.stopPropagation();
      });
  }



  /*----
  Update
  ----*/
  function updatePosition() {
    var container = d3elements.container[0][0];
    var pos = d3.mouse(container);
    var containerWidth = container.clientWidth;
    var containerHeight = container.clientHeight;

    uiState.position.x = pos[0] + config.offset.x;
    uiState.position.y = pos[1] + config.offset.y;

    // Adjust tooltip position depending on which container quadrant we're in
    if(pos[0] > 0.5 * containerWidth) {
      var tooltipWidth = d3elements.tooltip[0][0].clientWidth;
      uiState.position.x -= tooltipWidth + 2 * config.offset.x;
    }
    if(pos[1] > 0.5 * containerHeight) {
      var tooltipHeight = d3elements.tooltip[0][0].clientHeight;
      uiState.position.y -= tooltipHeight + 2 * config.offset.y;
    }

    d3elements.tooltip
      .style('left', uiState.position.x + 'px')
      .style('top', uiState.position.y + 'px');
  }

  function updateContent() {
    var datum = uiState.hoverElement.datum();

    d3elements.tooltip.html('');

    if(config.templateFunc) {
      d3elements.tooltip
        .html(config.templateFunc(datum));
    }
    else if(templates) {
      var i = uiState.hoverElement.attr('data-tooltip-template');
      // console.log(i, templates, templates[i]);
      d3elements.tooltip
        .html(templates[i](datum));
    } else {
      var dMap = d3.map(datum);

      // Title
      var title = config.title;

      if(dMap.has(config.title))
        title = datum[config.title];

      d3elements.tooltip
        .append('h1')
        .text(title);

      // Table of data
      if(config.fields) {
        var rows = d3elements.tooltip
          .append('table')
          .selectAll('tr')
          .data(config.fields)
          .enter()
          .append('tr');

        rows.append('td')
          .text(function(d) {return d;});
        rows.append('td')
          .text(function(d) {return datum[d];});
      }
    }
  }


  /*----
  Main chart function
  ----*/
  function chart(s) {
    init(s);

    // console.log('selection', d3elements.container);
    // construct();
    addEvents();
  }



  /*----
  Configuration getters/setters
  -----*/
  d3.keys(config).forEach(function(a) {
    chart[a] = function(_) {
      if(!arguments.length) return config[a];
      config[a] = _;
      return chart;
    }
  });

  return chart;
}

})();