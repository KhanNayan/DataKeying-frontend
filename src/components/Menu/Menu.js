import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "./ghit.png";
export default class Menu extends Component {
  render() {
    return (
      <div>
        <aside className="main-sidebar sidebar-dark-blue  elevation-4">
          {/* Sidebar */}
          <div className="sidebar">
            {/* Sidebar user panel (optional) */}
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="image">
                <img src={logo} className="img-circle" alt="User-img" />
              </div>
              <div className="h4 info">
                <Link
                  to=""
                  style={{
                    color: "#ff9800",
                    fontWeight: "800",
                  }}
                  className="d-block"
                >
                  GHIT
                </Link>
              </div>
            </div>
            {/* Sidebar Menu */}
            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    <i className="nav-icon fas fa-th" />
                    <p>
                      Dashboard
                      <span className="right badge badge-danger">New</span>
                    </p>
                  </Link>
                </li>

                <li className="nav-item has-treeview">
                  <Link to="#" className="nav-link">
                    <i className="nav-icon fas fa-edit" />
                    <p>
                      Forms
                      <i className="fas fa-angle-left right" />
                    </p>
                  </Link>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to="/Add-record" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Add Record</p>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item has-treeview">
                  <Link to="#" className="nav-link">
                    <i className="nav-icon fas fa-table" />
                    <p>
                      Tables
                      <i className="fas fa-angle-left right" />
                    </p>
                  </Link>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to="/All-data" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>DataTables</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/Simple-table" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Simple Table</p>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item has-treeview">
                  <Link to="/series" className="nav-link">
                    <i className="nav-icon fa fa-search-minus" />
                    <p>
                      Field Tagging
                      <i className="fas fa-angle-left right" />
                    </p>
                  </Link>
                </li>
                <li className="nav-item has-treeview">
                  <Link to="/entry" className="nav-link">
                    <i className="nav-icon fa fa-keyboard" />
                    <p>
                      Data Entry
                      <i className="fas fa-angle-left right" />
                    </p>
                  </Link>
                </li>

                <li className="nav-item has-treeview">
                  <Link to="/tag-index" className="nav-link">
                    <i className="nav-icon fa fa-search-minus" />
                    <p>
                      Index Tagging
                      <i className="fas fa-angle-left right" />
                    </p>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    );
  }
}
