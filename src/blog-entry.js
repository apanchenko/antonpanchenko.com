import React from 'react';
import Ajax from './ajax.js';
import list from './list.js';

var md = require('markdown-it')();


export default class BlogEntry extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            entry: list[this.props.match.params.id],
            __html: ""
        };
    }

    chopHeader(markdown) {
        return markdown.split('\n').slice(4).join('\n');
    }

    loadMarkdown() {
        Ajax.get(
            this.state.entry.filename,
            function (markdown) {
                this.setState({ __html: md.render(this.chopHeader(markdown)) });
            }.bind(this)
        );
    }

    componentWillMount() {
        // marked.setOptions({highlight: function (code) { return highlight.highlightAuto(code).value; }});
        this.loadMarkdown();
    }

    render() {
        return (
            <div className="blogEntryBox">
                <h1>{this.state.entry.title}</h1>
                <div className="post-md" dangerouslySetInnerHTML={this.state} />
            </div>
        );
    }
};