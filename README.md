# Presenter

A javascript presentation tool. Each slide is a file. Works with svg, jpg, gif,
or pdf files.

Uses [choo](https://choo.io/) for the interactivity and DOM stuff. Uses
[keymaster](https://github.com/madrobby/keymaster) for the keyboard shortcuts.

## Usage

Prepare a folder with a `slides.json` file and a `slides/` directory with a file for each slide.

```sh
# Clone somewhere and then install dependencies
# like ~/Documents/GitHub/myobie/presenter
$ npm i

# Then cd to your folder that contains your slides
$ cd ~/Documents/presentation/slides

# Then start the presenter
$ ~/Documents/GitHub/myobie/presenter/bin/present.js

# Then navigate to localhost:8080
```

## TODO

- [x] Copy over from the private repo and delete non-generic things
- [ ] Make a sketch plugin that can number artboards from top left down, then
      back to the top and right one, then down…
- [x] Create a `bin` cli that can read slides from a current folder
- [ ] Read and execute a local `plugins.js` so users can inject their own views and/or interactions (`use` and `view`)
- [ ] Use `sketchtool` to export the slides on boot
- [ ] Put exported slides into a cache directory
- [ ] Only re-export slides if the sketch file has changed

