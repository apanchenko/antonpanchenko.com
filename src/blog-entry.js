import React from 'react';
import marked from 'marked';
import Ajax from './ajax.js';
import blogidx from './blog-index.js';

export default class BlogEntry extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            entry: blogidx[this.props.match.params.id],
            __html: ""
        };
    }

    chopHeader(markdown) {
        return markdown.split('\n').slice(6).join('\n');
    }

    loadMarkdown() {
        Ajax.get(
            this.state.entry.filename,
            function (markdown) {
                this.setState({ __html: marked(this.chopHeader(markdown)) });
            }.bind(this)
        );
    }

    componentWillMount() {
        // marked.setOptions({highlight: function (code) { return highlight.highlightAuto(code).value; }});
        this.loadMarkdown();
    }

    render() {
        var items = [];
        if (this.state.__html.length > 0) {
            items.push((
                <div key="1">
                    <h1>{this.state.entry.title}</h1>
                    <div className="blogEntryMarkdown" key="hack" dangerouslySetInnerHTML={this.state} />
                </div>
            ));
        }

        return (
            <div className="blogEntryBox">
                {items}
            </div>
        );
    }
};