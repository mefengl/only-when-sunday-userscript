# Only When Sunday UserScript

[![GitHub stars](https://img.shields.io/github/stars/mefengl/only-when-sunday-userscript?style=social)](https://github.com/mefengl/only-when-sunday-userscript)
[![Follow on GitHub](https://img.shields.io/github/followers/mefengl?label=Follow%20%40mefengl&style=social)](https://github.com/mefengl)
[![Twitter Follow](https://img.shields.io/twitter/follow/mefengl?style=social)](https://twitter.com/mefengl)

🏖️ The "Only When Sunday" UserScript is a JavaScript-based browser automation tool that redirects specific websites to a designated URL every day of the week, except Sunday.

## Usage

The script currently targets the following websites:

- `twitter.com`
- `weibo.com`
- `youtube.com`
- `outlook.live.com`
- `spotify.com`
- `bilibili.com`
- `discord.com`

If you visit any of these sites, the script will redirect you to `https://weread.qq.com/web/shelf` unless it's Sunday.

## Customization

This script is created for personal use, but you can easily modify it to suit your own needs:

- **Redirected websites**: Modify the `websitesToRedirect` array in the script to include the websites you want to be redirected from. Just replace or add the desired URLs to the array.
  
- **Destination URL**: Change the URL to which the script redirects by modifying the `window.location.href` value in the script. Replace `https://weread.qq.com/web/shelf` with the URL of your choice.

## License

This project is licensed under the terms of the MIT license. For more details, see the `LICENSE` file.

## Disclaimer

Please note that this script is just a tool to help you avoid distractions on specific websites. It's not guaranteed to be foolproof. Please use responsibly.
