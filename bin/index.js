#!/usr/bin/env node

const chalk = require("chalk");
const prompt = require("prompt-sync")();
const fetch = require("cross-fetch");
const cookie = require("cookie");

require("dotenv").config();

const { signInUser } = require("../auth-utils");
const { fetchPosts } = require("../fetch-utils");

async function loadPrompts() {
  console.log(
    chalk.bold.bgBlue.underline("WELCOME TO " + chalk.bgCyan("GITTY") + "!")
  );

  let validUser = false;
  let cookieInfo;
  while (!validUser) {
    const email = prompt(chalk.cyan("Please enter your email: "));
    console.log(chalk.blue(`Welcome ${email}!`));
    const password = prompt.hide(chalk.cyan("Please enter your password: "));
    try {
      cookieInfo = await signInUser(email, password);
      validUser = true;
    } catch (error) {
      console.log(chalk.bold.underline.magenta(error.message));
      console.log(chalk.bold.underline.magenta("Please try again!"));
    }
  }
  const posts = await fetchPosts(cookieInfo);
  console.log(posts);
}
loadPrompts();
