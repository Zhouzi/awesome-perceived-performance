var marked = require('marked'),
    fs     = require('fs');

module.exports = function generator () {
    fs.readFile('README.md', 'utf8', function (err, content) {
        if (err) throw err;

        // Yeah I know this is pretty ugly but it does the trick so I'll stick with it for now ;)
        var htmlContent =
                (marked(content)
                    .split('<hr>')
                    .pop()
                    .replace(/<h1/g, '</article><article class="article"><h1')
                    .replace(/^<\/article>/, '') +
                    '</article>')
                    .replace(/<\/h1>/g, '</h1><div class="article__content">')
                    .replace(/<\/article>/g, '</div></article>');

        fs.readFile('assets/template.html', 'utf8', function (err, content) {
            if (err) throw err;

            fs.writeFile('index.html', content.replace(/{{ content }}/g, htmlContent));
        });
    });
};