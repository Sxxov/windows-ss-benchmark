# windows-ss Benchmark

Benchmark to measure speeds between Node.js screenshot libraries.



## Run

1. `npm i`

2. `npm start`

   * or `npm start:png` to output `png` instead of `bmp`

   * or `npm start:100` to run only 100 times instead of 1000



## Notes

* You'll need .NET installed to install `windows-ss` because of `edge-js`
* Environment variables that you may change to modify the benchmark's behaviour are:
  * `RUNS={{number}}`
  * `FORMAT={{string}}`



## License

[MIT](https://opensource.org/licenses/MIT).

