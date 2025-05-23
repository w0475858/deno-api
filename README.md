<p align="center">
   <img src="https://user-images.githubusercontent.com/38007824/205580360-fa032554-5e9e-4266-8ec9-c78ca9a233bc.svg" width="250" alt="Danet Logo" />
</p>

## Description

[Danet](https://github.com/savory/danet) framework starter repository. We
recommend that you use our CLI instead of cloning the repository :

## Installation

Installing Deno packages as a commands is simple. You can install them under any
name you want. For simplicity's sake, we install our danet-cli under the name
danet.

`$ deno install --allow-read --allow-write --allow-run --allow-env -n danet https://deno.land/x/danet_cli/main.ts`

## Basic workflow

Once installed, you can invoke CLI commands directly from your OS command line
through the danet command. See the available danet commands by entering the
following:

$ danet --help To create, run a new basic Danet project, go to the folder that
should be the parent of your new project, and run the following commands:

```bash
$ danet new my-danet-project
$ cd my-danet-project
$ deno task launch-server
```

In your browser, open http://localhost:3000 to see the new application running.

## Database Options

When creating a new project, Danet CLI will ask you what database provider you
want to use between mongodb, postgres and in-memory and will generate all the
required code.

The only thing left if you use mongodb or postgres will be to set environment
variables or put them in a .env file in your project's root folder.

However, if you need it to be less interactive, you can pass the followings
options when calling danet new :

`--mongodb` `--postgres` `--in-memory`

Danet is an MIT-licensed open source project. If you'd like to come along the
journey, please [join our discord](https://discord.gg/Q7ZHuDPgjA).
