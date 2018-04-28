import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import blogidx from './blog-index.js';

class BlogListItem extends React.Component {
    render() {
        return (
            <div className="row">
                <Link to={"/" + this.props.entry.path}>
                    <div className="col-xs-8">
                        <h3 className="post-title">{this.props.entry.title}</h3>
                    </div>
                    <div className="col-xs-1 post-date">
                            {this.props.entry.date}
                    </div>
                    <div className="col-xs-3 post">
                        <Image src={this.props.entry.img} alt={this.props.entry.imgalt} width='450' height='300' responsive />
                    </div>
                </Link>
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