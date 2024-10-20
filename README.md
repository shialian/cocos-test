## Cocos Test
- 可以在cocos creator的preview mode上，執行的測試工具
- 參考並模仿[mocha](https://github.com/mochajs/mocha?tab=readme-ov-file)的流程所製作，其主流程參考自[這篇文章](https://shawnlin0201.github.io/mocha.js/Mocha-002-run-cycle/)
- 非官方擴充元件，單純寫來給自己用的，public只是在想能不能幫到有需要的人一點點的忙，有任何爭議或不妥會馬上轉回private以防延燒

## Installation
1. 整包下載或git clone到\<project\>/extensions底下
2. 執行`npm install`
3. SelfTest.test.ts是測試這個工具的程式碼，可以直接刪除
   
## Use Cocos Test
方法有二，完成後直接執行，就能在console中看到log了
1. 直接將StartTest.ts掛到場景中
2. 直接呼叫run();

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.