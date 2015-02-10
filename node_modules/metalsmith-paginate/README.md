#metalsmith-paginate

This plug-in makes [metalsmith-collections](https://github.com/segmentio/metalsmith-collections) "paginatable". it does so by creating virtual files which contain the information about the collection as well as the previous and next page.

You **must** use this in conjunction with [metalsmith-collections](https://github.com/segmentio/metalsmith-collections)!

##Usage

Firstly you must create a file that contains the information over which collection you want to paginate and the template name:

`blog.md`
```markdown
---
template: TEMPLATE-NAME.EXT
paginate: posts
---
```
> Note: if you give the page a title and use the [metalsmith-permalinks](https://github.com/segmentio/metalsmith-permalinks) plug-in you might get some weird result.


Then use your collections as usual and call `paginate()`.

```js

var Metalsmith  = require('metalsmith'),
    collections = require('metalsmith-collections'),
    paginate    = require('metalsmith-paginate'),
    // ...

Metalsmith(__dirname)
    .use(collections({
        posts: {
            pattern: 'content/posts/*.md',
            sortBy: 'date',
            reverse: true
        }
    }))
    .use(paginate({
        perPage: 10,
        path: "blog/page"
    }))
    .use(templates('ENGINE-NAME'))
    // ...
    .build()

```

##Options
| name | description |
|:-----|:------------|
|perPage|The number of items to be displayed per page|
|path|The path were the files will be outputted to. Appended with "-$NUM.html" where $NUM is the page number. So "blog/page" would for example result in the second page being rendered as `blog/page-2.html`. You can also use the placeholder ':collection' to insert the name of the collection.|


##Templates

The pagination info won't be of any use to you if you don't render it. Each (virtual) pagination file will contain a new object under the key "pagination" which contains the following info:

| name | description |
|:-----|:------------|
|num|The page number|
|total|The total number of pages|
|start|The start index|
|end|The end index|
|prev|The previous page object|
|next|The next page object|

You can then use this info in your template. Here's an example using Handlebars with a custom limit helper (which can be found [here](https://gist.github.com/RobinThrift/10375204)).

```handlebars
{{#each (limit collections.posts this.pagination.end this.pagination.start)}}
    <li class="post">
        <h2 class="entry-title">
            <a href="{{ this.path }}" rel="bookmark">{{ this.title }}</a>
        </h2>
        <article class="entry-summary">
            {{{ this.excerpt }}}
        </article>
        <footer>

            <a href="{{ this.path }}" class="button">Read More</a>
        </footer>
    </li>
{{/each}}

{{#if this.pagination}}
    <nav class="pagination">
        {{#if this.pagination.next}}
            <a href="{{this.pagination.next.path}}">&lt; Prev</a>
        {{/if}}
    
        {{#if this.pagination.prev}}
            <a href="{{this.pagination.prev.path}}">Next &gt;</a>
        {{/if}}
    </nav>
{{/if}}
```
> Note: This example also uses the [metalsmith-permalinks](https://github.com/segmentio/metalsmith-permalinks) plug-in