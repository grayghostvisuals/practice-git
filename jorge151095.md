# GIT WORKFLOW
This is an example of practice in the academy at 11 April 2018
We use three components
-   Local
    >   Local push to the origin
-   Origin
    >   Origin is our clone of upstream
-   Upstream
    > Upstream is the main Object (the god) and the permisions to push are blocked

Next, I list the steps to make this practice
##### fork repository
In the GIT hub graphic interface we select the option to fork

##### Clone to our local
`git clone $ git clone https://github.com/grayghostvisuals/practice-git.git`

##### Set remote origin and upstream
```
$ git remote add upstream https://github.com/grayghostvisuals/practice-git.git
$ git remote add origin https://github.com/jorge151095/practice-git.git
$ git remote -v 
```
##### Add a document to remote origin
We can use the prefer text editor, in my case I used VSC

##### Add a document to remote origin
`git add jorge151095.md`

##### Check the git status 
`git status`

##### Commit our changes 
We commit with a message and this need follow the best practice, the page [Karma](http://karma-runner.github.io/2.0/dev/git-commit-msg.html)
`git commit -m "chore(update): Add the document jorge151095.md"`

##### push to remote origin
Push to origin, specifying the brach, in this case is master
`git push remote origin master`

##### pull from upstream
This update, is necessary, because need resolve coflicts and match the files before to merge.
`git pull remote upstream`

#### push request to Upstream
The last step, we use the Git hub Graphic Interface