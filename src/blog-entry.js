import React from 'react';
import Ajax from './ajax.js';
import list from './list.js';
import Helmet from "react-helmet";

var md = require('markdown-it')();

export default class BlogEntry extends React.Component {
    constructor(props) {
        super(props);
        var entry = list[this.props.match.params.id];
        this.state = {
            filename:   entry.filename,
            path:       entry.path,
            title:      entry.title,
            imgalt:     entry.imgalt,
            description:entry.description,
            __html:     ""
        };
    }

    chopHeader(markdown) {
        return markdown.split('\n').slice(4).join('\n');
    }

    loadMarkdown() {
        Ajax.get(
            this.state.filename,
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
                <Helmet>
                    <meta property="og:url" content={document.URL}/>
                    <meta property="og:type" content="article" />
                    <meta property="og:title" content={this.state.title} />
                    <meta property="og:description" content={this.state.description} />
                    <meta property="og:image" content={document.location.origin + '/min/' + this.state.path + '.jpg'} />
                </Helmet> 
                <h1>{this.state.title}</h1>
                <div className="post-md" dangerouslySetInnerHTML={this.state} />
            </div>
        );
    }
};