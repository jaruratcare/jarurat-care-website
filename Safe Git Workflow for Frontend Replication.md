Safe Git Workflow for Production Changes
Follow these instructions to make updates, test your code, and push your changes safely to the production deployment.
0. For Jarurat Care website : The branch which is in production is 'deploy' . Follow these steps so that we don't do blunders in committing.
1. git status (see which branch are you in - you have to be in the deploy branch)
2. if your are in deploy branch pull the latest commit - git fetch origin --> git pull origin deploy
3. if you are not in the deploy branch switch to deploy branch - git switch deploy
4. make sure you have latest commit of deploy branch -> git fetch origin -> git pull origin deploy.
5. now you will have to create a branch whose name will be same as the fix/module you are working (say contact-us) & and this new branch should be the exact copy of deploy branch -> git switch -c contact-us deploy (or you can also use git checkout -b contact-us deploy)
6. git status (Now you will be able to see that you are on newly created branch i.e contact-us and in the version control icon of VS code you will be able to see that all history is preserved)
7. Now you are free to do changes/fixes. After coding test it in localhost --> if everything is fine then commit it (git add . --> git commit -m "msg" --> git push origin contact-us)
8. After that you will be able to see that your branch is visible in github
9. Now your changes are up to date in the contact-us branch but it is not in production yet, because vercel is fetching from deploy branch. So you have to merge your changes in the deploy branch.
10. Now since history of contact-us branch and deploy branch are same, we can safely merge both. But to merge in deploy branch, you will have to be in deploy branch.
11. So go to deploy branch first -> git switch deploy
12. Again pull latest commit -> git fetch origin -> git pull origin deploy
13. Now merge latest commit of contact-us branch with deploy branch -> git merge contact-us
14. Now if you are lucky, you will not face any merge conflicts -> git push origin deploy -> if thats the case go tot github (deploy branch) and see latest commit of merging and smile
15. If you face merge conflict -> don't worry -> go to files that are showing conflicts and manually choose whether you want to keep the old code (below <<<<HEAD and above =====) or new code (below ===== and above  >>>>>>contact-us). If you want new code, delete old code with all signs like <<<<HEAD, ==== and >>>>contact-us and if you want to keep old code then delete new code include all signs like ======, >>>>>>contact-us and <<<<HEAD
16. after that simply commit, because you are already in deploy branch and you have some uncommitted changes because merging stopped midway -> git add . --> git commit -m "msg" --> git push origin deploy. Go to github and see the merging commit as well as your changes reflected in main website and smile.
17. And all set :)
