import React from 'react';
import { Link } from 'react-router-dom';
import blogidx from './blog-index.js';

class BlogListItem extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-xs-1">
                        {this.props.entry.date}
                </div>
                <div className="col-xs-11 post">
                    <Link to={"/" + this.props.entry.path}>
                        <img className="post-img" width="180" height="120" alt={this.props.entry.imgalt} src={this.props.entry.img} />
                        <h3 className="post-title">{this.props.entry.title}</h3>
                    </Link>
                </div>
            </div>
        );
    }
};

export default class BlogList extends React.Component {
    constructor(props) {
        super(props);

        var items = Object.keys(blogidx).map(function (key) {
            return <BlogListItem key={key} entry={blogidx[key]} />;
        }.bind(this));

        this.state = {
            items: items,
        };
    }

    render() {
        return (
           this.state.items
        );
    }
};