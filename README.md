<p align="center" style="text-align: center">
  <img src="./readme_assets/banner.png" width="100%"><br/>
</p>

 thefontapp is a modern, open source font manager.

---

### features (current and planned)
#### manage  
- [x] install fonts (drag and drop)
    - [x] from otf and ttf files.
    - [x] from zip archives.
    - [x] from rar archives.
    - [x] from tar archives.
- [x] uninstall font families
    - [ ] uninstall singular style from font family
- [ ] move fonts between folders
- [ ] attach licences to font
- [ ] bulk actions

#### preview
- [x] filter by font name
- [x] change font size, weight, letter spacing, style and alignment
- [x] change display text globally and independently

#### google fonts integration
- [x] all from [preview](#preview)
- [x] install google fonts
    - [ ] select styles to install

#### organize
- [ ] add source folders
- [ ] add families to favorites
- [ ] add tags to families
- [ ] create collections

i probably am forgetting a lot of things though, so i will be updating.

---

### installation
there is not an installation, the app is just a binary file.

you can grab the linux build from the [releases](https://github.com/andrwui/thefontapp/releases).

windows and mac versions are yet to be built, as cross-compiling cgo packages is not at the best place afaik, and i don't have much time.

you can build them yourself following the steps in the [build](#build) section.

---

### build

i think the only requirement is to have [wails](https://github.com/wailsapp/wails) installed on your system.

you can just run `wails build -clean -platform [platform]`.

[here](https://wails.io/docs/reference/cli#platforms) is the list with available wails platforms.
