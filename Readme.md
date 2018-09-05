# coc-wxml

Wxml language server extension for [coc.nvim](https://github.com/neoclide/coc.nvim).

## Install

Install [nodejs](https://nodejs.org/en/download/) and [yarn](https://yarnpkg.com/en/docs/install).

``` sh
curl -sL install-node.now.sh/lts | sh
curl --compressed -o- -L https://yarnpkg.com/install.sh | bash
```

For [vim-plug](https://github.com/junegunn/vim-plug) user. Add:

``` vim
Plug 'neoclide/coc.nvim', {'do': { -> coc#util#install()}}
Plug 'neoclide/coc-wxml', {'do': 'yarn install --production'}
```

to your `.vimrc` or `init.vim`, restart vim and run `:PlugInstall`.

## Features

* Diagnostic support.
* `doHover` for tag name and tag attributes.
* `doComplete` for tag name, attributes and attribute values.

## License

MIT
