I don't know why my push worked as it should because I did it incorrectly.  I did:  git push upstream master, which, according to [this document](https://help.github.com/articles/fork-a-repo) is incorrect.  I was supposed to do: git push origin master, as that's what is pointing to my forked repo while upstream is pointing to your repo(I just learned that).  Still, I look at my history and it clearly went to my fork.

I'm about to push this file, I'm also wondering if it will get added to the open pull request.  Let's see.

Update:  Yes it did go to the current pull request.  Sweet.  And I did it with git push origin master, so I'm still puzzled why git push upstream master worked as well.  Seems it shouldn't have.
