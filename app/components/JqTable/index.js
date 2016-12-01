/**
 *
 * JqTable
 *
 */

import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'free-jqgrid/js/i18n/grid.locale-cn.js';
import 'free-jqgrid/css/ui.jqgrid.css';
import 'jquery-bootstrap-theme/css/custom-theme/jquery-ui-1.10.3.custom.css';
import 'free-jqgrid/js/jquery.jqgrid.src.js';
import $ from 'jquery';
// options的具体设置方式见网站：
//https://free-jqgrid.github.io/
// http://www.guriddo.net/demo/guriddojs/
//http://www.trirand.com/jqgridwiki/doku.php?id=wiki%3aevents
//http://blog.mn886.net/jqGrid/
class JqTable extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = { pagerID: `jqGridPager${Math.floor(Math.random() * 50)}` };
  }

  componentDidMount() {
    this.initJQueryPlugin();
  }

  componentWillUpdate() {
    $(this.grid).GridUnload();
  }

  componentDidUpdate() {
    this.initJQueryPlugin();
  }

  componentWillUnmount() {
    $(this.grid).GridUnload();
  }

  initJQueryPlugin() {
    $(this.grid).jqGrid(
      $.extend(
        {
          viewrecords: true, // show the current page, data rang and total records on the toolbar
          datatype: 'json',
          height: 'auto',
          width: 'auto',
          autowidth: true, // 自动宽
          pager: `#${this.state.pagerID}`,
          rowNum: 15,
          // serializeGridData: function (postData){
          //   console.debug("pst data =", postData);
          //   return postData;
          // },
          // afterInsertRow: function (rowid, rowdata){
          //   console.debug("after indert =" , rowdata);
          // },
        },
        this.props.options
      ));

    // activate the toolbar searching
    $(this.grid).jqGrid('navGrid', `#${this.state.pagerID}`, {
      search: true, // show search button on the toolbar
      add: true,
      edit: true,
      del: true,
      refresh: true,
    },

      // options for the Edit Dialog
      {
        editCaption: 'The Edit Dialog',
        recreateForm: true,
        checkOnUpdate: true,
        checkOnSubmit: true,
        closeAfterEdit: true,
        errorTextFormat(data) {
          return `Error: ${data.responseText}`;
        },
      },
      // options for the Add Dialog
      {
        closeAfterAdd: true,
        recreateForm: true,
        errorTextFormat(data) {
          return `Error: ${data.responseText}`;
        },
      },
      // options for the Delete Dailog
      {
        errorTextFormat(data) {
          return `Error: ${data.responseText}`;
        },
      },
    );

    // 表头合并
    if (this.props.groupHeaderOption) {
      $(this.grid).jqGrid('setGroupHeaders', {
        useColSpanStyle: true,
        groupHeaders: this.props.groupHeaderOption,
      });
    }
  }

  render() {
    return (
      <div>
        <table ref={(ref) => (this.grid = ref)} />
        <div id={this.state.pagerID}></div>
      </div>
    );
  }
}

JqTable.propTypes = {
  options: React.PropTypes.object,
  groupHeaderOption: React.PropTypes.object,
};

export default JqTable;
