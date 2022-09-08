# group-statistic-fe
通视界前端项目


需要安装的vscode插件：ESLint、Prettier、Stylelint
推荐安装的插件：Volar

setting.json配置
```
"editor.codeActionsOnSave": {
      "source.fixAll.eslint": true,
      "source.fixAll.stylelint": true,
    },
    "editor.tabSize": 2,
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "typescript",
        "vue"
    ],
    "stylelint.validate": [
        "css",
        "sass",
        "less",
        "vue"
    ],
    "[vue]": {
        "editor.formatOnSave": true,
        // "editor.defaultFormatter": "esbenp.prettier-vscode",
        // "editor.defaultFormatter": "stylelint.vscode-stylelint"
         "editor.defaultFormatter": "esbenp.prettier-vscode"
        // "editor.defaultFormatter": "octref.vetur"
    },
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint:prettier
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
