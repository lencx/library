# [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

## Pattern

### flags

- g: global
- i: case-insensitive
- m: multiline
- u: unicode
- y: sticky

### Metacharacters

> ( [ { \ ^ $ | ) ? * + . ] }

```js
// [ ]
let a = 'acsacsc'
a.match(/[as]c/g) // ["ac", "ac", "sc"]
a.match(/\[as\]c/g) // null
```

## Properties

- `global`: **Boolean** - Whether to set `g` flags.
- `ignoerCase`: **Boolean** - Whether to set `i` flags.
- `lastIndex`: **Integer** - Specifies the index at which to start the next match, starting from `0`.
- `multiline`: **Boolean** - Whether to set `m` flags.
- _source_: Returns a **String** containing the source text of the regexp object, and it doesn't contain the two forward slashes on both sides and any flags.

```js
// source
/\.js/.source === '\\.js' // true
```

## Methods

- exec()
- test()
- \[@@match]() - regexp\[Symbol.match](str)
- \[@@replace]() - regexp\[Symbol.replace](str, newSubStr|function)
- \[@@search]() - regexp\[Symbol.search](str)
- \[@@split]() - regexp\[Symbol.split](str[, limit])