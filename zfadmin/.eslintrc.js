module.exports = {
  root: false,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    // requireConfigFile:false   //解决eslint提示的第一行代码错误，但治标不治本啊，而且还误伤。这里设置false，就导致上面的解析器不会执行了。
    //报错的原因是项目没有作为vscode的项目根目录。方法1：通过根目录打开项目；方法2：设置root
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'warn',
    "vue/no-unused-vars": "warn",
    // 关闭驼峰命名规则
    "vue/multi-word-component-names": 0,
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
