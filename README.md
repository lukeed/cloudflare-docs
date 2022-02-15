# Cloudflare Docs

**[View the docs →](https://developers.cloudflare.com/)**

[Contribute to the docs](https://github.com/cloudflare/cloudflare-docs/blob/production/CONTRIBUTING.md)

## Getting started

**Cloning the repository and installing dependencies**

First, clone the repo to your local machine:

```sh
$ git clone git@github.com:cloudflare/cloudflare-docs.git
$ cd cloudflare-docs
```

The cloudflare-docs repo is built with [Hugo](https://gohugo.io), a static site generator tool written in Go. Hugo has pre-built binaries for most operating systems and platforms - below is instructions on how to install Hugo in macOS - complete guides to installing Hugo on other platforms can be found at ["Install Hugo"](https://gohugo.io/getting-started/installing).

**The minimum required Hugo version for this project is 0.xx.**

```sh
# Install Homebrew
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install hugo
$ brew install hugo
```

Finally, you'll need to install some NPM packages that the docs use when compiling frontend JavaScript code:

```sh
$ npm install
```

If you don't have NPM installed locally, we recommend installing [Volta](https://github.com/volta-cli/volta) as your Node version manager, and installing the latest version of Node:

```sh
$ curl https://get.volta.sh | bash
$ volta install node@latest
```

**Developing/writing content**

To develop the docs locally, including writing new content, you can use the `dev` command, which includes live previewing and reloading of content:

```sh
$ npm run dev
```

To build the site as it will build during deployment, you can use the `build` command:

```sh
$ npm run build
```

## For Cloudflare employees

To get write access to this repo, please reach out to the **Developer Docs** room in chat.

## Products

| Product                         | Production URL                                                            |
| :------------------------------ | :------------------------------------------------------------------------ |
| 1.1.1.1                         | [Prod](https://developers.cloudflare.com/1.1.1.1)                         |
| Analytics                       | [Prod](https://developers.cloudflare.com/analytics)                       |
| API                             | [Prod](https://developers.cloudflare.com/api)                             |
| Automatic Platform Optimization | [Prod](https://developers.cloudflare.com/automatic-platform-optimization) |
| Bots                            | [Prod](https://developers.cloudflare.com/bots)                            |
| BYOIP                           | [Prod](https://developers.cloudflare.com/byoip)                           |
| Cloudflare One                  | [Prod](https://developers.cloudflare.com/cloudflare-one)                  |
| DDoS Protection                 | [Prod](https://developers.cloudflare.com/ddos-protection)                 |
| Distributed Web Gateway         | [Prod](https://developers.cloudflare.com/distributed-web)                 |
| Docs Engine                     | [Prod](https://developers.cloudflare.com/docs-engine)                     |
| Email Routing                   | [Prod](https://developers.cloudflare.com/email-routing)                   |
| Events                          | [Prod](https://developers.cloudflare.com/events)                          |
| Firewall                        | [Prod](https://developers.cloudflare.com/firewall)                        |
| Fundamentals                    | [Prod](https://developers.cloudflare.com/fundamentals)                    |
| HTTP/3                          | [Prod](https://developers.cloudflare.com/http3)                           |
| Image Optimization              | [Prod](https://developers.cloudflare.com/images)                          |
| Load Balancing                  | [Prod](https://developers.cloudflare.com/load-balancing)                  |
| Logs                            | [Prod](https://developers.cloudflare.com/logs)                            |
| Magic Firewall                  | [Prod](https://developers.cloudflare.com/magic-firewall)                  |
| Magic Transit                   | [Prod](https://developers.cloudflare.com/magic-transit)                   |
| Network Interconnect            | [Prod](https://developers.cloudflare.com/network-interconnect)            |
| Pages                           | [Prod](https://developers.cloudflare.com/pages)                           |
| Railgun                         | [Prod](https://developers.cloudflare.com/railgun)                         |
| Randomness Beacon               | [Prod](https://developers.cloudflare.com/randomness-beacon)               |
| Registrar                       | [Prod](https://developers.cloudflare.com/registrar)                       |
| Rules                           | [Prod](https://developers.cloudflare.com/rules)                           |
| Ruleset Engine                  | [Prod](https://developers.cloudflare.com/ruleset-engine)                  |
| Spectrum                        | [Prod](https://developers.cloudflare.com/spectrum)                        |
| SSL                             | [Prod](https://developers.cloudflare.com/ssl)                             |
| Stream                          | [Prod](https://developers.cloudflare.com/stream)                          |
| Tenant                          | [Prod](https://developers.cloudflare.com/tenant)                          |
| Terraform                       | [Prod](https://developers.cloudflare.com/terraform)                       |
| Time Services                   | [Prod](https://developers.cloudflare.com/time-services)                   |
| WAF                             | [Prod](https://developers.cloudflare.com/waf)                             |
| WARP Client                     | [Prod](https://developers.cloudflare.com/warp-client)                     |
| Workers                         | [Prod](https://developers.cloudflare.com/workers)                         |

### Deployment

Our docs are deployed using [Cloudflare Pages](https://pages.cloudflare.com). Every commit pushed to production will automatically deploy to [developers.cloudflare.com](https://developers.cloudflare.com), and any pull requests opened will have a corresponding staging URL available in the pull request comments.

### License and Legal Notices

Except as otherwise noted, Cloudflare and any contributors grant you a license to the Cloudflare Developer Documentation and other content in this repository under the [Creative Commons Attribution 4.0 International Public License](https://creativecommons.org/licenses/by/4.0/legalcode), see the [LICENSE file](https://github.com/cloudflare/cloudflare-docs/blob/production/LICENSE), and grant you a license to any code in the repository under the [MIT License](https://opensource.org/licenses/MIT), see the [LICENSE-CODE file](https://github.com/cloudflare/cloudflare-docs/blob/production/LICENSE-CODE).

Cloudflare products and services referenced in the documentation may be either trademarks or registered trademarks of Cloudflare in the United States and/or other countries. The licenses for this project do not grant you rights to use any Cloudflare names, logos, or trademarks. Cloudflare's general trademark guidelines can be found at [https://www.cloudflare.com/trademark/](https://www.cloudflare.com/trademark/).
Cloudflare and any contributors reserve all other rights, whether under their respective copyrights, patents, or trademarks, whether by implication, estoppel, or otherwise.
