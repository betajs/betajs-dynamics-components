# grunt-git-revision-count

> Get current Git revision count

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-git-revision-count --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-git-revision-count');
```

## The "revision-count" task

### Overview
In your project's Gruntfile, add a section named `revision-count` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  'revision-count': {
    options: {
      property: 'revision-count',
      ref: 'HEAD'
    }
  },
})
```

### Options

#### options.property
Type: `String`
Default value: `'revision-count'`

Target configuration property

#### options.ref
Type: `String`
Default value: `'HEAD'`

What ref to read the revision count from.

### Usage Examples

```js
grunt.initConfig({
  preprocess: {
    options: {
      context: {
        revision: '<%= revision-count %>'
      }
    }
  }
})
```

## Release History
This plugin is based on the [grunt-git-revision](https://github.com/unfold/grunt-git-revision) plugin by Simen Brekken
