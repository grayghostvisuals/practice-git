First Contributions

It's hard. It's always hard the first time you do something. Especially when you are collaborating, making mistakes isn't a comfortable thing. We wanted to simplify the way new open-source contributors learn & contribute for the first time.

Reading articles & watching tutorials can help, but what's better than actually doing the stuff in a practice environment? This project aims at providing guidance & simplifying the way beginners make their first contribution. If you are looking to make your first contribution, follow the steps below.
If you're not comfortable with command line, here are tutorials using GUI tools.
Read this in other languages.

fork this repository

If you don't have git on your machine, install it.
Fork this repository

Fork this repo by clicking on the fork button on the top of this page. This will create a copy of this repository in your account.
Clone the repository

clone this repository

Now clone this repo to your machine. Go to your GitHub account, click on the clone button and then click the copy to clipboard icon.

Open a terminal and run the following git command:

git clone "url you just copied"

where "url you just copied" (without the quote marks) is the url to this repository(your fork of this project). See the previous steps to obtain the url.

copy URL to clipboard

For example:

git clone https://github.com/this-is-you/first-contributions.git

where this-is-you is your GitHub username. Here you're copying the contents of the first-contributions repository in GitHub to your computer.
Create a branch

Change to the repository directory on your computer (if you are not already there):

cd first-contributions

Now create a branch using the git checkout command:

git checkout -b <add-your-new-branch-name>

For example:

git checkout -b add-alonzo-church

(The name of the branch does not need to have the word add in it, but it's a reasonable thing to include because the purpose of this branch is to add your name to a list.)
Make necessary changes and commit those changes

Now open Contributors.md file in a text editor, add your name to it, and then save the file. If you go to the project directory and execute the command git status, you'll see there are changes. Add those changes to the branch you just created using the git add command:

git add Contributors.md

Now commit those changes using the git commit command:

git commit -m "Add <your-name> to Contributors list"

replacing <your-name> with your name.
Push changes to GitHub

Push your changes using the command git push:

git push origin <add-your-branch-name>

replacing <add-your-branch-name> with the name of the branch you created earlier.
Submit your changes for review

If you go to your repository on GitHub, you'll see a Compare & pull request button. Click on that button.